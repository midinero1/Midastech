# Violife — concept redesign

An independent, unsolicited design study exploring how violife.com could work
on a phone. **Not affiliated with, endorsed by, or produced for Violife or
Flora Food Group.** The pages are `noindex, nofollow`, are not linked from the
Midas Technology site, and are absent from its sitemap.

Run it with `npm run dev` and open `/work/violife/` (Greek) or
`/work/violife/en/` (English).

## What was actually assessed

The live site cannot be loaded from the machine this was built on —
`violife.com` and `www.violife.com` are both blocked by the network egress
proxy here. The critique therefore rests on what is externally verifiable: the
page inventory and URL structure exposed through search indexes, and the
navigation taxonomy.

One screenshot of a Greek product page has since been supplied, which
confirmed the charcoal/cyan/cream palette and the ingredients-and-nutrition
accordion pattern this concept now follows. Everything else about the current
visual design remains unseen, so any claim about how the rest of the live site
looks should still be treated as unverified.

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

Five product shots and two dish photographs have been supplied for this study.
They are used where they exist. The rest of the range is drawn in `art.jsx` in the
same livery — charcoal pack, white wordmark, cyan "100% vegan" line, cream
flavour name, cyan free-from lozenge — so a grid mixing the two still reads as
one shelf. Two details make that work: every pack sits on the same neutral
field, and drawn art gets a scale correction, because a photograph is cropped
tight to the pack while a drawn artboard carries margin the photograph does not.

The wordmark on the drawn packs is set in the site's own typeface — those packs
are placeholders, not replicas.

The real script logotype does appear, once, on the language picker. It was
lifted from the grated pouch shot rather than traced: it is white script and a
cyan line printed on flat charcoal, so alpha comes from distance to the
background rather than from luminance — a luminance key would half-erase the
cyan, which is darker than the white but just as opaque — and the colour is
then unpremultiplied back to full strength, or every antialiased edge keeps a
charcoal fringe and the mark looks dirty over a light photograph. The chrome
keeps the plain typeface version, which stays legible at sizes the script
would not survive.

The supplied shots were flood-filled from the frame edge to lift their flat
backgrounds — a threshold over the whole image would have eaten the cream
lettering and the pale cheese inside the pack — then feathered, trimmed, padded
to a square artboard and encoded to WebP. One source was a screenshot carrying
a scrollbar at its right edge, which survived the fill and then dominated the
bounding box; it is pre-cropped. See the script in the commit history.

## Languages

Greek is the primary language and holds the clean URLs; English sits under
`/work/violife/en/` and is one tap away in the top bar of every page, carrying
you to the same page rather than dumping you on the home page. `x-default`
points at English — it is the fallback for a visitor whose language matches
neither, and a good share of them are reading from abroad.

Violife is a Greek brand, so the Greek is written rather than translated: the English plays on
"undairy", which has no Greek equivalent, so the campaign word stays in Latin
script the way brand lines usually do on Greek packaging and the sentences
around it are built fresh. Flavour names stay in Latin script too, which is how
they are printed and how people ask for them in a shop.

Structure and copy are separated — `data.js` holds ids, formats and asset
paths, `copy/en.js` and `copy/el.js` hold everything a human reads. Add a
product and both dictionaries fail loudly on the missing key rather than
silently rendering English.

### The first-visit picker

`LanguagePicker.jsx` shows once, on a visitor's first arrival, over a
photograph. Two things keep it from being the usual interstitial nuisance: it
never appears again once a choice is stored, and it guesses — the browser
already knows what language the visitor reads, so that option is sorted to the
top, ringed, and given focus. A Greek visitor presses Enter or taps the row
their eye lands on first.

Its copy cannot come from the dictionaries. At the moment it renders the
visitor has not said what they read, and showing "Choose your language" in
Greek to somebody who does not read Greek is the problem the component exists
to solve — so the heading is bilingual and each option is written in its own
language, which is the one rule of a language chooser worth never breaking.

Adding a language means adding a row to `LOCALES` and a dictionary. The picker
lays itself out from that list.

Choosing the language you are already reading closes the panel without a
navigation. Escape does the same and still records the choice, so dismissing
it is not punished with the panel coming back.

A stored preference deliberately does **not** redirect a later visit. Someone
who lands on a Greek URL from a Greek search result should get the Greek page,
not be bounced somewhere else by a month-old click; the top-bar switch is
right there.

One caveat for when more languages arrive: flags are countries, not languages.
🇬🇧 for English already glosses over most of the people who read it, and the
problem gets worse with Spanish or Portuguese. They are here because they make
the two current options recognisable at a glance, which was the point. Past
three or four languages, drop to native names alone.

## Ingredients and nutrition

Each product carries two disclosures, matching the pattern the live site
already uses: a hairline rule, the label, and a cyan plus that becomes a
minus. Collapsed by default.

Where a real ingredient declaration has been supplied it is printed
**verbatim** — not reflowed, not reordered, not translated. The order of a
declaration is itself regulated information, and translating an allergen line
is not something to do from memory. Products without one fall back to the
claims common to the whole range, with a note saying the full declaration is
not reproduced here.

Nutrition tables render their full row structure with values dashed out. No
product has figures yet. Add a `nutrition` key to a product in `data.js` and
the table fills itself in and the note disappears.

The same discipline applies to range-wide claims. Vitamin B12 was stated
across the range until the Parmesan Style declaration arrived without it, so
the claim was narrowed; "free from preservatives" became "free from
artificial preservatives" once packs using the weaker wording appeared. A
range-wide claim can only be as strong as the weakest pack in the range.

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
