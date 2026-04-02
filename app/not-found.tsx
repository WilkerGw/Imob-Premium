/**
 * @file not-found.tsx
 * @description Página 404 personalizada e premium
 * @module app
 */

import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Header theme="light" />
      <main id="main-content" className="pt-20 min-h-[80vh] flex items-center bg-[var(--color-off-white)]">
        <div className="container-premium text-center py-20">
          {/* 404 Number */}
          <h1 className="font-serif text-[8rem] md:text-[12rem] font-bold text-[var(--color-gray-100)] leading-none select-none">
            404
          </h1>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-black)] -mt-8 relative z-10">
            Página não encontrada
          </h2>

          <p className="mt-4 font-sans text-lg text-[var(--color-gray-500)] max-w-md mx-auto">
            O endereço que você procura não existe ou foi movido. Mas temos muitos outros endereços incríveis para você.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-black)] text-white font-sans text-sm font-semibold hover:bg-[var(--color-accent)] transition-colors"
            >
              <Home className="w-4 h-4" />
              Voltar à Home
            </Link>
            <Link
              href="/imoveis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--color-gray-300)] text-[var(--color-gray-700)] font-sans text-sm font-semibold hover:bg-white transition-colors"
            >
              <Search className="w-4 h-4" />
              Buscar imóveis
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
