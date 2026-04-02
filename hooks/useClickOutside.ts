/**
 * @file useClickOutside.ts
 * @description Hook para detectar cliques fora de um elemento
 * @module hooks
 */

import { useEffect, type RefObject } from 'react'

/**
 * Executa um handler quando ocorre um clique fora dos elementos fornecidos
 * @param refs Ref ou array de refs dos elementos a monitorar
 * @param handler Função a executar no clique externo
 */
export function useClickOutside(
  refs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const refArray = Array.isArray(refs) ? refs : [refs]
      
      // Verifica se o clique foi dentro de algum dos elementos monitorados
      const isInside = refArray.some((ref) => {
        return !ref.current || ref.current.contains(event.target as Node)
      })

      if (isInside) return

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}
