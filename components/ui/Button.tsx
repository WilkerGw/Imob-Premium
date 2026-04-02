/**
 * @file Button.tsx
 * @description Botão premium com variantes, tamanhos e efeito magnético
 * @module components/ui
 */

'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-black)] text-white hover:bg-[var(--color-accent)] hover:text-[var(--color-black)] border border-transparent',
  secondary:
    'bg-transparent text-[var(--color-black)] border border-[var(--color-black)] hover:bg-[var(--color-black)] hover:text-white',
  ghost:
    'bg-transparent text-[var(--color-black)] border-none hover:underline underline-offset-4',
  accent:
    'bg-[var(--color-accent)] text-[var(--color-black)] hover:bg-[var(--color-accent-dark)] border border-transparent',
  danger:
    'bg-[var(--color-error)] text-white hover:opacity-90 border border-transparent',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[var(--text-sm)]',
  md: 'px-6 py-3 text-[var(--text-base)]',
  lg: 'px-8 py-4 text-[var(--text-lg)]',
  xl: 'px-10 py-5 text-[var(--text-xl)]',
}

/**
 * Botão reutilizável com variantes premium e estados
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'right',
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-sans font-medium',
          'rounded-lg cursor-pointer select-none',
          'transition-all duration-300 ease-[var(--ease-out-expo)]',
          'hover:scale-[1.02] hover:shadow-[var(--shadow-md)]',
          'active:scale-[0.98]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {!isLoading && icon && iconPosition === 'left' && icon}
        {children}
        {!isLoading && icon && iconPosition === 'right' && icon}
      </button>
    )
  }
)
Button.displayName = 'Button'
