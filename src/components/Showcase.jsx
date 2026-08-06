/**
 * An illustrative mock of what a client gets: their site in a browser frame
 * with the companion app in front of it. Drawn entirely in CSS — no images,
 * nothing to load — and deliberately abstract rather than a screenshot of any
 * real business. The dark phone against the pale browser is what gives the
 * composition its depth on an ivory page.
 */

const MENU = [
  ['Flat White', '4.20'],
  ['Cortado', '3.80'],
  ['Almond Croissant', '3.50'],
]

function Browser() {
  return (
    <div className="overflow-hidden rounded-xl border border-sand bg-porcelain shadow-[0_2px_4px_rgba(20,17,13,0.04),0_40px_80px_-40px_rgba(20,17,13,0.35)]">
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-sand bg-linen/70 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-ink/12" />
        <span className="h-2 w-2 rounded-full bg-ink/12" />
        <span className="h-2 w-2 rounded-full bg-ink/12" />
        <span className="ml-2 flex h-5 flex-1 items-center rounded-full bg-canvas px-3 text-[0.5rem] tracking-wide text-stone">
          thecornercafe.com
        </span>
      </div>

      {/* Page */}
      <div className="p-4 sm:p-5">
        <div className="relative h-24 overflow-hidden rounded-lg bg-gradient-to-br from-gold via-[#b8912a] to-ember sm:h-28">
          <div className="absolute bottom-3 left-3.5">
            <div className="h-2.5 w-28 rounded-full bg-canvas/90" />
            <div className="mt-1.5 h-1.5 w-16 rounded-full bg-canvas/55" />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <span className="h-4 w-14 rounded-full bg-gold/45" />
          <span className="h-4 w-10 rounded-full bg-sand" />
          <span className="h-4 w-12 rounded-full bg-sand" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-sand bg-canvas p-2.5">
              <div className="h-8 rounded bg-gradient-to-br from-linen to-sand" />
              <div className="mt-2 h-1.5 w-full rounded-full bg-ink/18" />
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-ink/10" />
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
      className={`w-[8.5rem] rounded-[1.6rem] border border-ink/70 bg-ink p-1.5 shadow-[0_30px_60px_-24px_rgba(20,17,13,0.7)] sm:w-40 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.25rem] bg-[#1c1813] px-3 pb-3.5 pt-4">
        <span className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-canvas/15" />

        <p className="mt-1.5 font-display text-[0.72rem] leading-none text-canvas">Order ahead</p>
        <p className="mt-1 text-[0.44rem] font-semibold uppercase tracking-[0.18em] text-gilt">Ready in 6 min</p>

        <div className="mt-3 flex flex-col gap-1.5">
          {MENU.map(([item, price], i) => (
            <div
              key={item}
              className={`flex items-center justify-between rounded-md border px-2 py-1.5 ${
                i === 0 ? 'border-gilt/45 bg-gilt/12' : 'border-canvas/10 bg-canvas/5'
              }`}
            >
              <span className="text-[0.5rem] text-canvas/85">{item}</span>
              <span className={`text-[0.5rem] ${i === 0 ? 'text-gilt' : 'text-canvas/50'}`}>{price}</span>
            </div>
          ))}
        </div>

        {/* Loyalty stamps */}
        <div className="mt-3 flex items-center gap-1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i < 4 ? 'bg-gradient-to-br from-gold to-gilt' : 'border border-canvas/20'
              }`}
            />
          ))}
          <span className="ml-auto text-[0.42rem] text-canvas/45">4 / 6</span>
        </div>

        <div className="mt-3 rounded-full bg-gradient-to-r from-gold to-gilt py-1.5 text-center text-[0.5rem] font-semibold text-ink">
          Pay &amp; collect
        </div>
      </div>
    </div>
  )
}

export default function Showcase() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-gold/12 blur-3xl" />

      <div className="drift relative pl-8 sm:pl-14 lg:pl-10">
        <Browser />
        <Phone className="absolute -bottom-10 -left-2 sm:-bottom-12 sm:-left-4 lg:-bottom-14 lg:-left-6" />
      </div>
    </div>
  )
}
