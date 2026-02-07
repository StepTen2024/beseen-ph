/**
 * BE SEEN.PH - Directory Homepage
 * Phase 4: Directory Engine (Visual Overhaul)
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { PHILIPPINES_CITIES, DIRECTORY_CATEGORIES } from '@/types/content';
import { MapPin, Building2, Search, TrendingUp, Sparkles, Map as MapIcon, ArrowRight } from 'lucide-react';
import TrendingPlaces from '@/components/home/TrendingPlaces'; // Reusing the masonry component
import HolographicCategoryCard from '@/components/ui/HolographicCategoryCard';
import HolographicCard from '@/components/ui/HolographicCard';

export const metadata: Metadata = {
  title: 'Discovery Feed | Be Seen.ph',
  description: 'The pulse of the Philippines. real-time discovery of places, events, and culture.',
};

export default function DirectoryHomepage() {
  const featuredCities = PHILIPPINES_CITIES.slice(0, 6);
  const popularCategories = DIRECTORY_CATEGORIES.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero Section - Discovery Mode */}
      <div className="relative overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Cinematic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-950/80 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518558997970-4ddc236affcd?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-30 animate-subtle-zoom" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            <span className="text-sm font-bold text-fuchsia-200 tracking-wide uppercase">The Live Map</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
            Discover what's
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 animate-gradient-x">
              Alive Right Now.
            </span>
          </h1>

          {/* Giant Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <div className="relative flex items-center bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
              <Search className="ml-4 w-6 h-6 text-slate-400" />
              <input
                type="text"
                placeholder="Find late-night wings, jazz bars, or hidden cafes..."
                className="w-full bg-transparent border-none px-4 py-4 text-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
              />
              <button className="px-8 py-3 bg-white text-slate-950 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                Search
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-sm font-medium text-slate-400">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> 12,403 Live Spots</span>
            <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-amber-500" /> 845 Trending Now</span>
          </div>
        </div>
      </div>

      {/* Trending Now Section (Reusing Component) */}
      <section className="relative z-20 -mt-20 pb-20">
        <div className="px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-fuchsia-500" /> Trending in Pampanga
              </h2>
              <Link href="/directory/map" className="text-fuchsia-400 hover:text-fuchsia-300 font-bold text-sm flex items-center gap-1">
                View Map <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-slate-900/50 rounded-3xl p-6 border border-white/5 backdrop-blur-sm">
              <TrendingPlaces />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid (Pinterest Style) */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Explore Zones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularCategories.map((cat, i) => (
              <div key={cat.slug} className={`${i === 0 ? 'md:col-span-2 md:row-span-2 min-h-[380px]' : 'min-h-[180px]'}`}>
                <HolographicCategoryCard
                  title={cat.pluralName}
                  description={cat.description}
                  href={`/directory/angeles-city/${cat.slug}`}
                  colorClass={['bg-fuchsia-600', 'bg-emerald-600', 'bg-amber-600', 'bg-cyan-600', 'bg-purple-600'][i % 5]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities (Horizontal Scroll) */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <MapIcon className="w-8 h-8 text-emerald-500" /> Popular Destinations
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x px-4 -mx-4 md:px-0 md:mx-0">
            {featuredCities.map((city, i) => (
              <div key={city.city} className="snap-center shrink-0 w-[300px] h-[400px]">
                <HolographicCard
                  title={city.city}
                  subtitle={city.province}
                  image="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2670&auto=format&fit=crop"
                  href={`/directory/${city.city.toLowerCase().replace(/\s+/g, '-')}`}
                  isVerified={i % 2 === 0} // Alt Verified status for demo
                  badges={[city.province, "Featured"]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
