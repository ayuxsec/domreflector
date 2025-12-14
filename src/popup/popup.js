document.addEventListener("DOMContentLoaded", () => {
  const patternInput = document.getElementById("pattern");
  const isRegexInput = document.getElementById("isRegex");
  const enabledInput = document.getElementById("enabled");
  const status = document.getElementById("status");

  browser.storage.local.get(["pattern", "isRegex", "enabled"]).then(data => {
    if (data.pattern) patternInput.value = data.pattern;
    if (data.isRegex) isRegexInput.checked = data.isRegex;
    enabledInput.checked = data.enabled !== false; // Default to true
  });

  document.getElementById("save").addEventListener("click", () => {
    browser.storage.local.set({
      pattern: patternInput.value,
      isRegex: isRegexInput.checked,
      enabled: enabledInput.checked
    });

    status.textContent = "Saved ✔";
    setTimeout(() => status.textContent = "", 1500);
  });
});
