/**
 * @file page.tsx
 * @description Home page da ImobPremium — composição de todas as seções
 * @module app
 */

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { AgentsSection } from '@/components/home/AgentsSection'
import { BlogPreviewSection } from '@/components/home/BlogPreviewSection'
import { CTASection } from '@/components/home/CTASection'
import { organizationSchema } from '@/lib/seo'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative">
        <HeroSection />
        <StatsSection />
        <FeaturedProperties />
        <HowItWorksSection />
        <CategoriesSection />
        <TestimonialsSection />
        <AgentsSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
