import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTABand from '../components/CTABand'
import { LogoMark } from '../components/Logo'
import { ABOUT, PRINCIPLES } from '../content'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Midas Technology is one person,"
        accent="on purpose."
        body="No account managers, no offshore build team, no ticket queue. The person who answers your call is the person who writes the code."
      />

      {/* The story */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
            <div>
              {ABOUT.story.map((para, i) => (
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
                  {ABOUT.pullQuote}
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
            eyebrow="Our Philosophy"
            title="Four things I refuse to"
            accent="compromise on."
            body="Most small business websites fail for the same handful of reasons. These are the rules that keep yours from joining them."
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-sand bg-sand sm:mt-16 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={i * 110} className="group relative bg-porcelain p-8 sm:p-10">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="font-display text-[2.6rem] leading-none text-gold/40 transition-colors duration-500 group-hover:text-bronze">
                  {p.n}
                </span>
                <h3 className="mt-5 font-display text-[1.4rem] leading-snug sm:text-2xl">{p.title}</h3>
                <p className="mt-3.5 text-[0.94rem] leading-relaxed text-slate">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What you can hold me to"
            title="Four promises, in"
            accent="plain English."
            align="center"
          />

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:mt-16 sm:grid-cols-2">
            {ABOUT.promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} className="card card-hover p-7 sm:p-8">
                <h3 className="font-display text-[1.25rem] leading-snug">{p.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-slate">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Come and tell me about the"
        accent="business."
        body="I would rather hear how the room actually runs than read a brief. Fifteen minutes is usually enough to know whether I can help."
      />
    </>
  )
}
