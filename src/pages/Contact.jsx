import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { CONTACT, useSite } from '../i18n'

const EMPTY = { name: '', business: '', email: '', message: '' }

/** Errors are looked up from the active language's dictionary. */
function validate(values, e) {
  const errors = {}
  if (!values.name.trim()) errors.name = e.name
  if (!values.business.trim()) errors.business = e.business
  if (!values.email.trim()) errors.email = e.emailEmpty
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = e.emailInvalid
  if (values.message.trim().length < 10) errors.message = e.message
  return errors
}

function Form() {
  const { t } = useSite()
  const f = t.contactPage.form
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const fields = [
    { name: 'name', type: 'text', autoComplete: 'name', ...f.name },
    { name: 'business', type: 'text', autoComplete: 'organization', ...f.business },
    { name: 'email', type: 'email', autoComplete: 'email', ...f.email },
  ]

  const update = (name) => (e) => {
    const next = { ...values, [name]: e.target.value }
    setValues(next)
    if (touched[name]) setErrors(validate(next, f.errors))
  }

  const blur = (name) => () => {
    setTouched((s) => ({ ...s, [name]: true }))
    setErrors(validate(values, f.errors))
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(values, f.errors)
    setErrors(found)
    setTouched({ name: true, business: true, email: true, message: true })
    if (Object.keys(found).length) {
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    // Front-end only for now — swap in a form endpoint when you have one.
    setSent(true)
  }

  const fieldClass = (name) =>
    `w-full rounded-xl border bg-canvas px-4 py-3 text-[0.95rem] text-ink placeholder:text-stone/55 transition-colors duration-300 focus:outline-none ${
      errors[name] && touched[name]
        ? 'border-red-500/70 focus:border-red-500'
        : 'border-sand hover:border-stone/40 focus:border-gold'
    }`

  if (sent) {
    return (
      <div className="card flex min-h-[30rem] flex-col items-center justify-center p-8 text-center sm:p-10">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/45 bg-gold/12">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-bronze" aria-hidden="true">
            <path
              d="m5 12.5 4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-7 font-display text-[1.8rem]">{f.success.title(values.name.trim().split(' ')[0])}</h2>
        <p className="mt-3 max-w-sm text-[0.94rem] leading-relaxed text-slate">
          {f.success.body(values.business.trim())} <span className="font-medium text-ink">{values.email.trim()}</span>{' '}
          {f.success.bodyTail}
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY)
            setTouched({})
            setErrors({})
            setSent(false)
          }}
          className="mt-8 text-[0.86rem] font-medium text-bronze underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:decoration-gold"
        >
          {f.success.again}
        </button>
      </div>
    )
  }

  return (
    <div className="card p-7 sm:p-9">
      <form noValidate onSubmit={submit} className="flex flex-col gap-5">
        {fields.map((fd) => (
          <div key={fd.name}>
            <label
              htmlFor={fd.name}
              className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone"
            >
              {fd.label}
            </label>
            <input
              id={fd.name}
              name={fd.name}
              type={fd.type}
              autoComplete={fd.autoComplete}
              placeholder={fd.placeholder}
              value={values[fd.name]}
              onChange={update(fd.name)}
              onBlur={blur(fd.name)}
              aria-invalid={Boolean(errors[fd.name] && touched[fd.name])}
              aria-describedby={errors[fd.name] && touched[fd.name] ? `${fd.name}-error` : undefined}
              className={fieldClass(fd.name)}
            />
            {errors[fd.name] && touched[fd.name] && (
              <p id={`${fd.name}-error`} className="mt-1.5 text-[0.78rem] text-red-700">
                {errors[fd.name]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone"
          >
            {f.message.label}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={f.message.placeholder}
            value={values.message}
            onChange={update('message')}
            onBlur={blur('message')}
            aria-invalid={Boolean(errors.message && touched.message)}
            aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
            className={`${fieldClass('message')} resize-none`}
          />
          {errors.message && touched.message && (
            <p id="message-error" className="mt-1.5 text-[0.78rem] text-red-700">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="group relative mt-2 overflow-hidden rounded-full bg-ink px-8 py-3.5 text-[0.92rem] font-semibold text-canvas shadow-[0_14px_40px_-18px_rgba(20,17,13,0.9)] transition-shadow duration-400 hover:shadow-[0_18px_50px_-16px_rgba(110,78,16,0.85)]"
        >
          <span className="relative z-10">{f.submit}</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gilt/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        </button>

        <p className="text-center text-[0.76rem] text-stone">{f.footnote}</p>
      </form>
    </div>
  )
}

function Detail({ href, label, value, children }) {
  return (
    <a href={href} className="group flex items-center gap-4 text-ink transition-colors duration-300 hover:text-bronze">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-bronze transition-colors duration-300 group-hover:border-gold group-hover:bg-gold/12">
        {children}
      </span>
      <span>
        <span className="block text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-stone">{label}</span>
        <span className="text-[0.98rem]">{value}</span>
      </span>
    </a>
  )
}

export default function Contact() {
  const { t } = useSite()
  const p = t.contactPage

  return (
    <>
      <PageHeader {...p.header} />

      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="font-display text-[1.7rem] leading-snug sm:text-[2rem]">
                  {p.directTitle} <span className="gilded italic">{p.directAccent}</span>
                </h2>
                <p className="mt-4 text-[0.96rem] leading-relaxed text-slate">{p.directBody}</p>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-9 flex flex-col gap-5">
                  <Detail href={`mailto:${CONTACT.email}`} label={p.emailLabel} value={CONTACT.email}>
                    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
                      <path d="m3.8 7 8.2 6 8.2-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </Detail>

                  <Detail href={`tel:${CONTACT.phoneHref}`} label={p.phoneLabel} value={CONTACT.phone}>
                    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
                      <path
                        d="M6.2 3.6h3l1.5 3.8-2 1.4a11.5 11.5 0 0 0 5.5 5.5l1.4-2 3.8 1.5v3a1.9 1.9 0 0 1-2.1 1.9C10.4 18.2 5.8 13.6 4.3 5.7A1.9 1.9 0 0 1 6.2 3.6Z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Detail>

                  <p className="mt-2 border-l-2 border-gold/50 pl-4 text-[0.88rem] italic leading-relaxed text-slate">
                    {p.hours}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-10 rounded-2xl border border-sand bg-linen/50 p-6">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-stone">{p.nextTitle}</p>
                  <ol className="mt-4 flex flex-col gap-3 text-[0.9rem] leading-relaxed text-slate">
                    {p.next.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="font-display text-bronze">{i + 1}.</span> {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <Form />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
