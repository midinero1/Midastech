/**
 * Structure only — no prose.
 *
 * Everything a human reads lives in `copy/en.js` and `copy/el.js`, keyed by
 * the ids below. Keeping the two apart is what stops a translation drifting
 * out of sync with the range: add a product here and both dictionaries fail
 * loudly on the missing key rather than silently rendering English.
 *
 * `photo` points at a real supplied product shot. Where it is absent the
 * pack is drawn in `art.jsx` in the same livery, and `label` is the flavour
 * name printed on that drawn pack.
 */

const BASE = '/work/violife'

/* Greek first, because Violife is a Greek brand and this is its home
   market. English is one tap away in the top bar of every page.
   `label` is the language's name in its own language — never translated,
   which is the one rule of a language chooser worth never breaking.
   Adding a locale here and a matching dictionary is the whole job. */
export const LOCALES = [
  { code: 'el', short: 'ΕΛ', flag: '🇬🇷', label: 'Ελληνικά' },
  { code: 'en', short: 'EN', flag: '🇬🇧', label: 'English' },
]

export const DEFAULT_LOCALE = 'el'
export const PAGES = ['home', 'products', 'recipes', 'find', 'story']

/**
 * Greek sits at the root of the concept, English under /en/, so the home
 * market keeps the clean URLs and each language still has its own real
 * indexable address.
 *
 *   home    → /work/violife/          /work/violife/en/
 *   recipes → /work/violife/recipes/  /work/violife/en/recipes/
 */
export function vPath(lang, page) {
  // The single-file bundle in work/violife has no server to resolve
  // directories, so it routes on the hash instead. Absent that flag this
  // returns the real URLs, unchanged.
  if (globalThis.__VIOLIFE_SINGLE__) return `#/${lang}/${page}`
  const base = lang === DEFAULT_LOCALE ? BASE : `${BASE}/${lang}`
  return page === 'home' ? `${base}/` : `${base}/${page}/`
}

/* The whole site, in four tabs. Story hangs off the footer and the top bar. */
export const NAV = [
  { page: 'home', icon: 'home' },
  { page: 'products', icon: 'pack' },
  { page: 'recipes', icon: 'recipe' },
  { page: 'find', icon: 'pin' },
]

export const FORMATS = ['all', 'blocks', 'slices', 'grated', 'creamy', 'drinks']

/* The free-from claims, as ids. Each has a drawn mark in art.jsx and a
   label in each dictionary, so the icon set is shared across languages
   rather than duplicated per translation. */
export const FREE_FROM = ['dairy', 'soya', 'gluten', 'lactose', 'nuts', 'preservatives']

/* Photographed packs lead, so the strongest assets are what a visitor
   meets first. `label` is the flavour name printed on a drawn pack and is
   only read when there is no photo. */
export const PRODUCTS = [
  { id: 'grated-original', format: 'grated', kind: 'shreds', tone: 'cheddar', photo: 'pack-grated-original.webp', behaviour: ['melt', 'stretch'], hero: true },
  { id: 'creamy-original', format: 'creamy', kind: 'tub', tone: 'greek', photo: 'pack-creamy-original.webp', behaviour: [] },
  { id: 'slices-gouda', format: 'slices', kind: 'slices', tone: 'cheddar', photo: 'pack-slices-gouda.webp', behaviour: ['melt'] },
  { id: 'block-feta', format: 'blocks', kind: 'block', tone: 'greek', photo: 'pack-block-feta.webp', behaviour: [] },
  { id: 'block-parmesan', format: 'blocks', kind: 'block', tone: 'greek', photo: 'pack-block-parmesan.webp', behaviour: ['grate'] },

  { id: 'block-cheddar', format: 'blocks', kind: 'block', tone: 'cheddar', label: 'CHEDDAR', behaviour: ['melt', 'grate'] },
  { id: 'block-mozzarella', format: 'blocks', kind: 'block', tone: 'mozzarella', label: 'MOZZARELLA', behaviour: ['melt', 'stretch', 'grate'] },
  { id: 'block-smoked', format: 'blocks', kind: 'block', tone: 'smoked', label: 'SMOKED', behaviour: ['melt'] },

  { id: 'slices-cheddar', format: 'slices', kind: 'slices', tone: 'cheddar', label: 'CHEDDAR', behaviour: ['melt'] },
  { id: 'slices-smoked', format: 'slices', kind: 'slices', tone: 'smoked', label: 'SMOKED', behaviour: ['melt'] },

  { id: 'grated-mozzarella', format: 'grated', kind: 'shreds', tone: 'mozzarella', label: 'MOZZARELLA', behaviour: ['melt', 'stretch'] },

  { id: 'creamy-herbs', format: 'creamy', kind: 'tub', tone: 'herb', label: 'HERBS', behaviour: [] },
  { id: 'dip-sour-cream', format: 'creamy', kind: 'pot', tone: 'herb', label: 'SOUR CREAM', behaviour: [] },

  { id: 'barista-creamer', format: 'drinks', kind: 'creamer', tone: 'oat', label: 'BARISTA', behaviour: [] },
]

