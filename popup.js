// Popup script that requests channel ID and generates playlist links

// Function to extract channel ID (same logic as content.js)
function getChannelIdCode() {
  return `
    (function() {
      try {
        // Method 1: Try to get from ytInitialData global variable
        if (typeof ytInitialData !== 'undefined' && ytInitialData?.metadata?.channelMetadataRenderer?.externalId) {
          return ytInitialData.metadata.channelMetadataRenderer.externalId;
        }
        
        // Method 2: Try to get from video player end card links
        const endCardLink = document.querySelector('.ytp-ce-link[href]');
        if (endCardLink && endCardLink.href) {
          const parts = endCardLink.href.split('/');
          const channelId = parts.pop();
          if (channelId && channelId.startsWith('UC')) {
            return channelId;
          }
        }
        
        // Method 3: Try to get from page metadata
        const metaElement = document.querySelector('[itemprop="identifier"]');
        if (metaElement && metaElement.content) {
          return metaElement.content;
        }
        
        // Method 4: Try to get from channel page URL
        const channelUrlMatch = window.location.href.match(/youtube\\.com\\/(channel|c|user|@)\\/([^\\/\\?]+)/);
        if (channelUrlMatch) {
          const identifier = channelUrlMatch[2];
          if (identifier.startsWith('UC')) {
            return identifier;
          }
        }
        
        // Method 5: Try to get from canonical link
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink && canonicalLink.href) {
          const match = canonicalLink.href.match(/youtube\\.com\\/channel\\/([^\\/\\?]+)/);
          if (match && match[1]) {
            return match[1];
          }
        }
        
        return null;
      } catch (error) {
        console.error('Error extracting channel ID:', error);
        return null;
      }
    })();
  `;
}

document.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const linksEl = document.getElementById('links');

  try {
    // Get the active tab
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];

    // Check if we're on a YouTube page
    if (!activeTab.url || !activeTab.url.includes('youtube.com')) {
      showError();
      return;
    }

    let channelId = null;

    // Try to send message to content script first
    try {
      const response = await browser.tabs.sendMessage(activeTab.id, { action: 'getChannelId' });
      if (response && response.channelId) {
        channelId = response.channelId;
      }
    } catch (error) {
      // Content script not loaded (page was already open when addon was installed)
      // Execute the code directly
      console.log('Content script not available, executing code directly');
    }

    // If content script didn't work, execute the code directly
    if (!channelId) {
      const results = await browser.tabs.executeScript(activeTab.id, {
        code: getChannelIdCode()
      });

      if (results && results[0]) {
        channelId = results[0];
      }
    }

    if (channelId) {
      // Generate playlist URLs using the same logic as the console code
      // UU = All uploads, UULF = Full-length only, UUSH = Shorts only
      const allVideosUrl = `https://www.youtube.com/playlist?list=UU${channelId.slice(2)}`;
      const fullVideosUrl = `https://www.youtube.com/playlist?list=UULF${channelId.slice(2)}`;
      const shortsUrl = `https://www.youtube.com/playlist?list=UUSH${channelId.slice(2)}`;

      // Set the URLs
      document.getElementById('allVideos').href = allVideosUrl;
      document.getElementById('fullVideos').href = fullVideosUrl;
      document.getElementById('shorts').href = shortsUrl;

      // Show the links
      loadingEl.style.display = 'none';
      linksEl.style.display = 'block';
      document.getElementById('donate').style.display = 'block';
    } else {
      showError();
    }
  } catch (error) {
    console.error('Error getting channel ID:', error);
    showError();
  }
});

function showError() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('error').style.display = 'block';

  // Automatically refresh the page after a brief delay
  setTimeout(async () => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      await browser.tabs.reload(tabs[0].id);
      window.close(); // Close the popup after refreshing
    }
  }, 500); // 500ms delay so user can see the message
}
