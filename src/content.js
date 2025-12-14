(async function () {
  const { pattern, isRegex, enabled } = await browser.storage.local.get([
    "pattern",
    "isRegex",
    "enabled"
  ]);

  if (enabled == false || !pattern) return;

  let regex = null;
  if (isRegex) {
    try {
      regex = new RegExp(pattern, "i");
    } catch {
      return;
    }
  }

  function checkDOM() {
    const text = document.documentElement.textContent;

    if (regex ? regex.test(text) : text.includes(pattern)) {
      browser.runtime.sendMessage({
        type: "REFLECTION_FOUND",
        pattern,
        url: location.href
      });
      return true;
    }
    return false;
  }

  // 1 Initial check
  if (checkDOM()) return;

  // 2️ Observe future DOM mutations
  const observer = new MutationObserver(() => {
    if (checkDOM()) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });

})();
