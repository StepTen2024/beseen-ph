/**
 * BE SEEN.PH - City Category Navigation
 * Phase 4: Directory Engine
 */

import Link from 'next/link';
import { DIRECTORY_CATEGORIES } from '@/types/content';

interface CityCategoryNavProps {
  currentCity: string;
  currentCategory: string;
  availableCategories: { category: string; count: number }[];
}

export default function CityCategoryNav({ 
  currentCity, 
  currentCategory, 
  availableCategories 
}: CityCategoryNavProps) {
  const citySlug = currentCity.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="border-b border-slate-800 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {availableCategories.map(({ category, count }) => {
            const config = DIRECTORY_CATEGORIES.find(c => c.slug === category);
            if (!config) return null;
            
            const isActive = category === currentCategory;
            
            return (
              <Link
                key={category}
                href={`/directory/${citySlug}/${category}`}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white'
                    : 'border border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                {config.pluralName}
                <span className={`rounded-full px-1.5 py-0.5 text-xs ${
                  isActive ? 'bg-white/20' : 'bg-slate-700 text-slate-400'
                }`}>
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
