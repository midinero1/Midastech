# The Beauty Method

A four-page site for The Beauty Method — a boutique beauty studio.
_Enhancing your natural beauty._

Plain HTML and CSS with one small script. No build step, no dependencies, no
framework: open `index.html` or drop the folder on any static host.

```bash
# preview locally from this directory
python3 -m http.server 8080   # then visit http://localhost:8080
```

## Pages

| Page | URL | File |
| --- | --- | --- |
| Home | `/` | `index.html` |
| Treatments | `/treatments/` | `treatments/index.html` |
| Our Method | `/method/` | `method/index.html` |
| About | `/about/` | `about/index.html` |

Each is a real document with its own title, description and canonical URL, and
the directory URLs work on any static host with no redirect rules.

Links between pages are relative (`../treatments/`), so the folder also works
served from a subdirectory rather than a domain root.

## Colour

Black and gold, on white. A fully black page reads dated and makes photography
harder to place, so the canvas is white and black is spent deliberately: on
type, on the philosophy band and on the footer. Gold is a hairline, a rule and
the mark — never a large fill.

Tokens live in the `:root` block at the top of `assets/css/site.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--canvas` | `#ffffff` | page background |
| `--ivory` | `#faf7f2` | alternate bands |
| `--linen` / `--sand` | | soft panels, hairlines |
| `--ink` | `#0f0e0c` | headings, buttons, footer |
| `--slate` | `#59524a` | body copy — 7.2:1 on white |
| `--gold` | `#c9a227` | decoration: rules, borders, the mark |
| `--bronze` | `#8a6a16` | **the only gold safe as text on white** — 4.8:1 |
| `--gilt` | `#e3c77e` | gold on the dark bands |

The one rule worth keeping: `--gold` is about 2.4:1 on white, so it is for
decoration only. Gold *text* on white uses `--bronze`; on the dark bands it
uses `--gilt`.

## The logo

The mark is a single petal — drawn as one unbroken outline, the way a leaf or
a lash sits — with a fine botanical sprig growing up the inside of it and a
small gold lozenge at the tip. It carries over the line-drawn foliage from the
studio's printed menu, and the petal reads equally as a leaf, a lash and an
eye, which is the whole treatment list in one shape.

The outer petal is drawn in `currentColor` and the sprig in flat gold, so the
same mark works on white pages (ink outline) and on the black footer (gilt
outline) with no second version to maintain.

Typography is Playfair Display over letterspaced Inter, stacked `THE / BEAUTY
/ METHOD` to match the printed lockup.

The geometry lives in the `#tbm-mark` SVG symbol, defined once per page near
the top of each document. `assets/favicon.svg` is a simplified copy on the
brand's black ground — two leaf pairs instead of three, and heavier strokes,
so it still reads at 16px. **Edit both if you change the shape.**

## Editing the price list

Everything is in `treatments/index.html`. One entry looks like this:

```html
<li class="menu-item">
  <div class="menu-row">
    <span class="menu-name">Brazilian</span>
    <span class="menu-leader"></span>
    <span class="menu-price">$40</span>
  </div>
  <!-- optional -->
  <p class="menu-note">Description under the treatment.</p>
</li>
```

`menu-leader` is the row of dots between the name and the price. It stretches
on its own — nothing to adjust when a name gets longer.

## Before it goes live

Placeholders that need real content:

- **`hello@thebeautymethod.com`** — the booking address, in the footer and on
  every "Email the studio" button (4 pages).
- **Studio address and opening hours** — the footer says "to confirm" on all
  four pages rather than carrying invented details.
- **Instagram** — the footer link is `#`.
- **The About story** — `about/index.html` carries deliberately general copy
  with an HTML comment marking where the real founder, location and training
  details go. Nothing there claims a fact we have not been given.
- **`thebeautymethod.com`** — the placeholder domain in the `canonical` tags of
  all four pages.
- **The duplicate tinting line.** The printed menu lists **Eyebrow Tinting
  twice** — at `$10` and again at `$12`. Both are transcribed as supplied, with
  a comment on the second. Confirm which is right, or what the second line was
  meant to say, then correct or delete it.
- **"Before you come in"** on the treatments page is standard professional
  guidance (patch tests, hair length, polish removal). Check it matches how the
  studio actually works.

## Notes on how it is built

- **Fonts are self-hosted** in `assets/fonts` — Playfair Display and Inter,
  variable and subsetted, vendored from the Midas Technology site. No Google
  Fonts request, so a page never blocks on a third-party CDN.
- **No images.** The logo, the botanical sprigs and every icon are SVG, so they
  stay sharp at any size and cost almost nothing to load. The framed panels on
  the home, method and about pages are placeholders shaped for photography —
  replace the `.frame-motif` block with an `<img>` when the studio has shots.
- **Motion** is one `IntersectionObserver` in `assets/js/site.js` plus CSS
  transitions, all disabled under `prefers-reduced-motion`. With JavaScript off
  nothing is hidden — the fade-up only engages once the script adds `.js`.
- **The SVG sprite is repeated in each document.** These are static pages with
  no build step to share a partial, so if you change the mark or a sprig, change
  it in all four files.
