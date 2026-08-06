import { useId } from 'react'

/**
 * Three directions for the Midas mark. All are drawn on a 48×48 grid so they
 * stay legible down to favicon size, and all share the same ascending-M
 * geometry so the brand still reads as one family whichever is chosen.
 *
 *   ascent  — fluid stroke; the M doubles as a rising chart line, with a
 *             soft sun behind the higher peak.
 *   circuit — same geometry, technical treatment: mitred stroke plus three
 *             node squares at the peaks and the valley.
 *   crest   — an emblem: solid M glyph inside a double-hairline seal.
 */
export const LOGO_VARIANTS = ['ascent', 'circuit', 'crest']

export function LogoMark({ variant = 'ascent', className = 'h-9 w-9', title }) {
  const uid = useId().replace(/:/g, '')
  const grad = `mg-${variant}-${uid}`
  const soft = `ms-${variant}-${uid}`

  const defs = (
    <defs>
      <linearGradient id={grad} x1="6" y1="42" x2="42" y2="6" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#8A5A12" />
        <stop offset="0.42" stopColor="#C9A227" />
        <stop offset="0.74" stopColor="#F3D783" />
        <stop offset="1" stopColor="#D4AF37" />
      </linearGradient>
      <radialGradient id={soft} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#F3D783" stopOpacity="0.55" />
        <stop offset="1" stopColor="#8A5A12" stopOpacity="0" />
      </radialGradient>
    </defs>
  )

  const svgProps = {
    viewBox: '0 0 48 48',
    className,
    role: title ? 'img' : 'presentation',
    'aria-hidden': title ? undefined : true,
    xmlns: 'http://www.w3.org/2000/svg',
  }

  if (variant === 'circuit') {
    return (
      <svg {...svgProps}>
        {title ? <title>{title}</title> : null}
        {defs}
        <path
          d="M7 40 L14.5 14 L24 28.5 L34 8 L41 40"
          fill="none"
          stroke={`url(#${grad})`}
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Three nodes: the two peaks and the valley between them. */}
        <rect x="12.1" y="11.6" width="4.8" height="4.8" fill="#0B0B0E" stroke={`url(#${grad})`} strokeWidth="1.5" />
        <rect x="21.6" y="26.1" width="4.8" height="4.8" fill="#0B0B0E" stroke={`url(#${grad})`} strokeWidth="1.5" />
        <rect x="30.8" y="4.8" width="6.4" height="6.4" fill={`url(#${grad})`} />
      </svg>
    )
  }

  if (variant === 'crest') {
    return (
      <svg {...svgProps}>
        {title ? <title>{title}</title> : null}
        {defs}
        <rect x="1.6" y="1.6" width="44.8" height="44.8" rx="12" fill={`url(#${soft})`} fillOpacity="0.22" />
        <rect
          x="1.6"
          y="1.6"
          width="44.8"
          height="44.8"
          rx="12"
          fill="none"
          stroke={`url(#${grad})`}
          strokeWidth="1.6"
        />
        <rect
          x="5.2"
          y="5.2"
          width="37.6"
          height="37.6"
          rx="9"
          fill="none"
          stroke={`url(#${grad})`}
          strokeWidth="0.8"
          strokeOpacity="0.45"
        />
        <path
          d="M12 34 L12 15 L16.6 15 L24 25.6 L31.4 15 L36 15 L36 34 L32 34 L32 21.4 L25.4 30.6 L22.6 30.6 L16 21.4 L16 34 Z"
          fill={`url(#${grad})`}
        />
      </svg>
    )
  }

  // ascent (default)
  return (
    <svg {...svgProps}>
      {title ? <title>{title}</title> : null}
      {defs}
      {/* Rising sun behind the taller peak. */}
      <circle cx="34" cy="11" r="10" fill={`url(#${soft})`} />
      <path
        d="M6.8 40.4 L14.2 13.6 L24 28.6 L34 7.6 L41.2 40.4"
        fill="none"
        stroke={`url(#${grad})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Wordmark lockup: display serif "Midas" over letterspaced sans "Technology".
 * `compact` drops the second line for tight spots (footer, small screens).
 */
export function Wordmark({ className = '', compact = false }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-display text-[1.15rem] font-medium tracking-[0.01em] text-cream sm:text-[1.25rem]">
        Midas
      </span>
      {!compact && (
        <span className="mt-[0.2rem] text-[0.56rem] font-medium uppercase tracking-[0.34em] text-gold/85 sm:text-[0.6rem]">
          Technology
        </span>
      )}
    </span>
  )
}

export default function Logo({ variant = 'ascent', className = '', markClass = 'h-9 w-9', compact = false }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} className={markClass} title="Midas Technology" />
      <Wordmark compact={compact} />
    </span>
  )
}
