import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
  defaultOpen?: number | null
}

export function Accordion({ items, className, defaultOpen = 0 }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const reduce = useReducedMotion()

  return (
    <div className={cn('border-b border-ink/15', className)}>
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `accordion-panel-${index}`
        const buttonId = `accordion-button-${index}`

        return (
          <div key={`${item.question}-${index}`} className="border-t border-ink/15">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-5 py-6 text-left sm:py-7"
              >
                <span className="flex items-baseline gap-4 sm:gap-6">
                  <span className="eyebrow shrink-0 text-red">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-display text-lg leading-snug tracking-tight transition-colors duration-300 group-hover:text-red sm:text-xl md:text-2xl">
                    {item.question}
                  </span>
                </span>
                <span
                  className={cn(
                    'mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500',
                    isOpen ? 'rotate-45 border-ink bg-ink text-paper' : 'border-ink/20 text-ink group-hover:border-ink',
                  )}
                  aria-hidden="true"
                >
                  <Plus size={15} strokeWidth={1.6} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-[2.6rem] pr-10 text-sm leading-relaxed text-muted sm:pl-[3.6rem] sm:text-[15px]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
