import { LogoMark, Wordmark } from './Logo'
import LanguageSwitch from './LanguageSwitch'
import { CONTACT, navLinks, pagePath, useSite } from '../i18n'

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
  { label: 'X', href: '#', path: <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" /> },
]

export default function Footer() {
  const { lang, t } = useSite()

  return (
    <footer className="relative overflow-hidden bg-ink text-canvas">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_24rem_at_82%_0%,rgba(201,162,39,0.16),transparent_62%)]" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <a href={pagePath(lang, 'home')} className="flex items-center gap-3" aria-label={t.ui.homeAria}>
              <LogoMark variant="dark" className="h-11 w-11" title="Midas Technology" />
              <Wordmark variant="dark" />
            </a>
            <p className="mt-6 text-[0.88rem] leading-relaxed text-canvas/60">{t.footer.tagline}</p>
            <LanguageSwitch tone="dark" className="mt-6 w-fit" />
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-gilt/80">
              {t.footer.pages}
            </span>
            {navLinks(lang, t).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[0.9rem] text-canvas/75 transition-colors duration-300 hover:text-gilt"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3.5">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-gilt/80">
              {t.footer.direct}
            </span>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-[0.9rem] text-canvas/75 transition-colors duration-300 hover:text-gilt"
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="text-[0.9rem] text-canvas/75 transition-colors duration-300 hover:text-gilt"
            >
              {CONTACT.phone}
            </a>
            <p className="mt-1 max-w-[16rem] text-[0.78rem] leading-relaxed text-canvas/45">{t.contactPage.hours}</p>
          </div>
        </div>

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-gilt/25 to-transparent" />

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-[0.78rem] text-canvas/45">{t.footer.rights(new Date().getFullYear())}</p>

          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-canvas/15 text-canvas/55 transition-all duration-300 hover:border-gilt/60 hover:text-gilt"
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
