/**
 * BE SEEN.PH - Dynamic City Page
 * Phase 4: Directory Engine (Visual Overhaul)
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ArrowRight, TrendingUp, Sparkles, Map as MapIcon, ChevronRight, Newspaper } from 'lucide-react';
import { PHILIPPINES_CITIES, DIRECTORY_CATEGORIES } from '@/types/content';
import { getMockArticlesByCity } from '@/lib/mock-data';

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const cityData = PHILIPPINES_CITIES.find(c => c.city.toLowerCase().replace(/\s+/g, '-') === citySlug);
  if (!cityData) return { title: 'City Not Found' };
  return {
    title: `${cityData.city} (Live) | Be Seen.ph`,
    description: `The pulse of ${cityData.city}. Discover trending food, events, and businesses.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const cityData = PHILIPPINES_CITIES.find(c => c.city.toLowerCase().replace(/\s+/g, '-') === citySlug);
  if (!cityData) notFound();

  const relatedArticles = await getMockArticlesByCity(citySlug);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Cinematic Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518544802035-7c3c88086092?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center animate-subtle-zoom opacity-60" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold tracking-wider">{cityData.province.toUpperCase()}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
            {cityData.city}
          </h1>
          <p className="max-w-xl text-xl text-slate-300 leading-relaxed">
            {cityData.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-30 -mt-20">

        {/* Categories Grid (Command Center) */}
        <section className="mb-20">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-fuchsia-400" /> Explore Zones
              </h2>
            </div>
            <div className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-hide md:grid md:grid-cols-4 lg:grid-cols-6 md:pb-0 md:overflow-visible">
              {DIRECTORY_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/directory/${citySlug}/${cat.slug}`}
                  className="snap-start shrink-0 w-[100px] md:w-auto group flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-fuchsia-500/30 transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg border border-white/5">
                    {/* Icon based on emoji (simplified for now) */}
                    <span className="text-2xl drop-shadow-md">📍</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-slate-300 text-center group-hover:text-white group-hover:text-shadow-glow">{cat.pluralName}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Content (Magazine Style) */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold tracking-tight">The {cityData.city} Edit.</h2>
            <Link href="/articles" className="text-fuchsia-400 hover:text-white transition-colors font-bold flex items-center gap-2">
              View Journal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
            <div className="md:hidden flex overflow-x-auto pb-6 gap-4 snap-x scrollbar-hide -mx-4 px-4">
              {relatedArticles.length > 0 ? relatedArticles.map((article, i) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="snap-center shrink-0 w-[85vw] relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 pt-20">
                    <span className="px-2 py-1 rounded bg-fuchsia-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-white text-xl leading-tight mb-1">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              )) : (
                <div className="w-full py-10 text-center text-slate-500">No stories yet.</div>
              )}
            </div>

            {/* Desktop Grid (Hidden on Mobile) */}
            <div className="hidden md:grid md:grid-cols-2 gap-8 w-full">
              {relatedArticles.length > 0 ? relatedArticles.map((article, i) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 hover:border-fuchsia-500/30 transition-all ${i === 0 ? 'md:col-span-2' : ''}`}
                >
                  <div className={`aspect-[21/9] w-full overflow-hidden ${i !== 0 ? 'aspect-video' : ''}`}>
                    <div className="absolute inset-0 bg-slate-900/20 z-10 group-hover:bg-transparent transition-colors" />
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 rounded bg-fuchsia-600 text-white text-xs font-bold uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                    <h3 className={`font-bold text-white mb-2 leading-tight group-hover:text-fuchsia-200 transition-colors ${i === 0 ? 'text-4xl' : 'text-2xl'}`}>
                      {article.title}
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base line-clamp-2 max-w-2xl">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              )) : (
                <div className="col-span-full py-20 text-center border border-dashed border-slate-800 rounded-3xl text-slate-500">
                  <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  No stories yet.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Map CTA */}
        <section className="relative rounded-3xl overflow-hidden bg-emerald-900/20 border border-emerald-500/20">
          <div className="absolute inset-0 bg-[url('https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif')] bg-cover opacity-10 mix-blend-screen pointer-events-none" />
          <div className="relative z-10 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Dont be a Ghost in {cityData.city}.</h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">
              Is your business missing from the map? Claim your spot and start appearing in our AI search engine.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/add-place" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-colors">
                Add a Place
              </Link>
              <Link href="/directory/map" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-colors">
                View Map
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
