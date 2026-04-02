/**
 * @file AnimatedNumber.tsx
 * @description Número que anima de 0 até o valor alvo ao entrar no viewport
 * @module components/ui
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
  className?: string
}

/**
 * Anima um número de 0 até o valor alvo quando entra no viewport
 */
export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  decimals = 0,
  className,
}: AnimatedNumberProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.01 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(Number(latest.toFixed(decimals)))
      },
    })

    return () => controls.stop()
  }, [isInView, value, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}
