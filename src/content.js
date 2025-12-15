(async function () {
  const { pattern, isRegex, enabled } = await browser.storage.local.get([
    "pattern",
    "isRegex",
    "enabled"
  ]);

  if (!enabled || !pattern) return;

  let regex = null;
  if (isRegex) {
    try {
      regex = new RegExp(pattern, "i");
    } catch {
      return;
    }
  }

  function matchHTML(html) {
    return regex ? regex.test(html) : html.includes(pattern);
  }

  function checkInitialDOM() {
    const html = document.documentElement.innerHTML;
    if (matchHTML(html)) {
      browser.runtime.sendMessage({
        type: "REFLECTION_FOUND",
        pattern,
        url: location.href
      });
      return true;
    }
    return false;
  }

  if (checkInitialDOM()) return;

  // Observe future DOM mutations (ELEMENTS ONLY)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;

        // Check only parsed HTML
        const html = node.outerHTML;
        if (matchHTML(html)) {
          browser.runtime.sendMessage({
            type: "REFLECTION_FOUND",
            pattern,
            url: location.href
          });
          observer.disconnect();
          return;
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
