/**
 * @file page.tsx
 * @description Post individual do blog com conteúdo completo e sidebar
 * @module app/blog/[slug]
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Badge } from '@/components/ui/Badge'
import { generatePageMetadata } from '@/lib/seo'
import { blogPosts } from '@/data/blog-posts'
import { Clock, ArrowLeft, Share2, Calendar } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  })
}

const categoryLabels: Record<string, string> = {
  mercado: 'Mercado',
  investimento: 'Investimento',
  decoracao: 'Decoração',
  financiamento: 'Financiamento',
  legislacao: 'Legislação',
  dicas: 'Dicas',
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <>
      <Header theme="light" />
      <main id="main-content" className="pt-20 bg-[var(--color-off-white)]">
        {/* Hero image */}
        <div className="relative aspect-[21/9] md:aspect-[3/1]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-premium pb-8 md:pb-12">
            <Link href="/blog" className="inline-flex items-center gap-2 font-sans text-sm text-white/70 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />Voltar ao blog
            </Link>
            <Badge variant="accent">{categoryLabels[post.category]}</Badge>
            <h1 className="mt-3 font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Image src={post.author.avatar} alt={post.author.name} width={36} height={36} className="rounded-full" />
                <div>
                  <p className="font-sans text-sm font-medium text-white">{post.author.name}</p>
                  <p className="font-sans text-xs text-white/60">{post.author.role}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 font-sans text-sm text-white/60">
                <Calendar className="w-3.5 h-3.5" />{post.publishedAt}
              </span>
              <span className="flex items-center gap-1 font-sans text-sm text-white/60">
                <Clock className="w-3.5 h-3.5" />{post.readingTime} min de leitura
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-premium py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article body */}
            <div className="lg:col-span-2">
              <ScrollReveal animation="fade-up">
                <article className="bg-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-sm)]">
                  <div className="prose-custom font-sans text-[var(--color-gray-700)] leading-relaxed text-[17px] space-y-6">
                    {post.content.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-[var(--color-gray-100)]">
                      <h3 className="font-sans text-sm font-semibold text-[var(--color-gray-700)] mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Author */}
              <ScrollReveal animation="fade-up">
                <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-sm)]">
                  <h3 className="font-sans text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider mb-4">Autor</h3>
                  <div className="flex items-center gap-3">
                    <Image src={post.author.avatar} alt={post.author.name} width={48} height={48} className="rounded-full" />
                    <div>
                      <p className="font-sans text-base font-bold text-[var(--color-black)]">{post.author.name}</p>
                      <p className="font-sans text-xs text-[var(--color-gray-500)]">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Related */}
              <ScrollReveal animation="fade-up" delay={0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-sm)]">
                  <h3 className="font-sans text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider mb-4">Relacionados</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`} className="flex gap-3 group">
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                          <Image src={rp.coverImage} alt={rp.title} fill className="object-cover" sizes="80px" />
                        </div>
                        <div>
                          <h4 className="font-sans text-sm font-medium text-[var(--color-black)] line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                            {rp.title}
                          </h4>
                          <span className="font-sans text-xs text-[var(--color-gray-500)] mt-1 block">{rp.readingTime} min</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
