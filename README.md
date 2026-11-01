# Coastra website

A one-page website for Coastra, a Singapore Polytechnic BETA student business that makes handmade resin coasters. It shows the Batch 01 collection, the pricing, how to pre-order, the booth promotion and the team.

It's plain HTML, CSS and JavaScript. There's nothing to install and no build step.

## What's in this folder

| File / folder | What it is | Upload to GitHub? |
|---|---|---|
| `index.html` | The page itself | **Yes** |
| `styles.css` | All the styling | **Yes** |
| `script.js` | Small extras: mobile menu, shape filter, cards settling in as you scroll. The page still works without it. | **Yes** |
| `assets/` | Logo, product photos, team photos, posters, Instagram posts, favicons | **Yes** (the whole folder) |
| `README.md` | This guide | Optional |
| `TODO.md` | Things still to confirm or fix | No |
| `reference/`, `PROMPT.md` | The build brief and the business plan text (financials, SWOT) | **No, keep these private** |
| `.claude/` | Preview settings used while building the site | No |

## Preview it on your computer

**Quickest:** double-click `index.html`. It opens in your browser. Fonts need an internet connection; everything else works offline.

**Closer to the real thing:** open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser. Press `Ctrl+C` in the terminal to stop it.

To check the phone layout on a computer, open the browser's developer tools (`F12`) and click the phone/tablet icon.

## Put it online with GitHub Pages (free)

1. **Create a GitHub account** at [github.com](https://github.com) if you don't have one.
2. **Create a repository.** Click **+** (top right) → **New repository**.
   - Repository name: `coastra` (this becomes part of your link)
   - Visibility: **Public** (free GitHub Pages needs a public repository)
   - Leave the other options alone and click **Create repository**.
3. **Upload the files.** On the new repository's page, click the link **uploading an existing file**.
4. Drag in **only** `index.html`, `styles.css`, `script.js` and the **`assets` folder**. Drag the folder itself, not the files inside it, so the `assets/...` paths stay the same.
   - Don't upload `reference/`, `PROMPT.md`, `TODO.md` or `.claude/`. Anything in a public repository can be read by anyone, and `reference/` holds your business plan.
   - If your browser won't let you drag a folder, use Chrome or Edge, or install [GitHub Desktop](https://desktop.github.com).
5. Scroll down, type a short message such as `First upload`, and click **Commit changes**. Wait for the upload to finish.
6. **Turn on Pages.** Click the **Settings** tab at the top of the repository, then **Pages** in the left sidebar.
7. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main`, folder `/ (root)`
   - Click **Save**.
8. **Get your link.** Wait 1–2 minutes, then refresh the Pages settings page. Your link appears at the top. It looks like `https://your-username.github.io/coastra/`.
9. Open the link on your phone and tap through every section.

### After it's live

- Follow the "After deploying" steps in `TODO.md` so link previews on WhatsApp, Telegram and Instagram show the coaster photo.
- Make a QR code that points to the live link and add it to the booth posters.

## Changing things later

Edit the file on your computer and check it locally. Then, in the GitHub repository, click **Add file → Upload files** and upload the changed file with the same name; it replaces the old one. Commit, and the live site updates within a couple of minutes.

Where to find common things in `index.html` (use your editor's search, `Ctrl+F`):

| To change | Search for |
|---|---|
| Prices | `$12`, `$13`, `+$1` |
| Payment details | `TODO(TBC 2)` |
| The recycled material | `TODO(TBC 3)` |
| Order steps, to match your form | `TODO(TBC 4)` |
| "Le Prechaun" spelling | `TODO(TBC 5)` |
| Add a team member | `TODO(TBC 1)`: copy one `<li class="member">` block and change the photo, name, role and summary. Put the photo in `assets/team/` as `firstname-role.jpg`, ideally 615×820 like the others. No photo yet? The comment shows the initials-avatar version. |
| Telegram link | `t.me` |
| Pre-order form link | `docs.google.com/forms` (appears 3 times) |
