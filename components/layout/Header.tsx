/**
 * @file Header.tsx
 * @description Header fixo com transição transparente→blur no scroll e mega-menu
 * @module components/layout
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { NAV_LINKS, COMPANY } from '@/lib/constants'
import { Heart, User, Menu } from 'lucide-react'
import { MobileMenu } from './MobileMenu'

/**
 * Header fixo premium com transição de transparência no scroll
 */
export function Header({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLightMode = scrolled || theme === 'light'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-[var(--ease-out-expo)]',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[var(--shadow-sm)] border-b border-[var(--color-gray-100)]'
            : 'bg-transparent'
        )}
      >
        <nav
          className="container-premium flex items-center justify-between h-20"
          aria-label="Navegação principal"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label={`${COMPANY.name} - Voltar à Home`}>
            <span
              className={cn(
                'font-serif text-2xl font-bold tracking-tight transition-colors duration-300',
                isLightMode ? 'text-[var(--color-black)]' : 'text-white'
              )}
            >
              Imob
            </span>
            <span className="font-serif text-2xl font-light italic text-[var(--color-accent-text)]">Premium</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-mono text-sm text-[var(--color-accent-text)] tracking-wider uppercase',
                  'font-sans text-[12px] font-medium transition-all duration-300',
                  'hover:text-[var(--color-accent)] relative',
                  'after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px]',
                  'after:bg-[var(--color-accent)] after:transition-all after:duration-300',
                  'hover:after:w-full',
                  isLightMode ? 'text-[var(--color-gray-700)]' : 'text-white/90'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className={cn(
                'hidden md:flex items-center justify-center w-10 h-10 rounded-full',
                'transition-all duration-300 cursor-pointer',
                isLightMode
                  ? 'text-[var(--color-gray-700)] hover:bg-[var(--color-surface)]'
                  : 'text-white/90 hover:bg-white/10'
              )}
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5" />
            </button>

            <Link
              href="/contato"
              className={cn(
                'hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg',
                'font-sans text-sm font-medium transition-all duration-300',
                isLightMode
                  ? 'bg-[var(--color-black)] text-white hover:bg-[var(--color-accent)]'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'
              )}
            >
              Anunciar
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                'lg:hidden flex items-center justify-center w-10 h-10 rounded-full',
                'transition-all duration-300 cursor-pointer',
                isLightMode
                  ? 'text-[var(--color-black)] hover:bg-[var(--color-surface)]'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
