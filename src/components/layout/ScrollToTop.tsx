import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => {
        const target = document.querySelector(hash)
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
