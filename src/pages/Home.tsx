import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { business, defaultWhatsappMessage, telHref, whatsappHref } from '../config/business'
import { featuredPortfolio, portfolioItems } from '../content/portfolio'
import { principles, processSteps } from '../content/process'
import { faqs } from '../content/faqs'
import { services } from '../content/services'
import { useSeo } from '../lib/seo'
import { cn } from '../lib/utils'
import { PrintArt } from '../components/art/PrintArt'
import { Accordion } from '../components/ui/Accordion'
import { Button } from '../components/ui/Button'
import { Lightbox } from '../components/ui/Lightbox'
import { Marquee } from '../components/ui/Marquee'
import { Reveal, RevealLine } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TiltCard } from '../components/ui/TiltCard'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'

function RotatingBadge() {
  return (
    <div
      className="absolute -left-3 top-4 z-30 h-24 w-24 rounded-full border border-ink/10 bg-paper/95 shadow-sm backdrop-blur sm:-left-5 sm:top-8 sm:h-28 sm:w-28"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <defs>
          <path id="hero-badge-path" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text fontSize="6.1" letterSpacing="1.7" fill="#0B0C0E">
          <textPath href="#hero-badge-path">
            YOUR COMPLETE PRINTING SOLUTION · SK PRINT HOUSE ·
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-red text-paper">
          <ArrowDown size={14} strokeWidth={1.8} />
        </span>
      </span>
    </div>
  )
}

function HeroStack() {
  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <div className="pointer-events-none absolute -right-8 top-10 h-60 w-60 rounded-full border border-ink/10 sm:h-72 sm:w-72" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-2 top-24 h-40 w-40 rounded-full border border-ink/[0.06] sm:h-52 sm:w-52" aria-hidden="true" />

      <TiltCard intensity={5}>
        <div className="relative h-[430px] sm:h-[540px]">
          <div className="absolute right-0 top-0 w-[76%] overflow-hidden bg-navy paper-shadow">
            <div className="aspect-[4/5]">
              <img
                src="/assets/photos/hero-press.webp"
                alt="Offset printing press running printed sheets"
                width={1600}
                height={1200}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover object-[58%_50%]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/10 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 text-paper sm:inset-x-5 sm:bottom-5">
              <p className="eyebrow text-paper/55">The press</p>
              <p className="mt-1.5 font-display text-lg leading-tight sm:text-xl">Ink, laid down right.</p>
            </div>
          </div>

          <div className="absolute left-0 top-[21%] w-[54%] rotate-[-6deg] overflow-hidden shadow-[0_30px_60px_-20px_rgba(17,29,51,0.5)] transition-transform duration-700 ease-smooth hover:rotate-[-3deg]">
            <div className="aspect-[4/5]">
              <PrintArt art="invite" variant="ivory" title="Wedding invitation print specimen" />
            </div>
          </div>

          <div className="absolute bottom-[3%] right-[1%] w-[61%] rotate-[5deg] overflow-hidden shadow-[0_30px_60px_-20px_rgba(17,29,51,0.5)] transition-transform duration-700 ease-smooth hover:rotate-[2deg]">
            <div className="aspect-[1.75]">
              <PrintArt art="cards" variant="navy" title="Visiting card print specimen" />
            </div>
          </div>

          <RotatingBadge />
        </div>
      </TiltCard>

      <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-3 text-[9px] uppercase tracking-[0.2em] text-muted">
        <span>Print studies / vol. 01</span>
        <span className="hidden sm:inline">Card · invitation · press</span>
      </div>
    </div>
  )
}

const serviceTiles = [
  { slug: 'digital-printing', span: 'lg:col-span-2', wide: true, photo: '/assets/photos/hero-press.webp' },
  { slug: 'wedding-invitations', span: '', wide: false },
  { slug: 'visiting-cards', span: '', wide: false },
  { slug: 'packaging', span: '', wide: false },
  { slug: 'posters', span: '', wide: false },
  { slug: 'large-format-printing', span: 'lg:col-span-3', wide: true, photo: '/assets/photos/street.webp' },
]

