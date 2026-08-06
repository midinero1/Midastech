import Reveal from '../components/Reveal'
import Showcase from '../components/Showcase'
import SectionHeading from '../components/SectionHeading'
import CTABand from '../components/CTABand'
import { ICONS } from '../components/icons'
import { ACTIVE_HEADLINE, HEADLINES, PRINCIPLES, PROOF, SERVICES, SUBHEAD } from '../content'

function Hero() {
  const h = HEADLINES[ACTIVE_HEADLINE]
  return (
    <section className="aura grain relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-44">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-gold/60" />
                Websites &amp; apps for local business
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-7 font-display text-[2.6rem] leading-[1.06] tracking-[-0.022em] sm:text-[3.4rem] lg:text-[3.9rem]">
                {h.pre}{' '}
                <span className="gleam relative inline-block overflow-hidden">
                  <span className="gilded italic">{h.accent}</span>
                </span>{' '}
                {h.post}
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-slate sm:text-[1.08rem]">{SUBHEAD}</p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="/contact/"
                  className="group relative overflow-hidden rounded-full bg-ink px-8 py-3.5 text-center text-[0.9rem] font-semibold text-canvas shadow-[0_14px_40px_-18px_rgba(20,17,13,0.9)] transition-shadow duration-400 hover:shadow-[0_18px_50px_-16px_rgba(110,78,16,0.85)]"
                >
                  <span className="relative z-10">Book a free consultation</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gilt/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </a>
                <a
                  href="/services/"
                  className="rounded-full border border-ink/15 px-8 py-3.5 text-center text-[0.9rem] font-medium text-ink transition-colors duration-300 hover:border-gold hover:text-bronze"
                >
                  See what you get
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={320} className="mb-6 lg:mb-0">
            <Showcase />
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-16 sm:mt-20">
            <div className="rule-gold" />
            <dl className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              {PROOF.map((p) => (
                <div key={p.label} className="flex items-baseline gap-3 sm:block">
                  <dt className="font-display text-2xl text-ink sm:text-[1.8rem]">{p.value}</dt>
                  <dd className="text-[0.82rem] leading-snug text-stone sm:mt-1.5">{p.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ServicesTeaser() {
  return (
    <section className="border-t border-sand/70 bg-linen/40 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title="Three parts. One"
          accent="finished thing."
          body="Take the whole package or start with the website and add the app when you are ready. Either way it is built to fit together."
        />

        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-7">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon]
            return (
              <Reveal key={s.title} delay={i * 120} className="card card-hover flex flex-col p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/35 bg-gold/10 text-bronze">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-stone">
                    {s.kicker}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-slate">{s.short}</p>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={160}>
          <p className="mt-12 text-center text-[0.92rem] text-slate">
            <a
              href="/services/"
              className="font-medium text-bronze underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:decoration-gold"
            >
              See exactly what is included
            </a>{' '}
            — and how the work runs.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function PhilosophyTeaser() {
  return (
    <section className="border-t border-sand/70 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Our Philosophy"
            title="Four things I refuse to"
            accent="compromise on."
            body="Most small business websites fail for the same handful of reasons. These are the rules that keep yours from joining them."
          />

          <div className="flex flex-col">
            {PRINCIPLES.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 100}
                className={`group flex gap-6 py-6 ${i > 0 ? 'border-t border-sand' : ''}`}
              >
                <span className="font-display text-[1.4rem] leading-none text-gold/60 transition-colors duration-500 group-hover:text-bronze">
                  {p.n}
                </span>
                <div>
                  <h3 className="font-display text-[1.3rem] leading-snug">{p.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-slate">{p.body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={160}>
              <a
                href="/about/"
                className="mt-6 inline-block text-[0.9rem] font-medium text-bronze underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:decoration-gold"
              >
                More about how I work →
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesTeaser />
      <PhilosophyTeaser />
      <CTABand />
    </>
  )
}
