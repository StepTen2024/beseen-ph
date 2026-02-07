'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Plus, Search, Filter, Eye, Edit, Trash2, 
  Clock, CheckCircle, Sparkles, TrendingUp, BarChart2
} from 'lucide-react';

const ARTICLES = [
  { id: 1, title: "Best Pizza in Angeles City", status: "published", views: 1234, city: "Angeles City", category: "food", aiGenerated: true, date: "2024-02-05" },
  { id: 2, title: "Top 10 Bars in Clark", status: "published", views: 892, city: "Clark", category: "nightlife", aiGenerated: true, date: "2024-02-04" },
  { id: 3, title: "Hidden Cafes You Need to Try", status: "draft", views: 0, city: "Angeles City", category: "cafes", aiGenerated: true, date: "2024-02-06" },
  { id: 4, title: "Weekend Getaways Near Pampanga", status: "review", views: 0, city: "Pampanga", category: "travel", aiGenerated: true, date: "2024-02-06" },
  { id: 5, title: "Wings & Things: A Local Favorite", status: "published", views: 567, city: "Angeles City", category: "feature", aiGenerated: false, date: "2024-02-03" },
];

const STATS = [
  { label: 'Total Articles', value: '156', icon: FileText, color: 'text-fuchsia-400' },
  { label: 'Published Today', value: '12', icon: CheckCircle, color: 'text-emerald-400' },
  { label: 'Total Views', value: '45.2K', icon: Eye, color: 'text-cyan-400' },
  { label: 'AI Generated', value: '89%', icon: Sparkles, color: 'text-amber-400' },
];

export default function ContentPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Content Engine</h1>
            <p className="text-slate-400 text-sm">AI-powered article generation</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Generate Batch
            </button>
            <button className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 font-bold text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Article
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* AI Generation Queue */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="font-bold">Daily Content Generation</h3>
                <p className="text-slate-400 text-sm">15 articles queued for today</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-400">8/15</p>
                <p className="text-xs text-slate-500">Completed</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 font-bold text-sm">
                View Queue
              </button>
            </div>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: '53%' }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'published', 'draft', 'review'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-fuchsia-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARTICLES.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  article.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' :
                  article.status === 'draft' ? 'bg-slate-500/10 text-slate-400' :
                  'bg-amber-500/10 text-amber-400'
                }`}>
                  {article.status}
                </span>
                {article.aiGenerated && (
                  <Sparkles className="w-4 h-4 text-amber-400" />
                )}
              </div>
              
              <h3 className="font-bold mb-2 line-clamp-2">{article.title}</h3>
              
              <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                <span>{article.city}</span>
                <span>·</span>
                <span>{article.category}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2 text-slate-400">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{article.views.toLocaleString()}</span>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
