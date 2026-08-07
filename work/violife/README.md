# Violife — concept redesign

An independent, unsolicited design study exploring how violife.com could work
on a phone. **Not affiliated with, endorsed by, or produced for Violife or
Flora Food Group.** The pages are `noindex, nofollow`, are not linked from the
Midas Technology site, and are absent from its sitemap.

Run it with `npm run dev` and open `/work/violife/` (English) or
`/work/violife/el/` (Greek).

## What was actually assessed

The live site could not be loaded from the machine this was built on —
`violife.com` and `www.violife.com` are both blocked by the network egress
proxy here. The critique behind this concept therefore rests on what is
externally verifiable: the page inventory and URL structure exposed through
search indexes, the navigation taxonomy, and the locale sprawl. It is **not**
based on a firsthand look at the current visual design, and any claim about
how the live site looks should be treated as unverified.

What that evidence does support:

- **Four overlapping recipe taxonomies.** "Dairy-Free Recipes", "Vegan Meals",
  "Vegetarian Recipes" and "Gluten-Free Recipes" are separate destinations on a
  site where the entire range is already all four things. They sort nothing
  from nothing. This concept filters recipes by **time**, which is the
  constraint a person on a phone at 6pm actually has.
- **A dozen products spread across six category pages.** Comparing a block
  against a grated bag costs two navigations and a back button. Here the whole
  range is one page with a filter that works in place.
- **Campaign landing pages accumulating at the top level** (`/americahasvoted`,
  the various "Undairy" microsites). Each one is a page that must be
  maintained, indexed and eventually orphaned. The concept has four
  destinations and no campaign layer.

## The design

**Four destinations.** Range, Recipes, Find, plus the story. That is the whole
site. Anything that cannot justify a slot in a four-tab bar does not need to be
top-level navigation.

**Navigation moves to the thumb.** On touch the primary navigation is a
frosted tab bar pinned to the bottom of the viewport, inside the thumb arc,
with the top bar reduced to identity and hiding on scroll-down. On a pointer
device it is a floating glass capsule at the top instead. Same information,
two different hands.

**The palette is taken off the packaging, not invented.** Charcoal `#474B4F`,
cyan `#42C6D2` and cream `#F6DFA5`, sampled from the supplied pack shots. Cyan
is bright enough to be an accent and nowhere near dark enough to be text on a
light ground, so it splits: `cyan` for fills and for type on the ink sections,
a darker `teal` wherever it has to be readable against canvas. All three ink
tones pass AA on the page background.

**Glass, done properly.** `src/violife/violife.css` defines the system. The
four details that separate frosted glass from a translucent box are the
saturation boost (`saturate(180%)`, so colour blooms through instead of greying
out), the inset specular highlight along the top edge, a near-white hairline
rather than a grey one, and a shadow tight enough to read as millimetres of
lift. There is a `@supports not (backdrop-filter)` fallback to something solid
and deliberate, and a `.glass-photo` variant that carries more body — 58%
opacity is enough over flat colour but not over a busy photograph, where the
blur softens the picture without ever lifting the contrast of the text on it.

**Light, not gradients.** Background interest comes from wide radial pools held
under 15% opacity plus a grain overlay, so it reads as a lit room rather than a
coloured wash. The only gradients in the build are inside the SVG artwork,
where they are shading a three-dimensional object.

**One selection control.** The segmented picker is reused for product formats,
recipe times and store filtering rather than inventing a filter bar, a tab
strip and a category menu that all do the same job three different ways. Its
indicator is measured off the live DOM, so it survives any number of options
and a Greek label half again as long as its English counterpart.

## Photography and drawn packs

Three product shots and two dish photographs were supplied for this study. They
are used where they exist. The rest of the range is drawn in `art.jsx` in the
same livery — charcoal pack, white wordmark, cyan "100% vegan" line, cream
flavour name, cyan free-from lozenge — so a grid mixing the two still reads as
one shelf. Two details make that work: every pack sits on the same neutral
field, and drawn art gets a scale correction, because a photograph is cropped
tight to the pack while a drawn artboard carries margin the photograph does not.

The wordmark on the drawn packs is set in the site's own typeface. This concept
does not trace or reproduce the brand's registered script logotype.

The supplied shots were flood-filled from the frame edge to lift their flat
backgrounds — a threshold over the whole image would have eaten the cream
lettering and the pale cheese inside the pack — then feathered, trimmed, padded
to a square artboard and encoded to WebP. One source was a screenshot carrying
a scrollbar at its right edge, which survived the fill and then dominated the
bounding box; it is pre-cropped. See the script in the commit history.

## Languages

English at `/work/violife/`, Greek under `/work/violife/el/`, mirroring the
parent site's rule so both get a real indexable address. Violife is a Greek
brand, so the Greek is written rather than translated: the English plays on
"undairy", which has no Greek equivalent, so the campaign word stays in Latin
script the way brand lines usually do on Greek packaging and the sentences
around it are built fresh. Flavour names stay in Latin script too, which is how
they are printed and how people ask for them in a shop.

Structure and copy are separated — `data.js` holds ids, formats and asset
paths, `copy/en.js` and `copy/el.js` hold everything a human reads. Add a
product and both dictionaries fail loudly on the missing key rather than
silently rendering English.

## Notes for a real build

- Product detail is a bottom sheet rather than a page, because this brand does
  not sell direct — the useful path is a quick look and a route to a shelf. A
  production build would still want one indexable document per product; the
  parent site's `vite.config.js` already demonstrates that pattern.
- The store locator map is a schematic. A real build drops in a map provider
  and reads stock from retailer feeds, falling back to "call ahead".
- The sheet is portalled to `<body>`. `position: fixed` resolves against the
  nearest ancestor carrying a transform, filter or running animation, and
  `<main>` has the page-load animation — rendered inline, the sheet anchors to
  the document instead of the viewport and lands off-screen.
- The rail-to-grid switch uses its own media query rather than
  `rail lg:grid`, because both would be utilities setting `display` and the
  winner would come down to the order Tailwind happens to emit them in.
