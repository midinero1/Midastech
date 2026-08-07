/**
 * Navigation chrome.
 *
 * Two different shapes for two different hands. On a pointer device the
 * navigation is a floating glass capsule at the top, because that is where
 * a cursor expects it. On touch it splits: a slim bar at the top carrying
 * identity only, and the actual navigation moved to a tab bar at the
 * bottom, inside the thumb arc. Phones have been shaped this way for a
 * decade and brand sites are still putting their menu behind a hamburger
 * in the one corner a thumb cannot reach.
 */

import { useEffect, useState } from 'react'
import { LOCALES, NAV, vPath } from './data'
import { useSite } from './i18n'
import { IconHome, IconPack, IconRecipe, IconPin, IconSearch, IconLeaf } from './art'

const TAB_ICONS = { home: IconHome, pack: IconPack, recipe: IconRecipe, pin: IconPin }

/* A wordmark set in the site's own typeface — this concept deliberately
   does not reproduce the brand's registered script logotype. */
export function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-baseline gap-[0.12em] ${className}`}>
      <span className="font-[680] lowercase tracking-[-0.045em] text-ink">violife</span>
      <IconLeaf className="h-[0.46em] w-[0.46em] shrink-0 self-center text-cyan" />
    </span>
  )
}

function ConceptChip({ label }) {
  return (
    <span
      className="hidden rounded-full border border-line px-2 py-[0.15rem] text-[0.55rem] font-semibold uppercase tracking-[0.13em] text-muted sm:inline-block"
      title="An independent design study. Not affiliated with Violife or Flora Food Group."
    >
      {label}
    </span>
  )
}

/** EN / ΕΛ, as a two-up switch rather than a dropdown behind a globe icon. */
function LanguageSwitch({ className = '' }) {
  const { lang, page, t } = useSite()
  return (
    <div className={`glass frost flex items-center rounded-full p-1 ${className}`} role="group" aria-label={t.ui.language}>
      {LOCALES.map((l) => {
        const current = l.code === lang
        return (
          <a
            key={l.code}
            href={vPath(l.code, page)}
            lang={l.code}
            hrefLang={l.code}
            aria-current={current ? 'true' : undefined}
            title={l.label}
            className={`rounded-full px-2.5 py-1 text-[0.7rem] font-semibold transition-colors duration-400 ease-[var(--ease-glass)] ${
              current ? 'bg-ink text-canvas' : 'text-muted hover:text-ink'
            }`}
          >
            {l.short}
          </a>
        )
      })}
    </div>
  )
}

/**
 * Tracks scroll direction so the top bar can get out of the way on the way
 * down and come back on the way up — the standard native behaviour, and the
 * cheapest way to give a long page back its vertical space on a phone.
 */
function useHideOnScroll() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        // Ignore jitter, and never hide near the top of the document.
        if (Math.abs(y - last) > 8) {
          setHidden(y > last && y > 220)
          last = y
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return hidden
}

function TopBar() {
  const { page, t, path } = useSite()
  const hidden = useHideOnScroll()

  const linkClass = (current) =>
    `rounded-full px-4 py-2 text-[0.875rem] font-medium transition-all duration-400 ease-[var(--ease-glass)] ${
      current
        ? 'bg-ink text-canvas shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)]'
        : 'text-body hover:bg-white/55 hover:text-ink'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-glass)] ${
        hidden ? '-translate-y-[130%]' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 pt-3 sm:px-6 sm:pt-5">
        <a
          href={path('home')}
          className="glass frost flex items-center gap-2.5 rounded-full py-2 pl-4 pr-3 text-[1.05rem] sm:text-[1.15rem]"
          aria-label={t.ui.home}
        >
          <Wordmark />
          <ConceptChip label={t.ui.concept} />
        </a>

        {/* Pointer navigation */}
        <nav className="glass frost hidden items-center gap-1 rounded-full p-1.5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.page}
              href={path(item.page)}
              aria-current={item.page === page ? 'page' : undefined}
              className={linkClass(item.page === page)}
            >
              {t.nav[item.page]}
            </a>
          ))}
          <a
            href={path('story')}
            aria-current={page === 'story' ? 'page' : undefined}
            className={linkClass(page === 'story')}
          >
            {t.nav.story}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <a
            href={path('find')}
            aria-label={t.ui.findInStore}
            className="glass frost flex h-11 w-11 items-center justify-center rounded-full text-ink transition-transform duration-400 ease-[var(--ease-glass)] active:scale-95 lg:hidden"
          >
            <IconSearch className="h-[1.15rem] w-[1.15rem]" />
          </a>
          <a href={path('find')} className="btn btn-primary hidden lg:inline-flex">
            {t.ui.findInStore}
          </a>
        </div>
      </div>
    </header>
  )
}

