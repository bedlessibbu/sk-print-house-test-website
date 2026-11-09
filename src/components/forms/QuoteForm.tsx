import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ChevronDown, Loader2, Mail } from 'lucide-react'
import { business, serviceOptions, whatsappHref } from '../../config/business'
import { getService } from '../../content/services'
import { cn } from '../../lib/utils'
import { isNonEmpty, isValidEmail, isValidPhone } from '../../lib/validation'
import {
  enquiryMailto,
  enquiryWhatsApp,
  hasFormEndpoint,
  submitToEndpoint,
  type EnquiryPayload,
} from '../../lib/forms'
import { Button } from '../ui/Button'
import { useToast } from '../ui/toast-context'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

interface QuoteValues {
  service: string
  quantity: string
  size: string
  finish: string
  deadline: string
  budget: string
  name: string
  phone: string
  email: string
  message: string
  consent: boolean
  company: string
}

type Errors = Partial<Record<keyof QuoteValues, string>>

const stepLabels = ['The brief', 'The details', 'Your contact']

function resolveService(value: string | null): string {
  if (!value) return ''
  const bySlug = getService(value)
  if (bySlug) return bySlug.name
  const byName = serviceOptions.find((option) => option.toLowerCase() === value.toLowerCase())
  return byName ?? value
}

