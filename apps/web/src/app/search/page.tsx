'use client';

import { useState, Suspense } from 'react';
import { Search, MapPin, Star, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';

const MOCK_RESULTS = [
  { id: 1, name: "Wings & Things", category: "Restaurant", city: "Angeles City", rating: 4.8, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400", type: "business" },
  { id: 2, name: "Cafe Lupe", category: "Cafe", city: "Angeles City", rating: 4.6, image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400", type: "business" },
];

function SearchContent() {
  const [query, setQuery] = useState('');
  const [results] = useState(MOCK_RESULTS);
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search places, businesses, articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-800">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {['all', 'businesses', 'places', 'articles'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${filter === f ? 'bg-fuchsia-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <p className="text-slate-500 text-sm mb-4">{results.length} results</p>
        <div className="space-y-4">
          {results.map((result) => (
            <Link key={result.id} href={`/business/${result.id}`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-fuchsia-500/50 transition-all">
              <img src={result.image} alt={result.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{result.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>{result.category}</span>
                  <span>·</span>
                  <MapPin className="w-3 h-3" />
                  <span>{result.city}</span>
                  <span>·</span>
                  <Star className="w-3 h-3 text-amber-400" />
                  <span>{result.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030712]" />}>
      <SearchContent />
    </Suspense>
  );
}
