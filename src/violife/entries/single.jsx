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
    const onHash = () => {
      setRoute(readHash())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
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