function TabBar() {
  const { page, t, path } = useSite()
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto max-w-md px-3">
        <div className="glass frost-strong flex items-stretch gap-1 rounded-[1.6rem] p-1.5">
          {NAV.map((item) => {
            const Icon = TAB_ICONS[item.icon]
            const current = item.page === page
            return (
              <a
                key={item.page}
                href={path(item.page)}
                aria-current={current ? 'page' : undefined}
                className={`flex flex-1 flex-col items-center gap-1 rounded-[1.15rem] px-1 py-2 transition-all duration-400 ease-[var(--ease-glass)] active:scale-[0.93] ${
                  current ? 'bg-ink text-canvas shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]' : 'text-body'
                }`}
              >
                <Icon className="h-[1.35rem] w-[1.35rem]" />
                <span className="text-[0.625rem] font-semibold tracking-[-0.01em]">{t.nav[item.page]}</span>
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  const { t, path } = useSite()

  const columns = [
    {
      heading: t.footer.range,
      links: ['blocks', 'slices', 'grated', 'creamy', 'drinks'].map((f) => ({
        label: t.formats[f],
        href: `${path('products')}#${f}`,
      })),
    },
    {
      heading: t.footer.kitchen,
      links: [
        { label: t.footer.allRecipes, href: path('recipes') },
        { label: t.footer.quick, href: `${path('recipes')}#quick` },
        { label: t.footer.howItMelts, href: `${path('home')}#proof` },
      ],
    },
    {
      heading: t.footer.brand,
      links: [
        { label: t.footer.ourStory, href: path('story') },
        { label: t.ui.findInStore, href: path('find') },
        { label: t.footer.foodservice, href: path('story') },
      ],
    },
  ]

  return (
    <footer className="relative mt-24 bg-ink text-canvas/70">
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <span className="text-[1.6rem] [&_span]:text-canvas">
              <Wordmark />
            </span>
            <p className="mt-4 max-w-xs text-[0.9rem] leading-relaxed">{t.footer.tagline}</p>
            <a href={path('find')} className="btn btn-glass mt-6 !border-white/20 !bg-white/10 !text-canvas hover:!bg-white/20">
              {t.ui.findInStore}
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-canvas/45">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[0.9rem] transition-colors duration-300 hover:text-canvas">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The disclosure sits in the document rather than in an overlay,
            so it survives a screenshot of the page. */}
        <div className="mt-14 border-t border-white/12 pt-7 text-[0.78rem] leading-relaxed text-canvas/45">
          <p className="max-w-2xl">
            <strong className="font-semibold text-canvas/70">{t.footer.disclosureLead}</strong> {t.footer.disclosure}
          </p>
        </div>
      </div>
    </footer>
  )
}

/** Shared shell for every page in every language. */
export default function Shell({ children }) {
  const { t } = useSite()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-canvas"
      >
        {t.ui.skip}
      </a>
      <TopBar />
      <main id="main" className="page-in">
        {children}
      </main>
      <Footer />
      <TabBar />
      {/* Keeps the last of the footer clear of the floating tab bar. */}
      <div aria-hidden="true" className="h-24 bg-ink lg:hidden" />
    </>
  )
}
