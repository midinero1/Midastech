/**
 * Shared interface pieces.
 *
 * Everything selectable in this concept is one control — the segmented
 * picker — reused at three different sizes. A site this small does not
 * need a filter bar, a tab strip and a category menu that all do the same
 * job in three different visual languages.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ProductArt, DishArt, IconArrow, IconClock, IconClose, IconCheck, IconMelt, IconStretch, IconGrate } from './art'
import { FREE_FROM, PRODUCTS, vPath } from './data'

export { default as Reveal } from '../components/Reveal'

/* -------------------------------------------------------------------
   Segmented control

   The indicator is measured off the live DOM rather than assuming equal
   widths, so the same component works with two options or with seven,
   and survives a label wrapping at a narrow width.
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
    const overflowsLeft = el.offsetLeft < track.scrollLeft
    const overflowsRight = el.offsetLeft + el.offsetWidth > track.scrollLeft + track.clientWidth
    if (overflowsLeft || overflowsRight) {
      track.scrollTo({ left: el.offsetLeft - 16, behavior: 'smooth' })
    }
  }, [value])

  useLayoutEffect(measure, [measure, options])

  useEffect(() => {
    window.addEventListener('resize', measure)
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
   Product card

   The tinted field behind the pack is the only place colour is allowed
   to vary per product, and it is held far enough back that a grid of
   twelve still reads as one shelf rather than a paint chart.
------------------------------------------------------------------- */
/* The ground each pack sits on. Held a clear step deeper than the pack
   itself, because half this range is near-white and disappears against a
   field tinted to match it. */
const FIELD = {
  cheddar: 'bg-[#F0E0BE]',
  mozzarella: 'bg-[#E8E2D2]',
  smoked: 'bg-[#EFDAC2]',
  greek: 'bg-[#E4E7DE]',
  oat: 'bg-[#EBE3D2]',
  herb: 'bg-[#E3E8D2]',
}

export function ProductCard({ product, onOpen, className = '' }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className={`group flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-shell text-left transition-all duration-500 ease-[var(--ease-glass)] hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(16,30,24,0.4)] active:scale-[0.985] ${className}`}
    >
      <div className={`relative aspect-[4/3] shrink-0 ${FIELD[product.tone] ?? FIELD.cheddar}`}>
        {/* The square artboard letterboxes inside a 4:3 field, so it needs
            scaling up to fill the tile rather than floating in it. */}
        <ProductArt
          kind={product.kind}
          tone={product.tone}
          className="absolute inset-0 h-full w-full scale-[1.3] transition-transform duration-700 ease-[var(--ease-glass)] group-hover:scale-[1.38]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.02rem] font-[620] leading-snug tracking-[-0.022em]">{product.name}</h3>
        <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">{product.lead}</p>
        {/* Pushed to the bottom so the link sits on one line across a row of
            cards with different amounts of copy. */}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.8rem] font-semibold text-moss">
          Details
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
const BEHAVIOUR_LABELS = { melt: 'Melts', stretch: 'Stretches', grate: 'Grates' }

export function ProductSheet({ product, onClose }) {
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
        aria-label="Close"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/35 backdrop-blur-md transition-opacity duration-500 ease-[var(--ease-glass)] ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
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
          aria-label="Close"
          className="absolute right-4 top-4 z-10 hidden h-9 w-9 items-center justify-center rounded-full bg-ink/8 text-ink transition-colors duration-300 hover:bg-ink/14 sm:flex"
        >
          <IconClose className="h-4 w-4" />
        </button>

        <div className={`mx-5 mt-2 overflow-hidden rounded-[1.5rem] ${FIELD[product.tone] ?? FIELD.cheddar}`}>
          <ProductArt kind={product.kind} tone={product.tone} className="mx-auto h-52 w-full max-w-sm scale-[1.22]" />
        </div>

        <div className="px-6 pt-6">
          <h2 className="text-[1.6rem] font-[680] leading-tight tracking-[-0.032em]">{product.name}</h2>
          <p className="mt-2 text-[0.95rem] font-medium text-moss">{product.lead}</p>
          <p className="mt-4 text-[0.92rem] leading-relaxed text-body">{product.body}</p>

          {product.behaviour.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.behaviour.map((b) => {
                const Icon = BEHAVIOUR_ICONS[b]
                return (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-shell/70 px-3 py-1.5 text-[0.78rem] font-medium text-ink"
                  >
                    <Icon className="h-3.5 w-3.5 text-moss" />
                    {BEHAVIOUR_LABELS[b]}
                  </span>
                )
              })}
            </div>
          )}

          <h3 className="mt-7 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">Best for</h3>
          <ul className="mt-2.5 space-y-1.5">
            {product.best.map((b) => (
              <li key={b} className="flex items-center gap-2 text-[0.9rem] text-body">
                <IconCheck className="h-4 w-4 shrink-0 text-leaf" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-line bg-shell/60 p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">Free from</p>
            <p className="mt-1.5 text-[0.88rem] text-body">{FREE_FROM.join(' · ')}</p>
          </div>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <a href={vPath('find')} className="btn btn-primary flex-1">
              Find in store
            </a>
            <a href={vPath('recipes')} className="btn btn-glass flex-1">
              Recipes with this
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
  const uses = PRODUCTS.find((p) => p.id === recipe.uses)
  return (
    <a
      href={vPath('recipes')}
      className={`group flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-shell transition-all duration-500 ease-[var(--ease-glass)] hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(16,30,24,0.4)] active:scale-[0.985] ${className}`}
    >
      <div className="relative aspect-[5/4] shrink-0 bg-mist">
        <DishArt
          kind={recipe.dish}
          className="absolute inset-0 h-full w-full scale-[1.16] transition-transform duration-700 ease-[var(--ease-glass)] group-hover:scale-[1.23]"
        />
        <span className="glass frost absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold text-ink">
          <IconClock className="h-3.5 w-3.5" />
          {recipe.minutes} min
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.02rem] font-[620] leading-snug tracking-[-0.022em]">{recipe.title}</h3>
        <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">{recipe.note}</p>
        {uses && <p className="mt-auto pt-3 text-[0.78rem] font-medium text-moss">Made with {uses.name}</p>}
      </div>
    </a>
  )
}
