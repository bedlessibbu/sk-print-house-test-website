import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '../../lib/utils'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-5 left-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-paper/90 text-ink shadow-sm backdrop-blur transition-all duration-500 hover:border-ink hover:bg-ink hover:text-paper sm:bottom-6 sm:left-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
      aria-label="Back to top"
    >
      <ArrowUp size={16} strokeWidth={1.7} />
    </button>
  )
}