function ServiceMosaic() {
  return (
    <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
      {serviceTiles.map((tile) => {
        const service = services.find((entry) => entry.slug === tile.slug)
        if (!service) return null

        return (
          <Link
            key={service.slug}
            to={`/services?service=${service.slug}`}
            className={cn('group block', tile.span)}
          >
            <div
              className={cn(
                'relative overflow-hidden bg-sand',
                tile.wide ? 'aspect-[16/10] lg:aspect-[16/9]' : 'aspect-[4/5]',
              )}
            >
              {tile.photo ? (
                <>
                  <img
                    src={tile.photo}
                    alt={
                      service.slug === 'digital-printing'
                        ? 'Printing press in production'
                        : 'Large-format signage in the city'
                    }
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 text-paper">
                    <p className="eyebrow text-paper/55">{service.category === 'print' ? 'Print & paper' : 'Signage'}</p>
                    <p className="mt-1 font-display text-2xl tracking-tight sm:text-3xl">{service.name}</p>
                  </div>
                </>
              ) : (
                <div className="h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.025]">
                  <PrintArt
                    art={service.art}
                    variant={service.variant}
                    title={`${service.name} print specimen`}
                  />
                </div>
              )}
              <span className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-paper/90 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight size={15} strokeWidth={1.7} />
              </span>
            </div>
            {!tile.photo && (
              <div className="mt-3.5 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-3">
                <h3 className="font-display text-xl leading-tight tracking-tight transition-colors group-hover:text-red">
                  {service.name}
                </h3>
                <span className="eyebrow shrink-0 text-muted/70">{service.category}</span>
              </div>
            )}
          </Link>
        )
      })}
    </div>
  )
}

