# simpli cafe — website

Three pages — home, about, contact — in **Greek and English**. Greek is the
primary language and sits at the root of the site; English lives under `/en/`,
with a ΕΛ / EN toggle in the header on every page.

White paper, black ink and oak, with frosted-glass panels floating over a very
soft warm wash: clean and Scandinavian, using translucency rather than colour
for depth. Plain HTML and CSS — no framework, and nothing to run on the server.

```bash
# preview locally
cd clients/simpli-cafe
python3 -m http.server 8099
# → http://localhost:8099
```

Use a server rather than opening `index.html` from the file system: the clean
URLs (`/about/`, `/en/`) need one to resolve to `index.html`.

## Pages

| Page | Ελληνικά | English |
| --- | --- | --- |
| Home | `/` | `/en/` |
| About | `/about/` | `/en/about/` |
| Contact | `/contact/` | `/en/contact/` |

Six real HTML documents, each with its own `<html lang>`, title, description,
canonical URL and `hreflang` alternates — which is what tells Google to serve
the Greek page to Greek searchers and the English one to a tourist.

## Editing the copy

**Edit `site.build.py`, not the HTML.** Every word on the site lives in the
`COPY` dictionary in that file, once per language, and the six pages are
generated from it:

```bash
python3 site.build.py     # rewrites all six pages, sitemap.xml and robots.txt
```

Committing the generated HTML means the site still deploys with no build step —
the script is only for you. Hand-editing a page works too, but the next run
overwrites it, so put the change in `site.build.py` instead. The two languages
share one shape, which is what stops them drifting apart.

## Things to replace before launch

Everything below is a stand-in. All of it sits in the block at the top of
`site.build.py` — change it there and rebuild. `grep -rn PLACEHOLDER .` finds
every marker.

| What | Where |
| --- | --- |
| Address (both languages) | `ADDRESS` |
| Phone | `PHONE_DISPLAY` and `PHONE_TEL` |
| Email, Instagram | `EMAIL`, `INSTAGRAM`, `INSTAGRAM_URL` |
| **What the map points at** | `MAP_QUERY` — put the real address here and both the embedded map and the "open in Google Maps" link follow |
| Opening hours | `HOURS_ROWS`, **and** `HOURS` in `assets/js/site.js`, **and** the JSON-LD in `jsonld()` — all three must agree |
| Domain (`https://simplicafe.gr`) | `SITE` |
| The story on the About page | `COPY['el']['about']` and `COPY['en']['about']` |

The JSON-LD block on the home pages is what puts a café in Google's map pack.
Keep it accurate; a wrong phone number there is worse than none.

## The design

The tokens at the top of `assets/css/site.css` drive everything:

| Token | Value | What it is |
| --- | --- | --- |
| `--bg` / `--ink` | `#ffffff` / `#101010` | paper and ink |
| `--oak` / `--oak-deep` | `#b5814f` / `#8a5c33` | the pine of the sign; the deeper one is the version that is safe as text |
| `--walnut` | `#7c4f2e` | the knot that dots the *i* |
| `--glass`, `--blur` | white at 62%, `blur(24px) saturate(180%)` | the frosted panels |

Two things make the glass read as glass rather than as grey boxes: the fixed
warm wash painted by `body::before`, and `.band-wash` behind the sections that
hold panels. Take those away and the panels flatten out.

The wordmark is rebuilt in markup rather than set as plain text — the last
letter is a dotless *ı* (U+0131) so its dot can be positioned and coloured as
the knot in the board:

```html
<span class="logo__name">simplı<span class="logo__dot"></span></span>
<span class="logo__sub">cafe</span>
```

Type is Inter throughout, which covers Greek — that is what lets both language
trees look identical. Quicksand sets the wordmark (Latin only; the name never
needs Greek) and Playfair italic sets the "Yours Simply!" signature. All three
are self-hosted in `assets/fonts/` and split by unicode-range, so a page
downloads only the subsets it uses.

## The map

`contact/index.html` embeds Google Maps with
`https://www.google.com/maps?q=<address>&output=embed` — no API key, no
account. It is the one third-party request on the site, and it only fires when
the map scrolls into view (`loading="lazy"`).

## JavaScript

`assets/js/site.js` is ~180 lines of vanilla JS and every page reads fine
without it. It adds the open/closed status (computed in Athens time, in the
page's language, so it is right for a visitor in another timezone), today's row
highlighted in the hours table, the header lifting on scroll, the
reveal-on-scroll animation and the footer year.

## Accessibility and performance

Zero axe (WCAG 2.1 AA) violations on all six pages at 1280px and 390px. Skip
link, one `<h1>` per page, landmark elements, visible focus rings, and
`prefers-reduced-motion` honoured. Body text is 11.4:1 on white.

The two photographs are the café's own and are the largest thing on the site
(~530 KB together); run them through an image compressor and add `.webp`
sources if you want the last few Lighthouse points.

## Deploying

Upload the folder. Netlify, Vercel, Cloudflare Pages, GitHub Pages or plain
nginx all serve it as-is, and the directory URLs need no redirect rules.
`site.build.py` and this README can go up with it or be left behind — they are
for you, not for visitors.

---

Built by [Midas Technology](https://midastechnology.com).
