# Rice Student Venture Fund website

A single-page scrolling site for RSVF. Static HTML, CSS, and vanilla JavaScript.
No build step, no dependencies, no framework. Open `index.html` and it runs.

Built on the RSVF design system: RSVF Blue `#23528F`, Deep Space `#0A1628`,
Signal Teal `#57BBB9`, Space Grotesk / Inter / JetBrains Mono.

---

## Updating content

**Almost everything you will want to change lives in one file: `assets/js/data.js`.**

### Add a portfolio company

1. Drop the logo in `assets/img/portfolio/` (PNG or SVG, ideally a horizontal
   lockup on a transparent background).
2. Add a block to the `PORTFOLIO` array in `assets/js/data.js`:

```js
{
  name: "Company name",
  sector: "Energy",              // Energy | Healthcare | Consumer | Enterprise
  stage: "Pre-seed",
  location: "Houston, TX",
  blurb: "One or two sentences on what they do.",
  url: "https://example.com",
  logo: "assets/img/portfolio/example.png"
}
```

The card, the sector filter, and the scrolling logo bar at the top all update
on their own. Leave `logo` out and the card falls back to the company name set
in type, which still looks correct.

If you add a sector beyond the four, add a matching button in `index.html`:

```html
<button class="filter" data-filter="YourSector">Your sector</button>
```

### Update the team

Edit the `TEAM` array in `assets/js/data.js`. Groups render in the order listed.

```js
{ name: "First Last", role: "Director, Energy", sector: "Energy" }
```

- **Headshots:** drop a square image in `assets/img/team/` and add
  `photo: "assets/img/team/first-last.jpg"`. Without one, the card shows a
  monogram tile, which is the intended placeholder.
- **Open roles:** set `tba: true` and leave `name` empty. The card renders as a
  dashed "Open seat" tile.

---

## Local preview

```bash
cd ~/Documents/Projects/rsvf-website && python3 -m http.server 8000
```

Then open http://localhost:8000

Opening `index.html` directly from Finder also works.

---

## Publishing to GitHub Pages

```bash
cd ~/Documents/Projects/rsvf-website
git remote add origin https://github.com/<org>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch →
`main` / `(root)` → Save.** The site goes live at
`https://<org>.github.io/<repo>/` in a minute or two.

To point `ricestudentventurefund.com` at it, add a `CNAME` file containing the
bare domain at the repo root, then set the custom domain under Settings → Pages.

---

## Structure

```
index.html                    all page content and section markup
assets/css/style.css          design tokens at the top, then components
assets/js/data.js             portfolio + team content  <- edit this
assets/js/main.js             rendering, filters, nav, reveals, starfield
assets/img/logos/             RSVF owl and lockups
assets/img/portfolio/         portfolio company logos
assets/img/team/              headshots (empty for now)
```

## Notes

- The contact form composes a `mailto:` to riceventurefund@gmail.com. A static
  site cannot process form posts. For a real inbox, point it at Formspree or
  Netlify Forms.
- The hero starfield runs at 30fps and pauses when scrolled out of view.
- Everything respects `prefers-reduced-motion`.
