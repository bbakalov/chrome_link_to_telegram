async function sendCurrentTabUrl() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  if (!tab || !tab.url) return;

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } =
    await chrome.storage.local.get(["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"]);

  const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`
      + `/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(tab.url)}`;

  const resp = await fetch(apiUrl);
  if (!resp.ok) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "Error sending",
      message: `Status ${resp.status}`
    });
  } else {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "URL sent",
      message: tab.url
    });
  }
}

chrome.action.onClicked.addListener(async () => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } =
    await chrome.storage.local.get(["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"]);

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    chrome.runtime.openOptionsPage();
    return;
  }

  await sendCurrentTabUrl();
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "send-url-to-telegram") {
    const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } =
      await chrome.storage.local.get(["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"]);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      chrome.runtime.openOptionsPage();
      return;
    }
    await sendCurrentTabUrl();
  }
});