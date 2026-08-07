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

export const LOCALES = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'el', short: 'ΕΛ', label: 'Ελληνικά' },
]

export const DEFAULT_LOCALE = 'en'
export const PAGES = ['home', 'products', 'recipes', 'find', 'story']

/**
 * English sits at the root of the concept, Greek under /el/ — the same rule
 * the parent site uses, so both languages get a real indexable address.
 *
 *   home    → /work/violife/          /work/violife/el/
 *   recipes → /work/violife/recipes/  /work/violife/el/recipes/
 */
export function vPath(lang, page) {
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

export const PRODUCTS = [
  { id: 'grated-original', format: 'grated', kind: 'shreds', tone: 'cheddar', photo: 'pack-grated-original.webp', behaviour: ['melt', 'stretch'], hero: true },
  { id: 'creamy-original', format: 'creamy', kind: 'tub', tone: 'greek', photo: 'pack-creamy-original.webp', behaviour: [] },
  { id: 'slices-gouda', format: 'slices', kind: 'slices', tone: 'cheddar', photo: 'pack-slices-gouda.webp', behaviour: ['melt'] },

  { id: 'block-cheddar', format: 'blocks', kind: 'block', tone: 'cheddar', label: 'CHEDDAR', behaviour: ['melt', 'grate'] },
  { id: 'block-mozzarella', format: 'blocks', kind: 'block', tone: 'mozzarella', label: 'MOZZARELLA', behaviour: ['melt', 'stretch', 'grate'] },
  { id: 'block-smoked', format: 'blocks', kind: 'block', tone: 'smoked', label: 'SMOKED', behaviour: ['melt'] },
  { id: 'block-greek-white', format: 'blocks', kind: 'block', tone: 'greek', label: 'GREEK WHITE', behaviour: [] },

  { id: 'slices-original', format: 'slices', kind: 'slices', tone: 'cheddar', label: 'ORIGINAL', behaviour: ['melt'] },
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
  { id: 'greek-white-pizza', photo: 'dish-greek-white-pizza.webp', minutes: 25, uses: 'block-greek-white' },
  { id: 'greek-white-orzo', photo: 'dish-greek-white-orzo.webp', minutes: 45, uses: 'block-greek-white', wide: true },
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

/** Asset paths. Images live in public/ so they are served unhashed and cacheable. */
export const img = (file) => `/violife/${file}`
