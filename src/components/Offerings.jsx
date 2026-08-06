import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { ICONS, Tick } from './icons'
import { SERVICES } from '../content'

export default function Offerings() {
  return (
    <section
      id="offer"
      className="aura relative overflow-hidden border-t border-white/5 py-24 sm:py-32 lg:py-40"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title="Three parts. One"
          accent="finished thing."
          body="Take the whole package or start with the website and add the app when you are ready. Either way it is built to fit together."
        />

        <div className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-3 lg:gap-7">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon]
            return (
              <Reveal
                key={s.title}
                delay={i * 130}
                className="group relative flex flex-col rounded-2xl border border-white/8 bg-ink-2/80 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_28px_60px_-30px_rgba(212,175,55,0.5)] sm:p-9"
              >
                {/* Hairline gold edge that lights up on hover. */}
                <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/25 bg-gold/6 text-gold transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/12">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-muted/70">
                    {s.kicker}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-2xl text-cream">{s.title}</h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-muted">{s.body}</p>

                <div className="rule-gold my-7 opacity-30" />

                <ul className="flex flex-col gap-3">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[0.88rem] leading-snug text-cream/80">
                      <Tick className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={180}>
          <p className="mt-12 text-center text-[0.9rem] text-muted">
            Not sure which you need?{' '}
            <a
              href="#contact"
              className="text-gold underline decoration-gold/30 underline-offset-4 transition-colors duration-300 hover:decoration-gold"
            >
              Ask me on a fifteen-minute call
            </a>{' '}
            — I will tell you straight.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
