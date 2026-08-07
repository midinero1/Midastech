/**
 * First-visit language gate.
 *
 * Two things make this bearable rather than the usual interstitial nuisance:
 * it appears exactly once and never again, and it guesses. The browser
 * already knows what language the visitor reads, so the matching option is
 * marked and focused — a Greek visitor presses Enter, or taps the row their
 * eye lands on first.
 *
 * Its own copy cannot come from the dictionary. At the moment it renders,
 * the visitor has not told us what they read, and showing "Choose your
 * language" in Greek to somebody who does not read Greek is the exact
 * problem the component exists to solve. So the heading is bilingual and
 * each option is written in its own language — the one rule of a language
 * chooser that is never worth breaking.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LOCALES, img, vPath } from './data'
import { useSite } from './i18n'
import { IconArrow } from './art'

const STORAGE_KEY = 'violife:lang'

/** Read once, synchronously, so a returning visitor never sees a flash. */
function alreadyChosen() {
  try {
    return Boolean(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    // Private mode, or storage disabled. Better to stay quiet than to
    // show the gate on every single page view.
    return true
  }
}

function remember(code) {
  try {
    window.localStorage.setItem(STORAGE_KEY, code)
  } catch {
    /* nothing to do — the picker simply asks again next time */
  }
}

export default function LanguagePicker() {
  const { lang, page } = useSite()
  const [open, setOpen] = useState(() => typeof window !== 'undefined' && !alreadyChosen())
  const [shown, setShown] = useState(false)
  const panelRef = useRef(null)
  const firstRef = useRef(null)

  /* The language the browser says this person reads, if we offer it. */
  const suggested = useMemo(() => {
    if (typeof navigator === 'undefined') return null
    const codes = [navigator.language, ...(navigator.languages ?? [])].filter(Boolean)
    for (const c of codes) {
      const base = c.toLowerCase().split('-')[0]
      if (LOCALES.some((l) => l.code === base)) return base
    }
    return null
  }, [])

  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => setShown(true))
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') choose(lang)
    }
    window.addEventListener('keydown', onKey)
    // Land the focus on the language we think they want.
    const focusId = setTimeout(() => firstRef.current?.focus(), 260)
    return () => {
      cancelAnimationFrame(id)
      clearTimeout(focusId)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function choose(code) {
    remember(code)
    if (code === lang) {
      setShown(false)
      setTimeout(() => setOpen(false), 320)
      return
    }
    window.location.href = vPath(code, page)
  }

  if (!open) return null

  // Order the list so the suggested language sits on top.
  const ordered = [...LOCALES].sort((a, b) => (a.code === suggested ? -1 : b.code === suggested ? 1 : 0))

  return createPortal(
    <div
      /* Centred on every size. A bottom sheet is right for something you
         opened; this one opened itself, and centring reads as a welcome
         rather than as something that slid up and stopped. The card is
         short enough that both options stay inside the thumb arc. */
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your language · Επιλέξτε γλώσσα"
    >
      <div
        className={`absolute inset-0 bg-ink/55 backdrop-blur-lg transition-opacity duration-500 ease-[var(--ease-glass)] ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        className={`glass frost-strong relative w-full max-w-md overflow-hidden rounded-[1.75rem] transition-all duration-500 ease-[var(--ease-glass)] sm:rounded-[2rem] ${
          shown ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-[0.97] opacity-0'
        }`}
        style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* The cheese. A real photograph earns the top third far better
            than anything drawn, and it says what the site is about before
            a word has been read. */}
        <div className="relative h-40 w-full overflow-hidden sm:h-48">
          <img
            src={img('dish-greek-white-pizza.webp')}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          {/* Pooled behind the wordmark rather than laid over the whole
              photograph. A flat scrim strong enough to carry the cyan
              "100% vegan" line would also drain the pizza, which is the
              other half of what this panel is for. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(62% 58% at 50% 44%, rgba(34,39,42,0.62), rgba(34,39,42,0.18) 68%, rgba(34,39,42,0) 100%)',
            }}
          />
          <img
            src={img('violife-wordmark.webp')}
            alt="Violife"
            className="absolute left-1/2 top-1/2 w-[8.5rem] -translate-x-1/2 -translate-y-[62%] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:w-[10rem]"
          />
          {/* Grounds the card against the photo so the heading below has a
              clean edge to sit on rather than a hard seam. */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas to-transparent" />
        </div>

        <div className="px-5 pb-5 pt-2 sm:px-7 sm:pb-7">
          <h2 className="text-center text-[1.35rem] font-[680] leading-tight tracking-[-0.03em] sm:text-[1.5rem]">
            Επιλέξτε γλώσσα
          </h2>
          <p className="mt-0.5 text-center text-[0.95rem] font-medium text-muted">Choose your language</p>

          <div className="mt-5 space-y-2.5">
            {ordered.map((l, i) => {
              const isSuggested = l.code === suggested
              return (
                <button
                  key={l.code}
                  ref={i === 0 ? firstRef : undefined}
                  type="button"
                  lang={l.code}
                  onClick={() => choose(l.code)}
                  className={`group flex w-full items-center gap-3.5 rounded-[1.25rem] border px-4 py-3.5 text-left transition-all duration-400 ease-[var(--ease-glass)] active:scale-[0.98] ${
                    isSuggested
                      ? 'border-teal/40 bg-shell shadow-[0_14px_32px_-20px_rgba(34,39,42,0.6)]'
                      : 'border-line bg-shell/65 hover:bg-shell'
                  }`}
                >
                  <span aria-hidden="true" className="text-[1.6rem] leading-none">
                    {l.flag}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1.05rem] font-[620] tracking-[-0.02em] text-ink">{l.label}</span>
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-transform duration-400 ease-[var(--ease-glass)] group-hover:translate-x-0.5">
                    <IconArrow className="h-4 w-4" />
                  </span>
                </button>
              )
            })}
          </div>

          <p className="mt-4 text-center text-[0.72rem] leading-relaxed text-muted">
            Μπορείτε να αλλάξετε γλώσσα ανά πάσα στιγμή. · You can change this at any time.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
