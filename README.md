# Midas Technology — marketing site

A bilingual (English / Ελληνικά) four-page React (Vite) + Tailwind CSS site:
custom websites and companion apps for cafés, restaurants and local shops.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the build on http://localhost:4173
```

## Pages

English sits at the root, Greek under `/el/`. Eight documents in all.

| Page | English | Ελληνικά | Component |
| --- | --- | --- | --- |
| Home | `/` | `/el/` | `src/pages/Home.jsx` |
| Services | `/services/` | `/el/services/` | `src/pages/Services.jsx` |
| About | `/about/` | `/el/about/` | `src/pages/About.jsx` |
| Contact | `/contact/` | `/el/contact/` | `src/pages/Contact.jsx` |

These are real HTML documents, not client-side routes. Each carries its own
`<html lang>`, title, description, canonical URL and `hreflang` alternates —
which is what search engines actually index, and what tells Google to serve
the Greek page to Greek searchers. A single-page router would have given all
eight the same metadata. It also means the clean URLs work on any static host
with no redirect rules, and there is no routing library to keep patched.

React and the shared CSS are one cached chunk across every page, so after the
first visit each page costs only 2–3 KB plus its language dictionary.

## Editing the copy

All text lives in two dictionaries with identical shapes:

- `src/i18n/en.js`
- `src/i18n/el.js`

Nothing else needs opening to change a word. If you add a key to one, add it
to the other — a missing key renders as blank, not as a fallback.

| What | Where (in both files) |
| --- | --- |
| Page titles and meta descriptions | `meta` |
| Nav labels | `nav` |
| Buttons and shared labels | `ui` |
| Hero headline, subheading, stats | `hero` |
| The phone/browser mock's contents | `showcase` |
| Philosophy principles | `principles` |
| Services, in full | `services` |
| Home page section headings | `home` |
| Services page process and included list | `servicesPage` |
| About story, pull quote, promises | `aboutPage` |
| Contact copy, form labels, validation messages | `contactPage` |
| Closing band on each page | `cta` |

Things that are **not** translated live in `src/i18n/locales.js`: the email
and phone (`CONTACT`), the URL scheme, and `ACTIVE_HEADLINE` — which of the
three hero headlines is live (`0`, `1` or `2`; both languages have all three).

Social links are `#` placeholders in `src/components/Footer.jsx`.

### Adding a language

1. Copy `src/i18n/en.js` to `src/i18n/<code>.js` and translate it.
2. Add `{ code, short, label }` to `LOCALES` in `src/i18n/locales.js`.
3. Add the code to `LANGS` in `vite.config.js`.
4. Create `<code>/index.html` and `<code>/{services,about,contact}/index.html`
   plus the matching `src/entries/<code>-*.jsx` (copy the `el` ones and swap
   the code — they are four lines of difference each).
5. If the script is not Latin or Greek, check the font coverage first — see
   below.

### Greek typography

**Playfair Display has no Greek glyphs**, so Greek headings would otherwise
fall back to a system serif and look broken. Greek headings are served by
**Noto Serif Display** — the closest match in the same high-contrast Didone
genre, with real italics and matching variable weights. It is declared under
the `'Playfair Display'` family name with a Greek `unicode-range`, so the
browser picks the right face per character and no component has to know which
language it is rendering. Those files download only on pages containing Greek.

Inter covers Greek natively, so body text needed no substitute.

Setting `<html lang="el">` also makes browsers apply Greek casing rules, which
is why the uppercase eyebrows read `ΙΣΤΟΣΕΛΙΔΕΣ` and not `ΙΣΤΟΣΕΛΊΔΕΣ` —
Greek drops accents in uppercase.

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

`<LogoMark variant="dark" />` switches to the brighter gradient set for the
espresso bands. `src/components/Logo.jsx` holds the geometry;
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
and shows a personalised success panel — all in whichever language the page
is in.

To make it live, replace the `setSent(true)` line in `src/pages/Contact.jsx`
with a POST to a form service (Formspree, Basin, Netlify Forms) or your own
endpoint. The success state is already wired, so you only need to swap that
one call.

## Notes on how it is built

- **Fonts are self-hosted** in `public/fonts` — Playfair Display and Inter for
  Latin, Noto Serif Display and Inter for Greek, all variable and subsetted.
  No Google Fonts request, so the site never blocks on a third-party CDN. That
  is what makes the "under 2s" claim on the page safe to keep.
- **No images anywhere.** The logo, every icon and the hero product mock are
  drawn in SVG and CSS, so they stay sharp at any size and cost almost nothing
  to load.
- **Motion** is one `IntersectionObserver` in `src/components/Reveal.jsx` plus
  CSS transitions, and a page fade-in on load so moving between documents
  feels continuous. All of it is disabled under `prefers-reduced-motion`.
- **Dependencies** are React, Vite and Tailwind. Nothing else — `npm audit`
  reports zero vulnerabilities.

## Deploying

`npm run build` produces a fully static `dist/` with the directory structure,
`sitemap.xml` and `robots.txt` already in place. Drop it on Netlify, Vercel,
Cloudflare Pages or any static host — no server, no SPA fallback, no redirect
rules needed.

Update the domain in `public/sitemap.xml`, `public/robots.txt` and the
`canonical`/`og:url`/`hreflang` tags in the eight `index.html` files when you
have the real one — they currently point at `midastechnology.com`.

## Client sites

`clients/` holds the sites we build for other people. Each one is
self-contained and ships on its own domain — nothing under `clients/` is part
of this site's Vite build or its `dist/`.

| Client | Folder | Stack |
| --- | --- | --- |
| simpli cafe | [`clients/simpli-cafe/`](clients/simpli-cafe/) | Static HTML + CSS, no build step |
