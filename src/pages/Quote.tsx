import { Check, Clock, FileText, ShieldCheck } from 'lucide-react'
import { business, defaultWhatsappMessage, telHref, whatsappHref } from '../config/business'
import { useSeo } from '../lib/seo'
import { PageHeader } from '../components/layout/PageHeader'
import { QuoteForm } from '../components/forms/QuoteForm'
import { Reveal } from '../components/ui/Reveal'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'

const assurances = [
  {
    icon: FileText,
    title: 'A written specification',
    body: 'Stock, size, colour, finish and quantity — set out clearly with the price.',
  },
  {
    icon: ShieldCheck,
    title: 'Proof before print',
    body: 'Nothing runs until you have seen and approved the proof.',
  },
  {
    icon: Clock,
    title: 'A realistic date',
    body: 'We confirm the date with the quote, not after the order.',
  },
]

export function Quote() {
  useSeo({
    title: 'Get a quote',
    description:
      'Request a printing quote from SK Print House. Share the item, quantity, size, finish and deadline and we will reply with a clear specification and price.',
    path: '/quote',
  })

  return (
    <>
      <PageHeader
        eyebrow="Get a quote"
        index="08"
        title={
          <>
            A clear quote, <span className="italic text-red">without the guesswork.</span>
          </>
        }
        intro="Three short steps: the brief, the details, your contact. Nothing is charged through this form and nothing is printed until you approve a proof."
      >
        <div className="md:col-span-5 md:col-start-8">
          <div className="flex items-center gap-4 border-l border-ink/15 pl-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red text-paper">
              <Check size={16} strokeWidth={2.2} />
            </span>
            <p className="text-[11px] leading-relaxed text-muted">
              Prefer to talk? Call{' '}
              <a href={telHref} className="link-line text-ink">
                {business.phone.display}
              </a>{' '}
              or{' '}
              <a
                href={whatsappHref(defaultWhatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="link-line text-ink"
              >
                message on WhatsApp
              </a>
              .
            </p>
          </div>
        </div>
      </PageHeader>

      <section className="pb-20 sm:pb-24">
        <div className="shell">
          <QuoteForm />

          <div className="mt-16 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {assurances.map((item, index) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="h-full bg-paper p-6 sm:p-7">
                    <Icon size={18} strokeWidth={1.5} className="text-red" />
                    <h3 className="mt-5 font-display text-xl leading-tight tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-ink/15 pt-8 sm:flex-row sm:items-center">
            <p className="max-w-md text-[13px] leading-relaxed text-muted">
              Have artwork ready? Mention it in the form and we will reply with the best way to send the files.
            </p>
            <a
              href={whatsappHref('Hello SK Print House, I have a print brief I would like to discuss.')}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Send the brief on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
