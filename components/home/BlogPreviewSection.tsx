/**
 * @file BlogPreviewSection.tsx
 * @description Preview de posts do blog com grid 1 grande + 2 médios
 * @module components/home
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { blogPosts } from '@/data/blog-posts'
import { Badge } from '@/components/ui/Badge'
import { Clock, ArrowRight } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  mercado: 'Mercado',
  investimento: 'Investimento',
  decoracao: 'Decoração',
  financiamento: 'Financiamento',
  legislacao: 'Legislação',
  dicas: 'Dicas',
}

/**
 * Preview de blog com grid assimétrico e hover effects
 */
export function BlogPreviewSection() {
  const [featured, ...rest] = blogPosts

  return (
    <section className="section-padding" aria-label="Blog e mercado imobiliário">
      <div className="container-premium">
        <ScrollReveal animation="fade-up">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-mono text-sm text-[var(--color-accent-text)] tracking-wider uppercase">
                Insights
              </span>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-black)]">
                Blog & Mercado
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--color-accent)] hover:gap-3 transition-all duration-300"
            >
              Ver todos os artigos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured post — grande */}
          <ScrollReveal animation="fade-up">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <Badge variant="accent">{categoryLabels[featured.category]}</Badge>
                  <h3 className="mt-3 font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
                    {featured.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-white/70 line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={featured.author.avatar}
                        alt={featured.author.name}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <span className="font-sans text-xs text-white/80">{featured.author.name}</span>
                    </div>
                    <span className="flex items-center gap-1 font-sans text-xs text-white/60">
                      <Clock className="w-3 h-3" />
                      {featured.readingTime} min
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Smaller posts */}
          <div className="grid grid-cols-1 gap-6">
            {rest.slice(0, 2).map((post, i) => (
              <ScrollReveal key={post.id} animation="fade-up" delay={0.1 + i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group flex gap-5 items-start">
                  <div className="relative shrink-0 w-40 h-28 md:w-48 md:h-36 rounded-xl overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 py-1">
                    <Badge variant="outline" className="text-[10px]">
                      {categoryLabels[post.category]}
                    </Badge>
                    <h3 className="mt-2 font-sans text-base md:text-lg font-bold text-[var(--color-black)] leading-snug group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-[var(--color-gray-500)] line-clamp-2 hidden md:block">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[var(--color-gray-500)]">
                      <span className="font-sans text-xs">{post.publishedAt}</span>
                      <span className="flex items-center gap-1 font-sans text-xs">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile link */}
        <div className="mt-8 text-center lg:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--color-accent)]"
          >
            Ver todos os artigos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
