/**
 * @file Select.tsx
 * @description Componente de seleção premium com glassmorphism e animações
 * @module components/ui
 */

'use client'

import { useState, useRef, forwardRef, useImperativeHandle, type RefObject } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClickOutside } from '@/hooks/useClickOutside'

export interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  variant?: 'glass' | 'outline'
  className?: string
  error?: string
  disabled?: boolean
  name?: string
  id?: string
}

/**
 * Dropdown customizado com suporte a glassmorphism e animações Framer Motion
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = 'Selecione...',
      label,
      variant = 'outline',
      className,
      error,
      disabled = false,
      name,
      id,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [internalValue, setInternalValue] = useState(value || defaultValue || '')
    const containerRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)

    // Sincroniza valor externo se fornecido
    const currentValue = value !== undefined ? value : internalValue
    const selectedOption = options.find((opt) => opt.value === currentValue)

    useImperativeHandle(ref, () => triggerRef.current!)

    useClickOutside(containerRef as RefObject<HTMLElement>, () => setIsOpen(false))

    const handleSelect = (optionValue: string) => {
      setInternalValue(optionValue)
      onChange?.(optionValue)
      setIsOpen(false)
    }

    const toggleOpen = () => {
      if (!disabled) setIsOpen(!isOpen)
    }

    return (
      <div 
        ref={containerRef} 
        className={cn('relative w-full flex flex-col gap-1.5', className)}
      >
        {label && (
          <label className="font-sans text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="relative h-full">
          <button
            ref={triggerRef}
            id={id}
            type="button"
            onClick={toggleOpen}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className={cn(
              'flex items-center justify-between w-full h-full px-4 rounded-xl',
              'font-sans text-sm transition-all duration-300 outline-none',
              'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
              
              // Variantes
              variant === 'glass' && [
                'bg-white/10 border border-white/20 backdrop-blur-md text-white',
                'hover:bg-white/20 focus:border-white/40',
                isOpen && 'bg-white/20 border-white/40'
              ],
              variant === 'outline' && [
                'bg-white border border-gray-100 text-(--color-black)',
                'hover:border-gray-300 focus:border-accent',
                isOpen && 'border-accent'
              ],
              
              error && 'border-error focus:border-error'
            )}
          >
            <span className={cn(
              'truncate',
              !selectedOption && variant === 'glass' && 'text-white/70',
              !selectedOption && variant === 'outline' && 'text-gray-500'
            )}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown 
              className={cn(
                'w-4 h-4 ml-2 transition-transform duration-300 shrink-0',
                isOpen && 'rotate-180',
                variant === 'glass' ? 'text-white/70' : 'text-gray-400'
              )} 
            />
          </button>

          {/* Menu Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'absolute z-50 left-0 right-0 bottom-full mb-2 max-h-60 overflow-y-auto py-2',
                  'rounded-xl shadow-(--shadow-lg) custom-scrollbar',
                  variant === 'glass' 
                    ? 'bg-black/80 backdrop-blur-xl border border-white/10 text-white' 
                    : 'bg-white border border-gray-100 text-(--color-black)'
                )}
                role="listbox"
              >
                {options.map((option) => {
                  const isSelected = option.value === currentValue
                  return (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        'flex items-center justify-between px-4 py-2.5 cursor-pointer',
                        'font-sans text-sm transition-colors',
                        isSelected && [
                          variant === 'glass' && 'bg-white/10 font-semibold',
                          variant === 'outline' && 'bg-surface font-semibold text-accent-text'
                        ],
                        !isSelected && [
                          variant === 'glass' && 'hover:bg-white/5',
                          variant === 'outline' && 'hover:bg-surface'
                        ]
                      )}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && <Check className="w-4 h-4 ml-2 shrink-0" />}
                    </li>
                  )
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <p className="font-sans text-xs text-error">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
