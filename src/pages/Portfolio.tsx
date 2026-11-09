import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { portfolioCategories, portfolioItems } from '../content/portfolio'
import type { PortfolioCategory } from '../content/portfolio'
import { useSeo } from '../lib/seo'
import { cn } from '../lib/utils'
import { PageHeader } from '../components/layout/PageHeader'
import { PrintArt } from '../components/art/PrintArt'
import { Button } from '../components/ui/Button'
import { Lightbox } from '../components/ui/Lightbox'
import { Reveal } from '../components/ui/Reveal'

type Filter = 'All' | PortfolioCategory

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useSeo({
    title: 'Portfolio — print studies',
    description:
      'Selected SK Print House print studies: invitations, identity, packaging, editorial, signage and merchandise. Original studio specimens, composed in type, paper and finish.',
    path: '/portfolio',
  })

  const visible = useMemo(
    () => (filter === 'All' ? portfolioItems : portfolioItems.filter((item) => item.category === filter)),
    [filter],
  )

  const lightboxItems = portfolioItems.map((item) => ({
    id: item.id,
    title: item.title,
    meta: `${item.category} · ${item.format}`,
    description: item.description,
    art: item.art,
    variant: item.variant,
  }))

  function openLightbox(id: string) {
    const index = portfolioItems.findIndex((item) => item.id === id)
    if (index >= 0) setLightboxIndex(index)
  }

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        index="03"
        title={
          <>
            Print studies, made to be <span className="italic text-red">held.</span>
          </>
        }
        intro="An honest look at the studio's print studies — original specimens exploring type, paper and finishing. They are not client work; they are the way we think about print."
      >
        <div className="md:col-span-5 md:col-start-8">
          <p className="border-l border-ink/15 pl-6 text-[11px] leading-relaxed text-muted">
            Every piece here was composed for this website as a studio study. When we publish client work, it will be
            with the client's permission.
          </p>
        </div>
      </PageHeader>

      <section className="pb-20 sm:pb-24">
        <div className="shell">
          <div className="flex flex-col gap-5 border-y border-ink/15 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:pb-0">
              {portfolioCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={cn(
                    'chip shrink-0 whitespace-nowrap',
                    filter === category ? 'border-ink bg-ink text-paper' : 'text-muted hover:border-ink/40 hover:text-ink',
                  )}
                  aria-pressed={filter === category}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-muted">
              {String(visible.length).padStart(2, '0')} pieces
            </p>
          </div>

          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {visible.map((item, index) => (
              <Reveal key={item.id} delay={Math.min(index, 6) * 0.04}>
                <button
                  type="button"
                  onClick={() => openLightbox(item.id)}
                  className="group mb-6 block w-full break-inside-avoid text-left"
                  aria-label={`Enlarge ${item.title}`}
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
                  <div className="mt-3.5 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-3">
                    <div>
                      <h2 className="font-display text-xl leading-tight tracking-tight transition-colors group-hover:text-red">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted">{item.format}</p>
                    </div>
                    <span className="eyebrow shrink-0 text-muted/60">{item.category}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper-light py-20 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-muted">Your project next</p>
            <h2 className="display-md mt-5 max-w-2xl">
              A study is a starting point. <span className="italic text-red">Yours is the real thing.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
              Bring a reference you like, a rough sketch or just the occasion. We will translate it into stock, format
              and finish that suit the job.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Button to="/quote">Start a project</Button>
            <Button to="/services" variant="outline">
              Browse services
            </Button>
          </div>
        </div>
      </section>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  )
}
