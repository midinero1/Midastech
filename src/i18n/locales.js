/**
 * Locale metadata and URL rules.
 *
 * Deliberately kept free of the translation dictionaries: this module is
 * imported everywhere, so if the dictionaries lived here every page would ship
 * the copy for every language. Each entry point imports only its own
 * dictionary and hands it to <SiteProvider>.
 */

export const LOCALES = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'el', short: 'ΕΛ', label: 'Ελληνικά' },
]

export const DEFAULT_LOCALE = 'en'
export const PAGES = ['home', 'services', 'about', 'contact']

/**
 * English sits at the root and Greek under /el/, so the default language keeps
 * the clean URLs and each translation still has its own indexable address.
 *
 *   home  → /          /el/
 *   about → /about/    /el/about/
 */
export function pagePath(lang, page) {
  const base = lang === DEFAULT_LOCALE ? '' : `/${lang}`
  return page === 'home' ? `${base}/` : `${base}/${page}/`
}

/** Nav entries for a language, resolved to hrefs. Labels come from `t`. */
export function navLinks(lang, t) {
  return PAGES.map((page) => ({ page, href: pagePath(lang, page), label: t.nav[page] }))
}

// Shared across both languages — not translated.
export const CONTACT = {
  email: 'hello@midastechnology.com',
  phone: '+1 (555) 014-2200',
  phoneHref: '+15550142200',
}

// Which headline the hero uses (index into t.hero.headlines).
export const ACTIVE_HEADLINE = 0
