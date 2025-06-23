document.addEventListener('DOMContentLoaded', async () => {
    const tokenInput = document.getElementById('token');
    const chatIdInput = document.getElementById('chatId');
    const saveBtn = document.getElementById('saveBtn');

    const {TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID} =
        await chrome.storage.local.get(["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"]);

    if (TELEGRAM_BOT_TOKEN) tokenInput.value = TELEGRAM_BOT_TOKEN;
    if (TELEGRAM_CHAT_ID) chatIdInput.value = TELEGRAM_CHAT_ID;

    saveBtn.addEventListener('click', async () => {
        const token = tokenInput.value.trim();
        const chatId = chatIdInput.value.trim();
        if (!token || !chatId) {
            alert('Both fields are required.');
            return;
        }
        await chrome.storage.local.set({TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId});
        alert('Settings saved.');
    });
});