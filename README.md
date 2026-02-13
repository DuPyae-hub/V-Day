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

The floating music button plays `music.mp3` in the project root. Add your own romantic instrumental file named **music.mp3** (MP3 format) to enable background music.

## Customize

- **Love letter**: Edit the text inside `#letter-modal .modal-body` in `index.html`.
- **Dates**: Love story start is 30 December 2025; birthday countdown is 17 February 2026. Both are set in `script.js` (`LOVE_DATE`, `BIRTHDAY_DATE`).

All photos are in the `assets/` folder and are already wired into the hero, gallery, and “Why I Love You” section.
