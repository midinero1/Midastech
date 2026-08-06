import { LogoMark, Wordmark } from './components/Logo'

const VARIANTS = [
  {
    id: 'ascent',
    name: 'Ascent',
    note: 'The M drawn as one continuous rising line — a monogram that is also a growth chart, with a soft sun behind the higher peak. Warmest and most human of the three; reads instantly at 16px.',
  },
  {
    id: 'circuit',
    name: 'Circuit',
    note: 'Same geometry, engineered treatment: mitred corners and three node squares marking the two peaks and the valley between them. Says "technology" without a single cliché.',
  },
  {
    id: 'crest',
    name: 'Crest',
    note: 'A solid M glyph inside a double-hairline seal. The most formal and "expensive" option — strongest as a stamp on invoices, business cards and a favicon, slightly heavier in a navbar.',
  },
]

export default function Logos() {
  return (
    <div className="aura grain relative min-h-screen overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-6 py-20">
        <p className="eyebrow">Internal — pick one</p>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl">
          Three directions for the <span className="gilded italic">Midas</span> mark
        </h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Set <code className="text-gold">ACTIVE_LOGO</code> in <code className="text-gold">src/content.js</code> to
          your favourite and the whole site — navbar, footer, hero watermark — follows it.
        </p>

        <div className="mt-16 flex flex-col gap-6">
          {VARIANTS.map((v) => (
            <section key={v.id} className="rounded-2xl border border-white/8 bg-ink-2/70 p-8 sm:p-10">
              <div className="flex flex-wrap items-baseline gap-4">
                <h2 className="font-display text-2xl">{v.name}</h2>
                <code className="text-[0.75rem] text-gold/80">variant="{v.id}"</code>
              </div>
              <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-muted">{v.note}</p>

              <div className="mt-9 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
                {/* Large */}
                <div className="flex items-center justify-center rounded-xl border border-white/6 bg-ink p-8">
                  <LogoMark variant={v.id} className="h-32 w-32" />
                </div>

                <div className="flex flex-col gap-7">
                  {/* Lockup */}
                  <div>
                    <p className="mb-3 text-[0.62rem] uppercase tracking-[0.24em] text-muted/70">Navbar lockup</p>
                    <div className="flex items-center gap-2.5">
                      <LogoMark variant={v.id} className="h-9 w-9" />
                      <Wordmark />
                    </div>
                  </div>

                  {/* Small sizes */}
                  <div>
                    <p className="mb-3 text-[0.62rem] uppercase tracking-[0.24em] text-muted/70">
                      Favicon sizes — 32 / 24 / 16 px
                    </p>
                    <div className="flex items-end gap-5">
                      <LogoMark variant={v.id} className="h-8 w-8" />
                      <LogoMark variant={v.id} className="h-6 w-6" />
                      <LogoMark variant={v.id} className="h-4 w-4" />
                    </div>
                  </div>

                  {/* On light, for print / invoices */}
                  <div>
                    <p className="mb-3 text-[0.62rem] uppercase tracking-[0.24em] text-muted/70">On cream</p>
                    <div className="inline-flex items-center gap-3 rounded-lg bg-cream px-5 py-3">
                      <LogoMark variant={v.id} className="h-8 w-8" />
                      <span className="flex flex-col leading-none">
                        <span className="font-display text-[1.1rem] font-medium text-ink">Midas</span>
                        <span className="mt-[0.2rem] text-[0.55rem] font-medium uppercase tracking-[0.34em] text-amber">
                          Technology
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <a
          href="/"
          className="mt-14 inline-block text-[0.88rem] text-gold underline decoration-gold/30 underline-offset-4 hover:decoration-gold"
        >
          ← Back to the site
        </a>
      </div>
    </div>
  )
}
