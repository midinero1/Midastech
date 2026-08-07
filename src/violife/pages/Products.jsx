import { useMemo, useState } from 'react'
import { FORMATS, FREE_FROM, PRODUCTS } from '../data'
import { FREE_FROM_ICONS } from '../art'
import { useSite } from '../i18n'
import { Heading, ProductCard, ProductSheet, Reveal, Segmented, useProductSheet } from '../ui'

/**
 * The whole range on one page.
 *
 * The live site splits a dozen or so products across six category pages,
 * which means comparing a block against a grated bag is two navigations
 * and a back button. Filtering in place costs nothing and keeps the
 * comparison in view.
 */
export default function Products() {
  const { t } = useSite()
  const sheet = useProductSheet()
  const [format, setFormat] = useState('all')

  const formatOptions = useMemo(() => FORMATS.map((id) => ({ id, label: t.formats[id] })), [t])
  const shown = useMemo(
    () => (format === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.format === format)),
    [format],
  )

  return (
    <>
      <section className="lit grain relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pt-36">
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal>
            <Heading eyebrow={t.productsPage.eyebrow(PRODUCTS.length)} title={t.productsPage.h1} body={t.productsPage.lede} />
          </Reveal>
        </div>
      </section>

      {/* The filter follows you down the page. On a phone the range is a
          long scroll, and a filter you have to scroll back up to reach is
          a filter nobody uses twice. */}
      <div className="sticky top-[4.75rem] z-30 px-5 py-3 sm:top-[5.75rem] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Segmented options={formatOptions} value={format} onChange={setFormat} label={t.ui.fullRange} />
        </div>
      </div>

      <section className="px-5 pb-20 pt-4 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <p aria-live="polite" className="text-[0.82rem] text-muted">
            {shown.length} {shown.length === 1 ? t.ui.product : t.ui.products}
            {format !== 'all' && ` ${t.ui.inFormat(t.formats[format])}`}
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
              eyebrow={t.productsPage.freeFromEyebrow}
              title={t.productsPage.freeFromTitle}
              body={t.productsPage.freeFromBody}
            />
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-x-3 gap-y-7 sm:grid-cols-6">
            {FREE_FROM.map((id) => {
              const Mark = FREE_FROM_ICONS[id]
              return (
                <div key={id} className="flex flex-col items-center gap-2.5 text-center text-muted">
                  <Mark className="h-8 w-8" />
                  <span className="text-[0.75rem] font-medium leading-tight">{t.freeFrom[id]}</span>
                </div>
              )
            })}
          </Reveal>
        </div>
      </section>

      {sheet.product && <ProductSheet product={sheet.product} onClose={sheet.close} />}
    </>
  )
}
