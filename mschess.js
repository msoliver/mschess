chrome.runtime.onInstalled.addListener(function() {
    chrome.alarms.create('games', { delayInMinutes: 0.2});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        chrome.pageAction.show(tabId);
    }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
    console.log(alarm.name);
    if (alarm.name === 'games')
        await getGames();
});
