/**
 * All editable copy and settings for the site. Nothing needs hunting through
 * components — change it here and every page follows.
 */

// --- Contact details -------------------------------------------------------
// PLACEHOLDERS — replace with the real address and number before launch.
export const CONTACT = {
  email: 'hello@midastechnology.com',
  phone: '+1 (555) 014-2200',
  phoneHref: '+15550142200',
  hours: 'Replies within one business day — usually the same afternoon.',
}

// --- Navigation ------------------------------------------------------------
export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services/', label: 'Services' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
]

// --- Headline options ------------------------------------------------------
// The accent word renders in the gold gradient. Change ACTIVE_HEADLINE to pick.
export const HEADLINES = [
  { pre: 'We turn your business into', accent: 'gold', post: 'online.' },
  { pre: 'Small business.', accent: 'Golden', post: 'first impression.' },
  { pre: 'The website your regulars', accent: 'already believe', post: 'you have.' },
]

export const ACTIVE_HEADLINE = 0

export const SUBHEAD =
  'Custom websites and companion apps for cafés, restaurants and local shops — designed, built and looked after by one person who actually answers the phone.'

// --- Hero trust strip ------------------------------------------------------
export const PROOF = [
  { value: 'Under 2s', label: 'load time on a phone' },
  { value: '3–4 weeks', label: 'from first call to live' },
  { value: '100%', label: 'yours — domain, code, data' },
]

// --- Philosophy ------------------------------------------------------------
export const PRINCIPLES = [
  {
    n: '01',
    title: 'Fast, or it does not count',
    body: 'Half your customers are standing outside on patchy signal, deciding whether to come in. Every page ships only once it loads in under two seconds on a mid-range phone.',
  },
  {
    n: '02',
    title: 'Simple beats clever',
    body: 'Menu, hours, directions, book a table. The four things people actually came for are never more than one tap away — everything else earns its place or gets cut.',
  },
  {
    n: '03',
    title: 'You own all of it',
    body: 'Your domain, your code, your customer list, your photos. No monthly hostage rent on your own front door, and no platform that can change the rules on you.',
  },
  {
    n: '04',
    title: 'Built for your street',
    body: 'Not a template with your logo dropped in. Your room, your regulars, the way people in your neighbourhood actually talk about you — that is what the site should sound like.',
  },
]

// --- Services --------------------------------------------------------------
export const SERVICES = [
  {
    icon: 'window',
    kicker: 'Foundation',
    title: 'Custom Website',
    short: 'A site designed around your room and your menu, not a theme you have seen on four other shops in town.',
    body: 'Everything starts here. I design and build a site that looks like your business rather than a category — the right photographs, your own words, and the practical details a customer is hunting for at eight in the evening on a phone.',
    points: [
      'Bespoke design — no templates, no theme licence',
      'Menus, hours and directions that stay current',
      'Mobile-first, built to load instantly on poor signal',
      'Google Business and local search set up properly',
      'Guidance on photography that makes the food look right',
      'Written to sound like you, not like a brochure',
    ],
  },
  {
    icon: 'device',
    kicker: 'Growth',
    title: 'Companion App',
    short: 'The part that pays for itself: let regulars order, book and come back without a third-party commission.',
    body: 'Delivery platforms take a fifth of every order and keep the customer relationship. A companion app puts that back in your hands — the same convenience, at your prices, with the customer list staying yours.',
    points: [
      'Order ahead and pay, straight to your counter',
      'Table and appointment booking with your real capacity',
      'Digital loyalty stamps people actually keep',
      'Push a quiet-Tuesday offer in about thirty seconds',
      'Works on iPhone, Android and the web',
      'No commission on a single order, ever',
    ],
  },
  {
    icon: 'shield',
    kicker: 'Peace of mind',
    title: 'Ongoing Support',
    short: 'A website is a living thing. I keep yours fed, patched and current so you can stay behind the counter.',
    body: 'Most small business sites die slowly — a price goes stale, a holiday closure never gets posted, a plugin breaks and nobody notices for a month. This is the part that stops that happening.',
    points: [
      'Content edits turned around within a day',
      'Hosting, backups and security handled',
      'A plain-English monthly report — no dashboards to learn',
      'Seasonal menu and opening-hours changes',
      'Fixes before you notice, wherever possible',
      'One number to call — mine',
    ],
  },
]

// --- How the work runs (Services page) -------------------------------------
export const PROCESS = [
  {
    n: '01',
    title: 'A conversation',
    body: 'Fifteen minutes, in your place if you will have me. I want to know how the room actually runs and where you lose people — not your five-year plan.',
  },
  {
    n: '02',
    title: 'A design you can see',
    body: 'Within a week you get real screens with your own words and photographs in them, not a wireframe. We change what is wrong before a line of code is written.',
  },
  {
    n: '03',
    title: 'The build',
    body: 'Two to three weeks of quiet work, with something to look at every few days. You are never left wondering what is happening.',
  },
  {
    n: '04',
    title: 'Launch, and after',
    body: 'I move the domain, check it on real phones, and stay on for as long as you want the support. Handover includes everything — logins, files, the lot.',
  },
]

// --- Always included -------------------------------------------------------
export const INCLUDED = [
  'Your own domain, in your name',
  'Free SSL and secure hosting',
  'Google Business profile set up',
  'Menus and hours you can trust',
  'Photography direction',
  'Accessible to screen readers',
  'Analytics without the creepy parts',
  'A written handover of every login',
]

// --- About page ------------------------------------------------------------
export const ABOUT = {
  lead: 'Midas Technology is one person, on purpose.',
  story: [
    'I build websites and companion apps for the businesses that hold a street together — the café that knows your order, the restaurant with eleven tables, the shop that has been there longer than the chain across the road.',
    'Those businesses get badly served by the web. They are sold a template that looks like everyone else, on a platform that rents them their own front door, and then left alone with it. Six months later the menu is out of date and nobody can find the opening hours on a phone.',
    'So the whole operation is built the other way around. I take a small number of clients at a time, I do the design and the build myself, and when something breaks you call me rather than a ticket queue. There is no account manager, because there is no account to manage — there is your business, and there is me.',
  ],
  pullQuote: 'The best compliment I get is that the site sounds like the owner. That is the whole job.',
  promises: [
    { title: 'You will always know what it costs', body: 'A fixed price agreed before anything starts. No hourly creep, no surprise invoice at handover.' },
    { title: 'You will never be locked in', body: 'Everything is yours from day one. If you want to walk away, you leave with the domain, the code and the customer list.' },
    { title: 'You will talk to the person building it', body: 'The person who answers your call is the person who wrote the thing. Nothing gets lost being passed along.' },
    { title: 'I will tell you if you do not need me', body: 'Sometimes a business needs a tidy Google profile and better photographs, not a new site. I would rather say so than take the work.' },
  ],
}

// --- Contact section -------------------------------------------------------
export const CONTACT_COPY = {
  title: 'Book a walkthrough',
  body: 'Fifteen minutes, no slide deck. Tell me about your business and I will show you what your site and app could look like — and tell you honestly if you do not need one yet.',
}
