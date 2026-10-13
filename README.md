# Adv. Vishal Kotpalliwar website

One-page static site: plain HTML, CSS and JavaScript, no build step.

## Files

- `index.html` – the page
- `css/styles.css` – all styling
- `js/main.js` – mobile menu, nav highlight, disclaimer
- `assets/` – cover photo, court photo, about picture, signature logo, institution logos, site icon and the practice-area photos
- `404.html` – not-found page

## Preview locally

```bash
python3 tools/serve.py
```

Then open http://localhost:4173.

To open it on a phone on the same Wi-Fi, start it with `--lan` and visit `http://<this computer's IP>:4173`:

```bash
python3 tools/serve.py 4173 --lan
```

## Before launch

- [ ] Confirm the "100+ clients" and "95% client satisfaction" figures
- [ ] Logo files for SECR, NHAI, NH PWD and Reliance Retail, from the organisations themselves (names are text for now)
- [ ] Confirm the advocate is entitled to show the six bank and BHEL logos (trademarks; files are from Wikimedia Commons)
- [ ] Confirm the right to use the About-section picture; it is small (619 px wide) and appears to come from another website
- [ ] Domain name, then add the canonical URL, sharing image and sitemap
- [ ] Photographs for the two newest services, Motor Accident and Claims and IPR & Trade Marks (plain panels with icons for now)
- [ ] Confirm the one-line description under IPR & Trade Marks
- [ ] Confirm which office the Google directions link belongs to; send one for the other office if wanted
