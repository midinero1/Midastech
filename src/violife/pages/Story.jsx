import { FREE_FROM_ICONS, IconArrow } from '../art'
import { FREE_FROM, PRODUCTS, STORY_YEARS } from '../data'
import { useSite } from '../i18n'
import { FIELD, Heading, PackShot, Reveal } from '../ui'

/**
 * One page for the brand, replacing the split between "Our Story", the
 * blog and the rotating campaign landing pages. A brand that has been at
 * this since 1990 should be able to say why in about four paragraphs.
 */
export default function Story() {
  const { t, path } = useSite()
  const showcase = PRODUCTS.find((p) => p.id === 'creamy-original') ?? PRODUCTS[0]

  return (
    <>
      <section className="lit grain relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">{t.storyPage.eyebrow}</p>
            <h1 className="display mt-4">{t.storyPage.h1}</h1>
            <p className="lede mx-auto mt-6 max-w-xl">{t.storyPage.lede}</p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-12 border-l border-line pl-8 sm:pl-10">
            {STORY_YEARS.map((y, i) => (
              <Reveal as="li" key={y} delay={i * 90} className="relative">
                <span className="absolute -left-[2.4rem] top-2 h-3 w-3 rounded-full bg-cyan ring-4 ring-canvas sm:-left-[2.9rem]" />
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">{y}</p>
                <h2 className="mt-2 text-[1.5rem] font-[660] tracking-[-0.03em] sm:text-[1.8rem]">{t.story[y].title}</h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-body">{t.story[y].body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* What is actually in it — the question the packaging gets asked most. */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-line bg-mist/70">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <Heading
                eyebrow={t.storyPage.madeOfEyebrow}
                title={t.storyPage.madeOfTitle}
                body={t.storyPage.madeOfBody}
              />
              <ul className="mt-7 space-y-3">
                {FREE_FROM.map((id) => {
                  const Mark = FREE_FROM_ICONS[id]
                  return (
                    <li key={id} className="flex items-center gap-3 text-[0.95rem] text-body">
                      <Mark className="h-5 w-5 shrink-0 text-muted" />
                      {t.ui.freeFrom} {t.freeFrom[id].toLowerCase()}
                    </li>
                  )
                })}
              </ul>
            </Reveal>

            <Reveal delay={110}>
              <div className={`mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[1.75rem] ${FIELD}`}>
                <PackShot product={showcase} name={t.products[showcase.id].name} className="float h-full w-full p-5" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="title">{t.storyPage.closeTitle}</h2>
            <p className="lede mx-auto mt-4 max-w-lg">{t.storyPage.closeBody}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={path('products')} className="btn btn-primary">
                {t.ui.seeTheRange}
                <IconArrow className="h-4 w-4" />
              </a>
              <a href={path('find')} className="btn btn-glass">
                {t.ui.findInStore}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
