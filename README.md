# Send URL to Telegram Bot from Google Chrome

A Chrome extension that lets you quickly send the current tab’s URL to your Telegram bot using the Bot API.

## 🚀 Quick Installation
- Clone or unzip the repository folder to a local directory.
- Open Chrome and navigate to: **chrome://extensions/**
- Enable Developer mode (toggle in the top-right corner).
- Click Load unpacked and select the root folder of the extension (the one containing manifest.json).
- After loading, you should see Send URL to Telegram listed among your extensions.

## ⚙️ Configuring Bot Token & Chat ID
- In chrome://extensions/, locate Send URL to Telegram and click Details.
- Click Extension options (or Options) to open the settings page.
- On the Telegram Settings page:
  - Bot Token: Paste the token you received from @BotFather.
  - Chat ID: Paste your group or channel ID (e.g. -1001234567890).

> How to find your Chat ID:
> Use the API method:
> ```bash
> curl "https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates"
> ```
> and look for chat.id in the JSON response when a message is sent.

> Or message the bot https://t.me/getidsbot in Telegram; it will reply with the Chat ID.

- Click Save. A confirmation alert will appear once settings are stored.

## 🎯 Usage
- Click the extension icon in the toolbar to immediately send the current tab URL to Telegram.
- Use the default hotkey:
  - Windows/Linux: Ctrl + Shift + S
  - macOS: ⌘ + ⇧ + S

If the Bot Token or Chat ID is missing, the extension will automatically open the options page to prompt you for settings.

## 🗂 File Structure
```
send-url-telegram/         # Extension root directory
├── manifest.json          # Extension metadata and permissions
├── background.js          # Core logic for sending URL and handling clicks/shortcuts
├── options.html           # Settings page markup (Bot Token, Chat ID)
├── options.js             # Logic for saving settings
└── icons/                 # Icons (16×16, 48×48, 128×128)
```

## 🛠 Troubleshooting & Tips
- Reload the extension on **chrome://extensions/** after making changes to code or manifest.json.
- Change the hotkey by visiting: **chrome://extensions/shortcuts**
- Inspect Service Worker logs:
  - In **chrome://extensions/**, click Service Worker under Inspect views.
  - Use console and network tabs to debug any issues.