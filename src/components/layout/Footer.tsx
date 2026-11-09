import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { business, mailHref, navLinks, telHref, whatsappHref, defaultWhatsappMessage } from '../../config/business'
import { services } from '../../content/services'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="shell pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="inline-flex bg-white p-4">
              <img
                src={business.logo}
                alt="SK Print House — official logo"
                width={120}
                height={120}
                className="h-[110px] w-[110px] object-contain"
                loading="lazy"
              />
            </div>
            <p className="mt-7 max-w-md font-display text-3xl leading-[1.05] tracking-tight sm:text-4xl">
              {business.tagline}.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/55">
              Design-led print for the things worth holding — invitations, packaging, stationery, signage and
              merchandise.
            </p>

            <div className="mt-8 flex flex-col gap-3 text-sm">
              <a href={telHref} className="group flex items-center gap-3 text-paper/80 transition-colors hover:text-paper">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 transition-colors group-hover:border-paper">
                  <Phone size={14} strokeWidth={1.7} />
                </span>
                {business.phone.display}
              </a>
              <a href={mailHref} className="group flex items-center gap-3 text-paper/80 transition-colors hover:text-paper">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 transition-colors group-hover:border-paper">
                  <Mail size={14} strokeWidth={1.7} />
                </span>
                {business.email}
              </a>
              <a
                href={whatsappHref(defaultWhatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 text-paper/80 transition-colors hover:text-paper"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 transition-colors group-hover:border-paper">
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                </span>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <p className="eyebrow text-paper/40">Navigate</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="link-line text-sm text-paper/70 transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/quote" className="link-line text-sm text-paper/70 transition-colors hover:text-paper">
                  Get a quote
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-paper/40">Services</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
              {services.slice(0, 7).map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services?service=${service.slug}`}
                    className="link-line text-sm text-paper/70 transition-colors hover:text-paper"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="link-line text-sm text-paper/70 transition-colors hover:text-paper">
                  All 19 services
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-paper/45">
            © {year} {business.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-paper/45">
            <span>{business.tagline}</span>
            <span className="hidden h-1 w-1 rounded-full bg-red sm:block" aria-hidden="true" />
            <Link to="/contact" className="link-line transition-colors hover:text-paper">
              Start a project
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden px-2">
        <p className="whitespace-nowrap font-display text-[17vw] leading-[0.7] tracking-tighter text-paper/[0.06]">
          SK PRINT HOUSE
        </p>
      </div>
    </footer>
  )
}
