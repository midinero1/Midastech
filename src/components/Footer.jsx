import { LogoMark, Wordmark } from './Logo'
import { ACTIVE_LOGO, CONTACT } from '../content'

// Placeholder destinations — point these at the real profiles when they exist.
const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    path: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
        <path d="M8 10.5v6M8 7.4v.1M12 16.5v-3.4a2 2 0 0 1 4 0v3.4M12 16.5v-6" />
      </>
    ),
  },
  {
    label: 'X',
    href: '#',
    path: <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />,
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink-2/50">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2.5" aria-label="Midas Technology — back to top">
              <LogoMark variant={ACTIVE_LOGO} className="h-9 w-9" title="Midas Technology" />
              <Wordmark />
            </a>
            <p className="mt-5 text-[0.86rem] leading-relaxed text-muted">
              Websites and companion apps for cafés, restaurants and the shops that hold a street together.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[0.66rem] uppercase tracking-[0.24em] text-muted">Explore</span>
            {[
              ['Philosophy', '#philosophy'],
              ['What We Offer', '#offer'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-[0.9rem] text-cream/80 transition-colors duration-300 hover:text-gold"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[0.66rem] uppercase tracking-[0.24em] text-muted">Direct</span>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-[0.9rem] text-cream/80 transition-colors duration-300 hover:text-gold"
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="text-[0.9rem] text-cream/80 transition-colors duration-300 hover:text-gold"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>

        <div className="rule-gold my-10 opacity-40" />

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-[0.78rem] text-muted">
            © {new Date().getFullYear()} Midas Technology. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition-all duration-300 hover:border-gold/45 hover:text-gold"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  {s.path}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
