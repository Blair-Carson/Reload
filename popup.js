// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const intervalInput = document.getElementById("interval");

  startBtn.addEventListener("click", function () {
    const interval = parseInt(intervalInput.value);
    chrome.runtime.sendMessage({ action: "startReload", interval: interval });
    document.getElementById("startBtn").innerHTML = "Active";
  });

  stopBtn.addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "stopReload" });
    document.getElementById("startBtn").innerHTML = "Inactive";
  });
});
