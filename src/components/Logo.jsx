import { useId } from 'react'

/**
 * The Midas mark.
 *
 * A geometric M with deliberately asymmetric peaks — the right shoulder rises
 * higher than the left, so the silhouette reads as an ascent as well as a
 * monogram. It is drawn as four separate facets rather than one flat shape:
 * the left stem and the rising stroke catch the light, the falling stroke and
 * the right stem fall into shadow. That alternation is what gives it the look
 * of struck metal instead of a flat glyph, and it survives all the way down to
 * a 16px favicon because the silhouette does the work on its own.
 *
 * A soft disc sits behind the taller shoulder — a sunrise, and the only part
 * of the mark that fades out at small sizes, which is by design.
 */

// The complete outline, used for the engraved edge. Both stem tops are cut on
// a slight angle rather than flat — a chisel mark, and the detail that stops
// the glyph reading as a default font weight.
const M_OUTLINE = 'M12 52 L12 22 L19 20 L32 40 L45 12 L52 14 L52 52 L45 52 L45 24 L32 52 L19 32 L19 52 Z'
// Lit facets: the falling stroke, and the tall right shoulder the sun sits behind.
const M_LIT = 'M19 20 L32 40 L32 52 L19 32 Z M45 12 L52 14 L52 52 L45 52 Z'
// Shadowed facets: the left stem and the stroke rising between them.
const M_SHADOW = 'M12 22 L19 20 L19 52 L12 52 Z M32 40 L45 12 L45 24 L32 52 Z'

const TONES = {
  // On the ivory canvas.
  light: { lit: ['#E9C860', '#C9A227'], shadow: ['#A8821E', '#6E4E10'], edge: '#6E4E10', edgeOpacity: 0.32, sun: 0.2 },
  // On espresso bands — everything runs a stop brighter.
  dark: { lit: ['#FBEFC4', '#E4C868'], shadow: ['#C9A227', '#96741B'], edge: '#2A2113', edgeOpacity: 0.25, sun: 0.34 },
}

export function LogoMark({ variant = 'light', className = 'h-9 w-9', title }) {
  const uid = useId().replace(/:/g, '')
  const t = TONES[variant] ?? TONES.light
  const lit = `lit-${uid}`
  const shadow = `shd-${uid}`
  const sun = `sun-${uid}`

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={lit} x1="12" y1="52" x2="46" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={t.lit[1]} />
          <stop offset="1" stopColor={t.lit[0]} />
        </linearGradient>
        <linearGradient id={shadow} x1="20" y1="14" x2="50" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={t.shadow[0]} />
          <stop offset="1" stopColor={t.shadow[1]} />
        </linearGradient>
        <radialGradient id={sun} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#E9C860" stopOpacity={t.sun} />
          <stop offset="0.62" stopColor="#C9A227" stopOpacity={t.sun * 0.28} />
          <stop offset="1" stopColor="#C9A227" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="48" cy="16" r="12" fill={`url(#${sun})`} />
      <path d={M_SHADOW} fill={`url(#${shadow})`} />
      <path d={M_LIT} fill={`url(#${lit})`} />
      <path
        d={M_OUTLINE}
        fill="none"
        stroke={t.edge}
        strokeOpacity={t.edgeOpacity}
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Wordmark: display serif over letterspaced sans. `rule` adds the hairline
 * between the two words for larger lockups.
 */
export function Wordmark({ variant = 'light', rule = false, className = '' }) {
  const dark = variant === 'dark'
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span
        className={`font-display text-[1.18rem] font-medium tracking-[0.015em] sm:text-[1.3rem] ${
          dark ? 'text-canvas' : 'text-ink'
        }`}
      >
        Midas
      </span>
      {rule && <span className={`my-1.5 h-px w-full ${dark ? 'bg-gilt/45' : 'bg-gold/45'}`} />}
      <span
        className={`text-[0.55rem] font-semibold uppercase tracking-[0.34em] sm:text-[0.58rem] ${
          rule ? '' : 'mt-[0.22rem]'
        } ${dark ? 'text-gilt' : 'text-bronze'}`}
      >
        Technology
      </span>
    </span>
  )
}

export default function Logo({ variant = 'light', className = '', markClass = 'h-10 w-10', rule = false }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} className={markClass} title="Midas Technology" />
      <Wordmark variant={variant} rule={rule} />
    </span>
  )
}
