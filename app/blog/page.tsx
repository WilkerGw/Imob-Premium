/**
 * @file page.tsx
 * @description Página de listagem do blog com grid de artigos
 * @module app/blog
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Badge } from '@/components/ui/Badge'
import { generatePageMetadata } from '@/lib/seo'
import { blogPosts } from '@/data/blog-posts'
import { Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog | Mercado Imobiliário',
  description: 'Insights, tendências e dicas sobre o mercado imobiliário de alto padrão em São Paulo. Investimento, decoração e muito mais.',
  path: '/blog',
})

const categoryLabels: Record<string, string> = {
  mercado: 'Mercado',
  investimento: 'Investimento',
  decoracao: 'Decoração',
  financiamento: 'Financiamento',
  legislacao: 'Legislação',
  dicas: 'Dicas',
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <>
      <Header theme="light" />
      <main id="main-content" className="pt-20 bg-[var(--color-off-white)]">
        {/* Header */}
        <section className="bg-[var(--color-black)]">
          <div className="container-premium py-20 md:py-18">
            <ScrollReveal animation="fade-up">
              <span className="font-mono text-sm text-[var(--color-accent)] tracking-wider uppercase">Insights</span>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">Blog & Mercado</h1>
              <p className="mt-3 font-sans text-lg text-white/70 max-w-xl">
                Tendências, análises e dicas sobre o mercado imobiliário de alto padrão.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <div className="container-premium py-12 md:py-16">
          {/* Featured */}
          <ScrollReveal animation="fade-up">
            <Link href={`/blog/${featured.slug}`} className="group block mb-12">
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <Badge variant="accent">{categoryLabels[featured.category]}</Badge>
                  <h2 className="mt-3 font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-2 font-sans text-white/70 max-w-2xl line-clamp-2">{featured.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Image src={featured.author.avatar} alt={featured.author.name} width={32} height={32} className="rounded-full" />
                      <span className="font-sans text-sm text-white/80">{featured.author.name}</span>
                    </div>
                    <span className="font-sans text-sm text-white/60">{featured.publishedAt}</span>
                    <span className="flex items-center gap-1 font-sans text-sm text-white/60">
                      <Clock className="w-3.5 h-3.5" />{featured.readingTime} min
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <ScrollReveal key={post.id} animation="fade-up" delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-shadow">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <Badge variant="outline">{categoryLabels[post.category]}</Badge>
                    <h3 className="font-sans text-lg font-bold text-[var(--color-black)] leading-snug group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-[var(--color-gray-500)] line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--color-gray-100)]">
                      <div className="flex items-center gap-2">
                        <Image src={post.author.avatar} alt={post.author.name} width={24} height={24} className="rounded-full" />
                        <span className="font-sans text-xs text-[var(--color-gray-500)]">{post.author.name}</span>
                      </div>
                      <span className="flex items-center gap-1 font-sans text-xs text-[var(--color-gray-500)]">
                        <Clock className="w-3 h-3" />{post.readingTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
