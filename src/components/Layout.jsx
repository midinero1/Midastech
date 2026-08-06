import Nav from './Nav'
import Footer from './Footer'

/**
 * Shared shell for every page. `path` drives the active nav state; each page
 * entry passes its own so the four documents stay in sync.
 */
export default function Layout({ path = '/', children }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
      >
        Skip to content
      </a>
      <Nav path={path} />
      <main id="main" className="page-in">
        {children}
      </main>
      <Footer />
    </>
  )
}
