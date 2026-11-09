import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, Loader2, Mail, Quote, Star } from 'lucide-react'
import { business, whatsappHref } from '../config/business'
import { useSeo } from '../lib/seo'
import { cn } from '../lib/utils'
import { isNonEmpty, isValidEmail } from '../lib/validation'
import {
  enquiryMailto,
  enquiryWhatsApp,
  hasFormEndpoint,
  submitToEndpoint,
  type EnquiryPayload,
} from '../lib/forms'
import { PageHeader } from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { useToast } from '../components/ui/toast-context'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'

interface FeedbackValues {
  name: string
  phone: string
  email: string
  rating: string
  message: string
  consent: boolean
  company: string
}

const initialValues: FeedbackValues = {
  name: '',
  phone: '',
  email: '',
  rating: '5',
  message: '',
  consent: false,
  company: '',
}

type Errors = Partial<Record<keyof FeedbackValues, string>>

export function Testimonials() {
  const [values, setValues] = useState<FeedbackValues>(initialValues)
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [handoff, setHandoff] = useState<EnquiryPayload | null>(null)
  const { push } = useToast()

  useSeo({
    title: 'Client feedback',
    description:
      'Read verified client feedback for SK Print House, or share your own experience. We publish only real, permissioned reviews — never invented testimonials.',
    path: '/testimonials',
  })

  function update<K extends keyof FeedbackValues>(key: K, value: FeedbackValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setHandoff(null)
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!isNonEmpty(values.name)) next.name = 'Please enter your name.'
    if (values.email && !isValidEmail(values.email)) next.email = 'Please check the email address.'
    if (!isNonEmpty(values.message)) next.message = 'Please share a few words about your experience.'
    if (!values.consent) next.consent = 'Please confirm that we may use this feedback.'
    return next
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (values.company) return

    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      push({
        kind: 'error',
        title: 'A few details need attention',
        message: 'Please check the highlighted fields and try again.',
      })
      const first = Object.keys(next)[0]
      document.getElementById(`feedback-${first}`)?.focus()
      return
    }

    const payload: EnquiryPayload = {
      source: 'feedback',
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      service: 'Client feedback',
      rating: values.rating,
      message: values.message.trim(),
    }

    if (hasFormEndpoint) {
      setSending(true)
      const result = await submitToEndpoint(payload)
      setSending(false)
      if (result.ok) {
        setValues(initialValues)
        setErrors({})
        push({
          kind: 'success',
          title: 'Thank you for the feedback.',
          message: 'We read every note. If you are happy for us to publish it, reply to our confirmation email.',
        })
      } else {
        push({
          kind: 'error',
          title: 'We could not send that feedback.',
          message: result.error ?? 'Please try again, or message us on WhatsApp.',
        })
      }
      return
    }

    window.open(enquiryWhatsApp(payload), '_blank', 'noopener,noreferrer')
    setHandoff(payload)
    push({
      kind: 'info',
      title: 'WhatsApp opened with your feedback',
      message: 'Press send in WhatsApp to deliver it. Nothing has been sent yet.',
    })
  }

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        index="05"
        title={
          <>
            Real words, only when they are <span className="italic text-red">real.</span>
          </>
        }
        intro="We do not invent reviews. This page will carry verified client feedback once it has been collected with permission. Until then, you can read how we work — or add your own note if we have printed for you."
      >
        <div className="md:col-span-5 md:col-start-8">
          <div className="flex items-start gap-3 border-l border-ink/15 pl-6">
            <Quote size={16} strokeWidth={1.6} className="mt-1 shrink-0 text-red" />
            <p className="text-[11px] leading-relaxed text-muted">
              Feedback is published with the client's consent. We never write a testimonial on someone's behalf.
            </p>
          </div>
        </div>
      </PageHeader>

      <section className="pb-20 sm:pb-24">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="border border-ink/10 bg-paper-light p-7 sm:p-9">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-paper">
                  <Quote size={18} strokeWidth={1.5} />
                </span>
                <h2 className="mt-7 font-display text-3xl leading-[1.05] tracking-tight sm:text-4xl">
                  No reviews yet — <span className="italic text-red">and that is honest.</span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  This is a new website. Rather than borrow praise or write placeholders, we have left the space empty
                  until real clients share their experience.
                </p>
                <div className="mt-7 border-t border-ink/10 pt-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted">What we ask instead</p>
                  <ul className="mt-4 space-y-3">
                    {[
                      'Judge us by the proof, the quote and the finished piece.',
                      'Ask for a sample or a stock swatch before committing.',
                      'Talk to us directly — the same studio handles the job.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink">
                        <Check size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button to="/portfolio" variant="outline">
                    See print studies
                  </Button>
                  <a
                    href={whatsappHref('Hello SK Print House, I would like to ask about your printing work.')}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 self-center text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Ask us anything
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.06}>
              <p className="eyebrow text-muted">Share your experience</p>
              <h2 className="display-sm mt-4">Printed with us? Tell us how it went.</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                A short note helps us improve — and, with your permission, helps the next person decide. We will confirm
                before publishing anything.
              </p>

              <form onSubmit={handleSubmit} className="mt-8" noValidate>
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="feedback-name">
                      Your name <span className="text-red">*</span>
                    </label>
                    <input
                      id="feedback-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={cn('field', errors.name && 'border-red')}
                      value={values.name}
                      onChange={(event) => update('name', event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'feedback-name-error' : undefined}
                      placeholder="Full name"
                    />
                    {errors.name && (
                      <span className="field-error" id="feedback-name-error">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="feedback-rating">
                      Rating
                    </label>
                    <div className="relative">
                      <select
                        id="feedback-rating"
                        name="rating"
                        className="field appearance-none pr-8"
                        value={values.rating}
                        onChange={(event) => update('rating', event.target.value)}
                      >
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <option key={rating} value={String(rating)}>
                            {rating} / 5
                          </option>
                        ))}
                      </select>
                      <Star
                        size={15}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-muted"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="feedback-phone">
                      Phone <span className="text-muted/60">(optional)</span>
                    </label>
                    <input
                      id="feedback-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className="field"
                      value={values.phone}
                      onChange={(event) => update('phone', event.target.value)}
                      placeholder="+91"
                    />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="feedback-email">
                      Email <span className="text-muted/60">(optional)</span>
                    </label>
                    <input
                      id="feedback-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={cn('field', errors.email && 'border-red')}
                      value={values.email}
                      onChange={(event) => update('email', event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'feedback-email-error' : undefined}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <span className="field-error" id="feedback-email-error">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="field-label" htmlFor="feedback-message">
                      Your feedback <span className="text-red">*</span>
                    </label>
                    <textarea
                      id="feedback-message"
                      name="message"
                      rows={5}
                      className={cn('field resize-none', errors.message && 'border-red')}
                      value={values.message}
                      onChange={(event) => update('message', event.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'feedback-message-error' : undefined}
                      placeholder="What did we print, and how was the experience?"
                    />
                    {errors.message && (
                      <span className="field-error" id="feedback-message-error">
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <input
                    id="feedback-consent"
                    name="consent"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                    checked={values.consent}
                    onChange={(event) => update('consent', event.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? 'feedback-consent-error' : undefined}
                  />
                  <div>
                    <label htmlFor="feedback-consent" className="text-xs leading-relaxed text-muted">
                      I agree to be contacted about this feedback, and understand it will only be published with my
                      permission.
                    </label>
                    {errors.consent && (
                      <span className="field-error" id="feedback-consent-error">
                        {errors.consent}
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="feedback-company">Company</label>
                  <input
                    id="feedback-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.company}
                    onChange={(event) => update('company', event.target.value)}
                  />
                </div>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button type="submit" disabled={sending} icon={false}>
                    <span className="flex items-center gap-2.5">
                      {sending ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : hasFormEndpoint ? (
                        <Mail size={15} strokeWidth={1.8} />
                      ) : (
                        <WhatsAppIcon className="h-4 w-4" />
                      )}
                      {sending ? 'Sending…' : hasFormEndpoint ? 'Send feedback' : 'Send via WhatsApp'}
                    </span>
                  </Button>
                  <p className="text-[11px] leading-relaxed text-muted">
                    {hasFormEndpoint
                      ? `Or email ${business.email}.`
                      : 'Opens WhatsApp with your note filled in — nothing is sent until you press send.'}
                  </p>
                </div>

                {handoff && (
                  <div className="mt-6 border border-ink/10 bg-paper-light p-5">
                    <p className="font-display text-lg tracking-tight">Prefer email?</p>
                    <a
                      href={enquiryMailto(handoff)}
                      className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
                    >
                      <Mail size={14} strokeWidth={1.7} />
                      Open email draft
                    </a>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
