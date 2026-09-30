# Domain Only

A tiny Brave/Chromium extension: anything you type or pick in the address bar takes you to the **domain root**, never a previously visited subpage.

Type `yout` + Enter → `https://youtube.com/`, not `youtube.com/watch?v=...`.

## How it works

- **Redirect:** a top-level navigation from the address bar (`typed`) to a subpage is sent to `origin/`. Server/client redirects are respected (e.g. `gmail.com` → `mail.google.com/...`).
- **History cleanup:** subpages you typed are removed from history, so the address bar stops suggesting them. On install, existing typed subpages are removed once.

Clicked links, bookmarks and search results work as normal.

> Note: pasting a full URL into the address bar also lands on the domain root.

## Install

1. Download or clone this repo
2. Open `brave://extensions` (or `chrome://extensions`)
3. Enable **Developer mode**
4. **Load unpacked** → select the repo folder

## Permissions

- `webNavigation`: detect address-bar navigations
- `history`: remove typed subpages from history

## License

[MIT](LICENSE)
