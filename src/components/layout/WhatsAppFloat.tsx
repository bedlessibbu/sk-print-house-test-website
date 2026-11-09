import { whatsappHref, defaultWhatsappMessage } from '../../config/business'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref(defaultWhatsappMessage)}
      target="_blank"
      rel="noreferrer noopener"
      className="group fixed bottom-5 right-5 z-40 flex h-11 items-center gap-2.5 rounded-full bg-navy px-3.5 text-paper shadow-[0_18px_40px_-16px_rgba(17,29,51,0.6)] transition-all duration-500 hover:bg-red sm:bottom-6 sm:right-6 sm:h-12 sm:px-5"
      aria-label="Chat with SK Print House on WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] sm:block">WhatsApp</span>
    </a>
  )
}
