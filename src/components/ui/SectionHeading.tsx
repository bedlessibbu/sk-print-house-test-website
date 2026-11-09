import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  className?: string
  action?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, intro, className, action, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className={cn('mb-6 flex items-center gap-3', align === 'center' && 'justify-center')}>
        <span className="h-px w-8 bg-red" aria-hidden="true" />
        <span className="eyebrow text-muted">{eyebrow}</span>
      </div>
      <div
        className={cn(
          'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
          align === 'center' && 'items-center text-center md:flex-col md:items-center',
        )}
      >
        <h2 className="display-md max-w-3xl text-balance">{title}</h2>
        {intro && (
          <p className={cn('max-w-sm text-sm leading-relaxed text-muted', align === 'center' && 'max-w-xl')}>
            {intro}
          </p>
        )}
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}
