import { useMemo, useState } from 'react'
import { faqCategories, faqs } from '../content/faqs'
import type { Faq } from '../content/faqs'
import { useSeo } from '../lib/seo'
import { cn } from '../lib/utils'
import { PageHeader } from '../components/layout/PageHeader'
import { Accordion } from '../components/ui/Accordion'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'

type Filter = 'All' | Faq['category']

export function Faqs() {
  const [filter, setFilter] = useState<Filter>('All')

  useSeo({
    title: 'Frequently asked questions',
    description:
      'Practical answers about ordering, artwork, proofing, production, colour, delivery and payment at SK Print House.',
    path: '/faqs',
  })

  const visible = useMemo(() => (filter === 'All' ? faqs : faqs.filter((faq) => faq.category === filter)), [filter])

  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        index="06"
        title={
          <>
            Before you <span className="italic text-red">print.</span>
          </>
        }
        intro="The practical questions we are asked most — about ordering, files, proofs, colour, timing and delivery. If yours is not here, a message is the fastest way to ask."
      >
        <div className="md:col-span-5 md:col-start-8">
          <div className="flex flex-wrap gap-3 border-l border-ink/15 pl-6">
            <Button to="/contact" icon={false}>
              Ask a question
            </Button>
            <Button to="/quote" variant="outline">
              Get a quote
            </Button>
          </div>
        </div>
      </PageHeader>

      <section className="pb-20 sm:pb-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-muted">Browse by topic</p>
              <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {faqCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    className={cn(
                      'chip',
                      filter === category
                        ? 'border-ink bg-ink text-paper'
                        : 'text-muted hover:border-ink/40 hover:text-ink',
                    )}
                    aria-pressed={filter === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <p className="mt-6 hidden border-t border-ink/10 pt-4 text-[11px] leading-relaxed text-muted lg:block">
                {visible.length} {visible.length === 1 ? 'answer' : 'answers'} shown. Everything else is a message away.
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <Accordion items={visible} defaultOpen={0} />
            </Reveal>
            <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-muted/70">
              Showing {String(visible.length).padStart(2, '0')} / {String(faqs.length).padStart(2, '0')}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper-light py-20 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow text-muted">Still unsure?</p>
            <h2 className="display-md mt-5 max-w-2xl">
              Ask us the awkward question. <span className="italic text-red">We would rather answer it early.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
              Quantity, paper, a tight deadline, a file that will not behave — tell us what is on your mind and we will
              give you a straight answer.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Button to="/contact">Contact the studio</Button>
            <Button to="/process" variant="outline">
              See the process
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
