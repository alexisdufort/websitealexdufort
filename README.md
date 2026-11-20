# alexdufort.com

Static personal website for Alex Dufort. No build step and no database.

- `index.html`: the page
- `styles.css`, `script.js`: look and behaviour
- `content.js`: editable content (Calendly link, LinkedIn, logos, appearances, photos)
- `images/`: headshot and event photos
- `robots.txt`, `sitemap.xml`: for search engines

## Hosting

Serve this folder as the web root for `alexdufort.com` and `www.alexdufort.com` (Nginx or Apache), with `index.html` as the index file and HTTPS enabled (for example Let's Encrypt). Both domains point to 51.159.29.19.
