import { Clock, Mail, MapPin, Phone } from 'lucide-react'
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
      'Contact SK Print House by phone, email or WhatsApp, or send an enquiry about your printing project. We reply with a clear specification and quote.',
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
      >
        <div className="md:col-span-5 md:col-start-8">
          <div className="flex items-start gap-5 border-l border-ink/15 pl-6">
            <div className="shrink-0 border border-ink/10 bg-white p-2 shadow-[0_14px_36px_-24px_rgba(11,12,14,0.6)]">
              <img
                src="/assets/qr-code.png"
                alt="QR code to connect with SK Print House"
                width={128}
                height={128}
                loading="lazy"
                className="h-28 w-28 sm:h-32 sm:w-32"
              />
            </div>
            <div className="pt-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Scan to connect</p>
              <p className="mt-2 max-w-[16rem] text-[11px] leading-relaxed text-muted">
                Point your phone camera at the code and we will take it from there.
              </p>
              <p className="mt-3 max-w-[16rem] text-[11px] leading-relaxed text-muted">{business.replyNote}</p>
            </div>
          </div>
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
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink">
                      Our full address has not been published on this site yet. Ask us on WhatsApp and we will share
                      the exact location and collection details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-ink/10 pt-4">
                  <Clock size={15} strokeWidth={1.7} className="mt-0.5 shrink-0 text-muted" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Opening hours</p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink">
                      Hours are confirmed directly so you are not met with a closed door. Message before visiting.
                    </p>
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
