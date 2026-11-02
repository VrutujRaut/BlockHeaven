# BlockHeaven website

This repository is a static website for the BlockHeaven Minecraft server. It has no build step, package manager, or backend: open it with a local web server and the pages, styles, images, and JavaScript load directly from this folder.

## Start here

1. Open a PowerShell window in this folder.
2. Start a local web server, for example:

   ```powershell
   py -m http.server 8000
   ```

3. Browse to `http://localhost:8000/`.

Opening `index.html` directly also shows the layout, but serving the folder is closer to production and lets the browser fetch live server and Discord data normally.

## What visitors can do

- Check the server address: `BlockHeaven.aternos.me` and port `63116`.
- Preview and share the site from [preview.html](preview.html). The home page includes Open Graph and Twitter Card metadata and uses `assets/images/social-preview.jpg` for link previews.
- See the player count and optionally enable a browser notification when the server changes from offline to online.
- Apply to join through the embedded Google Form on [join.html](join.html).
- Join the community from [discord.html](discord.html), read [rules.html](rules.html), browse ranks in [shop.html](shop.html), download the official modpack from [modpack.html](modpack.html), or find help in [support.html](support.html).

The join page says Discord is required for authentication and events. Java and Bedrock players are supported; Java players can install the recommended voice-chat mod, and players with both editions can link accounts through GeyserMC.

## Files to edit

| Need to change | File |
| --- | --- |
| Home-page server details, player counter, notification prompt | `index.html`, `index.css`, `script.js` |
| Social link preview and share actions | `preview.html`, `preview.css`, `assets/images/social-preview.jpg` |
| Join instructions and application form | `join.html`, `join.css` |
| Discord widget and invite links | `discord.html`, `script.js` |
| Server rules | `rules.html`, `rules.css` |
| Ranks and purchase instructions | `shop.html`, `shop.css` |
| Modpack description and download | `modpack.html`, `assets/modpacks/Official BlockHeaven 1.1.2.mrpack` |
| Support contacts and frequently asked questions | `support.html`, `support.css` |
| Shared sidebar and common styles | `common.css`, `script.js` |

## Keeping it current

When server details change, update both the visible home-page values in `index.html` and the `serverIP` value in `script.js`. When replacing the modpack, update its filename, displayed version, and download link together in `modpack.html`.

The social metadata currently points to the standard GitHub Pages address `https://vrutujraut.github.io/BlockHeaven/`. If the site is published on a different domain, update the canonical, Open Graph, and Twitter image URLs in `index.html` and `preview.html` to match it. Social platforms fetch these tags from the published page; local previews do not appear in public shares until the site and preview image are deployed.

`script.js` refreshes the Minecraft server status every 30 seconds using `api.mcsrvstat.us` and reads Discord widget data from Discord's public widget endpoint. These live features need an internet connection and can show an error or remain unchanged if the external service is unavailable.

## Assets

- `assets/images/` contains the logo, favicon, and rank artwork.
- `assets/modpacks/` contains the downloadable `.mrpack` file.
- `assets/BlockHeaven Rank Setup Guide.pdf` is the rank setup guide.
