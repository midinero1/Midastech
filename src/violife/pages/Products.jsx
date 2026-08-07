import { useMemo, useState } from 'react'
import { FORMATS, FREE_FROM, PRODUCTS } from '../data'
import { Heading, ProductCard, ProductSheet, Reveal, Segmented, useProductSheet } from '../ui'

/**
 * The whole range on one page.
 *
 * The live site splits twelve or so products across six category pages,
 * which means comparing a block against a grated bag is two navigations
 * and a back button. Filtering in place costs nothing and keeps the
 * comparison in view.
 */
export default function Products() {
  const sheet = useProductSheet()
  const [format, setFormat] = useState('all')

  const shown = useMemo(
    () => (format === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.format === format)),
    [format],
  )

  return (
    <>
      <section className="lit grain relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pt-36">
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal>
            <Heading
              eyebrow={`${PRODUCTS.length} products`}
              title="The whole range."
              body="Blocks, slices, grated, creamy and creamers. All of it dairy-free, and all of it free from lactose, gluten, nuts and soya."
            />
          </Reveal>
        </div>
      </section>

      {/* The filter follows you down the page. On a phone the range is a
          long scroll, and a filter you have to scroll back up to reach is
          a filter nobody uses twice. */}
      <div className="sticky top-[4.75rem] z-30 px-5 py-3 sm:top-[5.75rem] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Segmented options={FORMATS} value={format} onChange={setFormat} label="Filter the range by format" />
        </div>
      </div>

      <section className="px-5 pb-20 pt-4 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <p aria-live="polite" className="text-[0.82rem] text-muted">
            {shown.length} {shown.length === 1 ? 'product' : 'products'}
            {format !== 'all' && ` in ${FORMATS.find((f) => f.id === format)?.label.toLowerCase()}`}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {shown.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i, 6) * 60}>
                <ProductCard product={p} onOpen={sheet.open} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-line bg-mist/70 px-6 py-12 sm:px-12 sm:py-16">
          <Reveal>
            <Heading
              align="center"
              eyebrow="Every product, no exceptions"
              title="Free from all five."
              body="Not a claim that applies to selected lines. It applies to the range."
            />
          </Reveal>
          <Reveal delay={120} className="mt-9 flex flex-wrap justify-center gap-2.5">
            {FREE_FROM.map((f) => (
              <span
                key={f}
                className="rounded-full border border-line bg-shell px-4 py-2 text-[0.85rem] font-medium text-ink"
              >
                {f}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {sheet.product && <ProductSheet product={sheet.product} onClose={sheet.close} />}
    </>
  )
}
