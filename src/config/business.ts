/**
 * ─────────────────────────────────────────────────────────────
 *  SK PRINT HOUSE — SINGLE SOURCE OF BUSINESS INFORMATION
 * ─────────────────────────────────────────────────────────────
 *  Update phone, email, WhatsApp, domain and address here.
 *  Every page, form and link reads from this file.
 *
 *  Fields marked `null` were not supplied by the business and are
 *  intentionally never invented in the interface. Add them when
 *  they are confirmed.
 */

export const business = {
  name: 'SK Print House',
  shortName: 'SK',
  tagline: 'Your Complete Printing Solution',
  description:
    'A premium printing studio for digital and offset printing, visiting cards, wedding invitations, packaging, signage, apparel, merchandise and corporate print.',

  phone: {
    display: '+91 96436 62299',
    raw: '+919643662299',
  },
  /** CEO direct line — additional contact, does not replace the studio number. */
  ceoPhone: {
    display: '+91 99998 28273',
    raw: '+919999828273',
    label: "CEO's direct line",
  },
  email: 'sk.printhouse@gmail.com',
  whatsapp: {
    number: '919643662299',
    display: '+91 96436 62299',
  },

  /** Not supplied — do not invent. */
  address: null as string | null,
  openingHours: null as string | null,

  /** Set VITE_SITE_URL in production once the domain is confirmed. */
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://skprinthouse.com',

  logo: '/assets/logo.png',

  /** Optional serverless form endpoint (Formspree, Web3Forms, Basin…). */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || '',

  replyNote: 'For the quickest reply, message us on WhatsApp.',
} as const

export const telHref = `tel:${business.phone.raw}`
export const ceoTelHref = `tel:${business.ceoPhone.raw}`
export const mailHref = `mailto:${business.email}`

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${business.whatsapp.number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const defaultWhatsappMessage =
  'Hello SK Print House, I would like to discuss a print project. Could you help me with a quote?'

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Process', to: '/process' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
] as const

export const serviceOptions = [
  'Digital printing',
  'Offset printing',
  'Visiting cards',
  'Wedding invitations',
  'Flex printing',
  'Banners',
  'Posters',
  'Brochures',
  'Flyers',
  'Pamphlets',
  'Stickers',
  'Labels',
  'Packaging',
  'T-shirt printing',
  'Mug printing',
  'Photo printing',
  'Corporate printing',
  'Customised gifts',
  'Large-format printing',
  'Something else',
] as const

export const siteMeta = {
  title: 'SK Print House — Your Complete Printing Solution',
  description:
    'Your complete printing solution for invitations, packaging, brand collateral and everything in between. From a single visiting card to a full wedding suite.',
} as const
