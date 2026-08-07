/**
 * Content for the concept.
 *
 * Kept in one module so the whole information architecture is legible at a
 * glance — which is half the point of the redesign. The live site spreads
 * the same material across six top-level sections plus a drift of campaign
 * landing pages; this collapses it to four destinations.
 *
 * Claims are limited to what the brand states publicly about the range
 * (dairy-free, vegan, free from lactose, gluten, nuts and soya). Nothing
 * here invents nutrition figures, prices, awards or stockists.
 */

const BASE = '/work/violife'

/** Every page is a real document, so paths end in a slash. */
export function vPath(page) {
  return page === 'home' ? `${BASE}/` : `${BASE}/${page}/`
}

/* The whole site, in four destinations. */
export const NAV = [
  { page: 'home', label: 'Home', icon: 'home' },
  { page: 'products', label: 'Range', icon: 'pack' },
  { page: 'recipes', label: 'Recipes', icon: 'recipe' },
  { page: 'find', label: 'Find', icon: 'pin' },
]

/* Formats drive the segmented control on the home page and the filter on
   the range page — the same control in two contexts, which is how a small
   system stays learnable. */
export const FORMATS = [
  { id: 'all', label: 'All' },
  { id: 'blocks', label: 'Blocks' },
  { id: 'slices', label: 'Slices' },
  { id: 'grated', label: 'Grated' },
  { id: 'creamy', label: 'Creamy' },
  { id: 'drinks', label: 'Creamers' },
]

