import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import type { ArtKey, ArtVariant } from '../../content/art'
import { PrintArt } from '../art/PrintArt'

export interface LightboxItem {
  id: string
  title: string
  meta: string
  description: string
  art: ArtKey
  variant?: ArtVariant
}

interface LightboxProps {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onChange: (index: number) => void
}

export function Lightbox({ items, index, onClose, onChange }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (index === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (event.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
    }

    document.addEventListener('keydown', onKeyDown)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previous
    }
  }, [index, items.length, onChange, onClose])

  if (typeof document === 'undefined') return null

  const item = index !== null ? items[index] : null

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} — enlarged view`}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink sm:right-8 sm:top-8"
            aria-label="Close image viewer"
          >
            <X size={18} strokeWidth={1.6} />
          </button>

          <motion.div
            className="grid max-h-[92vh] w-full max-w-6xl grid-cols-1 gap-6 overflow-y-auto lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:overflow-visible"
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto w-full max-w-md overflow-hidden bg-paper shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] lg:max-w-none">
              <div className={item.art === 'brochure' || item.art === 'billboard' || item.art === 'notebook' ? 'aspect-[4/3]' : 'aspect-[4/5]'}>
                <PrintArt art={item.art} variant={item.variant} title={`${item.title} — ${item.meta}`} />
              </div>
            </div>

            <div className="text-paper">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-red" aria-hidden="true" />
                <span className="eyebrow text-paper/60">{item.meta}</span>
              </div>
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">{item.title}</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/65">{item.description}</p>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-paper/15 pt-5">
                <span className="text-[10px] uppercase tracking-[0.22em] text-paper/50">
                  {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onChange((index! - 1 + items.length) % items.length)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-paper/25 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                    aria-label="Previous piece"
                  >
                    <ArrowLeft size={16} strokeWidth={1.6} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange((index! + 1) % items.length)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-paper/25 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                    aria-label="Next piece"
                  >
                    <ArrowRight size={16} strokeWidth={1.6} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
