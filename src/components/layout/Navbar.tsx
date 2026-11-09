import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { business, navLinks, telHref, whatsappHref, defaultWhatsappMessage } from '../../config/business'
import { cn } from '../../lib/utils'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'border-b border-ink/10 bg-paper/90 backdrop-blur-md' : 'border-b border-transparent bg-paper/0',
        )}
      >
        <div className="shell flex h-[76px] items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'group relative py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300',
                    isActive ? 'text-ink' : 'text-muted hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 left-0 h-px bg-red transition-all duration-500',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full',
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={telHref}
              className="hidden items-center gap-2 text-[11px] font-medium text-ink transition-colors hover:text-red xl:flex"
            >
              <Phone size={13} strokeWidth={1.7} />
              {business.phone.display}
            </a>
            <Button to="/quote" className="hidden sm:inline-flex" icon={false}>
              Get a quote
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={18} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[80] flex flex-col bg-paper"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="shell flex h-[76px] shrink-0 items-center justify-between">
              <div onClick={() => setOpen(false)}>
                <Logo />
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={1.6} />
              </button>
            </div>

            <div className="shell flex flex-1 flex-col justify-between overflow-y-auto pb-8 pt-6">
              <nav aria-label="Mobile primary">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + index * 0.035, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'group flex items-center justify-between border-b border-ink/10 py-3.5',
                          isActive ? 'text-ink' : 'text-ink/75',
                        )
                      }
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="eyebrow text-red">{String(index + 1).padStart(2, '0')}</span>
                        <span className="font-display text-[28px] leading-tight tracking-tight sm:text-3xl">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.4}
                        className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red"
                      />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button to="/quote" className="w-full">
                  Get a quote
                </Button>
                <a
                  href={whatsappHref(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-4 rounded-full border border-ink/20 px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
                >
                  <span className="flex items-center gap-2">
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp
                  </span>
                  <ArrowUpRight size={14} strokeWidth={1.7} />
                </a>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted sm:col-span-2">
                  <a href={telHref} className="link-line text-ink">
                    {business.phone.display}
                  </a>
                  <a href={`mailto:${business.email}`} className="link-line">
                    {business.email}
                  </a>
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted sm:col-span-2">
                  {business.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
