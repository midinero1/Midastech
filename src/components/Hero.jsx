import Reveal from './Reveal'
import Showcase from './Showcase'
import { ACTIVE_HEADLINE, HEADLINES, PROOF, SUBHEAD } from '../content'

export default function Hero() {
  const h = HEADLINES[ACTIVE_HEADLINE]

  return (
    <section id="top" className="aura grain relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-44">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-gold/50" />
                Websites &amp; apps for local business
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-7 font-display text-[2.6rem] leading-[1.06] tracking-[-0.02em] sm:text-[3.4rem] lg:text-[3.9rem]">
                {h.pre}{' '}
                <span className="gleam relative inline-block overflow-hidden">
                  <span className="gilded italic">{h.accent}</span>
                </span>{' '}
                {h.post}
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-muted sm:text-[1.08rem]">{SUBHEAD}</p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="#contact"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-brass to-gold px-7 py-3.5 text-center text-[0.9rem] font-semibold text-ink shadow-[0_10px_40px_-14px_var(--color-gold)] transition-shadow duration-400 hover:shadow-[0_14px_50px_-12px_var(--color-gold)] sm:px-8"
                >
                  <span className="relative z-10">Book a free consultation</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </a>
                <a
                  href="#offer"
                  className="rounded-full border border-white/12 px-7 py-3.5 text-center text-[0.9rem] font-medium text-cream/85 transition-colors duration-300 hover:border-gold/45 hover:text-cream sm:px-8"
                >
                  See what you get
                </a>
              </div>
            </Reveal>
          </div>

          {/* Product mock */}
          <Reveal delay={320} className="mb-6 lg:mb-0">
            <Showcase />
          </Reveal>
        </div>

        {/* Proof strip */}
        <Reveal delay={200}>
          <div className="mt-16 sm:mt-20">
            <div className="rule-gold opacity-50" />
            <dl className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              {PROOF.map((p) => (
                <div key={p.label} className="flex items-baseline gap-3 sm:block">
                  <dt className="font-display text-2xl text-cream sm:text-[1.75rem]">{p.value}</dt>
                  <dd className="text-[0.82rem] leading-snug text-muted sm:mt-1.5">{p.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
