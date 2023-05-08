document.getElementById('likePosts').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'likeKingsmenPosts' });
});

document.getElementById('repostForKingsmen').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'repostForKingsmen' });
});