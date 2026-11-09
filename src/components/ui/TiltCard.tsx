import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { cn } from '../../lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className, intensity = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { stiffness: 140, damping: 20 })
  const rotateY = useSpring(rawY, { stiffness: 140, damping: 20 })

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rawY.set(px * intensity)
    rawX.set(py * -intensity)
  }

  function reset() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div className={cn('perspective', className)}>
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
