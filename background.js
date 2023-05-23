chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'likeAndRepostForKingsmen') {
    try {
      const tab = await getActiveTab();
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: likeAndRepostForKingsmen,
      });
    } catch (error) {
      console.error('Error executing script:', error);
    }
  }
});

function likeAndRepostForKingsmen() {
    setTimeout(() =>{
       // Select all parent divs
      const parentDivs = document.querySelectorAll('div.ember-view');

      for (const element of parentDivs) {
        const div = element;
        // Check for an unclicked like button within this div
        const likeButton = div.querySelector(
          'button[aria-label="React Like to Kingsmen Software’s post"][aria-pressed="false"]'
        );
      
        if (likeButton) {
          // If found, click the like button
          likeButton.click();
          console.log('like button clicked');
      
           // Check for a repost button within this div
          const repostButton = div.querySelector('button[aria-expanded="false"] li-icon[type="repost"]');
          if (repostButton) {
            // If found, click the repost button
            repostButton.click();
            console.log('repost button clicked');
          }
          break; // This will break the loop
        }
      }

    }, 15000);

}

async function getActiveTab() {
  return new Promise((resolve) => {
    chrome.windows.getLastFocused({ populate: true }, (focusedWindow) => {
      if (focusedWindow) {
        const activeTab = focusedWindow.tabs.find((tab) => tab.active);
        if (activeTab) {
          resolve(activeTab);
        } else {
          resolve(focusedWindow.tabs[0]);
        }
      } else {
        console.error("No focused window found.");
      }
    });
  });
}


