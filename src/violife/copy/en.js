/**
 * English copy.
 *
 * Claims are limited to what the brand states publicly and what is printed
 * on the supplied packs. Range-wide claims are held to what is true of
 * every product: dairy-free, made with coconut oil, and free from soya,
 * gluten, lactose, nuts and artificial preservatives. Vitamin B12 is not
 * range-wide — the Parmesan Style declaration has none — so it appears
 * only inside the declarations that actually list it.
 *
 * Nothing here invents nutrition figures, prices, awards or stockists.
 * Where a product has a real ingredient declaration it is printed
 * verbatim; where it has none the panel says so.
 */

export default {
  code: 'en',
  htmlLang: 'en',

  ui: {
    skip: 'Skip to content',
    home: 'Home',
    menu: 'Menu',
    close: 'Close',
    search: 'Search',
    details: 'Details',
    findInStore: 'Find in store',
    seeTheRange: 'See the range',
    allProducts: (n) => `All ${n} products`,
    product: 'product',
    products: 'products',
    recipe: 'recipe',
    recipes: 'recipes',
    store: 'store',
    stores: 'stores',
    madeWith: (name) => `Made with ${name}`,
    bestFor: 'Best for',
    freeFrom: 'Free from',
    minutes: 'min',
    language: 'Language',
    readTheStory: 'Read the story',
    recipesWithThis: 'Recipes with this',
    fullRange: 'The range',
    inFormat: (label) => `in ${label.toLowerCase()}`,
    noneThatQuick: 'Nothing that quick yet. Try a longer window.',
    withinMiles: (n) => `${n} within 3 miles`,
    featured: 'Featured',
    ingredients: 'Ingredients',
    nutrition: 'Nutritional information',
    per100: 'Per 100 g',
    declarationNote:
      'Ingredient and nutrition declarations are legally regulated text. They are transcribed from the pack or the product specification, and are not reproduced in this concept.',
  },

  nav: {
    home: 'Home',
    products: 'Range',
    recipes: 'Recipes',
    find: 'Find',
    story: 'Story',
  },

  formats: {
    all: 'All',
    blocks: 'Blocks',
    slices: 'Slices',
    grated: 'Grated',
    creamy: 'Creamy',
    drinks: 'Creamers',
  },

  times: {
    all: 'Any time',
    15: 'Under 15',
    25: 'Under 25',
    45: 'Under 45',
  },

  /* Shown only where a product has no verbatim declaration of its own.
     Narrowed to what holds across the whole range: the Parmesan Style
     declaration contains no vitamin B12 and lists coconut oil fourth, so
     "made with coconut oil and vitamin B12" is not a range-wide claim. */
  ingredientsFallback: [
    'Dairy-free, made with coconut oil.',
    'Free from dairy, soya, gluten, lactose, nuts and artificial preservatives.',
  ],

  nutritionRows: {
    energy: 'Energy',
    fat: 'Fat',
    saturates: 'of which saturates',
    carbs: 'Carbohydrate',
    sugars: 'of which sugars',
    fibre: 'Fibre',
    protein: 'Protein',
    salt: 'Salt',
  },

  freeFrom: {
    dairy: 'Dairy',
    soya: 'Soya',
    gluten: 'Gluten',
    lactose: 'Lactose',
    nuts: 'Nuts',
    preservatives: 'Artificial preservatives',
  },

  home: {
    title: 'Concept — Violife redesign',
    eyebrow: 'Plant-based since 1990',
    h1a: 'Undairy',
    h1b: 'the craving.',
    lede: 'Dairy-free cheese that melts, stretches and grates like the thing you actually miss.',

    proofEyebrow: 'The only test that matters',
    proofTitle: 'Melts. Stretches. Grates.',
    proofBody:
      'Three behaviours decide whether an alternative works in a real kitchen. Everything in the range is built against them.',

    rangeEyebrow: 'The range',
    rangeTitle: 'Pick a format.',

    recipesEyebrow: 'From the kitchen',
    recipesTitle: 'Something worth making tonight.',
    recipesBody: 'Under forty minutes, and none of them a salad you eat to prove a point.',

    findEyebrow: 'Nearby',
    findTitle: 'It is probably two streets away.',
    findBody:
      'Stocked in most large supermarkets and a good number of small ones. Check what is on the shelf before you leave the house.',
    findPlaceholder: 'Postcode or town',

    storyEyebrow: 'Since 1990',
    storyTitle: 'Thirty-five years of getting it wrong, then right.',
    storyBody:
      'Violife started in Thessaloniki making dairy-free cheese for a market that did not exist yet. The recipe took a long time. The audience took longer.',
  },

  productsPage: {
    title: 'The range — Violife concept redesign',
    eyebrow: (n) => `${n} products`,
    h1: 'The whole range.',
    lede: 'Blocks, slices, grated, creamy and creamers. All of it dairy-free, and all of it free from soya, gluten, lactose, nuts and artificial preservatives.',
    freeFromEyebrow: 'Every product, no exceptions',
    freeFromTitle: 'Free from all six.',
    freeFromBody: 'Not a claim that applies to selected lines. It applies to the range.',
  },

  recipesPage: {
    title: 'Recipes — Violife concept redesign',
    eyebrow: 'The kitchen',
    h1: 'Cook something.',
    lede: 'No thirty-ingredient showpieces. These are the dishes people actually make on a weeknight, written down properly.',
  },

  findPage: {
    title: 'Find in store — Violife concept redesign',
    eyebrow: 'Store locator',
    h1: 'Find it nearby.',
    lede: 'Search once, then filter by what you actually came for. No point walking to a shop that only carries slices when you need a block.',
    placeholder: 'Postcode or town',
    defaultPlace: 'Manchester M1',
    note: 'Stock shown is illustrative. A live build would read availability from each retailer’s feed and fall back to “call ahead” where no feed exists.',
    convenience: 'Convenience',
    superstore: 'Superstore',
  },

  storyPage: {
    title: 'Our story — Violife concept redesign',
    eyebrow: 'Thessaloniki, 1990',
    h1: 'Early, and stubborn.',
    lede: 'Violife started making a dairy-free alternative to cheese roughly two decades before anybody was asking for one. That head start is the reason it melts.',
    madeOfEyebrow: 'What it is made of',
    madeOfTitle: 'Water, coconut oil, starch, and a lot of testing.',
    madeOfBody:
      'The base has not fundamentally changed in thirty-five years. What changed is the tuning — how it sets, how it browns, and at what temperature it lets go and flows.',
    closeTitle: 'Undairy the craving.',
    closeBody:
      'Not a sacrifice, not a substitute, not a compromise you explain to the table. Just the one you wanted on the plate.',
  },

  story: {
    1990: {
      title: 'A dairy-free cheese from Greece',
      body: 'Violife starts in Thessaloniki, making a coconut-oil-based alternative to cheese at a time when almost nobody is asking for one.',
    },
    '2000s': {
      title: 'Built for cooks, not for the label',
      body: 'The range grows around what people actually do with cheese — grate it, melt it, slice it, spread it — rather than around what is easiest to manufacture.',
    },
    2020: {
      title: 'Joining Flora Food Group',
      body: 'Acquired in January 2020, which puts the range into far more kitchens across Europe and North America.',
    },
    now: {
      title: 'Undairy the craving',
      body: 'The argument is no longer about giving something up. It is that the plant-based version can simply be the one you want on the plate.',
    },
  },

  proof: {
    melt: { title: 'It melts', body: 'Not softens, not sweats — goes properly molten under a grill and browns at the edges.' },
    stretch: { title: 'It stretches', body: 'The pull off a hot slice. The single thing people miss most, and the hardest to fake.' },
    grate: { title: 'It grates', body: 'Firm on the box grater instead of gumming up into a paste halfway down.' },
  },

  behaviour: { melt: 'Melts', stretch: 'Stretches', grate: 'Grates' },

  products: {
    'grated-original': {
      name: 'Original Flavour Grated',
      lead: 'Already grated, so pizza night starts ten minutes earlier.',
      body: 'Loose in the bag rather than compacted, so it scatters evenly instead of landing in clumps that melt at different rates. Resealable, which matters more than it sounds.',
      best: ['Pizza', 'Nachos', 'Pasta bakes'],
    },
    'creamy-original': {
      name: 'Creamy Original',
      lead: 'Spreadable straight from the fridge.',
      body: 'Soft without being loose. Takes a knife across a bagel in one pass, and thins into a pasta sauce with a spoon of the cooking water rather than seizing.',
      best: ['Bagels', 'Cheesecake', 'Pasta sauce'],
    },
    'slices-gouda': {
      name: 'Gouda Flavour Slices',
      lead: 'Mild, buttery, and it folds without cracking.',
      body: 'Seven slices, cut to cover a standard slice of bread with no gaps and no overhang. Peels apart cold, straight from the fridge, without taking half the next slice with it.',
      best: ['Sandwiches', 'Burgers', 'Cheese boards'],
    },
    'block-cheddar': {
      name: 'Mature Cheddar Flavour Block',
      lead: 'Sharp, salty and firm enough to hold an edge on the grater.',
      body: 'The one to reach for when a dish needs cheddar to taste like a decision rather than a garnish. Slices clean for a sandwich and keeps its bite against strong flavours.',
      best: ['Toasties', 'Jacket potatoes', 'Cheese boards'],
    },
    'block-mozzarella': {
      name: 'Mozzarella Flavour Block',
      lead: 'Mild, milky and built to stretch.',
      body: 'The pizza block. Mild enough to sit under a loud sauce, and it pulls properly when it comes out of a hot oven — which is the whole test, and the one most alternatives fail.',
      best: ['Pizza', 'Lasagne', 'Aubergine bakes'],
    },
    'block-smoked': {
      name: 'Smoked Flavour Block',
      lead: 'Applewood-style smoke, dialled to sit under other flavours.',
      body: 'Smoke does a lot of work in a plant-based kitchen — it reads as depth. Firm enough to cube into a salad, soft enough to melt into a sauce without splitting.',
      best: ['Loaded fries', 'Burgers', 'Chowder'],
    },
    'block-feta': {
      name: 'Feta Style Block',
      lead: 'Brined, crumbly and unapologetically salty.',
      body: 'Crumbles over a salad the way it should — in shards, not dust. Holds its shape baked in a tray of tomatoes and oil, and takes on herbs and lemon well.',
      best: ['Greek salad', 'Baked in oil', 'Watermelon'],
    },
    'slices-cheddar': {
      name: 'Cheddar Flavour Slices',
      lead: 'One slice, one sandwich. No tearing at the corners.',
      body: 'The everyday slice. Thin enough to go soft under residual heat alone, so it works on a burger straight off the pan without a lid and a splash of water.',
      best: ['Sandwiches', 'Burgers', 'Grilled cheese'],
      ingredients:
        'Water, Coconut oil, Modified tapioca and potato starch, Potato starch, Salt, Natural flavour, Fructose, Rowanberry extract (to help maintain freshness), Lactic acid, Calcium phosphate, Yeast extract, Paprika extract, Sugar, Carotene, Herbs, Olive extract.',
    },
    'slices-smoked': {
      name: 'Smoked Flavour Slices',
      lead: 'The burger slice. Melts before the patty goes cold.',
      body: 'Smoke and salt in a format that melts fast. Goes on in the pan rather than on the plate, which is the difference between melted and merely warm.',
      best: ['Burgers', 'Club sandwiches', 'Hash'],
    },
    'grated-mozzarella': {
      name: 'Mozzarella Flavour Grated',
      lead: 'The pizza bag. Scatters evenly, pulls properly.',
      body: 'Mild enough to sit under a loud sauce and loose enough to spread in one handful. The format to buy if pizza is the reason you are here.',
      best: ['Pizza', 'Calzone', 'Garlic bread'],
      ingredients:
        'Food preparation with coconut oil. Water, Coconut oil (24%), Modified starch*, Starch, Sea salt, Mozzarella flavour, Olive extract, Colour: β-carotene, Vitamin B12.',
      ingredientsNote: '*Not to be confused with GMO (genetically modified) ingredients.',
    },
    'creamy-herbs': {
      name: 'Creamy Herbs & Garlic',
      lead: 'Garlic first, herbs behind it.',
      body: 'Seasoned to work as a sauce on its own — stirred into hot pasta or spooned over roast potatoes with nothing else added.',
      best: ['Crudités', 'Pasta', 'Stuffed mushrooms'],
    },
    'dip-sour-cream': {
      name: 'Sour Cream & Chive Dip',
      lead: 'Cold, sharp and thick enough to hold a crisp.',
      body: 'Built for scooping. Sits on a nacho without sliding off, and cuts through anything fried or heavily spiced.',
      best: ['Nachos', 'Wedges', 'Wings'],
    },
    'block-parmesan': {
      name: 'Parmesan Style Wedge',
      lead: 'Hard, salty, and it shaves as well as it grates.',
      body: 'The finishing cheese. Firm enough to take a peeler along the edge for shavings, and dry enough to grate to a powder over pasta without clogging.',
      best: ['Pasta', 'Risotto', 'Caesar salad'],
      ingredients:
        'Water, Modified potato starch, Potato & rice starch, Coconut oil, Sea salt, Natural flavor, Rice protein, Yeast extract, Glucose, Citric acid, Olive extract, Carotene.',
    },
    'barista-creamer': {
      name: 'Barista Creamer',
      lead: 'Steams to a proper microfoam. Does not split in coffee.',
      body: 'The two things a creamer has to survive are heat and acid. This one holds through an espresso shot without curdling and stretches to a wet, glossy foam rather than a stiff one.',
      best: ['Flat whites', 'Lattes', 'Iced coffee'],
    },
  },

  recipes: {
    'greek-white-pizza': {
      title: 'Greek white & spinach pizza',
      note: 'Crumble it on after the bake, not before — it should stay in shards.',
    },
    'greek-white-orzo': {
      title: 'Baked orzo with Greek white',
      note: 'One pan, olives and tomatoes, finished with big pieces of Greek white.',
    },
    mac: { title: 'Baked mac and cheese', note: 'Two thirds through the sauce, one third on top for the crust.' },
    'smash-burger': { title: 'Smash burger, melted slice', note: 'Slice goes on in the pan, not on the plate.' },
    toastie: { title: 'The Sunday toastie', note: 'Butter the outside of the bread, not the pan.' },
    'creamy-pasta': { title: 'Ten-minute creamy pasta', note: 'Loosen with pasta water until it coats the back of a spoon.' },
    'loaded-nachos': { title: 'Loaded tray nachos', note: 'Build in two layers so the middle is not dry.' },
  },

  stockists: {
    tesco: 'Superstore',
    sainsburys: 'Convenience',
    wholefoods: 'Grocery',
    coop: 'Convenience',
    waitrose: 'Supermarket',
  },

  footer: {
    tagline: 'Dairy-free by design. Free from soya, gluten, lactose, nuts and artificial preservatives.',
    range: 'Range',
    kitchen: 'Kitchen',
    brand: 'Brand',
    allRecipes: 'All recipes',
    quick: 'Under 20 minutes',
    howItMelts: 'How it melts',
    ourStory: 'Our story',
    foodservice: 'Foodservice',
    disclosureLead: 'This is a concept.',
    disclosure:
      'An independent, unsolicited design study by Midas Technology exploring how the Violife site could work on a phone. Not affiliated with, endorsed by, or produced for Violife or Flora Food Group. Product photography was supplied by the client of this study; drawn packs are illustrative placeholders, not real packaging.',
  },

  meta: {
    description:
      'Concept redesign by Midas Technology. An independent design study, not affiliated with Violife or Flora Food Group.',
  },
}
