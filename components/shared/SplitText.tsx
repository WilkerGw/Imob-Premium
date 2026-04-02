/**
 * @file SplitText.tsx
 * @description Texto que revela palavra por palavra com animação stagger
 * @module components/shared
 */

'use client'

import { motion, type Variants } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/**
 * Anima cada palavra de um texto individualmente com delay stagger
 */
export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = 'h1',
}: SplitTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const words = text.split(' ')

  const MotionTag = motion.create(Tag)

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  )
}
