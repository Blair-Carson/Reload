// background.js
let reloadCount = 0;
let randomLimit = Math.random() * 10 + 20;
console.log("randomLimit: ", randomLimit);
let fiverrReloads = 0;
// Function to reload the current tab
function reloadTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    reloadCount += 1;
    console.log("Reload count:", reloadCount);
    console.log("Fiverr reload count:", fiverrReloads);
    console.log(`tabs length: ${tabs}`);
    console.log(tabs[0].url.toString().startsWith("https://www.fiverr.com/"));
    if (reloadCount >= randomLimit) {
      if (tabs[0].url.toString().startsWith("https://www.fiverr.com/")) {
        chrome.tabs.reload(tabs[0].id);
        fiverrReloads += 1;
      }
      reloadCount = 0;
      randomLimit = Math.random() * 40 + 20;
      console.log("randomLimit: ", randomLimit);
    }
  });
}

// Set up interval for reloading
let intervalId;
// Message listener for content script to start or stop reloading
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "startReload") {
    // Clear any existing interval
    clearInterval(intervalId);
    // Start a new interval for reloading
    intervalId = setInterval(reloadTab, request.interval * 1000);
  } else if (request.action === "stopReload") {
    // Stop the reloading interval
    clearInterval(intervalId);
  }
});
