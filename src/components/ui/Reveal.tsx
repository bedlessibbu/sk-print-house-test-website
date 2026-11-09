import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export function Reveal({ children, className, delay = 0, y = 26, once = true }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: reduce ? 0.2 : 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function RevealLine({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={className}
        initial={reduce ? { opacity: 0 } : { y: '110%' }}
        animate={reduce ? { opacity: 1 } : { y: '0%' }}
        transition={{ duration: reduce ? 0.2 : 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'block' }}
      >
        {children}
      </motion.span>
    </span>
  )
}
