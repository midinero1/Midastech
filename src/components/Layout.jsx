import Nav from './Nav'
import Footer from './Footer'
import { useSite } from '../i18n'

/** Shared shell for every page, in every language. */
export default function Layout({ children }) {
  const { t } = useSite()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
      >
        {t.ui.skip}
      </a>
      <Nav />
      <main id="main" className="page-in">
        {children}
      </main>
      <Footer />
    </>
  )
}
