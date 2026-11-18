import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { business, ceoTelHref, mailHref, telHref, whatsappHref, defaultWhatsappMessage } from '../config/business'
import { useSeo } from '../lib/seo'
import { PageHeader } from '../components/layout/PageHeader'
import { ContactForm } from '../components/forms/ContactForm'
import { Reveal } from '../components/ui/Reveal'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'

const channels = [
  {
    label: 'Call the studio',
    value: business.phone.display,
    href: telHref,
    icon: Phone,
    note: 'The quickest way to reach us during the working day.',
  },
  {
    label: business.ceoPhone.label,
    value: business.ceoPhone.display,
    href: ceoTelHref,
    icon: Phone,
    note: 'For escalations and matters that need the CEO directly.',
  },
  {
    label: 'WhatsApp',
    value: business.whatsapp.display,
    href: whatsappHref(defaultWhatsappMessage),
    icon: null,
    note: 'Send a brief, a reference image or a file for a faster reply.',
    external: true,
  },
  {
    label: 'Email',
    value: business.email,
    href: mailHref,
    icon: Mail,
    note: 'Best for artwork, detailed briefs and written specifications.',
  },
]

export function Contact() {
  useSeo({
    title: 'Contact the studio',
    description:
      'Contact SK Print House by phone, email or WhatsApp, or visit the studio at D-105, Abul Fazal Enclave, Jamia Nagar, Okhla, New Delhi 110025. Open 10:00 am to 10:30 pm.',
    path: '/contact',
  })

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        index="07"
        title={
          <>
            Tell us what you are <span className="italic text-red">making.</span>
          </>
        }
        intro="A call, an email or a WhatsApp message is enough to start. Share the item, quantity, size and deadline, and we will come back with the right process and a clear price."
        aside={
          <div className="flex max-w-xs items-center gap-4 border border-ink/10 bg-paper-light p-3 shadow-[0_18px_44px_-32px_rgba(11,12,14,0.55)] lg:ml-auto">
            <div className="shrink-0 bg-white p-1.5">
              <img
                src="/assets/qr-contact-card.png"
                alt="QR code to open the SK Print House digital contact card"
                width={112}
                height={112}
                loading="lazy"
                className="h-24 w-24"
              />
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">Scan the card</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                Open our digital contact card and save the studio details to your phone.
              </p>
            </div>
          </div>
        }
      >
        <div className="md:col-span-5 md:col-start-8">
          <p className="border-l border-ink/15 pl-6 text-[11px] leading-relaxed text-muted">{business.replyNote}</p>
        </div>
      </PageHeader>

      <section className="pb-20 sm:pb-24">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="divide-y divide-ink/10 border-y border-ink/10">
                {channels.map((channel) => {
                  const Icon = channel.icon
                  return (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noreferrer noopener' : undefined}
                      className="group flex items-start justify-between gap-5 py-5 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                          {Icon ? <Icon size={15} strokeWidth={1.7} /> : <WhatsAppIcon className="h-4 w-4" />}
                        </span>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                            {channel.label}
                          </p>
                          <p className="mt-1.5 font-display text-xl leading-tight tracking-tight transition-colors group-hover:text-red">
                            {channel.value}
                          </p>
                          <p className="mt-1.5 max-w-xs text-[11px] leading-relaxed text-muted">{channel.note}</p>
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>

              <div className="mt-7 space-y-4 border border-ink/10 bg-paper-light p-5">
                <div className="flex items-start gap-3">
                  <MapPin size={15} strokeWidth={1.7} className="mt-0.5 shrink-0 text-muted" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Studio location</p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink">{business.address.display}</p>
                    <a
                      href={business.address.mapsHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
                    >
                      Get directions
                      <ArrowUpRight size={12} strokeWidth={1.8} />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-ink/10 pt-4">
                  <Clock size={15} strokeWidth={1.7} className="mt-0.5 shrink-0 text-muted" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Opening hours</p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink">{business.openingHours.display}</p>
                  </div>
                </div>
              </div>

              <div className="mt-7 border-l-2 border-red pl-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">A note on privacy</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                  Your details are used only to respond to this enquiry. We do not sell or share them. See the{' '}
                  <a href="#privacy" className="link-line text-ink">
                    privacy note
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.06}>
              <p className="eyebrow text-muted">Send an enquiry</p>
              <h2 className="display-sm mt-4">A few details are enough to begin.</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Fields marked with an asterisk are required. If you have artwork, mention it in the message and we will
                tell you how to send it.
              </p>
              <ContactForm className="mt-8" />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="privacy" className="border-t border-ink/10 bg-paper-light py-16 sm:py-20">
        <div className="shell grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-muted">Privacy note</p>
          </div>
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-[13px] leading-relaxed text-muted">
              Information submitted through this website is used solely to respond to your enquiry and prepare a quote.
              It is not sold, rented or shared for marketing. If you would like your details removed after your enquiry
              is resolved, email{' '}
              <a href={mailHref} className="link-line text-ink">
                {business.email}
              </a>{' '}
              and we will delete them.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
