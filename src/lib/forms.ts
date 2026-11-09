import { business, whatsappHref } from '../config/business'

export interface EnquiryPayload {
  source: 'contact' | 'quote' | 'feedback'
  name: string
  phone: string
  email: string
  service: string
  message: string
  quantity?: string
  size?: string
  finish?: string
  deadline?: string
  budget?: string
  rating?: string
}

export function formatEnquiry(payload: EnquiryPayload): string {
  const sourceLabel =
    payload.source === 'quote' ? 'Quote request' : payload.source === 'feedback' ? 'Client feedback' : 'Website enquiry'

  const lines = [
    `New ${sourceLabel} — SK Print House`,
    '',
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : '',
    payload.service ? `Service: ${payload.service}` : '',
    payload.quantity ? `Quantity: ${payload.quantity}` : '',
    payload.size ? `Size / format: ${payload.size}` : '',
    payload.finish ? `Finish / stock: ${payload.finish}` : '',
    payload.deadline ? `Needed by: ${payload.deadline}` : '',
    payload.budget ? `Budget: ${payload.budget}` : '',
    payload.rating ? `Rating: ${payload.rating} / 5` : '',
    '',
    'Details:',
    payload.message,
    '',
    '— Sent from the SK Print House website',
  ]

  return lines.join('\n').trim()
}

export function enquiryMailto(payload: EnquiryPayload): string {
  const subject =
    payload.source === 'quote'
      ? 'Quote request — SK Print House'
      : payload.source === 'feedback'
        ? 'Client feedback — SK Print House'
        : 'Website enquiry — SK Print House'
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    formatEnquiry(payload),
  )}`
}

export function enquiryWhatsApp(payload: EnquiryPayload): string {
  return whatsappHref(formatEnquiry(payload))
}

export interface SubmitResult {
  ok: boolean
  error?: string
}

/**
 * Posts to a configured serverless form endpoint (Formspree, Web3Forms,
 * Basin, etc.). If no endpoint is configured the forms intentionally
 * hand off to WhatsApp or email rather than pretending to submit.
 */
export async function submitToEndpoint(payload: EnquiryPayload): Promise<SubmitResult> {
  const endpoint = business.formEndpoint
  const accessKey = import.meta.env.VITE_FORM_ACCESS_KEY as string | undefined

  if (!endpoint) {
    return { ok: false, error: 'No form endpoint is configured.' }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        _subject: `New ${payload.source} — SK Print House website`,
        ...(accessKey ? { access_key: accessKey } : {}),
      }),
    })

    if (!response.ok) {
      return { ok: false, error: `The form service returned ${response.status}.` }
    }

    return { ok: true }
  } catch {
    return { ok: false, error: 'The form service could not be reached. Please try WhatsApp or email.' }
  }
}

export const hasFormEndpoint = Boolean(business.formEndpoint)
