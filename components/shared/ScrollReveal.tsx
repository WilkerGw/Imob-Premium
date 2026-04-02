/**
 * @file ScrollReveal.tsx
 * @description Wrapper de animação de reveal ao entrar no viewport
 * @module components/shared
 */

'use client'

import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

type AnimationType = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale'

interface ScrollRevealProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
}

const animationVariants: Record<AnimationType, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
}

/**
 * Wrapper que aplica animação de entrada ao entrar no viewport
 */
export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.7,
  threshold = 0.05,
  once = true,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={animationVariants[animation]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
