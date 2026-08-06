import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { CONTACT, CONTACT_COPY } from '../content'

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', placeholder: 'Ada Okafor' },
  {
    name: 'business',
    label: 'Business name',
    type: 'text',
    autoComplete: 'organization',
    placeholder: 'The Corner Café',
  },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@yourshop.com' },
]

const EMPTY = { name: '', business: '', email: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell me your name.'
  if (!values.business.trim()) errors.business = 'What is the business called?'
  if (!values.email.trim()) errors.email = 'I need an email to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'That email does not look quite right.'
  if (values.message.trim().length < 10) errors.message = 'A sentence or two is plenty — just not blank.'
  return errors
}

function Form() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const update = (name) => (e) => {
    const next = { ...values, [name]: e.target.value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
  }

  const blur = (name) => () => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(values))
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(values)
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
        <h2 className="mt-7 font-display text-[1.8rem]">Thank you, {values.name.split(' ')[0]}.</h2>
        <p className="mt-3 max-w-sm text-[0.94rem] leading-relaxed text-slate">
          Your note about {values.business} is with me. I will reply to{' '}
          <span className="font-medium text-ink">{values.email}</span> within one business day to find a time.
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
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="card p-7 sm:p-9">
      <form noValidate onSubmit={submit} className="flex flex-col gap-5">
        {FIELDS.map((f) => (
          <div key={f.name}>
            <label
              htmlFor={f.name}
              className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone"
            >
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={update(f.name)}
              onBlur={blur(f.name)}
              aria-invalid={Boolean(errors[f.name] && touched[f.name])}
              aria-describedby={errors[f.name] && touched[f.name] ? `${f.name}-error` : undefined}
              className={fieldClass(f.name)}
            />
            {errors[f.name] && touched[f.name] && (
              <p id={`${f.name}-error`} className="mt-1.5 text-[0.78rem] text-red-700">
                {errors[f.name]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone"
          >
            What do you need?
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="We are a café on Bell Street. Our site is five years old and we have no way to take orders ahead…"
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
          <span className="relative z-10">Request my walkthrough</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gilt/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        </button>

        <p className="text-center text-[0.76rem] text-stone">
          No mailing list, no follow-up sequence. Just a reply from me.
        </p>
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
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Book a"
        accent="walkthrough."
        body={CONTACT_COPY.body}
      />

      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="font-display text-[1.7rem] leading-snug sm:text-[2rem]">
                  Reach me <span className="gilded italic">directly.</span>
                </h2>
                <p className="mt-4 text-[0.96rem] leading-relaxed text-slate">
                  If you would rather just call or email, that works too — it comes straight to me, not to a shared
                  inbox.
                </p>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-9 flex flex-col gap-5">
                  <Detail href={`mailto:${CONTACT.email}`} label="Email" value={CONTACT.email}>
                    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
                      <path d="m3.8 7 8.2 6 8.2-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </Detail>

                  <Detail href={`tel:${CONTACT.phoneHref}`} label="Phone" value={CONTACT.phone}>
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
                    {CONTACT.hours}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-10 rounded-2xl border border-sand bg-linen/50 p-6">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-stone">
                    What happens next
                  </p>
                  <ol className="mt-4 flex flex-col gap-3 text-[0.9rem] leading-relaxed text-slate">
                    <li className="flex gap-3">
                      <span className="font-display text-bronze">1.</span> I reply within a business day to find a
                      time.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-display text-bronze">2.</span> We talk for fifteen minutes — your place or
                      the phone.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-display text-bronze">3.</span> You get a fixed price, or an honest no.
                    </li>
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
