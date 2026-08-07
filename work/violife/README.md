# Violife — concept redesign

An independent, unsolicited design study exploring how violife.com could work
on a phone. **Not affiliated with, endorsed by, or produced for Violife or
Flora Food Group.** Every product name, figure and piece of artwork here is an
illustrative placeholder. The pages are `noindex, nofollow` and are not linked
from the Midas Technology site or listed in its sitemap.

Run it with `npm run dev` and open `/work/violife/`.

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

**Glass, done properly.** `src/violife/violife.css` defines the system. The
four details that separate frosted glass from a translucent box are the
saturation boost (`saturate(180%)`, so colour blooms through instead of greying
out), the inset specular highlight along the top edge, a near-white hairline
rather than a grey one, and a shadow tight enough to read as millimetres of
lift. There is a `@supports not (backdrop-filter)` fallback to something solid
and deliberate.

**A deliberately small palette.** Two greens, a warm cream, a neutral ramp.
Colour varies per product only in the field behind the pack, and only by a
step or two. A grid of twelve products has to read as one shelf rather than a
paint chart — which is the failure mode that makes a page look machine-made.

**Light, not gradients.** Background interest comes from wide radial pools held
under 15% opacity plus a grain overlay, so it reads as a lit room rather than a
coloured wash. The only gradients in the build are inside the SVG artwork,
where they are doing the job of shading a three-dimensional object.

**One selection control.** The segmented picker is reused for product formats,
recipe times and store filtering rather than inventing a filter bar, a tab
strip and a category menu that all do the same job three different ways. Its
indicator is measured off the live DOM, so it survives any number of options
and any label length.

## Artwork

Everything is drawn in `src/violife/art.jsx` — packs three-quarter with a fixed
top-left light source, dishes flat top-down, one 24px icon grid. Nothing here
pretends to be a photograph of a product that exists, which is the right call
for spec work regardless, and it keeps the whole range at a few kilobytes.

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
