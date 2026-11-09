import { useState } from 'react'
import type { FormEvent } from 'react'
import { ChevronDown, Loader2, Mail } from 'lucide-react'
import { business, serviceOptions, whatsappHref } from '../../config/business'
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

interface ContactFormProps {
  defaultService?: string
  className?: string
}

interface FormValues {
  name: string
  phone: string
  email: string
  service: string
  message: string
  consent: boolean
  company: string
}

const initialValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
  consent: false,
  company: '',
}

type Errors = Partial<Record<keyof FormValues, string>>

export function ContactForm({ defaultService = '', className }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>({ ...initialValues, service: defaultService })
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [handoff, setHandoff] = useState<EnquiryPayload | null>(null)
  const { push } = useToast()

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setHandoff(null)
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!isNonEmpty(values.name)) next.name = 'Please enter your name.'
    if (!isNonEmpty(values.phone)) next.phone = 'Please enter a phone number.'
    else if (!isValidPhone(values.phone)) next.phone = 'Please enter a valid phone number.'
    if (values.email && !isValidEmail(values.email)) next.email = 'Please check the email address.'
    if (!isNonEmpty(values.service)) next.service = 'Please choose a service.'
    if (!isNonEmpty(values.message)) next.message = 'Please tell us a little about the project.'
    if (!values.consent) next.consent = 'Please confirm that we may contact you.'
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
      document.getElementById(`contact-${first}`)?.focus()
      return
    }

    const payload: EnquiryPayload = {
      source: 'contact',
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      service: values.service,
      message: values.message.trim(),
    }

    if (hasFormEndpoint) {
      setSending(true)
      const result = await submitToEndpoint(payload)
      setSending(false)
      if (result.ok) {
        setValues({ ...initialValues, service: defaultService })
        setErrors({})
        push({
          kind: 'success',
          title: 'Thank you — your enquiry is in.',
          message: 'We will get back to you using the contact details you provided.',
        })
      } else {
        push({
          kind: 'error',
          title: 'We could not send that enquiry.',
          message: result.error ?? 'Please try again, or message us on WhatsApp.',
        })
      }
      return
    }

    window.open(enquiryWhatsApp(payload), '_blank', 'noopener,noreferrer')
    setHandoff(payload)
    push({
      kind: 'info',
      title: 'WhatsApp opened with your enquiry',
      message: 'Press send in WhatsApp to deliver it. Nothing has been sent yet.',
    })
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)} noValidate>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="contact-name">
            Your name <span className="text-red">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className={cn('field', errors.name && 'border-red')}
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            placeholder="Full name"
          />
          {errors.name && (
            <span className="field-error" id="contact-name-error">
              {errors.name}
            </span>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor="contact-phone">
            Phone <span className="text-red">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={cn('field', errors.phone && 'border-red')}
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            placeholder="+91"
          />
          {errors.phone && (
            <span className="field-error" id="contact-phone-error">
              {errors.phone}
            </span>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor="contact-email">
            Email <span className="text-muted/60">(optional)</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className={cn('field', errors.email && 'border-red')}
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="you@company.com"
          />
          {errors.email && (
            <span className="field-error" id="contact-email-error">
              {errors.email}
            </span>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor="contact-service">
            Service <span className="text-red">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-service"
              name="service"
              className={cn('field appearance-none pr-8', errors.service && 'border-red')}
              value={values.service}
              onChange={(event) => update('service', event.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? 'contact-service-error' : undefined}
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
            <span className="field-error" id="contact-service-error">
              {errors.service}
            </span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="contact-message">
            Tell us about the project <span className="text-red">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            className={cn('field resize-none', errors.message && 'border-red')}
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            placeholder="What are you making, roughly how many, and when do you need it?"
          />
          {errors.message && (
            <span className="field-error" id="contact-message-error">
              {errors.message}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
          checked={values.consent}
          onChange={(event) => update('consent', event.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
        />
        <div>
          <label htmlFor="contact-consent" className="text-xs leading-relaxed text-muted">
            I agree to be contacted about this enquiry. My details will only be used to respond.
          </label>
          {errors.consent && (
            <span className="field-error" id="contact-consent-error">
              {errors.consent}
            </span>
          )}
        </div>
      </div>

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => update('company', event.target.value)}
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={sending} icon={false} className="w-full sm:w-auto">
          <span className="flex items-center gap-2.5">
            {sending ? (
              <Loader2 size={15} className="animate-spin" />
            ) : hasFormEndpoint ? (
              <Mail size={15} strokeWidth={1.8} />
            ) : (
              <WhatsAppIcon className="h-4 w-4" />
            )}
            {sending ? 'Sending…' : hasFormEndpoint ? 'Send enquiry' : 'Send via WhatsApp'}
          </span>
        </Button>
        <p className="text-[11px] leading-relaxed text-muted">
          {hasFormEndpoint
            ? 'We will reply using the details you provided.'
            : 'Opens WhatsApp with your details filled in — nothing is sent until you press send.'}
        </p>
      </div>

      {handoff && (
        <div className="mt-6 border border-ink/10 bg-paper-light p-5">
          <p className="font-display text-lg tracking-tight">Prefer email?</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Send the same details to {business.email} instead.
          </p>
          <a
            href={enquiryMailto(handoff)}
            className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
          >
            <Mail size={14} strokeWidth={1.7} />
            Open email draft
          </a>
          <span className="mx-3 text-ink/20" aria-hidden="true">
            /
          </span>
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
      )}
    </form>
  )
}
