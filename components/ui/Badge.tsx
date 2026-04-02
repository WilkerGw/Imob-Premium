/**
 * @file Badge.tsx
 * @description Badge/tag visual para status de imóveis
 * @module components/ui
 */

import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'outline'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-black)] text-white',
  accent: 'bg-[var(--color-accent)] text-[var(--color-black)]',
  success: 'bg-[var(--color-success)] text-white',
  warning: 'bg-[var(--color-warning)] text-[var(--color-black)]',
  outline: 'bg-transparent border border-[var(--color-gray-300)] text-[var(--color-gray-700)]',
}

/**
 * Badge visual para status e categorias
 */
export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full',
        'font-sans text-[11px] font-semibold uppercase tracking-wider',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
