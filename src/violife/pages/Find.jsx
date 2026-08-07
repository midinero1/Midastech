import { useMemo, useState } from 'react'
import { IconPin, IconSearch, IconCheck } from '../art'
import { FORMATS, STOCKISTS } from '../data'
import { Heading, Reveal, Segmented } from '../ui'

/* Hand-placed so the pins never collide and the list order reads
   clockwise from the centre. */
const PIN_POS = [
  { x: 128, y: 96 },
  { x: 74, y: 138 },
  { x: 196, y: 130 },
  { x: 108, y: 190 },
  { x: 214, y: 62 },
]

/**
 * A schematic, not a map.
 *
 * A real build drops a map provider in here. For a concept, an honest
 * diagram beats a screenshot of somebody else's tiles — and it makes the
 * point that the useful information is which shelf has what, not which
 * street the shop is on.
 */
function MapPlan({ stores, selected, onSelect }) {
  return (
    <svg viewBox="0 0 280 240" className="h-full w-full" role="presentation" focusable="false">
      <rect width="280" height="240" fill="#ECE8DF" />

      {/* blocks */}
      {[
        [18, 24, 76, 58],
        [110, 16, 92, 46],
        [218, 30, 50, 74],
        [22, 100, 58, 66],
        [96, 84, 74, 62],
        [186, 122, 78, 56],
        [30, 182, 92, 44],
        [140, 166, 60, 58],
        [212, 194, 54, 34],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#F6F4EE" />
      ))}

      {/* roads */}
      <g stroke="#DCD6C9" strokeWidth="3" strokeLinecap="round">
        <path d="M0 92h280M0 174h280M88 0v240M178 0v240" />
      </g>
      <path d="M0 132 Q90 118 280 152" stroke="#DCD6C9" strokeWidth="2.5" fill="none" />

      {/* you */}
      <circle cx="140" cy="132" r="17" fill="#2E8F62" opacity="0.16" />
      <circle cx="140" cy="132" r="6" fill="#2E8F62" stroke="#FFFFFF" strokeWidth="2.5" />

      {stores.map((s, i) => {
        const pos = PIN_POS[STOCKISTS.indexOf(s) % PIN_POS.length]
        const active = selected === s.name
        return (
          <g
            key={s.name}
            transform={`translate(${pos.x} ${pos.y})`}
            className="cursor-pointer"
            onClick={() => onSelect(s.name)}
          >
            <ellipse cx="0" cy="3" rx="9" ry="3" fill="#101E18" opacity="0.14" />
            <path
              d="M0 1c0 0-9-7.6-9-13a9 9 0 1 1 18 0c0 5.4-9 13-9 13Z"
              fill={active ? '#1B5A3F' : '#FFFFFF'}
              stroke={active ? '#1B5A3F' : '#B9B1A0'}
              strokeWidth="1.4"
              className="transition-all duration-400 ease-[var(--ease-glass)]"
            />
            <circle cx="0" cy="-12" r="3.2" fill={active ? '#EFDDB4' : '#1B5A3F'} />
          </g>
        )
      })}
    </svg>
  )
}

export default function Find() {
  const [format, setFormat] = useState('all')
  const [selected, setSelected] = useState(STOCKISTS[0].name)

  const shown = useMemo(
    () => (format === 'all' ? STOCKISTS : STOCKISTS.filter((s) => s.has.includes(format))),
    [format],
  )

  return (
    <>
      <section className="lit grain relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pt-36">
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal>
            <Heading
              eyebrow="Store locator"
              title="Find it nearby."
              body="Search once, then filter by what you actually came for. No point walking to a shop that only carries slices when you need a block."
            />
          </Reveal>

          <Reveal delay={100} className="mt-8">
            <form onSubmit={(e) => e.preventDefault()} className="glass frost flex max-w-md items-center gap-2 rounded-full p-2">
              <label htmlFor="where" className="sr-only">
                Postcode or town
              </label>
              <span className="pl-3 text-muted">
                <IconSearch className="h-[1.15rem] w-[1.15rem]" />
              </span>
              <input
                id="where"
                type="text"
                autoComplete="postal-code"
                defaultValue="Manchester M1"
                className="min-w-0 flex-1 bg-transparent py-2.5 text-[0.95rem] text-ink placeholder:text-muted focus:outline-none"
              />
              <button type="submit" className="btn btn-primary !py-2.5">
                Search
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <div className="px-5 py-3 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Segmented options={FORMATS} value={format} onChange={setFormat} label="Filter stores by what they stock" />
        </div>
      </div>

      <section className="px-5 pb-20 pt-4 sm:px-8 sm:pb-28">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          {/* Map first on a phone: it orients you before the list asks you
              to make a choice. */}
          <Reveal className="overflow-hidden rounded-[1.75rem] border border-line lg:sticky lg:top-28">
            <div className="aspect-[7/6] w-full">
              <MapPlan stores={shown} selected={selected} onSelect={setSelected} />
            </div>
          </Reveal>

          <div>
            <p aria-live="polite" className="text-[0.82rem] text-muted">
              {shown.length} {shown.length === 1 ? 'store' : 'stores'} within 3 miles
            </p>

            <ul className="mt-4 space-y-3">
              {shown.map((s, i) => {
                const active = selected === s.name
                return (
                  <Reveal as="li" key={s.name} delay={Math.min(i, 5) * 60}>
                    <button
                      type="button"
                      onClick={() => setSelected(s.name)}
                      aria-pressed={active}
                      className={`w-full rounded-[1.35rem] border p-5 text-left transition-all duration-400 ease-[var(--ease-glass)] active:scale-[0.99] ${
                        active
                          ? 'border-moss/35 bg-shell shadow-[0_20px_40px_-28px_rgba(16,30,24,0.5)]'
                          : 'border-line bg-shell/60 hover:bg-shell'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-[1.02rem] font-[620] tracking-[-0.022em]">{s.name}</h3>
                          <p className="mt-0.5 text-[0.82rem] text-muted">{s.area}</p>
                        </div>
                        <span className="flex shrink-0 items-center gap-1.5 text-[0.82rem] font-semibold text-moss">
                          <IconPin className="h-3.5 w-3.5" />
                          {s.dist}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {FORMATS.filter((f) => f.id !== 'all').map((f) => {
                          const stocked = s.has.includes(f.id)
                          return (
                            <span
                              key={f.id}
                              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.72rem] font-medium ${
                                stocked
                                  ? 'border-line bg-canvas text-ink'
                                  : 'border-transparent bg-transparent text-muted/55 line-through'
                              }`}
                            >
                              {stocked && <IconCheck className="h-3 w-3 text-leaf" />}
                              {f.label}
                            </span>
                          )
                        })}
                      </div>
                    </button>
                  </Reveal>
                )
              })}
            </ul>

            <p className="mt-6 text-[0.78rem] leading-relaxed text-muted">
              Stock shown is illustrative. A live build would read availability from each retailer's feed and fall back
              to "call ahead" where no feed exists.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
