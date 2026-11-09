import { Link } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'
import { defaultWhatsappMessage, whatsappHref } from '../config/business'
import { principles, processSteps } from '../content/process'
import { useSeo } from '../lib/seo'
import { PageHeader } from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'

export function Process() {
  useSeo({
    title: 'Our process',
    description:
      'A clear path from brief to handover at SK Print House: brief, specification, artwork, proof, print and finishing, final check and delivery.',
    path: '/process',
  })

  return (
    <>
      <PageHeader
        eyebrow="Process"
        index="04"
        title={
          <>
            A clear path from idea to <span className="italic text-red">handover.</span>
          </>
        }
        intro="No mystery, no surprises. Six steps take a project from a conversation to a box of finished pieces — with a proof and your approval before anything is printed."
      >
        <div className="md:col-span-5 md:col-start-8">
          <div className="flex items-start gap-4 border-l border-ink/15 pl-6">
            <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/20 text-ink">
              <ArrowDown size={14} strokeWidth={1.7} />
            </span>
            <p className="text-[11px] leading-relaxed text-muted">
              Timings are confirmed with your quote. Urgent work can often be accommodated — ask before ordering.
            </p>
          </div>
        </div>
      </PageHeader>

      <section className="pb-20 sm:pb-24">
        <div className="shell">
          <div className="border-t border-ink/15">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={Math.min(index, 4) * 0.04}>
                <div className="grid gap-6 border-b border-ink/15 py-9 sm:gap-8 sm:py-11 lg:grid-cols-12">
                  <div className="lg:col-span-2">
                    <span className="font-display text-4xl leading-none text-ink/20 sm:text-5xl">{step.number}</span>
                  </div>
                  <div className="lg:col-span-5">
                    <h2 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">{step.title}</h2>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-red">{step.short}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="max-w-md text-sm leading-relaxed text-muted">{step.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {step.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink"
                        >
                          <span className="h-1 w-1 rounded-full bg-red" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-navy py-20 text-paper sm:py-24">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-paper/50">Held to a standard</p>
              <h2 className="display-md mt-5 max-w-md">
                Three principles behind <span className="italic text-red">every job.</span>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/60">
                They are not slogans. They are the checks that keep a finished piece consistent from the first copy to
                the last.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="divide-y divide-paper/15 border-y border-paper/15">
                {principles.map((principle) => (
                  <div key={principle.number} className="grid gap-4 py-6 sm:grid-cols-[48px_1fr] sm:gap-5">
                    <span className="eyebrow text-red">{principle.number}</span>
                    <div>
                      <h3 className="font-display text-xl tracking-tight sm:text-2xl">{principle.title}</h3>
                      <p className="mt-2 max-w-md text-[13px] leading-relaxed text-paper/60">{principle.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow text-muted">Ready when you are</p>
            <h2 className="display-md mt-5 max-w-xl">
              The first step is a <span className="italic text-red">conversation.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
              Tell us the object, the quantity and the date. We will take it from there, or point you to the service
              that fits best.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/quote">Get a quote</Button>
              <Button to="/services" variant="outline">
                Explore services
              </Button>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border border-ink/10 bg-paper-light p-6">
              <p className="eyebrow text-muted">Quick question?</p>
              <p className="mt-3 font-display text-xl leading-tight tracking-tight">
                The fastest reply is usually on WhatsApp.
              </p>
              <a
                href={whatsappHref(defaultWhatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Message the studio
              </a>
              <p className="mt-5 border-t border-ink/10 pt-4 text-[11px] leading-relaxed text-muted">
                Prefer to read first?{' '}
                <Link to="/faqs" className="link-line text-ink">
                  Browse the FAQs
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
