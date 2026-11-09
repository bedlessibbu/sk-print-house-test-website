import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { business, telHref, whatsappHref, defaultWhatsappMessage } from '../../config/business'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy text-paper">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border border-paper/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[380px] w-[380px] rounded-full border border-paper/10" aria-hidden="true" />
      <p
        className="pointer-events-none absolute -bottom-10 right-4 select-none font-display text-[26vw] leading-none tracking-tighter text-paper/[0.04]"
        aria-hidden="true"
      >
        SK
      </p>

      <div className="shell relative py-20 sm:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-red" aria-hidden="true" />
                <span className="eyebrow text-paper/50">Start a project</span>
              </div>
              <h2 className="display-lg mt-6 max-w-3xl">
                Let&rsquo;s put it <span className="italic text-red">on paper.</span>
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-paper/60">
                Tell us what you are making, the quantity and when you need it. We will come back with the right
                process, the right stock and a clear quote.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3">
                <Button to="/quote" variant="light" className="w-full">
                  Get a quote
                </Button>
                <a
                  href={whatsappHref(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-4 rounded-full border border-paper/25 px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink"
                >
                  <span className="flex items-center gap-2.5">
                    <WhatsAppIcon className="h-4 w-4" />
                    Chat on WhatsApp
                  </span>
                  <ArrowUpRight size={14} strokeWidth={1.7} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={telHref}
                  className="group flex items-center justify-between gap-4 rounded-full px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-paper"
                >
                  <span className="flex items-center gap-2.5">
                    <Phone size={14} strokeWidth={1.7} />
                    {business.phone.display}
                  </span>
                  <ArrowUpRight size={14} strokeWidth={1.7} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <motion.div
        className="h-px w-full origin-left bg-red"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
    </section>
  )
}
