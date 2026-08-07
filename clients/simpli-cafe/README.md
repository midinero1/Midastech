# simpli cafe — website

A four-page website for simpli cafe, designed from the shopfront: the hand-cut
pine sign, its routed black lettering and knot-brown dot, the yellow slatted
shutter and the black-and-white striped awning.

Plain HTML and CSS. No framework, no build step, no dependencies — the folder
you are looking at *is* the website. Drop it on any static host and it works.

```bash
# preview locally
cd clients/simpli-cafe
python3 -m http.server 8099
# → http://localhost:8099
```

Use a server rather than opening `index.html` from the file system: the clean
URLs (`/menu/`, `/about/`, `/contact/`) need one to resolve to `index.html`.

## Pages

| Page | URL | File |
| --- | --- | --- |
| Home | `/` | `index.html` |
| Menu | `/menu/` | `menu/index.html` |
| About us | `/about/` | `about/index.html` |
| Contact | `/contact/` | `contact/index.html` |

Each is a real HTML document with its own title, description, canonical URL and
Open Graph image, which is what search engines and link previews actually read.

## The design

Everything is driven by the tokens at the top of `assets/css/site.css`:

| Token | Value | Taken from |
| --- | --- | --- |
| `--sun` | `#f6b60b` | the slatted shutter beside the door |
| `--knot` | `#92472a` | the knot in the board that dots the *i* |
| `--honey` | `#d09442` | the pine of the sign itself |
| `--ink` | `#17150f` | the routed lettering |
| `--paper` / `--cream` | `#fbf8f1` / `#f3ecdf` | the painted wall |

Change a token and it changes everywhere. Two motifs recur: the awning
(`.awning`, diagonal black-and-cream stripes) and the shutter (`.slats`, the
yellow-and-dark bars tucked behind each photo) — both drawn in CSS, no images.

The wordmark is rebuilt in HTML rather than set as plain text. The last letter
is a dotless *ı* (U+0131) so its dot can be positioned and coloured as the knot:

```html
<span class="logo__name">simplı<span class="logo__dot"></span></span>
<span class="logo__sub">cafe</span>
```

Type is Quicksand (the rounded geometric that matches the "cafe" lettering) over
Inter for body copy. Both are self-hosted in `assets/fonts/` and split by
unicode-range, so a page downloads only the subsets it uses — and Greek menu
names fall through to Inter, which covers them.

## Things to replace before launch

Everything below is a stand-in written to show the shape of the page. Each one
is marked with a `PLACEHOLDER` comment in the source; `grep -rn PLACEHOLDER .`
lists them all.

| What | Where |
| --- | --- |
| Address, phone, email, Instagram | every page's footer, plus `contact/index.html` |
| Opening hours | `contact/index.html` table, `HOURS` in `assets/js/site.js`, and the JSON-LD in `index.html` — **all three must agree** |
| The whole menu and its prices | `menu/index.html` |
| The story on the About page | `about/index.html` |
| Domain (`https://simplicafe.gr`) | canonical + Open Graph tags on all four pages, `sitemap.xml`, `robots.txt` |
| Google Maps link | `contact/index.html` — swap the search query for the café's own Maps link |

The JSON-LD block in `index.html` is what puts a café in Google's map pack.
Keep it accurate; a wrong phone number there is worse than none.

## The contact form

A static site has no backend, so the form hands a validated message to the
visitor's mail client. `assets/js/site.js` builds the `mailto:`; the
`action="mailto:…"` on the form itself is the fallback when JavaScript is off.

To send properly instead, point the form at a form service — with
[Formspree](https://formspree.io), that is one attribute:

```html
<form class="form" data-contact-form action="https://formspree.io/f/YOUR_ID" method="post">
```

…and delete the `event.preventDefault()` branch in `contactForm()` so the
browser submits normally. The client-side validation and the honeypot field
(`name="company"`, hidden from people, catnip for bots) are worth keeping either
way. Netlify Forms works the same way with `netlify` on the `<form>` tag.

## JavaScript

`assets/js/site.js` is ~200 lines of vanilla JS and every page reads fine
without it. It adds: the open/closed status (computed in Athens time, so it is
right for a visitor in another timezone), today's row highlighted in the hours
table, the header's shadow on scroll, the reveal-on-scroll animation, form
validation and the footer year.

## Accessibility and performance

Skip link, one `<h1>` per page, landmark elements, labelled form fields with
`aria-live` errors, visible focus rings, and `prefers-reduced-motion` honoured.
Body text is 7.4:1 on the page background. No third-party requests at all —
fonts, styles, scripts and images are all served from this folder.

The two photographs are the café's own. They are the largest thing on the site
(~530 KB together); if you want the last few points of Lighthouse, run them
through an image compressor and add `.webp` sources.

## Deploying

Upload the folder. That is the whole procedure — Netlify, Vercel, Cloudflare
Pages, GitHub Pages or plain nginx all serve it as-is, and the directory URLs
need no redirect rules.

---

Built by [Midas Technology](https://midastechnology.com).
