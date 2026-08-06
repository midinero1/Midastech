import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTABand from '../components/CTABand'
import { ICONS, Tick } from '../components/icons'
import { pagePath, useSite } from '../i18n'

function ServiceBlock({ service, index, label }) {
  const Icon = ICONS[service.icon]
  const flipped = index % 2 === 1
  return (
    <Reveal className={`grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${index > 0 ? 'mt-20 sm:mt-24' : ''}`}>
      <div className={flipped ? 'lg:order-2' : ''}>
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/35 bg-gold/10 text-bronze">
            <Icon className="h-6 w-6" />
          </span>
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-stone">{service.kicker}</span>
        </div>

        <h2 className="mt-6 font-display text-[2rem] leading-tight sm:text-[2.4rem]">{service.title}</h2>
        <p className="mt-4 text-[1rem] leading-relaxed text-slate">{service.body}</p>
        <p className="mt-4 border-l-2 border-gold/50 pl-4 text-[0.95rem] italic leading-relaxed text-slate">
          {service.short}
        </p>
      </div>

      <div className={`card p-8 sm:p-9 ${flipped ? 'lg:order-1' : ''}`}>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-stone">{label}</p>
        <ul className="mt-6 flex flex-col gap-4">
          {service.points.map((pt) => (
            <li key={pt} className="flex gap-3.5 text-[0.93rem] leading-snug text-ink/85">
              <Tick className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export default function Services() {
  const { lang, t } = useSite()
  const p = t.servicesPage

  return (
    <>
      <PageHeader {...p.header} />

      {/* The three services in depth */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {t.services.map((s, i) => (
            <ServiceBlock key={s.title} service={s} index={i} label={p.whatThatMeans} />
          ))}
        </div>
      </section>

      {/* How the work runs */}
      <section className="border-y border-sand/70 bg-linen/40 py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow={p.process.eyebrow}
            title={p.process.title}
            accent={p.process.accent}
            body={p.process.body}
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-sand bg-sand sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {p.process.steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 100} className="group relative bg-porcelain p-7 sm:p-8">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="font-display text-[2.2rem] leading-none text-gold/45 transition-colors duration-500 group-hover:text-bronze">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-[1.25rem] leading-snug">{step.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-slate">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Always included */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow={p.included.eyebrow}
            title={p.included.title}
            accent={p.included.accent}
            align="center"
          />

          <div className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-5 sm:mt-16 sm:grid-cols-2">
            {p.included.items.map((item, i) => (
              <Reveal
                key={item}
                delay={i * 60}
                className="flex items-center gap-3.5 border-b border-sand pb-5 text-[0.94rem] text-ink/85"
              >
                <Tick className="h-4 w-4 shrink-0 text-bronze" />
                <span>{item}</span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <p className="mx-auto mt-12 max-w-xl text-center text-[0.92rem] leading-relaxed text-slate">
              {p.included.pricingPre}{' '}
              <a
                href={pagePath(lang, 'contact')}
                className="font-medium text-bronze underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:decoration-gold"
              >
                {p.included.pricingLink}
              </a>{' '}
              {p.included.pricingPost}
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand variant="services" />
    </>
  )
}
