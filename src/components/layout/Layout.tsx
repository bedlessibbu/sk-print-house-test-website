import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CtaBand } from './CtaBand'
import { BackToTop } from './BackToTop'
import { WhatsAppFloat } from './WhatsAppFloat'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  const location = useLocation()
  const hideCta = location.pathname === '/contact' || location.pathname === '/quote'

  return (
    <div className="grain min-h-screen bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.16em] focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </main>
      {!hideCta && <CtaBand />}
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </div>
  )
}
