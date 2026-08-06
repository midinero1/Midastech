/**
 * All editable copy and contact details live here, so nothing needs hunting
 * through components. Swap ACTIVE_HEADLINE / ACTIVE_LOGO and reload.
 */

// --- Contact details -------------------------------------------------------
// PLACEHOLDERS — replace with the real address and number before launch.
export const CONTACT = {
  email: 'hello@midastechnology.com',
  phone: '+1 (555) 014-2200',
  phoneHref: '+15550142200',
  hours: 'Replies within one business day — usually the same afternoon.',
}

// --- Logo direction --------------------------------------------------------
// 'ascent' | 'circuit' | 'crest'  — compare all three at /logos.html
export const ACTIVE_LOGO = 'ascent'

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
    body: 'A site designed around your room and your menu, not a theme you have seen on four other shops in town.',
    points: [
      'Bespoke design — no templates',
      'Menus, hours and directions that stay current',
      'Mobile-first, built to load instantly',
      'Google Business and local search set up properly',
      'Guidance on photos that make the food look right',
    ],
  },
  {
    icon: 'device',
    kicker: 'Growth',
    title: 'Companion App',
    body: 'The part that pays for itself: let regulars order, book and come back without touching a third-party commission.',
    points: [
      'Order ahead and pay, straight to your counter',
      'Table and appointment booking',
      'Digital loyalty stamps that people keep',
      'Push a quiet-Tuesday offer in thirty seconds',
      'Works on iPhone, Android and the web',
    ],
  },
  {
    icon: 'shield',
    kicker: 'Peace of mind',
    title: 'Ongoing Support',
    body: 'A website is a living thing. I keep yours fed, patched and current so you can stay behind the counter.',
    points: [
      'Content edits turned around within a day',
      'Hosting, backups and security handled',
      'A plain-English monthly report',
      'Seasonal menu and opening-hours changes',
      'One number to call — mine',
    ],
  },
]

// --- Contact section -------------------------------------------------------
export const CONTACT_COPY = {
  title: 'Book a walkthrough',
  body: 'Fifteen minutes, no slide deck. Tell me about your business and I will show you what your site and app could look like — and tell you honestly if you do not need one yet.',
}
