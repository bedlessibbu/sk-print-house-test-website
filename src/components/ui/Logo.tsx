import { Link } from 'react-router-dom'
import { business } from '../../config/business'
import { cn } from '../../lib/utils'

interface LogoProps {
  className?: string
  light?: boolean
}

export function Logo({ className, light = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('group flex items-center gap-3', className)}
      aria-label={`${business.name} — home`}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white ring-1 ring-ink/10 transition-transform duration-500 ease-smooth group-hover:scale-105">
        <img
          src="/assets/logo-mark.png"
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            'block font-display text-[17px] leading-none tracking-tight sm:text-[19px]',
            light ? 'text-paper' : 'text-ink',
          )}
        >
          SK Print House
        </span>
        <span
          className={cn(
            'mt-1.5 hidden text-[7.5px] font-semibold uppercase tracking-[0.2em] sm:block',
            light ? 'text-paper/55' : 'text-muted',
          )}
        >
          {business.tagline}
        </span>
      </span>
    </Link>
  )
}
