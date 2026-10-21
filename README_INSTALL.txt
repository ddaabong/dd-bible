DB-bible_v16 — PWA Install Guide
================================

Package contents
  index.html
  manifest.webmanifest
  sw.js
  icons/
  README_INSTALL.txt (this file)
  (optional) data/  — place Bible TXT files here if hosting with the app

Install (Android Chrome / Samsung Internet)
  1) Upload this whole folder to HTTPS hosting
     (Netlify, GitHub Pages, Cloudflare Pages, etc.)
  2) Open the URL on your phone
  3) Menu → Install app / Add to Home screen

Install (iPhone Safari)
  Share → Add to Home Screen

Local test
  npx --yes serve -l 5173
  Open http://(PC_IP):5173 on phone (same Wi-Fi)

Bible translation TXT files
  See README section in chat / keep large files OUT of the zip if possible.
  Load via Menu → Import in the app (saved in IndexedDB on device).
  Or host under data/ and download on first run (advanced).

Version: DB-bible_v16 (PWA)
