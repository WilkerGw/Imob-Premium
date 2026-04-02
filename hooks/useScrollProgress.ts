/**
 * @file useScrollProgress.ts
 * @description Hook para rastrear o progresso de scroll de um elemento
 * @module hooks
 */

'use client'

import { useEffect, useState, useRef, type RefObject } from 'react'

/**
 * Retorna o progresso de scroll de um elemento (0 a 1)
 * @param ref - Ref do elemento a rastrear
 * @returns Progresso de 0 (topo) a 1 (fundo)
 */
export function useScrollProgress(ref?: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref?.current) {
        const { top, height } = ref.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const rawProgress = (windowHeight - top) / (windowHeight + height)
        setProgress(Math.min(Math.max(rawProgress, 0), 1))
      } else {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement
        setProgress(scrollTop / (scrollHeight - clientHeight))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref])

  return progress
}
