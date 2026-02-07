'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Heart, Clock, Bell, Settings, 
  ChevronRight, Star, Bookmark, TrendingUp 
} from 'lucide-react';
import Link from 'next/link';

const SAVED_PLACES = [
  { id: 1, name: "El Union Coffee", city: "La Union", category: "Cafe", rating: 4.8, image: "https://images.unsplash.com/photo-1559305616-3a9522834b6f?w=400" },
  { id: 2, name: "Bad Bird", city: "Megamall", category: "Food", rating: 4.5, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400" },
  { id: 3, name: "The Curator", city: "Makati", category: "Bar", rating: 4.9, image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400" },
];

const RECENT_ACTIVITY = [
  { type: 'view', text: 'Viewed Wings & Things', time: '2 hours ago' },
  { type: 'save', text: 'Saved El Union Coffee', time: '1 day ago' },
  { type: 'review', text: 'Reviewed Bad Bird', time: '3 days ago' },
];

export default function UserDashboard() {
  const [location, setLocation] = useState('Angeles City');

  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Hey there! 👋</h1>
              <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
                <button className="text-fuchsia-400 text-xs">(change)</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full bg-slate-800 border border-slate-700">
                <Bell className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 rounded-full bg-slate-800 border border-slate-700">
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Saved', value: '12', icon: Bookmark, color: 'text-fuchsia-400' },
            { label: 'Reviews', value: '5', icon: Star, color: 'text-amber-400' },
            { label: 'Visited', value: '28', icon: MapPin, color: 'text-emerald-400' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Saved Places */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Heart className="w-5 h-5 text-fuchsia-400" /> Saved Places
            </h2>
            <Link href="/saved" className="text-fuchsia-400 text-sm flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {SAVED_PLACES.map((place) => (
              <motion.div
                key={place.id}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 w-[200px] rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden"
              >
                <div className="h-24 relative">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-xs flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {place.rating}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm truncate">{place.name}</h3>
                  <p className="text-xs text-slate-500">{place.city} · {place.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* For You - Location Based */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" /> Trending in {location}
            </h2>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/30 border border-slate-800/50">
                <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
                  🍔
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">New burger spot in {location}</h3>
                  <p className="text-sm text-slate-500">Just opened · 0.5km away</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-cyan-400" /> Recent Activity
          </h2>
          <div className="space-y-2">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30">
                <span className="text-sm text-slate-300">{activity.text}</span>
                <span className="text-xs text-slate-600">{activity.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Own a Business CTA */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-fuchsia-900/30 to-cyan-900/30 border border-fuchsia-500/20">
          <h3 className="font-bold text-lg mb-2">Own a business?</h3>
          <p className="text-slate-400 text-sm mb-4">Claim your listing and reach thousands of customers.</p>
          <Link 
            href="/business"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 font-bold text-sm transition-colors"
          >
            Claim Your Business <ChevronRight className="w-4 h-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
