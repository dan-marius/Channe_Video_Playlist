# Channel Video Playlist Access

A Firefox add-on that gives you one-click access to a YouTube channel’s videos as playlists.

## Features

- 📺 **All Videos**: Open the channel’s full upload playlist
- 🎬 **Full-Length Only**: Open uploads excluding Shorts
- 📱 **Shorts Only**: Open the channel’s Shorts playlist
- ✨ **Auto-Refresh (when needed)**: Can refresh the page to help detect the channel ID on some layouts

## Quick Start

1. Open any YouTube page (channel page, video page, etc.)
2. Click the add-on icon
3. Choose:
   - **All Videos**
   - **Full-Length Only**
   - **Shorts Only**

Each option opens a new tab with the corresponding playlist.

---

## Installation

### Option A — Temporary install (best for development)

This method is for testing during development. Firefox removes temporary add-ons when the browser restarts.

1. Download this repository (ZIP) and extract it
2. Open Firefox
3. Go to `about:debugging`
4. Click **This Firefox**
5. Click **Load Temporary Add-on...**
6. Select the **`manifest.json`** file

✅ The icon will appear in your toolbar.  
⚠️ It will disappear after restarting Firefox.

### Option B — Persistent local install (Developer Edition / Nightly)

This method is for advanced users testing unsigned add-ons locally.

1. Install **Firefox Developer Edition** or **Firefox Nightly**
2. In the address bar, open `about:config`
3. Search for `xpinstall.signatures.required`
4. Set it to `false` (advanced / testing-only setting)
5. Package the extension into an `.xpi`, then install it from `about:addons`:
   - Gear icon ⚙️ → **Install Add-on From File...**

> Note: Using unsigned add-ons and disabling signature checks can reduce your security. Do this only if you understand the risks.

### Option C — Recommended for regular users (signed)

For standard Firefox, the usual path is to get the add-on signed and distributed (listed or unlisted) and then install it normally.

---

## Usage

1. Navigate to any YouTube page (channel page, video page, etc.)
2. Click the add-on icon in the Firefox toolbar
3. Choose from the three playlist options:
   - **All Videos**: Complete upload history
   - **Full-Length Only**: Videos excluding Shorts
   - **Shorts Only**: YouTube Shorts

---

## How It Works

The add-on extracts the YouTube channel ID using multiple detection methods, such as:
- Page-initialized data objects (e.g., `ytInitialData` when available)
- Video page/channel links (e.g., end cards where present)
- Metadata elements and canonical links
- URL-based fallbacks

Once the channel ID is detected, it generates YouTube playlist URLs:
- `UU` prefix = All uploads
- `UULF` prefix = Full-length videos only
- `UUSH` prefix = Shorts only

---

## Permissions & Privacy

### Permissions
This add-on needs access to YouTube pages to detect the channel ID and build playlist URLs.

### Privacy
- No analytics
- No tracking
- No data is sent to any server by this add-on
- Everything runs locally in your browser

---

## Troubleshooting

- **The popup shows no links / can’t detect channel**
  - Reload the page once and try again
  - Try opening the channel’s main page (Home/Videos tab) and click the icon again
- **YouTube layout changes**
  - YouTube UI changes can break detection. If it stops working, please open an issue and include:
    - The URL you were on
    - What you clicked
    - Any console errors (if you have them)

---

## File structure

    youtube-playlist-addon/
    ├── manifest.json       # Add-on configuration
    ├── content.js          # Channel ID extraction logic
    ├── popup.html          # Popup interface
    ├── popup.js            # Popup functionality
    ├── popup.css           # Popup styling
    └── icons/
        ├── icon-48.png     # 48x48 icon
        └── icon-96.png     # 96x96 icon (high DPI)

---

## Browser Compatibility

- Firefox (WebExtensions)
- Manifest V2

---

## License

**Source-available (custom attribution license)** — Copyright (c) 2025 Dan Marius

You may copy/modify the code under the terms in `LICENSE`, with an additional requirement:

> Any copies, modifications, or derivative works MUST keep the original “Buy Me a Coffee” donation button visible in the same location, linking to Dan Marius’s PayPal (danmarius10@gmail.com).

See the [LICENSE](LICENSE) file for full details.

---

## Support

If you find this add-on helpful, consider buying me a coffee:  
https://www.paypal.com/donate/?business=danmarius10@gmail.com&amount=3&currency_code=USD ☕

---

## Author

**Dan Marius**
- Email: danmarius7@gmail.com
- GitHub: https://github.com/dan-marius
