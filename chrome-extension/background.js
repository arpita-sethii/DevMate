chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "analyze-code",
    title: "Analyze code with DevMate",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "analyze-code") {
    const code = info.selectionText;

    const formData = new FormData();
    const blob = new Blob([code], { type: 'text/plain' });
    formData.append('file', blob, 'code.py');

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData
    });

    const result = await response.text();

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showAnalysis,
      args: [result]
    });
  }
});

function showAnalysis(text) {
  alert("DevMate Response:\n\n" + text);
}
