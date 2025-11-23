// Content script that extracts the YouTube channel ID
// This runs on all YouTube pages

function getChannelId() {
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
    const channelUrlMatch = window.location.href.match(/youtube\.com\/(channel|c|user|@)\/([^\/\?]+)/);
    if (channelUrlMatch) {
      // If it's already a channel ID (starts with UC), return it
      const identifier = channelUrlMatch[2];
      if (identifier.startsWith('UC')) {
        return identifier;
      }
    }
    
    // Method 5: Try to get from canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && canonicalLink.href) {
      const match = canonicalLink.href.match(/youtube\.com\/channel\/([^\/\?]+)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting channel ID:', error);
    return null;
  }
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getChannelId') {
    const channelId = getChannelId();
    sendResponse({ channelId: channelId });
  }
  return true; // Keep the message channel open for async response
});
