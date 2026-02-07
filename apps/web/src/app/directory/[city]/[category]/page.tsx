/**
 * BE SEEN.PH - Directory Category Page
 * Phase 4: Directory Engine (Visual Overhaul)
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMockBusinesses } from '@/lib/mock-data';
import { getCategoriesByCity } from '@/lib/content-data';
import { DIRECTORY_CATEGORIES, PHILIPPINES_CITIES } from '@/types/content';
import DirectoryList from '@/components/directory/DirectoryList';
import DirectoryFilters from '@/components/directory/DirectoryFilters';
import DirectoryHero from '@/components/directory/DirectoryHero';
import { Sparkles, Filter } from 'lucide-react';

interface DirectoryPageProps {
  params: Promise<{ city: string; category: string }>;
}

export async function generateMetadata({ params }: DirectoryPageProps): Promise<Metadata> {
  const { city: citySlug, category: categorySlug } = await params;
  const cityData = PHILIPPINES_CITIES.find(c => c.city.toLowerCase().replace(/\s+/g, '-') === citySlug);
  const categoryData = DIRECTORY_CATEGORIES.find(c => c.slug === categorySlug);

  if (!cityData || !categoryData) return { title: 'Not Found' };

  return {
    title: `Best ${categoryData.pluralName} in ${cityData.city} | Verified Lists`,
    description: `Curated list of top ${categoryData.pluralName.toLowerCase()} in ${cityData.city}.`,
  };
}

export default async function DirectoryCategoryPage({ params }: DirectoryPageProps) {
  const { city: citySlug, category: categorySlug } = await params;

  const cityData = PHILIPPINES_CITIES.find(c => c.city.toLowerCase().replace(/\s+/g, '-') === citySlug);
  const categoryData = DIRECTORY_CATEGORIES.find(c => c.slug === categorySlug);

  if (!cityData || !categoryData) notFound();

  const listings = await getMockBusinesses();
  const total = listings.length;

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Hero (Reused) */}
      <DirectoryHero
        city={cityData.city}
        province={cityData.province}
        category={categoryData}
        listingCount={total}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filters (Desktop Sidebar) */}
          <aside className="w-full lg:w-64 shrink-0 hidden lg:block space-y-8">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 font-bold text-fuchsia-400 mb-4 uppercase text-xs tracking-wider">
                <Filter className="w-4 h-4" /> Filters
              </div>
              <DirectoryFilters category={categoryData} city={cityData.city} />
            </div>
          </aside>

          {/* Main Feed */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Top Rated
              </h2>
              <span className="text-sm text-slate-400">Showing {total} results</span>
            </div>

            <DirectoryList
              listings={listings as any}
              total={total}
              city={cityData.city}
              category={categoryData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params 
export async function generateStaticParams() {
  const params: { city: string; category: string }[] = [];
  const topCities = PHILIPPINES_CITIES.slice(0, 5);
  const topCategories = DIRECTORY_CATEGORIES.slice(0, 6);

  for (const city of topCities) {
    for (const category of topCategories) {
      params.push({
        city: city.city.toLowerCase().replace(/\s+/g, '-'),
        category: category.slug,
      });
    }
  }
  return params;
}
