import { LOCALES, pagePath, useSite } from '../i18n'

/**
 * Two chips, EN and ΕΛ, each linking to the same page in the other language.
 * Rendered as real links so the alternate URL is crawlable and so switching
 * language keeps you on the page you were reading.
 */
export default function LanguageSwitch({ className = '', tone = 'light' }) {
  const { lang, page, t } = useSite()
  const dark = tone === 'dark'

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border p-0.5 ${
        dark ? 'border-canvas/20' : 'border-sand'
      } ${className}`}
      role="group"
      aria-label={t.ui.language}
    >
      {LOCALES.map((loc) => {
        const active = loc.code === lang
        return (
          <a
            key={loc.code}
            href={pagePath(loc.code, page)}
            hrefLang={loc.code}
            lang={loc.code}
            aria-current={active ? 'true' : undefined}
            title={loc.label}
            className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.08em] transition-colors duration-300 ${
              active
                ? dark
                  ? 'bg-gilt/90 text-ink'
                  : 'bg-ink text-canvas'
                : dark
                  ? 'text-canvas/55 hover:text-gilt'
                  : 'text-stone hover:text-ink'
            }`}
          >
            {loc.short}
          </a>
        )
      })}
    </div>
  )
}
