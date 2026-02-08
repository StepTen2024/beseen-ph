'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rss, RefreshCw, CheckCircle, AlertCircle, Clock, 
  ExternalLink, Download, Settings, Facebook, Chrome
} from 'lucide-react';

const FEEDS = [
  {
    id: 'facebook',
    name: 'Facebook Product Catalog',
    url: 'https://beseen.ph/api/feeds/facebook.xml',
    lastSync: '10 min ago',
    status: 'active',
    items: 156,
    icon: Facebook,
    color: 'text-blue-400',
  },
  {
    id: 'google',
    name: 'Google Merchant Feed',
    url: 'https://beseen.ph/api/feeds/google.xml',
    lastSync: '10 min ago',
    status: 'active',
    items: 156,
    icon: Chrome,
    color: 'text-emerald-400',
  },
];

const SYNC_HISTORY = [
  { time: '10 min ago', status: 'success', items: 156, duration: '2.3s' },
  { time: '1 hour ago', status: 'success', items: 154, duration: '2.1s' },
  { time: '2 hours ago', status: 'success', items: 152, duration: '2.4s' },
  { time: '3 hours ago', status: 'error', items: 0, duration: '-', error: 'Timeout' },
  { time: '4 hours ago', status: 'success', items: 150, duration: '2.2s' },
];

export default function FeedsPage() {
  const [syncing, setSyncing] = useState<string | null>(null);

  const handleSync = (feedId: string) => {
    setSyncing(feedId);
    setTimeout(() => setSyncing(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Rss className="w-5 h-5 text-amber-400" /> Feed Management
            </h1>
            <p className="text-slate-400 text-sm">XML catalogs for Facebook & Google ads</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 font-bold text-sm flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Sync All
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Feed Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {FEEDS.map((feed) => (
            <motion.div
              key={feed.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-slate-800 ${feed.color}`}>
                    <feed.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{feed.name}</h3>
                    <p className="text-slate-500 text-sm">Last sync: {feed.lastSync}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  <CheckCircle className="w-3 h-3" /> Active
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 mb-4 font-mono text-sm text-slate-400 break-all">
                {feed.url}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold">{feed.items}</p>
                  <p className="text-slate-500 text-sm">Items in feed</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleSync(feed.id)}
                disabled={syncing === feed.id}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing === feed.id ? 'animate-spin' : ''}`} />
                {syncing === feed.id ? 'Syncing...' : 'Sync Now'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Sync History */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" /> Sync History
          </h2>
          
          <div className="space-y-2">
            {SYNC_HISTORY.map((sync, i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50"
              >
                <div className="flex items-center gap-3">
                  {sync.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                  <div>
                    <p className="text-sm">{sync.time}</p>
                    {sync.error && <p className="text-red-400 text-xs">{sync.error}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <span>{sync.items} items</span>
                  <span>{sync.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feed Configuration */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/20">
          <h2 className="font-bold mb-2">Automatic Sync</h2>
          <p className="text-slate-400 text-sm mb-4">Feeds are automatically synced every hour. Facebook and Google pull from these URLs.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">Sync interval:</span>
            <select className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm">
              <option>Every 1 hour</option>
              <option>Every 30 minutes</option>
              <option>Every 15 minutes</option>
            </select>
          </div>
        </div>
      </main>
    </div>
  );
}
