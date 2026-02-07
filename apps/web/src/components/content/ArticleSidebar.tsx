/**
 * BE SEEN.PH - Article Sidebar Component
 * Phase 3: Content Site Engine
 */

import Link from 'next/link';
import { ARTICLE_CATEGORIES, PHILIPPINES_CITIES } from '@/types/content';
import type { AffiliateLink, ArticleCategory } from '@/types/content';

interface ArticleSidebarProps {
  category: ArticleCategory;
  city?: string;
  affiliateLinks?: AffiliateLink[];
}

export default function ArticleSidebar({ category, city, affiliateLinks }: ArticleSidebarProps) {
  const categoryConfig = ARTICLE_CATEGORIES.find(c => c.slug === category);
  const cityData = city ? PHILIPPINES_CITIES.find(c => c.city === city) : null;
  
  return (
    <div className="space-y-6">
      {/* Category Info */}
      {categoryConfig && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="font-semibold text-slate-200">{categoryConfig.name}</h3>
          <p className="mt-2 text-sm text-slate-500">{categoryConfig.description}</p>
          <Link
            href={`/articles/category/${category}`}
            className="mt-4 inline-block text-sm text-fuchsia-400 hover:text-fuchsia-300"
          >
            Browse all {categoryConfig.name} →
          </Link>
        </div>
      )}
      
      {/* City Info */}
      {cityData && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="font-semibold text-slate-200">{cityData.city}</h3>
          <p className="mt-2 text-sm text-slate-500">{cityData.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {cityData.keywords.slice(0, 3).map((keyword) => (
              <span key={keyword} className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-400">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Affiliate Links */}
      {affiliateLinks && affiliateLinks.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="font-semibold text-slate-200">Recommended</h3>
          <div className="mt-3 space-y-3">
            {affiliateLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-slate-700 bg-slate-800/50 p-3 transition-all hover:border-fuchsia-500/50"
              >
                <p className="text-sm font-medium text-slate-200">{link.text}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {link.type === 'lazada' && 'Lazada Philippines'}
                  {link.type === 'shopee' && 'Shopee Philippines'}
                  {link.type === 'amazon' && 'Amazon'}
                  {link.type === 'other' && 'Learn More'}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
      
      {/* Newsletter */}
      <div className="rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10 p-5">
        <h3 className="font-semibold text-slate-200">Stay Updated</h3>
        <p className="mt-2 text-sm text-slate-400">
          Get the latest articles and guides delivered to your inbox.
        </p>
        <form className="mt-4 space-y-2">
          <input
            type="email"
            placeholder="Your email"
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-fuchsia-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-fuchsia-500 hover:to-purple-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
