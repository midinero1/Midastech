import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTABand from '../components/CTABand'
import { LogoMark } from '../components/Logo'
import { useSite } from '../i18n'

export default function About() {
  const { t } = useSite()
  const p = t.aboutPage

  return (
    <>
      <PageHeader {...p.header} />

      {/* The story */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
            <div>
              {p.story.map((para, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p
                    className={`leading-relaxed text-slate ${
                      i === 0
                        ? 'font-display text-[1.35rem] leading-[1.55] text-ink sm:text-[1.55rem]'
                        : 'mt-6 text-[1rem] sm:text-[1.04rem]'
                    }`}
                  >
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Pull quote */}
            <Reveal delay={200} className="lg:pt-6">
              <figure className="relative rounded-2xl border border-gold/30 bg-linen/60 p-8 sm:p-9">
                <LogoMark className="h-9 w-9 opacity-70" />
                <blockquote className="mt-5 font-display text-[1.3rem] leading-[1.45] text-ink sm:text-[1.4rem]">
                  <span className="gilded italic">“</span>
                  {p.pullQuote}
                  <span className="gilded italic">”</span>
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-sand/70 bg-linen/40 py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow={p.philosophy.eyebrow}
            title={p.philosophy.title}
            accent={p.philosophy.accent}
            body={p.philosophy.body}
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-sand bg-sand sm:mt-16 sm:grid-cols-2">
            {t.principles.map((pr, i) => (
              <Reveal key={pr.n} delay={i * 110} className="group relative bg-porcelain p-8 sm:p-10">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="font-display text-[2.6rem] leading-none text-gold/40 transition-colors duration-500 group-hover:text-bronze">
                  {pr.n}
                </span>
                <h3 className="mt-5 font-display text-[1.4rem] leading-snug sm:text-2xl">{pr.title}</h3>
                <p className="mt-3.5 text-[0.94rem] leading-relaxed text-slate">{pr.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow={p.promisesSection.eyebrow}
            title={p.promisesSection.title}
            accent={p.promisesSection.accent}
            align="center"
          />

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:mt-16 sm:grid-cols-2">
            {p.promises.map((pr, i) => (
              <Reveal key={pr.title} delay={i * 100} className="card card-hover p-7 sm:p-8">
                <h3 className="font-display text-[1.25rem] leading-snug">{pr.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-slate">{pr.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand variant="about" />
    </>
  )
}