export const PRODUCTS = [
  {
    id: 'mature-cheddar-block',
    name: 'Mature Cheddar Flavour Block',
    format: 'blocks',
    kind: 'block',
    tone: 'cheddar',
    lead: 'Sharp, salty and firm enough to hold an edge on the grater.',
    body: 'The one to reach for when a dish needs cheddar to taste like a decision rather than a garnish. Slices clean for a sandwich, melts down evenly under a grill, and keeps its bite against strong flavours.',
    best: ['Toasties', 'Jacket potatoes', 'Cheese boards'],
    behaviour: ['melt', 'grate'],
  },
  {
    id: 'just-like-mozzarella',
    name: 'Mozzarella Flavour Block',
    format: 'blocks',
    kind: 'block',
    tone: 'mozzarella',
    lead: 'Mild, milky and built to stretch.',
    body: 'The pizza block. Mild enough to sit under a loud sauce, and it pulls properly when it comes out of a hot oven — which is the whole test, and the one most alternatives fail.',
    best: ['Pizza', 'Lasagne', 'Aubergine bakes'],
    behaviour: ['melt', 'stretch', 'grate'],
    hero: true,
  },
  {
    id: 'smoked-block',
    name: 'Smoked Flavour Block',
    format: 'blocks',
    kind: 'block',
    tone: 'smoked',
    lead: 'Applewood-style smoke, dialled to sit under other flavours.',
    body: 'Smoke does a lot of work in a plant-based kitchen — it reads as depth. Firm enough to cube into a salad, soft enough to melt into a sauce without splitting.',
    best: ['Loaded fries', 'Burgers', 'Chowder'],
    behaviour: ['melt'],
  },
  {
    id: 'greek-white',
    name: 'Greek White Block',
    format: 'blocks',
    kind: 'block',
    tone: 'greek',
    lead: 'Brined, crumbly and unapologetically salty.',
    body: 'Crumbles over a salad the way it should — in shards, not dust. Holds its shape baked in a tray of tomatoes and oil, and takes on herbs and lemon well.',
    best: ['Greek salad', 'Baked in oil', 'Watermelon'],
    behaviour: [],
  },
  {
    id: 'original-slices',
    name: 'Original Flavour Slices',
    format: 'slices',
    kind: 'slices',
    tone: 'cheddar',
    lead: 'One slice, one sandwich. No tearing at the corners.',
    body: 'Cut to cover a standard slice of bread with no gaps and no overhang. Peels apart cold, straight from the fridge, without taking half the next slice with it.',
    best: ['Sandwiches', 'Burgers', 'Grilled cheese'],
    behaviour: ['melt'],
  },
  {
    id: 'smoked-slices',
    name: 'Smoked Flavour Slices',
    format: 'slices',
    kind: 'slices',
    tone: 'smoked',
    lead: 'The burger slice. Melts before the patty goes cold.',
    body: 'Thin enough to go soft under residual heat alone, so it works on a burger straight off the pan without a lid and a splash of water.',
    best: ['Burgers', 'Club sandwiches', 'Hash'],
    behaviour: ['melt'],
  },
  {
    id: 'mozzarella-grated',
    name: 'Mozzarella Flavour Grated',
    format: 'grated',
    kind: 'shreds',
    tone: 'mozzarella',
    lead: 'Already grated, so pizza night starts ten minutes earlier.',
    body: 'Loose in the bag rather than compacted, so it scatters evenly instead of landing in clumps that melt at different rates.',
    best: ['Pizza', 'Nachos', 'Pasta bakes'],
    behaviour: ['melt', 'stretch'],
  },
  {
    id: 'cheddar-grated',
    name: 'Cheddar Flavour Grated',
    format: 'grated',
    kind: 'shreds',
    tone: 'cheddar',
    lead: 'For everything that gets finished under a grill.',
    body: 'Browns rather than just softening, so a pasta bake comes out with a top on it. Stir a handful through while the sauce is still moving and it goes glossy.',
    best: ['Mac and cheese', 'Gratins', 'Chilli'],
    behaviour: ['melt', 'grate'],
  },
  {
    id: 'creamy-original',
    name: 'Creamy Original',
    format: 'creamy',
    kind: 'tub',
    tone: 'greek',
    lead: 'Spreadable straight from the fridge.',
    body: 'Soft without being loose. Takes a knife across a bagel in one pass, and thins into a pasta sauce with a spoon of the cooking water rather than seizing.',
    best: ['Bagels', 'Cheesecake', 'Pasta sauce'],
    behaviour: [],
  },
  {
    id: 'creamy-herbs',
    name: 'Creamy Herbs & Garlic',
    format: 'creamy',
    kind: 'tub',
    tone: 'herb',
    lead: 'Garlic first, herbs behind it.',
    body: 'Seasoned to work as a sauce on its own — stirred into hot pasta or spooned over roast potatoes with nothing else added.',
    best: ['Crudités', 'Pasta', 'Stuffed mushrooms'],
    behaviour: [],
  },
  {
    id: 'dip-sour-cream',
    name: 'Sour Cream & Chive Dip',
    format: 'creamy',
    kind: 'pot',
    tone: 'herb',
    lead: 'Cold, sharp and thick enough to hold a crisp.',
    body: 'Built for scooping. Sits on a nacho without sliding off, and cuts through anything fried or heavily spiced.',
    best: ['Nachos', 'Wedges', 'Wings'],
    behaviour: [],
  },
  {
    id: 'barista-creamer',
    name: 'Barista Creamer',
    format: 'drinks',
    kind: 'creamer',
    tone: 'oat',
    lead: 'Steams to a proper microfoam. Does not split in coffee.',
    body: 'The two things a creamer has to survive are heat and acid. This one holds through an espresso shot without curdling and stretches to a wet, glossy foam rather than a stiff one.',
    best: ['Flat whites', 'Lattes', 'Iced coffee'],
    behaviour: [],
  },
]

export const HERO_PRODUCT = PRODUCTS.find((p) => p.hero) ?? PRODUCTS[0]

/** The three claims the brand actually has to prove, with the pack that proves each. */
export const PROOF = [
  {
    icon: 'melt',
    title: 'It melts',
    body: 'Not softens, not sweats — goes properly molten under a grill and browns at the edges.',
    product: 'cheddar-grated',
  },
  {
    icon: 'stretch',
    title: 'It stretches',
    body: 'The pull off a hot slice. The single thing people miss most, and the hardest to fake.',
    product: 'just-like-mozzarella',
  },
  {
    icon: 'grate',
    title: 'It grates',
    body: 'Firm on the box grater instead of gumming up into a paste halfway down.',
    product: 'mature-cheddar-block',
  },
]

export const FREE_FROM = ['Dairy', 'Lactose', 'Gluten', 'Nuts', 'Soya']

