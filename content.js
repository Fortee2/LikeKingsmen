function likeKingsmenPosts() {
    const buttons = document.querySelectorAll('button[aria-label="React Like to Kingsmen Software’s post"][aria-pressed="false"]');
  
    for (const button of buttons) {
      button.click();
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'likeKingsmenPosts') {
      likeKingsmenPosts();
    }
  });
  