export function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useSeo({
    title: 'SK Print House — Your Complete Printing Solution',
    description:
      'Your complete printing solution for visiting cards, wedding invitations, packaging, posters, signage, apparel and corporate print. Design-led, proofed and finished with care.',
    path: '/',
  })

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-28 sm:pb-14 sm:pt-32 lg:pb-16 lg:pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ink/10" aria-hidden="true" />
        <div className="shell">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6 xl:col-span-7">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="h-px w-8 bg-red" aria-hidden="true" />
                  <span className="eyebrow text-muted">SK Print House</span>
                  <span className="h-1 w-1 rounded-full bg-ink/30" aria-hidden="true" />
                  <span className="eyebrow text-muted/70">Print atelier</span>
                </div>
              </Reveal>

              <h1 className="display-xl mt-7 sm:mt-8">
                <RevealLine>Made to</RevealLine>
                <RevealLine delay={0.08} className="italic text-red">
                  be held.
                </RevealLine>
              </h1>

              <Reveal delay={0.16}>
                <p className="mt-7 max-w-md text-sm leading-relaxed text-muted sm:mt-8 sm:text-base">
                  Your complete printing solution — from a single visiting card to a full wedding suite. We bring
                  ink, paper and detail together with uncommon care.
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
                  <Button to="/quote">Start a project</Button>
                  <Button to="/services" variant="outline">
                    Explore services
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-muted sm:mt-11">
                  <span>Digital &amp; offset</span>
                  <span className="h-1 w-1 rounded-full bg-red/60" aria-hidden="true" />
                  <span>Design to delivery</span>
                  <span className="h-1 w-1 rounded-full bg-red/60" aria-hidden="true" />
                  <span>Bulk &amp; bespoke</span>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 xl:col-span-5">
              <Reveal delay={0.1}>
                <HeroStack />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7 xl:col-span-8">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-red" aria-hidden="true" />
                  <span className="eyebrow text-muted">01 / The house</span>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="display-md mt-6 max-w-3xl">
                  A complete printing solution, <span className="italic text-red">under one roof.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8 grid gap-7 sm:grid-cols-2">
                  <p className="text-sm leading-relaxed text-muted">
                    Print is a physical thing. It has weight, texture and a life beyond the screen. That is why we
                    treat every job — a hundred cards or a single invitation — as something that will be held,
                    kept and judged in the hand.
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    The studio brings design, digital and offset printing, finishing and large-format work together.
                    One conversation, one standard, from the first proof to the final box.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/15 pt-6 sm:gap-6">
                  {[
                    ['19', 'print disciplines'],
                    ['Digital + offset', 'under one roof'],
                    ['Card to wrap', 'in scale'],
                  ].map(([value, label]) => (
                    <div key={label}>
                      <p className="font-display text-2xl leading-none tracking-tight sm:text-3xl">{value}</p>
                      <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-muted sm:text-[10px]">{label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 xl:col-span-4">
              <Reveal delay={0.1}>
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden bg-sand">
                    <img
                      src="/assets/photos/consult.webp"
                      alt="Reviewing print samples and documents at the studio table"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-4 w-[42%] border-4 border-paper bg-paper shadow-lg sm:-left-6">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src="/assets/photos/swatches.webp"
                        alt="Pantone colour swatches on a designer's desk"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="mt-8 text-[9px] uppercase tracking-[0.2em] text-muted">
                    The briefing table / colour, checked by hand
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="02 / What we print"
            title={
              <>
                A service for <span className="italic text-red">every surface.</span>
              </>
            }
            intro="Nineteen print disciplines, one studio standard. Start with a card, a suite or a full campaign."
            action={
              <Button to="/services" variant="outline">
                All 19 services
              </Button>
            }
          />
          <div className="mt-12 sm:mt-14">
            <ServiceMosaic />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 text-paper sm:py-24 lg:py-28">
        <p
          className="pointer-events-none absolute -bottom-8 right-0 select-none font-display text-[22vw] leading-none tracking-tighter text-paper/[0.04]"
          aria-hidden="true"
        >
          PROCESS
        </p>
        <div className="shell relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-red" aria-hidden="true" />
                <span className="eyebrow text-paper/50">03 / How it works</span>
              </div>
              <h2 className="display-md mt-6 max-w-2xl">
                A clear path from <span className="italic text-red">idea to handover.</span>
              </h2>
            </div>
            <Button to="/process" variant="light">
              Our process
            </Button>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.slice(0, 4).map((step, index) => (
              <Reveal key={step.number} delay={index * 0.06}>
                <div className="border-t border-paper/20 pt-5">
                  <span className="font-display text-4xl leading-none text-paper/25 sm:text-5xl">{step.number}</span>
                  <h3 className="mt-5 font-display text-xl leading-tight tracking-tight sm:text-2xl">{step.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-paper/55 sm:text-[13px]">{step.short}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="04 / Selected print studies"
            title={
              <>
                Work that <span className="italic text-red">feels</span> considered.
              </>
            }
            intro="A look at the studio's print studies — type, paper and finishing composed as one object."
            action={
              <Button to="/portfolio" variant="outline">
                View portfolio
              </Button>
            }
          />

          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {featuredPortfolio.slice(0, 6).map((item) => {
              const fullIndex = portfolioItems.findIndex((entry) => entry.id === item.id)
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIndex(fullIndex)}
                  className="group mb-5 block w-full break-inside-avoid text-left"
                  aria-label={`View ${item.title} in the lightbox`}
                >
                  <div
                    className={cn(
                      'relative overflow-hidden bg-sand',
                      item.size === 'tall' ? 'aspect-[3/4]' : item.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square',
                    )}
                  >
                    <div className="h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.03]">
                      <PrintArt art={item.art} variant={item.variant} title={`${item.title} — ${item.format}`} />
                    </div>
                    <span className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-paper/90 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={15} strokeWidth={1.7} />
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-2.5">
                    <h3 className="font-display text-lg tracking-tight">{item.title}</h3>
                    <span className="eyebrow text-muted/70">{item.category}</span>
                  </div>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted/70">
            Original studio print studies — not client work.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0">
          <img
            src="/assets/photos/paper-cut.webp"
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-deep/80" />
        </div>
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow text-paper/50">The standard</p>
            <blockquote className="mt-6 max-w-4xl font-display text-4xl leading-[1.02] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              &ldquo;The details are not the details.
              <span className="italic text-red"> They are the design.</span>&rdquo;
            </blockquote>
            <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-paper/45">
              SK Print House — studio principle
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/10 py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-red" aria-hidden="true" />
                <span className="eyebrow text-muted">05 / The standard</span>
              </div>
              <h2 className="display-md mt-6">Good print is a series of small decisions.</h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                The difference between adequate and exceptional is usually a millimetre, a shade or a second look.
                We take the second look.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="divide-y divide-ink/10 border-y border-ink/10">
                {principles.map((principle, index) => (
                  <Reveal key={principle.number} delay={index * 0.06}>
                    <div className="grid gap-4 py-7 sm:grid-cols-[56px_1fr] sm:gap-6">
                      <span className="eyebrow text-red">{principle.number}</span>
                      <div>
                        <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{principle.title}</h3>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{principle.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-red" aria-hidden="true" />
                <span className="eyebrow text-muted">06 / Questions</span>
              </div>
              <h2 className="display-md mt-6">Before you print.</h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                A few practical answers. If yours is not here, a message is the fastest way to ask.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button to="/faqs" variant="outline">
                  All FAQs
                </Button>
                <a
                  href={whatsappHref(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 self-center text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={faqs.slice(0, 4)} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 py-14">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow text-muted">Prefer a conversation?</p>
            <p className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">Call the studio directly.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={telHref}
              className="font-display text-xl tracking-tight text-ink transition-colors hover:text-red sm:text-2xl"
            >
              {business.phone.display}
            </a>
            <Button to="/contact" variant="primary">
              Contact us
            </Button>
          </div>
        </div>
      </section>

      <Lightbox
        items={portfolioItems.map((item) => ({
          id: item.id,
          title: item.title,
          meta: `${item.category} · ${item.format}`,
          description: item.description,
          art: item.art,
          variant: item.variant,
        }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  )
}
