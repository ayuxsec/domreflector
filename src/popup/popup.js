document.addEventListener("DOMContentLoaded", () => {
  const patternInput = document.getElementById("pattern");
  const isRegexInput = document.getElementById("isRegex");
  const enabledInput = document.getElementById("enabled");
  const status = document.getElementById("status");
  const saveBtn = document.getElementById("save");

  function showStatus(message, isError = false) {
    status.textContent = message;
    status.style.color = isError ? "red" : "green";

    setTimeout(() => {
      status.textContent = "";
      status.style.color = "";
    }, 1500);
  }

  function isValidRegex(pattern) {
    try {
      new RegExp(pattern);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Load saved config
  browser.storage.local.get(["pattern", "isRegex", "enabled"]).then(data => {
    if (typeof data.pattern === "string") {
      patternInput.value = data.pattern;
    }

    if (typeof data.isRegex === "boolean") {
      isRegexInput.checked = data.isRegex;
    }

    // Default: enabled = true
    enabledInput.checked = data.enabled !== false;
  });

  // Save handler
  saveBtn.addEventListener("click", () => {
    const pattern = patternInput.value.trim();
    const isRegex = isRegexInput.checked;
    const enabled = enabledInput.checked;

    // Empty input check
    if (!pattern && enabled) {
      showStatus("Pattern cannot be empty", true);
      return;
    }

    // Regex validation
    if (isRegex && !isValidRegex(pattern)) {
      showStatus("Invalid regex pattern", true);
      return;
    }

    browser.storage.local.set({
      pattern,
      isRegex,
      enabled
    });

    showStatus("Saved ✔");
  });
});
