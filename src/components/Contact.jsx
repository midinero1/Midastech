import { useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
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

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const update = (name) => (e) => {
    const next = { ...values, [name]: e.target.value }
    setValues(next)
    // Only correct errors live once a field has been visited.
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
      // Move focus to the first problem so it is obvious on a phone.
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    // Front-end only for now — swap in a form endpoint when you have one.
    setSent(true)
  }

  const fieldClass = (name) =>
    `w-full rounded-xl border bg-ink/60 px-4 py-3 text-[0.95rem] text-cream placeholder:text-muted/45 transition-colors duration-300 focus:outline-none ${
      errors[name] && touched[name]
        ? 'border-red-400/60 focus:border-red-400'
        : 'border-white/10 hover:border-white/20 focus:border-gold/60'
    }`

  return (
    <section id="contact" className="relative border-t border-white/5 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          {/* Left: the invitation and direct lines. */}
          <div>
            <SectionHeading eyebrow="Contact" title="Book a" accent="walkthrough." body={CONTACT_COPY.body} />

            <Reveal delay={200}>
              <div className="mt-10 flex flex-col gap-5">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-4 text-cream transition-colors duration-300 hover:text-gold"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors duration-300 group-hover:border-gold/60 group-hover:bg-gold/10">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                      <path d="m3.8 7 8.2 6 8.2-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[0.68rem] uppercase tracking-[0.22em] text-muted">Email</span>
                    <span className="text-[0.98rem]">{CONTACT.email}</span>
                  </span>
                </a>

                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="group flex items-center gap-4 text-cream transition-colors duration-300 hover:text-gold"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/25 text-gold transition-colors duration-300 group-hover:border-gold/60 group-hover:bg-gold/10">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
                      <path
                        d="M6.2 3.6h3l1.5 3.8-2 1.4a11.5 11.5 0 0 0 5.5 5.5l1.4-2 3.8 1.5v3a1.9 1.9 0 0 1-2.1 1.9C10.4 18.2 5.8 13.6 4.3 5.7A1.9 1.9 0 0 1 6.2 3.6Z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[0.68rem] uppercase tracking-[0.22em] text-muted">Phone</span>
                    <span className="text-[0.98rem]">{CONTACT.phone}</span>
                  </span>
                </a>

                <p className="mt-1 border-l border-gold/25 pl-4 text-[0.86rem] italic leading-relaxed text-muted">
                  {CONTACT.hours}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: the form. */}
          <Reveal delay={120}>
            <div className="relative rounded-2xl border border-white/8 bg-ink-2/80 p-7 sm:p-9">
              <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />

              {sent ? (
                <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-gold" aria-hidden="true">
                      <path
                        d="m5 12.5 4.5 4.5L19 7"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h3 className="mt-7 font-display text-[1.7rem] text-cream">Thank you, {values.name.split(' ')[0]}.</h3>
                  <p className="mt-3 max-w-sm text-[0.94rem] leading-relaxed text-muted">
                    Your note about {values.business} is with me. I will reply to{' '}
                    <span className="text-cream/90">{values.email}</span> within one business day to find a time.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(EMPTY)
                      setTouched({})
                      setErrors({})
                      setSent(false)
                    }}
                    className="mt-8 text-[0.85rem] text-gold underline decoration-gold/30 underline-offset-4 transition-colors duration-300 hover:decoration-gold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form noValidate onSubmit={submit} className="flex flex-col gap-5">
                  {FIELDS.map((f) => (
                    <div key={f.name}>
                      <label
                        htmlFor={f.name}
                        className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted"
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
                        <p id={`${f.name}-error`} className="mt-1.5 text-[0.78rem] text-red-300/90">
                          {errors[f.name]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted"
                    >
                      What do you need?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="We are a café on Bell Street. Our site is five years old and we have no way to take orders ahead…"
                      value={values.message}
                      onChange={update('message')}
                      onBlur={blur('message')}
                      aria-invalid={Boolean(errors.message && touched.message)}
                      aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                      className={`${fieldClass('message')} resize-none`}
                    />
                    {errors.message && touched.message && (
                      <p id="message-error" className="mt-1.5 text-[0.78rem] text-red-300/90">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="group relative mt-2 overflow-hidden rounded-full bg-gradient-to-r from-brass to-gold px-8 py-3.5 text-[0.92rem] font-semibold text-ink shadow-[0_10px_40px_-16px_var(--color-gold)] transition-all duration-400 hover:shadow-[0_14px_50px_-14px_var(--color-gold)]"
                  >
                    <span className="relative z-10">Request my walkthrough</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  </button>

                  <p className="text-center text-[0.74rem] text-muted/70">
                    No mailing list, no follow-up sequence. Just a reply from me.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
