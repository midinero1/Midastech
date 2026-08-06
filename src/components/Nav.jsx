import { useEffect, useState } from 'react'
import Logo from './Logo'
import { NAV } from '../content'

/** Marks the current page. `/` only matches exactly; the rest match their prefix. */
function isCurrent(href, path) {
  if (href === '/') return path === '/' || path === '/index.html'
  return path.startsWith(href.replace(/\/$/, ''))
}

export default function Nav({ path = '/' }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setScrolled(window.scrollY > 20)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'border-b border-sand bg-canvas/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4">
        <a
          href="/"
          className="shrink-0 transition-opacity duration-300 hover:opacity-75"
          aria-label="Midas Technology — home"
        >
          <Logo markClass="h-9 w-9 sm:h-10 sm:w-10" />
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((l) => {
            const current = isCurrent(l.href, path)
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={current ? 'page' : undefined}
                className={`group relative text-[0.84rem] font-medium transition-colors duration-300 ${
                  current ? 'text-ink' : 'text-slate hover:text-ink'
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)] ${
                    current ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-70'
                  }`}
                />
              </a>
            )
          })}
          <a
            href="/contact/"
            className="rounded-full bg-ink px-5 py-2.5 text-[0.8rem] font-medium text-canvas transition-all duration-300 hover:bg-ember hover:shadow-[0_10px_28px_-12px_rgba(110,78,16,0.8)]"
          >
            Book a consultation
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-porcelain/70 text-ink transition-colors duration-300 hover:border-gold/60 md:hidden"
        >
          <span className="relative block h-3 w-4.5">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden border-t border-sand bg-canvas/97 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:hidden ${
          open ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-5 pb-7 pt-3">
          {NAV.map((l, i) => {
            const current = isCurrent(l.href, path)
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={current ? 'page' : undefined}
                style={{ transitionDelay: open ? `${70 + i * 55}ms` : '0ms' }}
                className={`flex items-center justify-between border-b border-sand/70 py-3.5 font-display text-xl transition-all duration-500 ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
                } ${current ? 'text-bronze' : 'text-ink'}`}
              >
                {l.label}
                {current && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
              </a>
            )
          })}
          <a
            href="/contact/"
            className="mt-6 rounded-full bg-ink py-3.5 text-center text-sm font-medium text-canvas"
          >
            Book a free consultation
          </a>
        </div>
      </div>
    </header>
  )
}
