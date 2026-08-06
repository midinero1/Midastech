# Midas Technology — marketing site

A four-page React (Vite) + Tailwind CSS site: custom websites and companion
apps for cafés, restaurants and local shops.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the build on http://localhost:4173
```

## Pages

| URL | Document | Component |
| --- | --- | --- |
| `/` | `index.html` | `src/pages/Home.jsx` |
| `/services/` | `services/index.html` | `src/pages/Services.jsx` |
| `/about/` | `about/index.html` | `src/pages/About.jsx` |
| `/contact/` | `contact/index.html` | `src/pages/Contact.jsx` |

These are four real HTML documents, not client-side routes. Each one carries
its own `<title>`, meta description and canonical URL, which is what search
engines actually index — a single-page router would have given all four pages
the same one. It also means the clean `/services/` URLs work on any static
host with no redirect rules, and there is no routing library to keep patched.

React and the shared CSS are one cached chunk across all four pages, so after
the first visit each page costs only 1.5–3 KB.

To add a page: create `newpage/index.html` (copy an existing one and change
the title, description, canonical and entry path), add
`src/entries/newpage.jsx` and `src/pages/NewPage.jsx`, register the input in
`vite.config.js`, and add it to `NAV` in `src/content.js`.

## The things you will want to change

Nearly all copy and settings live in **`src/content.js`** — you should not need
to open a component to edit the site's words.

| What | Where |
| --- | --- |
| Email and phone | `CONTACT` — **currently placeholders** |
| Nav links | `NAV` |
| Which headline the hero uses | `ACTIVE_HEADLINE` (`0`, `1` or `2`) |
| Hero subheading | `SUBHEAD` |
| The three stats under the hero | `PROOF` |
| Philosophy principles | `PRINCIPLES` |
| Services, in full | `SERVICES` |
| The four-step process | `PROCESS` |
| "Always included" list | `INCLUDED` |
| About story, pull quote, promises | `ABOUT` |
| Social links | `SOCIALS` in `src/components/Footer.jsx` — all `#` placeholders |

### Headline options

```
0. We turn your business into *gold* online.
1. Small business. *Golden* first impression.
2. The website your regulars *already believe* you have.
```

The starred word renders in the gold gradient.

## The logo

The mark is a geometric M with deliberately asymmetric peaks — the right
shoulder rises higher than the left, so the silhouette reads as an ascent as
well as a monogram. It is drawn as four separate facets rather than one flat
shape: the falling stroke and the tall right stem catch the light, the left
stem and the rising stroke fall into shadow. That alternation is what makes it
look like struck metal instead of a bold font weight, and the chiselled cuts
across the tops of both stems are what stop it reading as a typed letter.

A soft disc sits behind the taller shoulder — a sunrise. It is the only part
that fades out at small sizes, which is deliberate: the silhouette carries the
mark down to a 16px favicon on its own.

`<LogoMark variant="dark" />` switches to the brighter gradient set for use on
the espresso bands. `src/components/Logo.jsx` holds the geometry;
`public/favicon.svg` is a standalone copy of the same paths — edit both if you
change the shape.

## Colour

A warm ivory canvas with bronze and gold accents, and deep espresso bands for
contrast. Gold is the accent, never the whole room. Tokens are defined in the
`@theme` block at the top of `src/index.css`.

| Token | Use |
| --- | --- |
| `canvas` `#FBF9F4` | page background |
| `porcelain` / `linen` / `sand` | cards, alternate bands, hairlines |
| `ink` `#14110D` | headings, dark bands, primary buttons |
| `slate` `#5E564A` | body copy — 6.9:1 on canvas |
| `bronze` `#8A6A16` | **gold that is safe as text** — 4.8:1 on canvas |
| `gold` `#C9A227` | decorative fills, rules, borders |
| `gilt` `#E4C868` | highlights and gold on the dark bands |

One rule worth keeping: `gold` is only 2.3:1 on the ivory canvas, so it is for
decoration. Any gold *text* on a light background uses `bronze`; on the
espresso bands it uses `gilt`.

## The contact form

Front-end only, as specified. It validates every field, marks errors inline
and via `aria-invalid`, moves focus to the first problem on a failed submit,
and shows a personalised success panel. **It does not send anything yet.**

To make it live, replace the `setSent(true)` line in
`src/pages/Contact.jsx` with a POST to a form service (Formspree, Basin,
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
- **Motion** is one `IntersectionObserver` in `src/components/Reveal.jsx` plus
  CSS transitions, and a page fade-in on load so navigation between documents
  feels continuous. Everything is disabled under
  `prefers-reduced-motion: reduce`.
- **Dependencies** are React, Vite and Tailwind. Nothing else — `npm audit`
  reports zero vulnerabilities.

## Deploying

`npm run build` produces a fully static `dist/` with the directory structure
already in place. Drop it on Netlify, Vercel, Cloudflare Pages or any static
host — no server, no SPA fallback, no redirect rules needed.