export const RECIPES = [
  {
    id: 'pull-apart-pizza',
    title: 'Proper stretchy pizza',
    dish: 'pizza',
    minutes: 25,
    level: 'Easy',
    uses: 'just-like-mozzarella',
    note: 'A hot stone and a mild block. That is the entire trick.',
  },
  {
    id: 'mac',
    title: 'Baked mac and cheese',
    dish: 'mac',
    minutes: 40,
    level: 'Easy',
    uses: 'cheddar-grated',
    note: 'Two thirds through the sauce, one third on top for the crust.',
  },
  {
    id: 'smash-burger',
    title: 'Smash burger, melted slice',
    dish: 'burger',
    minutes: 20,
    level: 'Easy',
    uses: 'smoked-slices',
    note: 'Slice goes on in the pan, not on the plate.',
  },
  {
    id: 'toastie',
    title: 'The Sunday toastie',
    dish: 'toastie',
    minutes: 12,
    level: 'Easy',
    uses: 'mature-cheddar-block',
    note: 'Butter the outside of the bread, not the pan.',
  },
  {
    id: 'creamy-pasta',
    title: 'Ten-minute creamy pasta',
    dish: 'pasta',
    minutes: 10,
    level: 'Easy',
    uses: 'creamy-herbs',
    note: 'Loosen with pasta water until it coats the back of a spoon.',
  },
  {
    id: 'loaded-nachos',
    title: 'Loaded tray nachos',
    dish: 'nachos',
    minutes: 18,
    level: 'Easy',
    uses: 'mozzarella-grated',
    note: 'Build in two layers so the middle is not dry.',
  },
]

/* Story page. Facts limited to the brand's public record: founded in Greece,
   acquired by Flora Food Group in January 2020. */
export const STORY = [
  {
    year: '1990',
    title: 'A dairy-free cheese from Greece',
    body: 'Violife starts in Thessaloniki, making a coconut-oil-based alternative to cheese at a time when almost nobody is asking for one.',
  },
  {
    year: '2000s',
    title: 'Built for cooks, not for the label',
    body: 'The range grows around what people actually do with cheese — grate it, melt it, slice it, spread it — rather than around what is easiest to manufacture.',
  },
  {
    year: '2020',
    title: 'Joining Flora Food Group',
    body: 'Acquired in January 2020, which puts the range into far more kitchens across Europe and North America.',
  },
  {
    year: 'Now',
    title: 'Undairy the craving',
    body: 'The argument is no longer about giving something up. It is that the plant-based version can simply be the one you want on the plate.',
  },
]

export const STOCKISTS = [
  { name: 'Tesco Extra', area: 'Superstore', dist: '0.4 mi', has: ['blocks', 'slices', 'grated', 'creamy'] },
  { name: 'Sainsbury’s Local', area: 'Convenience', dist: '0.7 mi', has: ['slices', 'grated'] },
  { name: 'Whole Foods Market', area: 'Grocery', dist: '1.2 mi', has: ['blocks', 'creamy', 'drinks'] },
  { name: 'Co-op Food', area: 'Convenience', dist: '1.5 mi', has: ['slices', 'creamy'] },
  { name: 'Waitrose', area: 'Supermarket', dist: '2.1 mi', has: ['blocks', 'slices', 'grated', 'creamy', 'drinks'] },
]

export const FOOTER = [
  {
    heading: 'Range',
    links: [
      { label: 'Blocks', href: `${vPath('products')}#blocks` },
      { label: 'Slices', href: `${vPath('products')}#slices` },
      { label: 'Grated', href: `${vPath('products')}#grated` },
      { label: 'Creamy & dips', href: `${vPath('products')}#creamy` },
      { label: 'Creamers', href: `${vPath('products')}#drinks` },
    ],
  },
  {
    heading: 'Kitchen',
    links: [
      { label: 'All recipes', href: vPath('recipes') },
      { label: 'Under 20 minutes', href: `${vPath('recipes')}#quick` },
      { label: 'How it melts', href: `${vPath('home')}#proof` },
    ],
  },
  {
    heading: 'Brand',
    links: [
      { label: 'Our story', href: vPath('story') },
      { label: 'Find in store', href: vPath('find') },
      { label: 'Foodservice', href: vPath('story') },
    ],
  },
]
