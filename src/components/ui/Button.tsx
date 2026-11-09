import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'outline' | 'light' | 'red' | 'ghost'

interface ButtonProps {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: Variant
  className?: string
  icon?: boolean
  disabled?: boolean
  ariaLabel?: string
}

const base =
  'group inline-flex items-center justify-between gap-4 rounded-full px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] transition-all duration-500 ease-smooth disabled:cursor-not-allowed disabled:opacity-50 sm:text-[11px]'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-navy',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  light: 'bg-paper text-ink hover:bg-white',
  red: 'bg-red text-paper hover:bg-red-deep',
  ghost: 'px-0 py-0 text-ink hover:text-red',
}

const iconVariants: Record<Variant, string> = {
  primary: 'bg-paper/10 text-paper',
  outline: 'bg-ink/5 text-ink group-hover:bg-paper/10 group-hover:text-paper',
  light: 'bg-ink/5 text-ink',
  red: 'bg-paper/15 text-paper',
  ghost: 'bg-ink/5 text-ink group-hover:bg-red group-hover:text-paper',
}

export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  icon = true,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span
          className={cn(
            'grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-500',
            iconVariants[variant],
          )}
          aria-hidden="true"
        >
          <ArrowUpRight
            size={14}
            strokeWidth={1.8}
            className="transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      )}
    </>
  )

  const classes = cn(base, variants[variant], !icon && 'px-6', className)

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  )
}
