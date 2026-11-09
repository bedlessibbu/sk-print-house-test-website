import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { whatsappHref } from '../config/business'
import { getService, serviceCategories, services } from '../content/services'
import type { Service, ServiceCategory } from '../content/services'
import { useSeo } from '../lib/seo'
import { cn } from '../lib/utils'
import { PageHeader } from '../components/layout/PageHeader'
import { PrintArt } from '../components/art/PrintArt'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'

type Filter = 'all' | ServiceCategory

export function Services() {
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState<Filter>('all')

  const serviceParam = params.get('service')
  const active = serviceParam ? (getService(serviceParam) ?? null) : null

  useSeo({
    title: 'Printing services',
    description:
      'All 19 SK Print House services — digital and offset printing, visiting cards, wedding invitations, flex, banners, posters, brochures, flyers, stickers, labels, packaging, apparel, mugs, photo, corporate and large-format printing.',
    path: '/services',
  })

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const next = new URLSearchParams(params)
        next.delete('service')
        setParams(next, { replace: true })
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [active, params, setParams])

  function openService(service: Service) {
    const next = new URLSearchParams(params)
    next.set('service', service.slug)
    setParams(next, { replace: true })
  }

  function closeService() {
    const next = new URLSearchParams(params)
    next.delete('service')
    setParams(next, { replace: true })
  }

  const visible = filter === 'all' ? services : services.filter((service) => service.category === filter)
  const activeLabel = serviceCategories.find((category) => category.id === filter)?.label ?? 'All services'

  return (
    <>
      <PageHeader
        eyebrow="Services"
        index="02"
        title={
          <>
            Nineteen ways to put ink <span className="italic text-red">on paper.</span>
          </>
        }
        intro="From a single visiting card to a full signage run. Choose a discipline to see what it covers, the formats we work in and how to start."
      >
        <div className="md:col-span-5 md:col-start-8">
          <div className="flex items-center gap-4 border-l border-ink/15 pl-6">
            <p className="font-display text-4xl leading-none tracking-tight">19</p>
            <p className="max-w-[10rem] text-[9px] uppercase leading-relaxed tracking-[0.18em] text-muted">
              print disciplines, one studio standard
            </p>
          </div>
        </div>
      </PageHeader>

      <section className="pb-20 sm:pb-24">
        <div className="shell">
          <div className="flex flex-col gap-5 border-y border-ink/15 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:pb-0">
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFilter(category.id)}
                  className={cn(
                    'chip shrink-0 whitespace-nowrap',
                    filter === category.id
                      ? 'border-ink bg-ink text-paper'
                      : 'text-muted hover:border-ink/40 hover:text-ink',
                  )}
                  aria-pressed={filter === category.id}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <p className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-muted">
              {String(visible.length).padStart(2, '0')} shown / {activeLabel}
            </p>
          </div>

          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((service, index) => (
              <Reveal key={service.slug} delay={Math.min(index, 6) * 0.04}>
                <button
                  type="button"
                  onClick={() => openService(service)}
                  className="group block w-full text-left"
                  aria-label={`Open details for ${service.name}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                    <div className="h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.03]">
                      <PrintArt
                        art={service.art}
                        variant={service.variant}
                        title={`${service.name} print specimen`}
                      />
                    </div>
                    <span className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-paper/90 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={15} strokeWidth={1.7} />
                    </span>
                    <span className="absolute left-4 top-4 bg-paper/90 px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {serviceCategories.find((category) => category.id === service.category)?.label}
                    </span>
                  </div>
                  <div className="mt-4 border-t border-ink/15 pt-3.5">
                    <h2 className="font-display text-xl leading-tight tracking-tight transition-colors group-hover:text-red sm:text-2xl">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{service.summary}</p>
                    <p className="mt-3 text-[9px] uppercase tracking-[0.16em] text-muted/70">{service.specs}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-stretch justify-end bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeService}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} details`}
          >
            <motion.aside
              className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-paper"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-paper/95 px-5 py-4 backdrop-blur sm:px-8">
                <p className="eyebrow text-muted">Service / {active.slug.replace(/-/g, ' ')}</p>
                <button
                  type="button"
                  onClick={closeService}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  aria-label="Close service details"
                >
                  <X size={16} strokeWidth={1.6} />
                </button>
              </div>

              <div className="px-5 py-7 sm:px-8 sm:py-9">
                <div className="aspect-[16/10] overflow-hidden bg-sand">
                  <PrintArt
                    art={active.art}
                    variant={active.variant}
                    title={`${active.name} print specimen`}
                  />
                </div>

                <p className="eyebrow mt-7 text-red">
                  {serviceCategories.find((category) => category.id === active.category)?.label}
                </p>
                <h2 className="display-sm mt-3">{active.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">{active.description}</p>

                <div className="mt-7 grid gap-6 border-t border-ink/15 pt-6 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow text-muted">What it covers</p>
                    <ul className="mt-4 space-y-2.5">
                      {active.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink">
                          <Check size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-red" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow text-muted">Typical specification</p>
                    <p className="mt-4 border border-ink/10 bg-paper-light p-4 text-[13px] leading-relaxed text-ink">
                      {active.specs}
                    </p>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted">
                      Specifications are confirmed per project. Tell us the quantity and deadline and we will recommend
                      the sensible route.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to={`/quote?service=${active.slug}`}>Get a quote</Button>
                  <a
                    href={whatsappHref(
                      `Hello SK Print House, I would like to ask about ${active.name}. Could you help me with a quote?`,
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center justify-between gap-4 rounded-full border border-ink/25 px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <span className="flex items-center gap-2">
                      <WhatsAppIcon className="h-4 w-4" />
                      Ask on WhatsApp
                    </span>
                    <ArrowUpRight size={14} strokeWidth={1.7} />
                  </a>
                </div>

                <div className="mt-8 border-t border-ink/15 pt-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted">Other services</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {services
                      .filter((service) => service.slug !== active.slug)
                      .slice(0, 6)
                      .map((service) => (
                        <button
                          key={service.slug}
                          type="button"
                          onClick={() => openService(service)}
                          className="link-line text-[12px] text-ink transition-colors hover:text-red"
                        >
                          {service.name}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="border-t border-ink/10 py-14">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow text-muted">Not sure which process?</p>
            <p className="mt-2 max-w-md font-display text-2xl leading-tight tracking-tight sm:text-3xl">
              Send the brief. We will recommend the right one.
            </p>
          </div>
          <Button to="/contact" icon={false}>
            Ask the studio
          </Button>
        </div>
      </section>
    </>
  )
}
