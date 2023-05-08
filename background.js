chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'likeKingsmenPosts') {
    try {
      const tab = await getActiveTab();
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: likeKingsmenPosts,
      });
    } catch (error) {
      console.error('Error executing script:', error);
    }
  } else if (request.action === 'repostForKingsmen') {
    try {
      const tab = await getActiveTab();
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: repostForKingsmen,
      });
    } catch (error) {
      console.error('Error executing script:', error);
    }
  }
});

function likeKingsmenPosts() {
  const buttons = document.querySelectorAll(
    'button[aria-label="React Like to Kingsmen Software’s post"][aria-pressed="false"]'
  );

  for (const button of buttons) {
    button.click();
  }
}

function repostForKingsmen() {
  const buttons = document.querySelectorAll('button[aria-expanded="false"]');
  const repostButtons = [];

  buttons.forEach((button) => {
    const liIcon = button.querySelector('li-icon[type="repost"]');
    if (liIcon) {
      repostButtons.push(button);
      console.log( button.innerHTML);
    }
  });

  for (const repostButton of repostButtons) {
    repostButton.click();
    const htmlarray = document.querySelectorAll(
      'div[class="artdeco-dropdown__content artdeco-dropdown__content--is-open artdeco-dropdown--is-dropdown-element artdeco-dropdown__content--justification-right artdeco-dropdown__content--placement-bottom ember-view social-reshare-button__share-dropdown-content"]'
    );

    htmlarray.forEach((html) => {
      html.click();
    });
  }
}

function waitForElement(selector) {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
          if (addedNode.matches && addedNode.matches(selector)) {
            resolve(addedNode);
            observer.disconnect();
            return;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
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