export function QuoteForm() {
  const [params] = useSearchParams()
  const defaultService = resolveService(params.get('service'))
  const [values, setValues] = useState<QuoteValues>({
    service: defaultService,
    quantity: '',
    size: '',
    finish: '',
    deadline: '',
    budget: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false,
    company: '',
  })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [handoff, setHandoff] = useState<EnquiryPayload | null>(null)
  const { push } = useToast()

  const today = new Date().toISOString().split('T')[0]

  function update<K extends keyof QuoteValues>(key: K, value: QuoteValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setHandoff(null)
  }

  function validateStep(target: number): Errors {
    const next: Errors = {}
    if (target === 0) {
      if (!isNonEmpty(values.service)) next.service = 'Please choose a service.'
      if (!isNonEmpty(values.quantity)) next.quantity = 'Please give an approximate quantity.'
    }
    if (target === 2) {
      if (!isNonEmpty(values.name)) next.name = 'Please enter your name.'
      if (!isNonEmpty(values.phone)) next.phone = 'Please enter a phone number.'
      else if (!isValidPhone(values.phone)) next.phone = 'Please enter a valid phone number.'
      if (values.email && !isValidEmail(values.email)) next.email = 'Please check the email address.'
      if (!values.consent) next.consent = 'Please confirm that we may contact you.'
    }
    return next
  }

  function goNext() {
    const next = validateStep(step)
    if (Object.keys(next).length > 0) {
      setErrors(next)
      push({
        kind: 'error',
        title: 'A few details need attention',
        message: 'Please check the highlighted fields before continuing.',
      })
      const first = Object.keys(next)[0]
      document.getElementById(`quote-${first}`)?.focus()
      return
    }
    setStep((current) => Math.min(2, current + 1))
  }

  function buildPayload(): EnquiryPayload {
    return {
      source: 'quote',
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      service: values.service,
      quantity: values.quantity.trim(),
      size: values.size.trim(),
      finish: values.finish.trim(),
      deadline: values.deadline,
      budget: values.budget.trim(),
      message: values.message.trim() || 'No additional notes.',
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (values.company) return

    const next = validateStep(2)
    if (Object.keys(next).length > 0) {
      setErrors(next)
      push({
        kind: 'error',
        title: 'A few details need attention',
        message: 'Please check the highlighted fields and try again.',
      })
      const first = Object.keys(next)[0]
      document.getElementById(`quote-${first}`)?.focus()
      return
    }

    const payload = buildPayload()

    if (hasFormEndpoint) {
      setSending(true)
      const result = await submitToEndpoint(payload)
      setSending(false)
      if (result.ok) {
        setValues({
          service: defaultService,
          quantity: '',
          size: '',
          finish: '',
          deadline: '',
          budget: '',
          name: '',
          phone: '',
          email: '',
          message: '',
          consent: false,
          company: '',
        })
        setStep(0)
        setErrors({})
        push({
          kind: 'success',
          title: 'Quote request received.',
          message: 'We will review the brief and come back with a specification and price.',
        })
      } else {
        push({
          kind: 'error',
          title: 'We could not send that request.',
          message: result.error ?? 'Please try again, or send the brief on WhatsApp.',
        })
      }
      return
    }

    window.open(enquiryWhatsApp(payload), '_blank', 'noopener,noreferrer')
    setHandoff(payload)
    push({
      kind: 'info',
      title: 'WhatsApp opened with your brief',
      message: 'Press send in WhatsApp to deliver it. Nothing has been sent yet.',
    })
  }

  const summaryRows: Array<[string, string]> = [
    ['Quantity', values.quantity],
    ['Size / format', values.size],
    ['Finish / stock', values.finish],
    ['Needed by', values.deadline],
    ['Budget', values.budget],
  ]

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {stepLabels.map((label, index) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={cn(
                    'grid h-6 w-6 place-items-center rounded-full border text-[9px] font-semibold transition-colors',
                    index === step
                      ? 'border-ink bg-ink text-paper'
                      : index < step
                        ? 'border-red bg-red text-paper'
                        : 'border-ink/20 text-muted',
                  )}
                >
                  {index < step ? <Check size={11} strokeWidth={2.4} /> : String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-semibold uppercase tracking-[0.16em]',
                    index === step ? 'text-ink' : 'text-muted',
                  )}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 h-px w-full bg-ink/15">
            <div
              className="h-full bg-red transition-all duration-700 ease-smooth"
              style={{ width: `${((step + 1) / stepLabels.length) * 100}%` }}
            />
          </div>
          <p className="sr-only" aria-live="polite">
            Step {step + 1} of {stepLabels.length}: {stepLabels[step]}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="field-label" htmlFor="quote-service">
                      What would you like printed? <span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="quote-service"
                        name="service"
                        className={cn('field appearance-none pr-8', errors.service && 'border-red')}
                        value={values.service}
                        onChange={(event) => update('service', event.target.value)}
                        aria-invalid={Boolean(errors.service)}
                        aria-describedby={errors.service ? 'quote-service-error' : undefined}
                      >
                        <option value="" disabled>
                          Choose a service
                        </option>
                        {serviceOptions.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={15}
                        strokeWidth={1.6}
                        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-muted"
                        aria-hidden="true"
                      />
                    </div>
                    {errors.service && (
                      <span className="field-error" id="quote-service-error">
                        {errors.service}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="quote-quantity">
                      Quantity <span className="text-red">*</span>
                    </label>
                    <input
                      id="quote-quantity"
                      name="quantity"
                      type="text"
                      inputMode="numeric"
                      className={cn('field', errors.quantity && 'border-red')}
                      value={values.quantity}
                      onChange={(event) => update('quantity', event.target.value)}
                      aria-invalid={Boolean(errors.quantity)}
                      aria-describedby={errors.quantity ? 'quote-quantity-error' : undefined}
                      placeholder="e.g. 250"
                    />
                    {errors.quantity && (
                      <span className="field-error" id="quote-quantity-error">
                        {errors.quantity}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="quote-size">
                      Size / format
                    </label>
                    <input
                      id="quote-size"
                      name="size"
                      type="text"
                      className="field"
                      value={values.size}
                      onChange={(event) => update('size', event.target.value)}
                      placeholder="e.g. A5, 90 × 54 mm, 3 × 6 ft"
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="quote-finish">
                      Finish / stock
                    </label>
                    <input
                      id="quote-finish"
                      name="finish"
                      type="text"
                      className="field"
                      value={values.finish}
                      onChange={(event) => update('finish', event.target.value)}
                      placeholder="e.g. 300 gsm matte, foil, spot UV"
                    />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="quote-deadline">
                      Needed by
                    </label>
                    <input
                      id="quote-deadline"
                      name="deadline"
                      type="date"
                      min={today}
                      className="field"
                      value={values.deadline}
                      onChange={(event) => update('deadline', event.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="field-label" htmlFor="quote-budget">
                      Budget <span className="text-muted/60">(optional)</span>
                    </label>
                    <input
                      id="quote-budget"
                      name="budget"
                      type="text"
                      className="field"
                      value={values.budget}
                      onChange={(event) => update('budget', event.target.value)}
                      placeholder="A range helps us recommend the right process"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="field-label" htmlFor="quote-message">
                      Anything else?
                    </label>
                    <textarea
                      id="quote-message"
                      name="message"
                      rows={5}
                      className="field resize-none"
                      value={values.message}
                      onChange={(event) => update('message', event.target.value)}
                      placeholder="References, colours, delivery details, or a link to your artwork."
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                      <label className="field-label" htmlFor="quote-name">
                        Your name <span className="text-red">*</span>
                      </label>
                      <input
                        id="quote-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className={cn('field', errors.name && 'border-red')}
                        value={values.name}
                        onChange={(event) => update('name', event.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'quote-name-error' : undefined}
                        placeholder="Full name"
                      />
                      {errors.name && (
                        <span className="field-error" id="quote-name-error">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="field-label" htmlFor="quote-phone">
                        Phone <span className="text-red">*</span>
                      </label>
                      <input
                        id="quote-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className={cn('field', errors.phone && 'border-red')}
                        value={values.phone}
                        onChange={(event) => update('phone', event.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'quote-phone-error' : undefined}
                        placeholder="+91"
                      />
                      {errors.phone && (
                        <span className="field-error" id="quote-phone-error">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="field-label" htmlFor="quote-email">
                        Email <span className="text-muted/60">(optional)</span>
                      </label>
                      <input
                        id="quote-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={cn('field', errors.email && 'border-red')}
                        value={values.email}
                        onChange={(event) => update('email', event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'quote-email-error' : undefined}
                        placeholder="you@company.com"
                      />
                      {errors.email && (
                        <span className="field-error" id="quote-email-error">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3">
                    <input
                      id="quote-consent"
                      name="consent"
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
                      checked={values.consent}
                      onChange={(event) => update('consent', event.target.checked)}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? 'quote-consent-error' : undefined}
                    />
                    <div>
                      <label htmlFor="quote-consent" className="text-xs leading-relaxed text-muted">
                        I agree to be contacted about this request. My details will only be used to prepare and
                        discuss the quote.
                      </label>
                      {errors.consent && (
                        <span className="field-error" id="quote-consent-error">
                          {errors.consent}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3 border border-ink/10 bg-paper-light p-4">
                    <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-red" />
                    <p className="text-xs leading-relaxed text-muted">
                      We will confirm the specification and price before anything goes ahead. No payment is
                      requested through this form.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="quote-company">Company</label>
            <input
              id="quote-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.company}
              onChange={(event) => update('company', event.target.value)}
            />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                icon={false}
                onClick={() => setStep((current) => Math.max(0, current - 1))}
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft size={14} strokeWidth={1.7} />
                  Back
                </span>
              </Button>
            )}

            {step < 2 ? (
              <Button type="button" icon={false} onClick={goNext}>
                <span className="flex items-center gap-2">
                  Continue
                  <ArrowRight size={14} strokeWidth={1.7} />
                </span>
              </Button>
            ) : (
              <Button type="submit" disabled={sending} icon={false}>
                <span className="flex items-center gap-2.5">
                  {sending ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : hasFormEndpoint ? (
                    <Mail size={15} strokeWidth={1.8} />
                  ) : (
                    <WhatsAppIcon className="h-4 w-4" />
                  )}
                  {sending ? 'Sending…' : hasFormEndpoint ? 'Send request' : 'Send via WhatsApp'}
                </span>
              </Button>
            )}
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-muted">
            {hasFormEndpoint
              ? 'Your brief is sent directly to the studio.'
              : 'Opens WhatsApp with your brief filled in — nothing is sent until you press send.'}{' '}
            Prefer to talk?{' '}
            <a href={`tel:${business.phone.raw}`} className="link-line text-ink">
              Call {business.phone.display}
            </a>
            .
          </p>

          {handoff && (
            <div className="mt-6 border border-ink/10 bg-paper-light p-5">
              <p className="font-display text-lg tracking-tight">Your brief is ready to send.</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Press send in WhatsApp, or send the same details by email.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={enquiryMailto(handoff)}
                  className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
                >
                  <Mail size={14} strokeWidth={1.7} />
                  Open email draft
                </a>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  Open WhatsApp again
                </a>
              </div>
            </div>
          )}

          <p className="mt-8 text-[11px] text-muted">
            Need help choosing?{' '}
            <Link to="/services" className="link-line text-ink">
              Browse all services
            </Link>{' '}
            or{' '}
            <Link to="/contact" className="link-line text-ink">
              contact the studio
            </Link>
            .
          </p>
        </form>
      </div>

      <aside className="lg:col-span-5">
        <div className="border border-ink/10 bg-paper-light p-6 lg:sticky lg:top-28 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow text-muted">Your brief</p>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted/60">
              {String(step + 1).padStart(2, '0')} / 03
            </span>
          </div>
          <p className="mt-4 font-display text-2xl leading-tight tracking-tight sm:text-3xl">
            {values.service || 'A print project'}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            A short brief is enough to start. We will fill in the technical details with you.
          </p>

          <dl className="mt-7 space-y-3 text-sm">
            {summaryRows.map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-6 border-t border-ink/10 pt-3">
                <dt className="shrink-0 text-[11px] uppercase tracking-[0.12em] text-muted">{label}</dt>
                <dd className="text-right text-[13px] text-ink">{value || '—'}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 border-t border-ink/10 pt-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted">What happens next</p>
            <ol className="mt-3 space-y-2 text-xs leading-relaxed text-muted">
              <li className="flex gap-2">
                <span className="text-red">01</span> We review the brief and ask any missing questions.
              </li>
              <li className="flex gap-2">
                <span className="text-red">02</span> You receive a specification and a clear price.
              </li>
              <li className="flex gap-2">
                <span className="text-red">03</span> Artwork is proofed before anything is printed.
              </li>
            </ol>
          </div>
        </div>
      </aside>
    </div>
  )
}
