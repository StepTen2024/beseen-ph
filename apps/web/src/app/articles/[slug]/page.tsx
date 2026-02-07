/**
 * BE SEEN.PH - Article Page
 * Phase 3: Content Site Engine
 * 
 * Dynamic article page with SEO optimization
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getRelatedArticles } from '@/lib/content-data';
import { ARTICLE_CATEGORIES } from '@/types/content';
import ArticleContent from '@/components/content/ArticleContent';
import RelatedArticles from '@/components/content/RelatedArticles';
import ArticleSidebar from '@/components/content/ArticleSidebar';
import { Calendar, Clock, Eye, Share2, MapPin, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return { title: 'Article Not Found' };

  const category = ARTICLE_CATEGORIES.find(c => c.slug === article.category);

  return {
    title: `${article.title} | Be Seen.ph`,
    description: article.meta_description || article.excerpt,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.meta_description || article.excerpt,
      type: 'article',
      publishedTime: article.published_at,
      images: article.featured_image ? [article.featured_image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const relatedArticles = await getRelatedArticles(article, 4);
  const category = ARTICLE_CATEGORIES.find(c => c.slug === article.category);

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-fuchsia-500/30">

      {/* Immersive Header */}
      <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent z-10" />
          <img
            src={article.featured_image}
            alt={article.title}
            className="h-full w-full object-cover animate-subtle-zoom"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 md:pb-24">
          {/* Breadcrumbs / Back */}
          <div className="mb-6 flex items-center justify-between">
            <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
              <ChevronLeft className="w-4 h-4" /> Back to Journal
            </Link>

            {category && (
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r text-white shadow-lg ${category.color}`}>
                {category.name}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight text-shadow-lg">
            {article.title}
          </h1>

          {/* Meta Data Row */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm md:text-base text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                {article.author ? article.author[0] : 'B'}
              </div>
              <span>{article.author || 'Be Seen Editor'}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-fuchsia-400" />
              <time dateTime={article.published_at}>
                {new Date(article.published_at || new Date()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>5 min read</span>
            </div>

            {article.city && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{article.city}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="relative z-30 -mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Article Text */}
          <div className="lg:col-span-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
              <ArticleContent content={article.content} />

              {/* Interaction Bar */}
              <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
                {article.tags && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold text-slate-500 uppercase">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Related Readings */}
            {relatedArticles.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-fuchsia-500 pl-4">Continue Reading</h3>
                <RelatedArticles articles={relatedArticles} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <ArticleSidebar
                category={article.category}
                city={article.city}
                affiliateLinks={article.affiliate_links}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
