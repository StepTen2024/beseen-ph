/**
 * BE SEEN.PH - Location Page
 * Dynamic page for city/location with live business data
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { MapPin, Star, ArrowRight, Filter, Grid, List, TrendingUp } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { getBusinesses } from '@beseen/database';
import { PHILIPPINES_CITIES, DIRECTORY_CATEGORIES } from '@/types/content';

interface LocationPageProps {
  params: Promise<{ location: string }>;
  searchParams: Promise<{ category?: string; sort?: string }>;
}

function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location } = await params;
  const cityName = formatCityName(location);
  
  return {
    title: `Discover ${cityName} - Local Businesses & Places | Be Seen.ph`,
    description: `Find the best restaurants, shops, services, and attractions in ${cityName}. Explore verified local businesses.`,
  };
}

export const revalidate = 60;

async function BusinessList({ city, category }: { city: string; category?: string }) {
  const supabase = await createClient();
  const { data: businesses, error } = await getBusinesses(supabase, {
    city,
    category,
    limit: 24,
  });

  if (error || !businesses?.length) {
    return (
      <div className="text-center py-20">
        <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Businesses Found</h2>
        <p className="text-slate-500 mb-6">
          {category 
            ? `No ${category} businesses in ${city} yet.`
            : `No businesses in ${city} yet.`
          }
        </p>
        <Link 
          href="/start"
          className="inline-flex items-center gap-2 px-6 py-3 bg-fuchsia-600 rounded-xl font-bold hover:bg-fuchsia-500 transition-colors"
        >
          Add Your Business
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((biz: any) => (
        <Link 
          key={biz.id}
          href={`/business/${biz.slug}`}
          className="group block bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-fuchsia-500/50 transition-all hover:-translate-y-1"
        >
          <div className="aspect-video relative">
            {biz.photos?.[0] ? (
              <img 
                src={biz.photos[0]} 
                alt={biz.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : biz.logo_url ? (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <img src={biz.logo_url} alt={biz.name} className="w-20 h-20 object-contain" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <span className="text-4xl font-bold text-slate-700">{biz.name.charAt(0)}</span>
              </div>
            )}
            {biz.verification_status === 'verified' && (
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-emerald-500/90 text-xs font-bold">
                ✓ Verified
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg group-hover:text-fuchsia-400 transition-colors">
                  {biz.name}
                </h3>
                <p className="text-slate-500 text-sm">{biz.category}</p>
              </div>
              {biz.average_rating > 0 && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{biz.average_rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <p className="text-slate-400 text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {biz.address}
            </p>
            {biz.description && (
              <p className="text-slate-500 text-sm mt-2 line-clamp-2">{biz.description}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

function BusinessListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-2xl bg-slate-800 animate-pulse">
          <div className="aspect-video bg-slate-700" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-slate-700 rounded w-2/3" />
            <div className="h-4 bg-slate-700 rounded w-1/3" />
            <div className="h-4 bg-slate-700 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function LocationPage({ params, searchParams }: LocationPageProps) {
  const { location } = await params;
  const { category } = await searchParams;
  const cityName = formatCityName(location);
  
  // Check if valid city
  const validCity = PHILIPPINES_CITIES.find(
    c => c.city.toLowerCase().replace(/\s+/g, '-') === location.toLowerCase()
  );

  if (!validCity) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/directory" className="hover:text-white">Directory</Link>
            <span>/</span>
            <span className="text-white">{cityName}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Discover {cityName}
          </h1>
          <p className="text-xl text-slate-400">
            {validCity.province} • Explore local businesses and hidden gems
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/${location}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !category 
                ? 'bg-fuchsia-600 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All
          </Link>
          {DIRECTORY_CATEGORIES.slice(0, 8).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${location}?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat.slug 
                  ? 'bg-fuchsia-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.pluralName}
            </Link>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <Suspense fallback={<BusinessListSkeleton />}>
          <BusinessList city={cityName} category={category} />
        </Suspense>
      </div>
    </main>
  );
}
