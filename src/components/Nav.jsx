import { useEffect, useState } from 'react'
import Logo from './Logo'
import { ACTIVE_LOGO } from '../content'

const LINKS = [
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'offer', label: 'What We Offer' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  // Condense the bar on scroll and track which section is under it.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setScrolled(window.scrollY > 24)

        const line = window.scrollY + window.innerHeight * 0.32
        let current = ''
        for (const { id } of LINKS) {
          const el = document.getElementById(id)
          if (el && el.offsetTop <= line) current = id
        }
        setActive(current)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Lock the page behind the mobile menu, and let Escape close it.
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
        scrolled || open
          ? 'border-b border-gold/12 bg-ink/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4">
        <a
          href="#top"
          className="shrink-0 transition-opacity duration-300 hover:opacity-80"
          onClick={() => setOpen(false)}
          aria-label="Midas Technology — back to top"
        >
          <Logo variant={ACTIVE_LOGO} markClass="h-8 w-8 sm:h-9 sm:w-9" />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`group relative text-[0.82rem] font-medium tracking-wide transition-colors duration-300 ${
                active === l.id ? 'text-cream' : 'text-muted hover:text-cream'
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)] ${
                  active === l.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                }`}
              />
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-gold/40 bg-gold/8 px-5 py-2 text-[0.8rem] font-medium text-gold transition-all duration-300 hover:border-gold/70 hover:bg-gold/15 hover:shadow-[0_0_28px_-8px_var(--color-gold)]"
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
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors duration-300 hover:bg-gold/10 md:hidden"
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
        className={`overflow-hidden border-t border-gold/10 bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 pb-7 pt-4">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
              className={`border-b border-white/5 py-3.5 font-display text-xl text-cream transition-all duration-500 ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-5 rounded-full border border-gold/40 bg-gold/10 py-3.5 text-center text-sm font-medium text-gold"
          >
            Book a free consultation
          </a>
        </div>
      </div>
    </header>
  )
}
