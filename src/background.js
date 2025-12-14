browser.runtime.onMessage.addListener(msg => {
  if (msg.type === "REFLECTION_FOUND") {
    browser.notifications.create({
      type: "basic",
      title: "DOM Reflection Found",
      message: `Pattern found on:\n${msg.url}`
    });
  }
});
