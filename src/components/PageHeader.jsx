import Reveal from './Reveal'

/** Masthead for the inner pages — Services, About, Contact. */
export default function PageHeader({ eyebrow, title, accent, body }) {
  return (
    <section className="aura grain relative overflow-hidden border-b border-sand/70 pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-gold/60" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="mt-6 max-w-3xl font-display text-[2.5rem] leading-[1.07] tracking-[-0.022em] sm:text-[3.4rem] lg:text-[4rem]">
            {title} {accent && <span className="gilded italic">{accent}</span>}
          </h1>
        </Reveal>
        {body && (
          <Reveal delay={170}>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-slate sm:text-[1.08rem]">{body}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
