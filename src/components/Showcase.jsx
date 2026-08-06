/**
 * An illustrative mock of what a client gets: a site in a browser frame with
 * the companion app in front of it. Everything is drawn with CSS — no images,
 * nothing to load — and it is deliberately abstract rather than a screenshot
 * of any real business.
 */

const MENU = [
  ['Flat White', '4.20'],
  ['Cortado', '3.80'],
  ['Almond Croissant', '3.50'],
]

function Browser() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/4 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 flex h-5 flex-1 items-center rounded-full bg-black/40 px-3 text-[0.5rem] tracking-wide text-muted/70">
          thecornercafe.com
        </span>
      </div>

      {/* Page */}
      <div className="p-4 sm:p-5">
        <div className="relative h-24 overflow-hidden rounded-lg border border-gold/25 bg-gradient-to-br from-gold/45 via-amber/30 to-ink-3 sm:h-28">
          <div className="absolute bottom-3 left-3.5">
            <div className="h-2.5 w-28 rounded-full bg-cream/85" />
            <div className="mt-1.5 h-1.5 w-16 rounded-full bg-cream/45" />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <span className="h-4 w-14 rounded-full bg-gold/55" />
          <span className="h-4 w-10 rounded-full bg-white/14" />
          <span className="h-4 w-12 rounded-full bg-white/14" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-white/14 bg-white/7 p-2.5">
              <div className="h-8 rounded bg-gradient-to-br from-white/22 to-white/6" />
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/28" />
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-white/14" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Phone({ className = '' }) {
  return (
    <div
      className={`w-[8.5rem] rounded-[1.6rem] border border-white/14 bg-ink-3 p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)] sm:w-40 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.25rem] bg-ink px-3 pb-3.5 pt-4">
        {/* Notch */}
        <span className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-white/12" />

        <p className="mt-1.5 font-display text-[0.72rem] leading-none text-cream">Order ahead</p>
        <p className="mt-1 text-[0.44rem] uppercase tracking-[0.18em] text-gold/80">Ready in 6 min</p>

        <div className="mt-3 flex flex-col gap-1.5">
          {MENU.map(([item, price], i) => (
            <div
              key={item}
              className={`flex items-center justify-between rounded-md border px-2 py-1.5 ${
                i === 0 ? 'border-gold/35 bg-gold/10' : 'border-white/7 bg-white/3'
              }`}
            >
              <span className="text-[0.5rem] text-cream/85">{item}</span>
              <span className={`text-[0.5rem] ${i === 0 ? 'text-gold' : 'text-muted'}`}>{price}</span>
            </div>
          ))}
        </div>

        {/* Loyalty stamps */}
        <div className="mt-3 flex items-center gap-1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i < 4 ? 'bg-gradient-to-br from-brass to-gilt' : 'border border-white/15'}`}
            />
          ))}
          <span className="ml-auto text-[0.42rem] text-muted">4 / 6</span>
        </div>

        <div className="mt-3 rounded-full bg-gradient-to-r from-brass to-gold py-1.5 text-center text-[0.5rem] font-semibold text-ink">
          Pay &amp; collect
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  return (
    <div className="relative" aria-hidden="true">
      {/* Warm pool behind the composition. */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-gold/8 blur-3xl" />

      <div className="drift relative pl-8 sm:pl-14 lg:pl-10">
        <Browser />
        <Phone className="absolute -bottom-10 -left-2 sm:-bottom-12 sm:-left-4 lg:-bottom-14 lg:-left-6" />
      </div>
    </div>
  )
}
