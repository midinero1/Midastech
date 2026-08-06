import Reveal from './Reveal'
import { LogoMark } from './Logo'

/** Deep espresso band that closes every page — the contrast that makes the
 *  ivory read as deliberate rather than plain. */
export default function CTABand({
  title = 'Let us see what your business looks like in',
  accent = 'gold.',
  body = 'Fifteen minutes on the phone or in your place. No slide deck, no obligation, and an honest answer about whether you need this yet.',
  cta = 'Book a free consultation',
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-canvas">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46rem_26rem_at_18%_110%,rgba(201,162,39,0.2),transparent_60%),radial-gradient(40rem_22rem_at_88%_-10%,rgba(201,162,39,0.14),transparent_64%)]" />

      <div
        aria-hidden="true"
        className="drift pointer-events-none absolute -right-10 top-1/2 hidden w-64 -translate-y-1/2 opacity-[0.07] lg:block"
      >
        <LogoMark variant="dark" className="h-auto w-full" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="font-display text-[2rem] leading-[1.14] tracking-[-0.02em] text-canvas sm:text-[2.6rem] lg:text-[2.9rem]">
              {title} <span className="gilded-dark italic">{accent}</span>
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-canvas/65 sm:text-[1.04rem]">{body}</p>
          </Reveal>
          <Reveal delay={170}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="/contact/"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gold to-gilt px-8 py-3.5 text-center text-[0.9rem] font-semibold text-ink shadow-[0_14px_44px_-16px_rgba(228,200,104,0.9)] transition-shadow duration-400 hover:shadow-[0_18px_54px_-14px_rgba(228,200,104,1)]"
              >
                <span className="relative z-10">{cta}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </a>
              <a
                href="/services/"
                className="rounded-full border border-canvas/20 px-8 py-3.5 text-center text-[0.9rem] font-medium text-canvas/85 transition-colors duration-300 hover:border-gilt/60 hover:text-canvas"
              >
                See what you get
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