export const HERO_PRODUCT = PRODUCTS.find((p) => p.hero) ?? PRODUCTS[0]

/** The three behaviours the brand has to prove, each tied to the pack that proves it. */
export const PROOF = [
  { id: 'melt', icon: 'melt', product: 'grated-original' },
  { id: 'stretch', icon: 'stretch', product: 'block-mozzarella' },
  { id: 'grate', icon: 'grate', product: 'block-cheddar' },
]

export const RECIPES = [
  { id: 'greek-white-pizza', photo: 'dish-greek-white-pizza.webp', minutes: 25, uses: 'block-feta' },
  { id: 'greek-white-orzo', photo: 'dish-greek-white-orzo.webp', minutes: 45, uses: 'block-feta', wide: true },
  { id: 'mac', dish: 'mac', minutes: 40, uses: 'grated-original' },
  { id: 'smash-burger', dish: 'burger', minutes: 20, uses: 'slices-smoked' },
  { id: 'toastie', dish: 'toastie', minutes: 12, uses: 'block-cheddar' },
  { id: 'creamy-pasta', dish: 'pasta', minutes: 10, uses: 'creamy-herbs' },
  { id: 'loaded-nachos', dish: 'nachos', minutes: 18, uses: 'grated-mozzarella' },
]

/** The banner recipe on the recipes page — the one wide photograph we have. */
export const FEATURE_RECIPE = RECIPES.find((r) => r.wide)

export const RECIPE_TIMES = ['all', '15', '25', '45']

export const STORY_YEARS = ['1990', '2000s', '2020', 'now']

export const STOCKISTS = [
  { id: 'tesco', name: 'Tesco Extra', dist: '0.4', has: ['blocks', 'slices', 'grated', 'creamy'] },
  { id: 'sainsburys', name: 'Sainsbury’s Local', dist: '0.7', has: ['slices', 'grated'] },
  { id: 'wholefoods', name: 'Whole Foods Market', dist: '1.2', has: ['blocks', 'creamy', 'drinks'] },
  { id: 'coop', name: 'Co-op Food', dist: '1.5', has: ['slices', 'creamy'] },
  { id: 'waitrose', name: 'Waitrose', dist: '2.1', has: ['blocks', 'slices', 'grated', 'creamy', 'drinks'] },
]

/**
 * The nutrition panel's rows, in the order a European back-of-pack table
 * declares them. Labels are translated; the values are not, so any real
 * figures belong here rather than in the dictionaries.
 *
 * No product carries values yet. Ingredient declarations and nutrition
 * figures are legally regulated text — they get transcribed from the
 * actual pack or the product specification, never reconstructed from
 * memory, because a plausible wrong number on an allergen or a salt
 * figure is worse than no number at all. Add a `nutrition` key to a
 * product below and the panel fills itself in:
 *
 *   nutrition: { energy: '1046 kJ / 253 kcal', fat: '21 g', ... }
 */
export const NUTRITION_ROWS = ['energy', 'fat', 'saturates', 'carbs', 'sugars', 'fibre', 'protein', 'salt']

/**
 * Asset paths. Images live in public/ so they are served unhashed and
 * cacheable. The single-file bundle swaps in data URIs through the map
 * below; with no map present this is the plain public path.
 */
export const img = (file) => globalThis.__VIOLIFE_ASSETS__?.[file] ?? `/violife/${file}`
