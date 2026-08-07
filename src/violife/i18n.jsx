import { createContext, useContext } from 'react'
import { DEFAULT_LOCALE, vPath } from './data'

/**
 * Language context.
 *
 * The dictionary is handed in by the entry point rather than imported here,
 * so an English page never ships the Greek copy and vice versa — the same
 * rule the parent site follows. `path` is bound to the active language so no
 * component ever has to remember to prefix a URL.
 */
const Ctx = createContext(null)

export function SiteProvider({ lang, page, t, children }) {
  const path = (p) => vPath(lang, p)
  return <Ctx.Provider value={{ lang, page, t, path }}>{children}</Ctx.Provider>
}

export function useSite() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>')
  return ctx
}

/** The same page in the other language — used for the switch and for hreflang. */
export function altPath(lang, page) {
  return vPath(lang === DEFAULT_LOCALE ? 'el' : DEFAULT_LOCALE, page)
}
