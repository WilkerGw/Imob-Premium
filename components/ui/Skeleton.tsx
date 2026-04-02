/**
 * @file Skeleton.tsx
 * @description Componente de loading skeleton para estados de carregamento
 * @module components/ui
 */

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

/**
 * Skeleton loading placeholder com animação pulse
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-[var(--color-surface-alt)]',
        className
      )}
      aria-hidden="true"
    />
  )
}

/**
 * Skeleton para um PropertyCard
 */
export function PropertyCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-[var(--shadow-sm)]">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 md:p-5 space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-10" />
        </div>
        <div className="pt-3 border-t border-[var(--color-gray-100)]">
          <Skeleton className="h-6 w-36" />
        </div>
      </div>
    </div>
  )
}
