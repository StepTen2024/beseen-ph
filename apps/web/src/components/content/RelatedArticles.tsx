/**
 * BE SEEN.PH - Related Articles Component
 * Phase 3: Content Site Engine
 */

import Link from 'next/link';
import type { Article } from '@/types/content';
import { ARTICLE_CATEGORIES } from '@/types/content';

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
      <h3 className="text-lg font-semibold text-slate-200">Related Articles</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {articles.map((article) => {
          const category = ARTICLE_CATEGORIES.find(c => c.slug === article.category);
          
          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group block"
            >
              {article.featured_image && (
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="mt-3">
                {category && (
                  <span className={`inline-block rounded-full bg-gradient-to-r ${category.color} px-2 py-0.5 text-xs font-medium text-white`}>
                    {category.name}
                  </span>
                )}
                <h4 className="mt-2 font-medium text-slate-200 group-hover:text-fuchsia-400 line-clamp-2">
                  {article.title}
                </h4>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
