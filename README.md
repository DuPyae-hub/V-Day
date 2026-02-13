# Our Story — Valentine's Day

A one-page Valentine's Day site with hero photo, day counter, memories gallery, love letter, and countdown.

## Run locally

Open `index.html` in a browser, or use a local server:

```bash
cd /Users/ibridge/Desktop/Vday
python3 -m http.server 8080
```

Then visit **http://localhost:8080**.

## Music

1. Add your audio file in the **project root** (same folder as `index.html`) as **music.mp3** or **music.m4a**.
2. On Mac and mobile, browsers block autoplay: **tap the music button** (bottom right) or **tap anywhere once** to start playback.
3. If you use GitHub Pages, add `music.mp3` to the repo and push so the file is served from the same origin.

## Customize

- **Love letter**: Edit the text inside `#letter-modal .modal-body` in `index.html`.
- **Dates**: Love story start is 30 December 2025; birthday countdown is 17 February 2026. Both are set in `script.js` (`LOVE_DATE`, `BIRTHDAY_DATE`).

All photos are in the `assets/` folder and are already wired into the hero, gallery, and “Why I Love You” section.
