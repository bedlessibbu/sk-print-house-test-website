import type { ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  intro: ReactNode
  index?: string
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, intro, index, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
      <div className="pointer-events-none absolute right-0 top-24 h-[320px] w-[320px] rounded-full border border-ink/[0.06] sm:h-[520px] sm:w-[520px]" aria-hidden="true" />
      <div className="shell relative">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-red" aria-hidden="true" />
            <span className="eyebrow text-muted">{eyebrow}</span>
            {index && <span className="eyebrow text-muted/50">/ {index}</span>}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display-xl mt-7 max-w-6xl text-balance">{title}</h1>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 grid gap-8 border-t border-ink/15 pt-8 md:grid-cols-12">
            <p className="max-w-2xl text-sm leading-relaxed text-muted md:col-span-6 md:col-start-7 sm:text-base">
              {intro}
            </p>
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
