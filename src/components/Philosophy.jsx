import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { PRINCIPLES } from '../content'

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative border-t border-white/5 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Philosophy"
          title="Four things I refuse to"
          accent="compromise on."
          body="Most small business websites fail for the same handful of reasons. These are the rules that keep yours from joining them."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/6 sm:mt-20 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 110}
              className="group relative bg-ink-2 p-8 transition-colors duration-500 hover:bg-ink-3 sm:p-10"
            >
              {/* Gold wash that warms the tile on hover. */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/6 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <span className="font-display text-[2.6rem] leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold/45">
                  {p.n}
                </span>
                <h3 className="mt-5 font-display text-[1.4rem] leading-snug text-cream sm:text-2xl">{p.title}</h3>
                <p className="mt-3.5 text-[0.94rem] leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
