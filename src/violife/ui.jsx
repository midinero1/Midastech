/**
 * Shared interface pieces.
 *
 * Everything selectable in this concept is one control — the segmented
 * picker — reused at three different sizes. A site this small does not
 * need a filter bar, a tab strip and a category menu that all do the same
 * job in three different visual languages.
 */

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ProductArt, DishArt, IconArrow, IconClock, IconClose, IconCheck, IconMelt, IconStretch, IconGrate } from './art'
import { FREE_FROM, NUTRITION_ROWS, PRODUCTS, img } from './data'
import { useSite } from './i18n'

export { default as Reveal } from '../components/Reveal'

/* -------------------------------------------------------------------
   Segmented control

   The indicator is measured off the live DOM rather than assuming equal
   widths, so the same component works with two options or with seven,
   and survives a Greek label being half again as long as its English
   counterpart.
------------------------------------------------------------------- */
export function Segmented({ options, value, onChange, label, className = '' }) {
  const trackRef = useRef(null)
  const btnRefs = useRef({})
  const [box, setBox] = useState(null)

  const measure = useCallback(() => {
    const el = btnRefs.current[value]
    const track = trackRef.current
    if (!el || !track) return
    setBox({ left: el.offsetLeft, width: el.offsetWidth })
    // Keep the active option in view when the track scrolls on a phone.
    const left = el.offsetLeft < track.scrollLeft
    const right = el.offsetLeft + el.offsetWidth > track.scrollLeft + track.clientWidth
    if (left || right) track.scrollTo({ left: el.offsetLeft - 16, behavior: 'smooth' })
  }, [value])

  useLayoutEffect(measure, [measure, options])

  useEffect(() => {
    window.addEventListener('resize', measure)
    // Labels shift once the webfont lands, which moves the indicator.
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return (
    <div
      ref={trackRef}
      role="tablist"
      aria-label={label}
      className={`glass frost rail relative w-full max-w-full gap-1 rounded-full p-1.5 ${className}`}
    >
      {/* The travelling pill. Sliding it rather than cross-fading two states
          is what makes the control feel like one object. */}
      {box && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1.5 top-1.5 rounded-full bg-ink shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] transition-[transform,width] duration-500 ease-[var(--ease-glass)]"
          style={{ width: `${box.width}px`, transform: `translateX(${box.left - 6}px)` }}
        />
      )}
      {options.map((opt) => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            ref={(el) => {
              btnRefs.current[opt.id] = el
            }}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors duration-400 ease-[var(--ease-glass)] ${
              active ? 'text-canvas' : 'text-body hover:text-ink'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

/* -------------------------------------------------------------------
   Disclosure

   Reference detail — ingredients, nutrition — that a minority of people
   want and everybody else should not have to scroll past. Collapsed by
   default, following the pattern the live site already uses: a hairline
   rule, the label, and a plus that becomes a minus.
------------------------------------------------------------------- */
export function Disclosure({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div className="border-t border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">{label}</span>
        {/* Two bars; the upright one collapses to turn + into −. Rotating
            the whole glyph would spin the horizontal bar too, which reads
            as a fidget rather than a state change. */}
        <span aria-hidden="true" className="relative block h-4 w-4 shrink-0 text-teal">
          <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current" />
          <span
            className={`absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-transform duration-400 ease-[var(--ease-glass)] ${
              open ? 'scale-y-0' : 'scale-y-100'
            }`}
          />
        </span>
      </button>

      <div id={id} className="disclosure-panel" data-open={open} role="region">
        <div>
          <div className="pb-5">{children}</div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------
   Section heading
------------------------------------------------------------------- */
export function Heading({ eyebrow, title, body, className = '', align = 'left' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="title mt-3">{title}</h2>
      {body && <p className="lede mt-4">{body}</p>}
    </div>
  )
}

/* -------------------------------------------------------------------
   Pack rendering

   Some products have a real photograph, the rest are drawn. Both go on
   the same neutral field at the same scale so a mixed grid still reads
   as one shelf — which it would not if the photographed packs sat on
   white and the drawn ones on a tint.
------------------------------------------------------------------- */
export function PackShot({ product, name, className = '', scale, eager = false }) {
  if (product.photo) {
    return (
      <img
        src={img(product.photo)}
        alt={name}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`object-contain ${className}`}
        style={scale ? { transform: `scale(${scale})` } : undefined}
      />
    )
  }
  /* A photograph is cropped tight to the pack; the drawn artboard carries
     margin the photograph does not. Without the correction the drawn packs
     sit visibly smaller than the shot ones in the same row. */
  return (
    <ProductArt
      kind={product.kind}
      tone={product.tone}
      name={product.label}
      className={className}
      style={{ transform: `scale(${scale ?? 1.32})` }}
    />
  )
}

/** One field colour for the whole range — the packs supply the contrast. */
export const FIELD = 'bg-[#E9E6DF]'

export function ProductCard({ product, onOpen, className = '' }) {
  const { t } = useSite()
  const c = t.products[product.id]
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className={`group flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-shell text-left transition-all duration-500 ease-[var(--ease-glass)] hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(34,39,42,0.4)] active:scale-[0.985] ${className}`}
    >
      {/* The hover zoom lives on a wrapper: PackShot sets an inline transform
          to normalise drawn art against photography, and an inline transform
          beats a utility class. */}
      <div className={`relative aspect-[4/3] shrink-0 overflow-hidden ${FIELD}`}>
        <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-glass)] group-hover:scale-[1.06]">
          <PackShot product={product} name={c.name} className="h-full w-full p-4 sm:p-5" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.02rem] font-[620] leading-snug tracking-[-0.022em]">{c.name}</h3>
        <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">{c.lead}</p>
        {/* Pushed to the bottom so the link sits on one line across a row of
            cards with different amounts of copy. */}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.8rem] font-semibold text-teal">
          {t.ui.details}
          <IconArrow className="h-3.5 w-3.5 transition-transform duration-400 ease-[var(--ease-glass)] group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  )
}

/* -------------------------------------------------------------------
   Product sheet

   A bottom sheet on touch, a centred panel on a pointer. This brand does
   not sell direct, so a product needs a quick look and a route to a shop
   shelf — not a full page load and a back button.
------------------------------------------------------------------- */
const BEHAVIOUR_ICONS = { melt: IconMelt, stretch: IconStretch, grate: IconGrate }

export function ProductSheet({ product, onClose }) {
  const { t, path } = useSite()
  const panelRef = useRef(null)
  const [shown, setShown] = useState(false)

  // Mount first, then animate in, so the transition has a start state.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!product) return null
  const c = t.products[product.id]

  /*
   * Portalled to <body> rather than rendered in place.
   *
   * `position: fixed` is measured against the nearest ancestor that has a
   * transform, filter or running animation — and <main> carries the
   * page-load animation, which is enough to make Chrome treat it as the
   * containing block. Left inline, the sheet anchors to the top of the
   * document instead of the viewport and lands off-screen on any page the
   * user has scrolled. A portal sidesteps the whole class of problem.
   */
  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label={t.ui.close}
        onClick={onClose}
        className={`absolute inset-0 bg-ink/35 backdrop-blur-md transition-opacity duration-500 ease-[var(--ease-glass)] ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={c.name}
        tabIndex={-1}
        className={`glass frost-strong relative max-h-[92vh] w-full overflow-y-auto rounded-t-[2rem] outline-none transition-transform duration-500 ease-[var(--ease-glass)] sm:max-w-lg sm:rounded-[2rem] ${
          shown ? 'translate-y-0 sm:scale-100' : 'translate-y-full sm:translate-y-0 sm:scale-95'
        }`}
        style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        {/* Grab handle — the affordance that says "drag me down" on touch. */}
        <div className="sticky top-0 z-10 flex justify-center pb-1 pt-3 sm:hidden">
          <span className="h-1.5 w-11 rounded-full bg-ink/18" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={t.ui.close}
          className="absolute right-4 top-4 z-10 hidden h-9 w-9 items-center justify-center rounded-full bg-ink/8 text-ink transition-colors duration-300 hover:bg-ink/14 sm:flex"
        >
          <IconClose className="h-4 w-4" />
        </button>

        <div className={`mx-5 mt-2 overflow-hidden rounded-[1.5rem] ${FIELD}`}>
          <PackShot product={product} name={c.name} eager className="mx-auto h-56 w-full max-w-sm p-6" />
        </div>

        <div className="px-6 pt-6">
          <h2 className="text-[1.6rem] font-[680] leading-tight tracking-[-0.032em]">{c.name}</h2>
          <p className="mt-2 text-[0.95rem] font-medium text-teal">{c.lead}</p>
          <p className="mt-4 text-[0.92rem] leading-relaxed text-body">{c.body}</p>

          {product.behaviour.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.behaviour.map((b) => {
                const Icon = BEHAVIOUR_ICONS[b]
                return (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-shell/70 px-3 py-1.5 text-[0.78rem] font-medium text-ink"
                  >
                    <Icon className="h-3.5 w-3.5 text-teal" />
                    {t.behaviour[b]}
                  </span>
                )
              })}
            </div>
          )}

          <h3 className="mt-7 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">{t.ui.bestFor}</h3>
          <ul className="mt-2.5 space-y-1.5">
            {c.best.map((b) => (
              <li key={b} className="flex items-center gap-2 text-[0.9rem] text-body">
                <IconCheck className="h-4 w-4 shrink-0 text-teal" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-line bg-shell/60 p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">{t.ui.freeFrom}</p>
            <p className="mt-1.5 text-[0.88rem] text-body">{FREE_FROM.map((id) => t.freeFrom[id]).join(' · ')}</p>
          </div>

          <div className="mt-6">
            <Disclosure label={t.ui.ingredients}>
              {c.ingredients ? (
                /* A real declaration, printed verbatim. Not reflowed, not
                   reordered, not translated — the order of a declaration
                   is itself regulated information. */
                <>
                  <p className="text-[0.88rem] leading-relaxed text-body">{c.ingredients}</p>
                  {c.ingredientsNote && (
                    <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">{c.ingredientsNote}</p>
                  )}
                </>
              ) : (
                <>
                  <ul className="space-y-1.5">
                    {t.ingredientsFallback.map((line) => (
                      <li key={line} className="flex gap-2 text-[0.88rem] leading-relaxed text-body">
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-cyan" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[0.78rem] leading-relaxed text-muted">{t.ui.declarationNote}</p>
                </>
              )}
            </Disclosure>

            <Disclosure label={t.ui.nutrition}>
              <table className="w-full text-[0.88rem]">
                <caption className="pb-2 text-left text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  {t.ui.per100}
                </caption>
                <tbody>
                  {NUTRITION_ROWS.map((row) => (
                    <tr key={row} className="border-b border-line/70 last:border-0">
                      <th scope="row" className="py-2 pr-4 text-left font-normal text-body">
                        {t.nutritionRows[row]}
                      </th>
                      <td className="py-2 text-right tabular-nums text-ink">
                        {product.nutrition?.[row] ?? <span className="text-muted">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!product.nutrition && (
                <p className="mt-3 text-[0.78rem] leading-relaxed text-muted">{t.ui.declarationNote}</p>
              )}
            </Disclosure>
          </div>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <a href={path('find')} className="btn btn-primary flex-1">
              {t.ui.findInStore}
            </a>
            <a href={path('recipes')} className="btn btn-glass flex-1">
              {t.ui.recipesWithThis}
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/** Hook that owns the open product, so every page wires the sheet the same way. */
export function useProductSheet() {
  const [product, setProduct] = useState(null)
  const close = useCallback(() => setProduct(null), [])
  return { product, open: setProduct, close }
}

/* -------------------------------------------------------------------
   Recipe card
------------------------------------------------------------------- */
export function RecipeCard({ recipe, className = '' }) {
  const { t, path } = useSite()
  const c = t.recipes[recipe.id]
  const uses = PRODUCTS.find((p) => p.id === recipe.uses)

  return (
    <a
      href={path('recipes')}
      className={`group flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-shell transition-all duration-500 ease-[var(--ease-glass)] hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(34,39,42,0.4)] active:scale-[0.985] ${className}`}
    >
      <div className="relative aspect-[5/4] shrink-0 overflow-hidden bg-mist">
        {recipe.photo ? (
          <img
            src={img(recipe.photo)}
            alt={c.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-glass)] group-hover:scale-[1.05]"
          />
        ) : (
          <DishArt
            kind={recipe.dish}
            className="absolute inset-0 h-full w-full scale-[1.16] transition-transform duration-700 ease-[var(--ease-glass)] group-hover:scale-[1.23]"
          />
        )}
        <span className="glass-photo frost absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold text-ink">
          <IconClock className="h-3.5 w-3.5" />
          {recipe.minutes} {t.ui.minutes}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.02rem] font-[620] leading-snug tracking-[-0.022em]">{c.title}</h3>
        <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">{c.note}</p>
        {uses && <p className="mt-auto pt-3 text-[0.78rem] font-medium text-teal">{t.ui.madeWith(t.products[uses.id].name)}</p>}
      </div>
    </a>
  )
}
