import { createContext, useContext } from 'react'

export * from './locales'

const SiteContext = createContext(null)

/** `t` is the dictionary for this page's language, supplied by the entry point. */
export function SiteProvider({ lang, page, t, children }) {
  return <SiteContext.Provider value={{ lang, page, t }}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>')
  return ctx
}
