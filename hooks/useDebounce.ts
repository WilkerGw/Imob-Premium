/**
 * @file useDebounce.ts
 * @description Hook de debounce para limitar frequência de atualizações
 * @module hooks
 */

'use client'

import { useState, useEffect } from 'react'

/**
 * Debounce de um valor com delay configurável
 * @param value - Valor a debouncer
 * @param delay - Delay em ms (default: 300)
 * @returns Valor debounced
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
