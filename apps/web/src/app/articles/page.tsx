/**
 * BE SEEN.PH - Articles Listing Page
 * Connected to Supabase for live data
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Newspaper, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { getArticles } from '@beseen/database';

export const metadata: Metadata = {
  title: 'Articles & Stories | Be Seen.ph',
  description: 'Discover local stories, business features, and community news from the Philippines.',
};

export const revalidate = 60;

async function ArticlesList() {
  const supabase = await createClient();
  const { data: articles, error } = await getArticles(supabase, { 
    status: 'published',
    limit: 20 
  });

  if (error || !articles?.length) {
    return (
      <div className="text-center py-20">
        <Newspaper className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Articles Yet</h2>
        <p className="text-slate-500">Check back soon for local stories and business features.</p>
      </div>
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="space-y-12">
      {/* Featured Article */}
      <Link 
        href={`/articles/${featuredArticle.slug}`}
        className="group block relative overflow-hidden rounded-3xl bg-slate-900"
      >
        <div className="aspect-[21/9] relative">
          {featuredArticle.featured_image_url ? (
            <img 
              src={featuredArticle.featured_image_url} 
              alt={featuredArticle.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900 to-purple-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-fuchsia-500 text-xs font-bold uppercase">
                Featured
              </span>
              {featuredArticle.business && (
                <span className="text-sm text-slate-300">
                  by {(featuredArticle.business as any).name}
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-fuchsia-400 transition-colors">
              {featuredArticle.title}
            </h2>
            {featuredArticle.excerpt && (
              <p className="text-slate-300 text-lg max-w-2xl">{featuredArticle.excerpt}</p>
            )}
            <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(featuredArticle.published_at || featuredArticle.created_at).toLocaleDateString()}
              </span>
              <span>{featuredArticle.view_count.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Article Grid */}
      {otherArticles.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article: any) => (
            <Link 
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group block bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-fuchsia-500/50 transition-colors"
            >
              <div className="aspect-video relative">
                {article.featured_image_url ? (
                  <img 
                    src={article.featured_image_url} 
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <Newspaper className="w-12 h-12 text-slate-600" />
                  </div>
                )}
              </div>
              <div className="p-5">
                {article.business && (
                  <span className="text-xs text-fuchsia-400 font-medium">
                    {(article.business as any).name}
                  </span>
                )}
                <h3 className="font-bold text-lg mt-1 mb-2 group-hover:text-fuchsia-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-slate-400 text-sm line-clamp-2">{article.excerpt}</p>
                )}
                <div className="flex items-center gap-3 mt-4 text-xs text-slate-500">
                  <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                  <span>{article.view_count.toLocaleString()} views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ArticlesSkeleton() {
  return (
    <div className="space-y-12">
      <div className="aspect-[21/9] rounded-3xl bg-slate-800 animate-pulse" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl bg-slate-800 animate-pulse">
            <div className="aspect-video bg-slate-700" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-slate-700 rounded w-1/4" />
              <div className="h-5 bg-slate-700 rounded w-3/4" />
              <div className="h-4 bg-slate-700 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            <span className="text-sm font-bold text-fuchsia-200 tracking-wide uppercase">Stories</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Local Stories &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400"> Features</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Discover the stories behind your favorite local businesses and community highlights.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <Suspense fallback={<ArticlesSkeleton />}>
          <ArticlesList />
        </Suspense>
      </div>
    </main>
  );
}
