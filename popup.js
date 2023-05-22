document.getElementById('likeAndRepostButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'likeAndRepostForKingsmen' });
});