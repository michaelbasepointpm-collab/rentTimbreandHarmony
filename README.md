# Harmony — 1451 East 12th Avenue

A single-page leasing website for **Harmony**, an affordable rental building by
**Brightside Community Homes Foundation**, managed by **Basepoint Real Estate Group**.

Located in Vancouver's Grandview-Woodland neighbourhood, steps from Commercial Drive
("The Drive"), the Commercial–Broadway SkyTrain, Clark Park and Trout Lake.

Built as a static site (HTML / CSS / vanilla JS) — no build step, ready for GitHub Pages.

---

## Project structure

```
.
├── index.html                 # The full one-page site
├── css/
│   └── styles.css             # All styling (Brightside brand system)
├── js/
│   └── main.js                # Nav, scroll-reveal, image lightbox
├── assets/
│   └── images/                # All photography, renders, floor plans, logos
├── docs/                      # Reference material (not part of the live site)
│   ├── brightside-branding-kit.txt
│   └── brightside-reference-page.html
└── README.md
```

## Run locally

Just open `index.html` in a browser. For a local server (recommended so the map/fonts load cleanly):

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Deploy to GitHub Pages

1. Create a new GitHub repository and push this folder to it.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**,
   branch **main**, folder **/ (root)**, then **Save**.
4. Your site publishes at `https://<your-username>.github.io/<repo-name>/`.

## Editing the content

Everything is plain HTML in `index.html`. Common updates:

| What | Where |
|------|-------|
| Rent / unit availability | `#residences` section — the `.unit` cards |
| Photo popups (galleries) | Two shared sets live in the `GALLERIES` object in `js/main.js`: `suite` (images in `assets/images/suite/`, used by 304 & 402) and `studio` (`assets/images/studio/`, used by 110 & 111). A unit's button opens a set via `data-gallery="suite|studio"`. |
| Adding photos to unit 309 | 309 currently shows a disabled "Photos coming soon" button. When its photos arrive, add them under `assets/images/`, create a new set in `GALLERIES` (e.g. `oneBedEast`), and replace 309's `<button disabled>` with `<button class="btn btn--secondary unit__photos-btn" data-gallery="oneBedEast">…View photos</button>`. Its floor plan can be added as a third card in the Floor Plans section. |
| Floor plans | `#floorplans` section + images in `assets/images/` |
| Amenities | `#amenities` section — the `.amenity-list` |
| Neighbourhood points of interest | `#neighbourhood` — the `.poi-list` |
| Leasing contact (WhatsApp / email) | `#contact` section and the footer — WhatsApp `wa.me/16042131171`, email `michael@basepointpm.com` |
| Brand colours & fonts | CSS variables at the top of `css/styles.css` |

### Adding per-unit videos (later)

Each unit will get its own embedded YouTube walkthrough. Inside a unit card in
`#residences` (e.g. Home 304), add an embed above or below the price block:

```html
<div style="position:relative; aspect-ratio:16/9; border-radius:12px; overflow:hidden;">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID"
          style="position:absolute; inset:0; width:100%; height:100%; border:0;"
          allowfullscreen title="Home 304 tour"></iframe>
</div>
```

## Notes / to review

- **No API keys.** This site uses no Google (or other) API keys. The map is a keyless
  `google.com/maps?...&output=embed` iframe, and fonts load from Google Fonts. A client
  Google Maps key had leaked via a saved copy of Brightside's page (`docs/brightside-reference-page.html`),
  which has been **deleted** from this project. That key is Brightside's and must be
  rotated/restricted in their Google Cloud console — and note it may still exist in older
  git history, so history should be scrubbed or the repo recreated.
- **Contact CTAs** ("Book a Viewing", "Enquire about…", contact buttons) go to
  WhatsApp/text `(604) 213-1171` and email `michael@basepointpm.com`. Zumper is used
  only as the external listing, not as a call-to-action on this site.
- **`assets/images/clark-park.jpg`** shows an outdoor movie night but carries a
  third-party ("ucd") logo — confirm licensing or replace with a genuine Clark Park photo.
- **Neighbourhood name:** Zumper lists the address as Kensington-Cedar Cottage; this site
  uses **Grandview-Woodland** to match Brightside's official page. Confirm which is preferred.
- Photography and the Brightside logo are © their respective owners; ensure you have rights
  to publish before going live.

---

© Brightside Community Homes Foundation · Leasing by Basepoint Real Estate Group
