/** Hand-drawn line icons on a 24×24 grid — same weight and language as the mark. */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  xmlns: 'http://www.w3.org/2000/svg',
}

/** Browser window with an ascending bar motif inside. */
export function WindowIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8.5h19" />
      <circle cx="5.6" cy="6.25" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="7.8" cy="6.25" r="0.55" fill="currentColor" stroke="none" />
      <path d="M7 16.5v-2.2M11 16.5v-4M15 16.5v-3M19 16.5V11" />
    </svg>
  )
}

/** Phone with a signal arc — the companion app. */
export function DeviceIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
      <path d="M10.4 5.3h3.2" />
      <path d="M9.6 12.4h4.8M9.6 15.4h3" />
      <circle cx="12" cy="18.9" r="0.6" fill="currentColor" stroke="none" />
      <path d="M19.4 6.6a5.4 5.4 0 0 1 0 4.4M21.6 5a8 8 0 0 1 0 7.6" opacity="0.55" />
    </svg>
  )
}

/** Shield with a check — ongoing care. */
export function ShieldIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.6 4.5 5.8v5.6c0 4.4 3 8.3 7.5 10 4.5-1.7 7.5-5.6 7.5-10V5.8Z" />
      <path d="M8.9 11.9l2.2 2.2 4.2-4.4" />
    </svg>
  )
}

export const ICONS = {
  window: WindowIcon,
  device: DeviceIcon,
  shield: ShieldIcon,
}

/** Small gold tick used in the service bullet lists. */
export function Tick(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.2 8.4l3 3 6.6-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
