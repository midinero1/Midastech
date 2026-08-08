/**
 * One-document build of the whole concept.
 *
 * The site proper is eight separate HTML documents, which is the right
 * shape for something served by a web host. This entry exists for the
 * places that can only take a single self-contained file — a hosted
 * preview page, an emailed attachment, a design review link. Same
 * components, same copy, same stylesheet; only the navigation differs,
 * routing on the hash rather than on the path.
 */

import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { SiteProvider } from '../i18n'
import { DEFAULT_LOCALE, LOCALES, PAGES } from '../data'
import Shell from '../Chrome'
import el from '../copy/el'
import en from '../copy/en'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Recipes from '../pages/Recipes'
import Story from '../pages/Story'
import Find from '../pages/Find'
import '../violife.css'

globalThis.__VIOLIFE_SINGLE__ = true

const COPY = { el, en }
const VIEWS = { home: Home, products: Products, recipes: Recipes, story: Story, find: Find }
const CODES = LOCALES.map((l) => l.code)

/** `#/el/products` → { lang: 'el', page: 'products' }, falling back safely. */
function readHash() {
  const [, lang, page] = (globalThis.location?.hash || '').replace(/^#\/?/, '/').split('/')
  return {
    lang: CODES.includes(lang) ? lang : DEFAULT_LOCALE,
    page: PAGES.includes(page) ? page : 'home',
  }
}

function App() {
  const [route, setRoute] = useState(readHash)

  useEffect(() => {
    /* Move without touching the address at all.
     *
     * A single file gets embedded in places that police navigation — a
     * sandboxed frame, a preview pane — where following even a same-page
     * fragment is treated as a navigation request and refused outright.
     * So every in-document link is handled here instead: the default is
     * cancelled and the route becomes ordinary component state. Nothing
     * is ever asked of the browser's navigation, so there is nothing for
     * a host to refuse. The href stays on the anchor, because it is what
     * makes the link a link — readable in a status bar, and still
     * meaningful if this file is opened somewhere unrestricted.
     */
    const go = (lang, page, anchor) => {
      setRoute({ lang, page })
      // Let the new page commit before looking for anything inside it.
      requestAnimationFrame(() => {
        const target = anchor && document.getElementById(anchor)
        if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
        else window.scrollTo({ top: 0, behavior: 'instant' })
      })
    }

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target.closest?.('a[href^="#"]')
      if (!link) return

      e.preventDefault()
      // "#/el/home#proof" → route "/el/home", anchor "proof"; "#quick" → anchor only.
      const [target, fragment] = link.getAttribute('href').slice(1).split('#')
      const [, lang, page] = target.startsWith('/') ? target.split('/') : []

      if (CODES.includes(lang) && PAGES.includes(page)) return go(lang, page, fragment)

      const el = document.getElementById(fragment || target)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // The picker cannot reach `go` through a link, so hand it over directly.
    globalThis.__VIOLIFE_NAV__ = go
    document.addEventListener('click', onClick, true)

    // Only for someone who opened the file with a route already in the URL.
    const onHash = () => {
      const { lang, page } = readHash()
      go(lang, page)
    }
    window.addEventListener('hashchange', onHash)

    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('hashchange', onHash)
      delete globalThis.__VIOLIFE_NAV__
    }
  }, [])

  const { lang, page } = route
  const View = VIEWS[page]

  // Keep the document's own language honest for screen readers, which read
  // Greek copy with an English voice otherwise.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <SiteProvider lang={lang} page={page} t={COPY[lang]}>
      <Shell>
        {/* Remounting on route change resets scroll reveals and page state,
            which is what navigating between documents would have done. */}
        <View key={`${lang}-${page}`} />
      </Shell>
    </SiteProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
