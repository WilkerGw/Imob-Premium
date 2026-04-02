/**
 * @file MobileMenu.tsx
 * @description Menu mobile drawer lateral com navegação completa
 * @module components/layout
 */

'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, Building2, Users, BookOpen, Info, Phone, MessageCircle } from 'lucide-react'
import { NAV_LINKS, COMPANY } from '@/lib/constants'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuIcons: Record<string, React.ReactNode> = {
  '/imoveis': <Building2 className="w-5 h-5" />,
  '/imoveis?tipo=lancamento': <Building2 className="w-5 h-5" />,
  '/corretores': <Users className="w-5 h-5" />,
  '/blog': <BookOpen className="w-5 h-5" />,
  '/sobre': <Info className="w-5 h-5" />,
  '/contato': <Phone className="w-5 h-5" />,
}

/**
 * Drawer menu lateral para mobile com backdrop blur
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Travar scroll do body quando menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-sm bg-white shadow-[var(--shadow-xl)]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-gray-100)]">
                <span className="font-serif text-xl font-bold text-[var(--color-black)]">
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-6 py-6 overflow-y-auto" aria-label="Menu principal">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-[var(--color-gray-700)] hover:bg-[var(--color-surface)] hover:text-[var(--color-black)] transition-all font-sans font-medium"
                      >
                        {menuIcons[link.href] || <Home className="w-5 h-5" />}
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom CTA */}
              <div className="px-6 py-6 border-t border-[var(--color-gray-100)] space-y-3">
                <Link
                  href="/contato"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[var(--color-black)] text-white font-sans font-semibold text-sm hover:bg-[var(--color-accent)] transition-colors"
                >
                  Anunciar imóvel
                </Link>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-[var(--color-success)] text-[var(--color-success)] font-sans font-semibold text-sm hover:bg-[var(--color-success)] hover:text-white transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
