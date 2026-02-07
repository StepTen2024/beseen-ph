'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Star, Trash2, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';

const SAVED_PLACES = [
  { id: 1, name: "El Union Coffee", city: "La Union", category: "Cafe", rating: 4.8, image: "https://images.unsplash.com/photo-1559305616-3a9522834b6f?w=400", savedAt: "2 days ago" },
  { id: 2, name: "Bad Bird", city: "Megamall", category: "Restaurant", rating: 4.5, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400", savedAt: "1 week ago" },
  { id: 3, name: "The Curator", city: "Makati", category: "Bar", rating: 4.9, image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400", savedAt: "2 weeks ago" },
  { id: 4, name: "Toyo Eatery", city: "Makati", category: "Fine Dining", rating: 4.9, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400", savedAt: "1 month ago" },
];

export default function SavedPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Heart className="w-5 h-5 text-fuchsia-400" /> Saved Places
              </h1>
              <p className="text-slate-400 text-sm">{SAVED_PLACES.length} places saved</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg ${view === 'grid' ? 'bg-fuchsia-600' : 'bg-slate-800'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-lg ${view === 'list' ? 'bg-fuchsia-600' : 'bg-slate-800'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {['all', 'restaurants', 'cafes', 'bars', 'activities'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === f
                  ? 'bg-fuchsia-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid/List View */}
        {view === 'grid' ? (
          <div className="grid grid-cols-2 gap-4">
            {SAVED_PLACES.map((place, i) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/business/${place.id}`}
                  className="block rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden hover:border-fuchsia-500/50 transition-all"
                >
                  <div className="relative h-32">
                    <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                    <button 
                      className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-fuchsia-400"
                      onClick={(e) => { e.preventDefault(); }}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold truncate">{place.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span>{place.city}</span>
                      <span>·</span>
                      <Star className="w-3 h-3 text-amber-400" />
                      <span>{place.rating}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {SAVED_PLACES.map((place, i) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/business/${place.id}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-fuchsia-500/50 transition-all"
                >
                  <img src={place.image} alt={place.name} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold">{place.name}</h3>
                    <p className="text-slate-500 text-sm">{place.category} · {place.city}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm">{place.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-slate-600 mt-2">{place.savedAt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
