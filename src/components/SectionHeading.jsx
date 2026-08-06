import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, accent, body, align = 'left' }) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <p className={`eyebrow flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-gold/50" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-6 font-display text-[2.1rem] leading-[1.12] tracking-[-0.02em] sm:text-[2.9rem] lg:text-[3.2rem]">
          {title} {accent && <span className="gilded italic">{accent}</span>}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={150}>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted sm:text-[1.05rem]">{body}</p>
        </Reveal>
      )}
    </div>
  )
}
