import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, accent, body, align = 'left', dark = false }) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <p className={`eyebrow flex items-center gap-3 ${centered ? 'justify-center' : ''} ${dark ? 'text-gilt' : ''}`}>
          <span className={`h-px w-8 ${dark ? 'bg-gilt/60' : 'bg-gold/60'}`} />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={`mt-5 font-display text-[2rem] leading-[1.14] tracking-[-0.02em] sm:text-[2.7rem] lg:text-[3rem] ${
            dark ? 'text-canvas' : ''
          }`}
        >
          {title} {accent && <span className={dark ? 'gilded-dark italic' : 'gilded italic'}>{accent}</span>}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={150}>
          <p className={`mt-5 text-[0.98rem] leading-relaxed sm:text-[1.05rem] ${dark ? 'text-canvas/65' : 'text-slate'}`}>
            {body}
          </p>
        </Reveal>
      )}
    </div>
  )
}
