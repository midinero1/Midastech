import { ProductArt, IconArrow } from '../art'
import { FREE_FROM, STORY, vPath } from '../data'
import { Heading, Reveal } from '../ui'

/**
 * One page for the brand, replacing the split between "Our Story", the
 * blog and the rotating campaign landing pages. A brand that has been at
 * this since 1990 should be able to say why in about four paragraphs.
 */
export default function Story() {
  return (
    <>
      <section className="lit grain relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">Thessaloniki, 1990</p>
            <h1 className="display mt-4">Early, and stubborn.</h1>
            <p className="lede mx-auto mt-6 max-w-xl">
              Violife started making a dairy-free alternative to cheese roughly two decades before anybody was asking
              for one. That head start is the reason it melts.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-12 border-l border-line pl-8 sm:pl-10">
            {STORY.map((s, i) => (
              <Reveal as="li" key={s.year} delay={i * 90} className="relative">
                <span className="absolute -left-[2.4rem] top-2 h-3 w-3 rounded-full bg-leaf ring-4 ring-canvas sm:-left-[2.9rem]" />
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">{s.year}</p>
                <h2 className="mt-2 text-[1.5rem] font-[660] tracking-[-0.03em] sm:text-[1.8rem]">{s.title}</h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-body">{s.body}</p>
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
                eyebrow="What it is made of"
                title="Coconut oil, starch, and a lot of testing."
                body="The base has not fundamentally changed in thirty-five years. What changed is the tuning — how it sets, how it browns, and at what temperature it lets go and flows."
              />
              <ul className="mt-7 space-y-2.5">
                {FREE_FROM.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[0.95rem] text-body">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    No {f.toLowerCase()}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={110}>
              <div className="mx-auto aspect-square w-full max-w-sm rounded-[1.75rem] bg-[#F4EFE3]">
                <ProductArt kind="block" tone="mozzarella" className="float h-full w-full p-5" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="title">Undairy the craving.</h2>
            <p className="lede mx-auto mt-4 max-w-lg">
              Not a sacrifice, not a substitute, not a compromise you explain to the table. Just the one you wanted on
              the plate.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={vPath('products')} className="btn btn-primary">
                See the range
                <IconArrow className="h-4 w-4" />
              </a>
              <a href={vPath('find')} className="btn btn-glass">
                Find in store
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
