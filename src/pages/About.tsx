import { Link } from 'react-router-dom'
import { defaultWhatsappMessage, whatsappHref } from '../config/business'
import { principles } from '../content/process'
import { services } from '../content/services'
import { useSeo } from '../lib/seo'
import { PageHeader } from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon'
import { PrintArt } from '../components/art/PrintArt'

const beliefs = [
  {
    title: 'Print is a physical thing',
    body: 'It has weight, texture and a life beyond the screen. A card is held, a box is opened, a poster is walked past. We design for that moment, not just for a file.',
  },
  {
    title: 'The details are the design',
    body: 'A millimetre of margin, the shade of a red, the way a fold sits. The difference between adequate and exceptional is usually a small decision made carefully.',
  },
  {
    title: 'One standard, every scale',
    body: 'A single visiting card and a full signage run get the same attention. The quantity changes the process, not the care.',
  },
]

export function About() {
  useSeo({
    title: 'About the studio',
    description:
      'SK Print House is a printing studio built around one idea: your complete printing solution, from a single card to a full suite. Design-led, proofed and finished with care.',
    path: '/about',
  })

  return (
    <>
      <PageHeader
        eyebrow="About the studio"
        index="01"
        title={
          <>
            Your complete <span className="italic text-red">printing solution.</span>
          </>
        }
        intro={
          <>
            SK Print House brings design, digital and offset printing, finishing and large-format work together under
            one roof — so a project can move from an idea to a box of finished pieces without losing its thread.
          </>
        }
      >
        <div className="md:col-span-5 md:col-start-8">
          <div className="flex flex-wrap gap-x-8 gap-y-4 border-l border-ink/15 pl-6">
            <div>
              <p className="font-display text-3xl leading-none tracking-tight">19</p>
              <p className="mt-1.5 text-[9px] uppercase tracking-[0.18em] text-muted">print disciplines</p>
            </div>
            <div>
              <p className="font-display text-3xl leading-none tracking-tight">Digital + offset</p>
              <p className="mt-1.5 text-[9px] uppercase tracking-[0.18em] text-muted">one studio</p>
            </div>
          </div>
        </div>
      </PageHeader>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="display-sm max-w-2xl text-balance">
                  We are a print house for people who care what the finished thing <span className="italic text-red">feels like.</span>
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <p className="text-sm leading-relaxed text-muted">
                    The studio exists to make printing simple without making it ordinary. You bring the occasion, the
                    brand or the idea; we bring the process, the paper and the proofing that keeps it right. Everything
                    is discussed in plain language, quoted clearly, and checked before it runs.
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    Our work ranges from a single visiting card to wedding suites, packaging runs, corporate stationery,
                    apparel, merchandise and large-format signage. Different objects, one standard: the piece should
                    look considered in the hand and hold up in real use.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 border-t border-ink/15 pt-7">
                  <p className="eyebrow text-muted">The promise</p>
                  <ul className="mt-5 grid gap-x-8 gap-y-3 text-sm text-ink sm:grid-cols-2">
                    {[
                      'A clear, itemised quote',
                      'A proof before anything prints',
                      'Honest advice on stock and finish',
                      'A named contact from brief to handover',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.08}>
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden bg-sand">
                    <img
                      src="/assets/photos/consult.webp"
                      alt="Reviewing printed samples and artwork at a studio table"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-5 -left-5 hidden w-[46%] border-4 border-paper bg-paper shadow-lg sm:block">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src="/assets/photos/paper-cut.webp"
                        alt="Paper being cut and finished by hand"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-[9px] uppercase tracking-[0.2em] text-muted">
                  The studio table / brief, stock, proof
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper-light py-20 sm:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="What we believe"
            title={
              <>
                Three things we <span className="italic text-red">do not compromise.</span>
              </>
            }
            intro="They sound simple. In practice, they decide how a finished piece turns out."
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {beliefs.map((belief, index) => (
              <Reveal key={belief.title} delay={index * 0.06}>
                <div className="h-full bg-paper-light p-7 sm:p-8">
                  <span className="eyebrow text-red">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight">{belief.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{belief.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-red" aria-hidden="true" />
                <span className="eyebrow text-muted">The standard</span>
              </div>
              <h2 className="display-md mt-6">Good print is a series of small decisions.</h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                These principles shape every job, whether it is one card or a thousand boxes.
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

      <section className="border-t border-ink/10 py-20 sm:py-24">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="aspect-[4/5] overflow-hidden bg-sand">
                  <PrintArt art="press" variant="ivory" title="The press — SK Print House studio" />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.06}>
                <p className="eyebrow text-muted">Under one roof</p>
                <h2 className="display-md mt-5 max-w-xl">
                  From the first file to the <span className="italic text-red">final box.</span>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
                  Nineteen disciplines, one point of contact. Start with a single item or bring us the whole set — the
                  conversation and the standard stay the same.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {services.slice(0, 8).map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services?service=${service.slug}`}
                      className="link-line transition-colors hover:text-red"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button to="/services">Explore services</Button>
                  <Button to="/portfolio" variant="outline">
                    See print studies
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 py-14">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow text-muted">Talk to the studio</p>
            <p className="mt-2 max-w-md font-display text-2xl leading-tight tracking-tight sm:text-3xl">
              Tell us what you are making. We will tell you how to print it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={whatsappHref(defaultWhatsappMessage)}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <Button to="/contact" icon={false}>
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
