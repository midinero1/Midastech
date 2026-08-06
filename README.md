# Midas Technology — marketing site

A single-page React (Vite) + Tailwind CSS site: custom websites and companion
apps for cafés, restaurants and local shops.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the build on http://localhost:4173
```

## The things you will want to change

Nearly all copy and settings live in **`src/content.js`** — you should not need
to open a component to edit the site's words.

| What | Where |
| --- | --- |
| Email and phone | `CONTACT` in `src/content.js` — **currently placeholders** |
| Which logo the site uses | `ACTIVE_LOGO` (`'ascent'`, `'circuit'` or `'crest'`) |
| Which headline the hero uses | `ACTIVE_HEADLINE` (`0`, `1` or `2`) |
| Hero subheading | `SUBHEAD` |
| The three stats under the hero | `PROOF` |
| Philosophy principles | `PRINCIPLES` |
| Service cards | `SERVICES` |
| Social links | `SOCIALS` in `src/components/Footer.jsx` — all `#` placeholders |

### Picking a logo

Run `npm run dev` and open **`/logos.html`**. It shows all three marks at
display size, as a navbar lockup, at favicon sizes (32/24/16px) and on a cream
background for print. Set `ACTIVE_LOGO` to the one you want and the navbar,
footer and favicon follow.

- **Ascent** — the M as one continuous rising line; a monogram that is also a
  growth chart, with a soft sun behind the higher peak. Currently active.
- **Circuit** — same geometry, engineered: mitred corners and three node
  squares at the peaks and the valley.
- **Crest** — a solid M inside a double-hairline seal. The most formal option
  and the strongest as a stamp on invoices and cards.

If you change the active logo, update `public/favicon.svg` to match — it is a
standalone copy of the Ascent mark on a rounded dark tile.

### Headline options

```
0. We turn your business into *gold* online.
1. Small business. *Golden* first impression.
2. The website your regulars *already believe* you have.
```

The starred word renders in the gold gradient.

## The contact form

Front-end only, as specified. It validates every field, marks errors inline
and on `aria-invalid`, focuses the first problem on a failed submit, and shows
a personalised success panel. **It does not send anything yet.**

To make it live, replace the `setSent(true)` line in
`src/components/Contact.jsx` with a POST to a form service (Formspree, Basin,
Netlify Forms) or your own endpoint. The success state is already wired, so
you only need to swap that one call.

## Notes on how it is built

- **Fonts are self-hosted** in `public/fonts` (Playfair Display for display
  type, Inter for body — both variable, latin + latin-ext subsets). No Google
  Fonts request, so the site never blocks on a third-party CDN. That is what
  makes the "under 2s" claim on the page safe to keep.
- **No images anywhere.** The logo, every icon and the hero product mock are
  drawn in SVG and CSS, so they stay sharp at any size and cost almost nothing
  to load.
- **Motion** is a single `IntersectionObserver` in `src/components/Reveal.jsx`
  plus CSS transitions. Everything is disabled under
  `prefers-reduced-motion: reduce`.
- **Dependencies** are React, Vite and Tailwind. Nothing else.

## Deploying

`npm run build` produces a fully static `dist/`. Drop it on Netlify, Vercel,
Cloudflare Pages or any static host — no server needed. Delete `logos.html`
and the `logos` entry in `vite.config.js` once you have chosen a mark and you
do not want the picker published.
