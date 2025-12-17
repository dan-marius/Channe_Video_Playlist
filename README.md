# Channel Video Playlist Access

A Firefox addon that provides quick access to YouTube channel videos as a playlist with one click.

## Features

- 📺 **All Videos**: View all uploaded videos from a channel
- 🎬 **Full-Length Only**: Filter to show only full-length videos (no shorts)
- 📱 **Shorts Only**: View only YouTube Shorts from a channel
- ✨ **Auto-Refresh**: Automatically refreshes the page if needed to detect the channel ID

## Installation

### Step 1: Download the Addon

1. Go to the [GitHub repository](https://github.com/yourusername/youtube-playlist-addon)
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Extract the ZIP file to a folder on your computer (e.g., `Documents/youtube-playlist-addon`)

### Step 2: Install in Firefox

1. Open **Firefox** browser
2. Type `about:debugging` in the address bar and press Enter
3. Click **"This Firefox"** in the left sidebar
4. Click the **"Load Temporary Add-on..."** button
5. Navigate to the folder where you extracted the addon
6. Select the **`manifest.json`** file and click **"Open"**

✅ **Done!** The addon icon will appear in your Firefox toolbar.

### Important: Keeping the Addon Permanent

**Why does it disappear?** Firefox automatically removes temporary addons when you close the browser for security reasons.

**Solution - Make it Permanent:**

1. **Download Firefox Developer Edition** or **Firefox Nightly**:
   - [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) (Recommended)
   - [Firefox Nightly](https://www.mozilla.org/en-US/firefox/nightly/)

2. **Disable Signature Enforcement**:
   - Type `about:config` in the address bar
   - Click "Accept the Risk and Continue"
   - Search for: `xpinstall.signatures.required`
   - Double-click to set it to **`false`**

3. **Install the Addon**:
   - Follow the same installation steps above
   - The addon will now stay installed permanently, even after restarting Firefox!

> **Note**: Regular Firefox doesn't allow this for security reasons. Developer Edition and Nightly are designed for testing unsigned addons.

## Usage

1. Navigate to any YouTube page (channel page, video page, etc.)
2. Click the addon icon in your Firefox toolbar
3. Choose from three playlist options:
   - **All Videos**: Complete upload history
   - **Full-Length Only**: Only videos longer than 60 seconds
   - **Shorts Only**: Only YouTube Shorts

Each link opens in a new tab with the corresponding playlist.

## How It Works

The addon extracts the YouTube channel ID using multiple detection methods:
- From the `ytInitialData` global variable
- From video player end card links
- From page metadata elements
- From the page URL
- From canonical links

Once the channel ID is detected, it generates special YouTube playlist URLs:
- `UU` prefix = All uploads
- `UULF` prefix = Full-length videos only
- `UUSH` prefix = Shorts only

## Files Structure

```
youtube-playlist-addon/
├── manifest.json       # Addon configuration
├── content.js          # Channel ID extraction logic
├── popup.html          # Popup interface
├── popup.js            # Popup functionality
├── popup.css           # Popup styling
└── icons/
    ├── icon-48.png     # 48x48 icon
    └── icon-96.png     # 96x96 icon (high DPI)
```

## Browser Compatibility

This addon is built for **Firefox** using WebExtensions API (Manifest V2).

## License

**MIT-based license with additional attribution requirements** - Copyright (c) 2025 Dan Marius

This project is open source, but with one important requirement:

> **Any copies, modifications, or derivative works MUST keep the original "Buy Me a Coffee" donation button visible in the same location, linking to Dan Marius's PayPal (danmarius10@gmail.com).**

See [LICENSE](LICENSE) file for full details.

## Support

If you find this addon helpful, consider [buying me a coffee](https://www.paypal.com/donate/?business=danmarius10@gmail.com&amount=3&currency_code=USD) ☕

## Author

**Dan Marius**
- Email: danmarius7@gmail.com
- GitHub: [(https://github.com/dan-marius)]




