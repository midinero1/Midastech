import { useMemo, useState } from 'react'
import { ProductArt, IconArrow, IconMelt, IconStretch, IconGrate, IconPin } from '../art'
import { FORMATS, FREE_FROM, HERO_PRODUCT, PRODUCTS, PROOF, RECIPES, STORY, vPath } from '../data'
import { Heading, ProductCard, ProductSheet, RecipeCard, Reveal, Segmented, useProductSheet } from '../ui'

const PROOF_ICONS = { melt: IconMelt, stretch: IconStretch, grate: IconGrate }

/**
 * The argument the home page makes, in order: this behaves like cheese →
 * here is the proof → here is the range → here is what to cook → here is
 * where to buy it. The live site opens on a campaign carousel instead,
 * which spends the most valuable screen in the business on a message that
 * changes every quarter.
 */
export default function Home() {
  const sheet = useProductSheet()
  const [format, setFormat] = useState('all')

  const shown = useMemo(
    () => (format === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.format === format)),
    [format],
  )

  return (
    <>
      {/* ---------------------------------------------------------------
          Hero
      --------------------------------------------------------------- */}
      <section className="lit grain relative overflow-hidden px-5 pb-14 pt-24 sm:px-8 sm:pb-24 sm:pt-36">
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">Plant-based since 1990</p>
              <h1 className="display mt-3.5">
                Undairy
                <br />
                the craving.
              </h1>
              <p className="lede mt-5 max-w-md">
                Dairy-free cheese that melts, stretches and grates like the thing you actually miss.
              </p>
            </Reveal>

            {/* Side by side even on the narrowest phone — two stacked
                full-width buttons push the product itself below the fold,
                and the product is the argument. */}
            <Reveal delay={120} className="mt-6 flex gap-2.5 sm:mt-8 sm:gap-3">
              <a href={vPath('products')} className="btn btn-primary flex-1 !px-4 sm:flex-none sm:!px-6">
                See the range
                <IconArrow className="h-4 w-4" />
              </a>
              <a href={vPath('find')} className="btn btn-glass flex-1 !px-4 sm:flex-none sm:!px-6">
                <IconPin className="h-4 w-4" />
                Find in store
              </a>
            </Reveal>
          </div>

          {/* The hero pack sits on its own soft field rather than floating on
              the page, so the glass chrome above it has something to refract. */}
          <Reveal delay={80} className="relative">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-[2rem] bg-[#E8E2D2] sm:aspect-square sm:rounded-[2.5rem]">
              <ProductArt
                kind={HERO_PRODUCT.kind}
                tone={HERO_PRODUCT.tone}
                className="float absolute inset-0 h-full w-full scale-[1.15]"
              />
              <button
                type="button"
                onClick={() => sheet.open(HERO_PRODUCT)}
                className="glass frost absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-[1.35rem] p-3.5 text-left transition-transform duration-400 ease-[var(--ease-glass)] active:scale-[0.97]"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[0.92rem] font-[620] text-ink">{HERO_PRODUCT.name}</span>
                  <span className="block truncate text-[0.78rem] text-muted">{HERO_PRODUCT.lead}</span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-canvas">
                  <IconArrow className="h-4 w-4" />
                </span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Trust bar. Five words the shopper is scanning for, stated once,
            in the same weight — not five differently coloured badges. */}
        <Reveal delay={200} className="relative z-10 mx-auto mt-12 max-w-6xl sm:mt-16">
          {/* Wraps rather than scrolls: a clipped word here reads as a bug,
              not as an invitation to swipe. */}
          <div className="glass frost flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-[1.6rem] px-6 py-4 sm:gap-x-10 sm:rounded-full">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">Free from</span>
            {FREE_FROM.map((f) => (
              <span key={f} className="text-[0.85rem] font-medium text-ink">
                {f}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------
          Proof
      --------------------------------------------------------------- */}
      <section id="proof" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Heading
              eyebrow="The only test that matters"
              title="Melts. Stretches. Grates."
              body="Three behaviours decide whether an alternative works in a real kitchen. Everything in the range is built against them."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {PROOF.map((p, i) => {
              const Icon = PROOF_ICONS[p.icon]
              const product = PRODUCTS.find((x) => x.id === p.product)
              return (
                <Reveal key={p.title} delay={i * 110}>
                  <button
                    type="button"
                    onClick={() => product && sheet.open(product)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-shell p-6 text-left transition-all duration-500 ease-[var(--ease-glass)] hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(16,30,24,0.4)] active:scale-[0.985]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-moss/10 text-moss">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-[1.25rem] font-[660] tracking-[-0.026em]">{p.title}</h3>
                    <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-body">{p.body}</p>
                    {product && (
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-moss">
                        {product.name}
                        <IconArrow className="h-3.5 w-3.5 transition-transform duration-400 ease-[var(--ease-glass)] group-hover:translate-x-1" />
                      </span>
                    )}
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          The range — one control, filtering in place
      --------------------------------------------------------------- */}
      <section className="bg-mist/60 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <Heading eyebrow="The range" title="Pick a format." />
            <Segmented
              options={FORMATS}
              value={format}
              onChange={setFormat}
              label="Filter the range by format"
              className="lg:w-auto lg:max-w-none"
            />
          </Reveal>

          {/* A rail on touch, a grid on a wide screen. Same markup, no
              duplicated card component. */}
          <div className="rail-sm -mx-5 mt-10 gap-4 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
            {shown.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i, 4) * 70} className="w-[16rem] lg:w-auto">
                <ProductCard product={p} onOpen={sheet.open} className="h-full" />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <a href={vPath('products')} className="btn btn-glass">
              All {PRODUCTS.length} products
              <IconArrow className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Recipes
      --------------------------------------------------------------- */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Heading
              eyebrow="From the kitchen"
              title="Six things worth making tonight."
              body="Every one of them under forty minutes, and none of them a salad you eat to prove a point."
            />
          </Reveal>

          <div className="rail-sm -mx-5 mt-12 gap-4 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:px-0">
            {RECIPES.map((r, i) => (
              <Reveal key={r.id} delay={Math.min(i, 3) * 90} className="w-[17rem] lg:w-auto">
                <RecipeCard recipe={r} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Store locator — glass over ink, the one hard contrast on the page
      --------------------------------------------------------------- */}
      <section className="px-5 sm:px-8">
        <div className="lit-dark grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-ink px-6 py-16 sm:px-12 sm:py-24">
          <div className="relative z-10 mx-auto max-w-xl text-center">
            <Reveal>
              <p className="eyebrow !text-leaf">Nearby</p>
              <h2 className="title mt-3 !text-canvas">It is probably two streets away.</h2>
              <p className="lede mt-4 !text-canvas/70">
                Stocked in most large supermarkets and a good number of small ones. Check what is on the shelf before
                you leave the house.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  window.location.href = vPath('find')
                }}
                className="glass-dark frost mx-auto flex max-w-md items-center gap-2 rounded-full p-2"
              >
                <label htmlFor="postcode" className="sr-only">
                  Postcode or town
                </label>
                <input
                  id="postcode"
                  name="postcode"
                  type="text"
                  autoComplete="postal-code"
                  placeholder="Postcode or town"
                  className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[0.95rem] text-canvas placeholder:text-canvas/45 focus:outline-none"
                />
                <button type="submit" className="btn btn-primary !bg-leaf !py-2.5 !text-ink">
                  Search
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Story teaser
      --------------------------------------------------------------- */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal>
            <Heading
              eyebrow="Since 1990"
              title="Thirty-five years of getting it wrong, then right."
              body="Violife started in Thessaloniki making dairy-free cheese for a market that did not exist yet. The recipe took a long time. The audience took longer."
            />
            <a href={vPath('story')} className="btn btn-glass mt-8">
              Read the story
              <IconArrow className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={100}>
            <ol className="relative space-y-6 border-l border-line pl-7">
              {STORY.map((s) => (
                <li key={s.year} className="relative">
                  <span className="absolute -left-[2.15rem] top-1.5 h-2.5 w-2.5 rounded-full bg-leaf ring-4 ring-canvas" />
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">{s.year}</p>
                  <h3 className="mt-1 text-[1.05rem] font-[620] tracking-[-0.022em]">{s.title}</h3>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-body">{s.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {sheet.product && <ProductSheet product={sheet.product} onClose={sheet.close} />}
    </>
  )
}
