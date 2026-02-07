'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Eye,
  Phone,
  MapPin,
  Star,
  Mic,
  Sparkles,
  Coins,
  Zap,
  Activity,
  ArrowRight,
  Lock,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

const TRAFFIC_DATA = [
  { day: 'Mon', views: 120 },
  { day: 'Tue', views: 145 },
  { day: 'Wed', views: 180 },
  { day: 'Thu', views: 165 },
  { day: 'Fri', views: 240 },
  { day: 'Sat', views: 280 },
  { day: 'Sun', views: 210 },
];

const RECENT_ACTIVITIES = [
  { type: 'view', text: 'Someone viewed your menu', time: '2 min ago' },
  { type: 'call', text: 'Call button click', time: '15 min ago' },
  { type: 'review', text: 'New 5-star review received', time: '1 hour ago' },
];

export default function BusinessDashboard() {
  const [isRecording, setIsRecording] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // MOCK STATE: Toggle this to test verified vs unverified views
  // In real app, this comes from DB
  const [isVerified, setIsVerified] = useState(false);

  const maxViews = Math.max(...TRAFFIC_DATA.map(d => d.views));

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-fuchsia-500/30 pb-32 md:pb-12">

      {/* Tycoon Header */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-fuchsia-600 to-purple-600 flex items-center justify-center shadow-lg shadow-fuchsia-900/20">
                <span className="text-lg md:text-xl font-bold text-white">M</span>
              </div>
              <div>
                <h1 className="font-bold text-white text-sm md:text-lg leading-tight">Mang Inasal Pampanga</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  {isVerified ? (
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      Verified Owner
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full w-fit border border-amber-500/20">
                      <ShieldAlert className="w-3 h-3" />
                      Unverified Owner
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Token Balance */}
            <div className="flex items-center gap-2 md:gap-4 px-3 py-1.5 md:px-5 md:py-2 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex flex-col items-end">
                <span className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">Balance</span>
                <span className="text-sm md:text-xl font-bold text-amber-400">3 <span className="hidden md:inline">Tokens</span></span>
              </div>
              <Coins className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">

        {/* MOBILE ONLY: Live Feed (Prioritized) */}
        <div className="md:hidden p-4 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm mb-6">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            Live Pulse <Activity className="w-3 h-3 text-emerald-500" />
          </h3>
          <div className="space-y-3">
            {RECENT_ACTIVITIES.slice(0, 2).map((act, i) => ( // Show only top 2 on mobile top
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 font-medium truncate">{act.text}</p>
                  <p className="text-[10px] text-slate-500">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unverified Alert Banner */}
        {!isVerified && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Unlock Tycoon Features</h2>
                <p className="text-slate-300 max-w-xl text-sm md:text-base">
                  You are currently in <span className="text-amber-400 font-bold">Squatter Mode</span>. Complete the "Keys to the Castle" verification quest to unlock Analytics, Voice Updates, and Featured status.
                </p>
              </div>
            </div>
            <Link
              href="/add-place"
              className="w-full md:w-auto text-center whitespace-nowrap px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              Verify Now <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* Key Metrics Grid - Swipeable on Mobile */}
        <div className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-hide md:grid md:grid-cols-4 md:pb-0 md:overflow-visible mb-8 -mx-4 px-4 md:mx-0 md:px-0">
          {[
            { icon: Eye, label: 'Views', value: '1.4k', sub: '+12%', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
            { icon: Phone, label: 'Calls', value: '108', sub: '+8%', color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10' },
            { icon: MapPin, label: 'Directions', value: '85', sub: '+15%', color: 'text-amber-400', bg: 'bg-amber-400/10' },
            { icon: Star, label: 'Rating', value: '4.8', sub: 'Top 5%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`snap-start shrink-0 w-[140px] md:w-auto p-4 md:p-6 rounded-3xl border backdrop-blur-sm relative overflow-hidden ${!isVerified && i > 0 ? 'bg-slate-900/20 border-slate-800 opacity-60 grayscale' : 'bg-slate-900/50 border-white/5'
                }`}
            >
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className={`p-2 md:p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                {!isVerified && i > 0 ? (
                  <Lock className="w-4 h-4 text-slate-600" />
                ) : (
                  <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>{stat.sub}</span>
                )}
              </div>
              <div>
                <p className="text-slate-400 text-xs md:text-sm font-medium">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-white">{!isVerified && i > 0 ? '---' : stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Chart Area */}
          <div className="lg:col-span-2 relative">
            {/* Locked Overlay */}
            {!isVerified && (
              <div className="absolute inset-0 z-20 backdrop-blur-md bg-slate-950/50 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Analytics Locked</h3>
                <p className="text-slate-400 mb-6">Verify your ownership to see who is viewing your business.</p>
                <button onClick={() => setIsVerified(true)} className="text-xs text-slate-600 hover:text-white underline">
                  (Dev: Toggle Verified State)
                </button>
              </div>
            )}

            <div className={`p-6 md:p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm min-h-[300px] md:min-h-[400px] flex flex-col transition-all ${!isVerified ? 'opacity-20 pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white">Traffic Overview</h2>
                  <p className="text-slate-400 text-sm">Customer interest over time</p>
                </div>
                <button className="px-4 py-1.5 rounded-lg bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors">Last 7 Days</button>
              </div>

              {/* Chart Visual */}
              <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 px-2 md:px-4 pb-4">
                {TRAFFIC_DATA.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-3 group relative h-full justify-end">
                    <div
                      className="w-full bg-slate-800/50 rounded-t-xl relative overflow-hidden transition-all group-hover:bg-slate-800"
                      style={{ height: `${(d.views / maxViews) * 100}%` }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-fuchsia-600/50 to-purple-600/50 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[10px] md:text-sm font-bold text-slate-500 group-hover:text-white transition-colors">{d.day.charAt(0)}</span>

                    {/* Tooltip */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl border border-white/10 z-10 pointer-events-none">
                      {d.views}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Center - Desktop Only (Mobile has sticky bar) */}
          <div className="space-y-6 hidden md:block">
            {/* Same Voice Card as before... */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden group transition-all ${!isVerified
              ? 'bg-slate-900/20 border-slate-800'
              : 'bg-gradient-to-br from-fuchsia-900/20 to-purple-900/20 border-fuchsia-500/20'
              }`}>
              {/* Voice Card Content (Desktop) */}
              <div className="relative z-10">
                <h3 className={`text-xl font-bold mb-2 ${!isVerified ? 'text-slate-500' : 'text-white'}`}>Voice Update</h3>
                <p className={`text-sm mb-6 ${!isVerified ? 'text-slate-600' : 'text-fuchsia-200/70'}`}>
                  Record a quick update and our AI will update your listing instantly.
                </p>

                <button
                  disabled={!isVerified}
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${isRecording
                    ? 'bg-red-500 text-white shadow-lg shadow-red-900/20 animate-pulse'
                    : !isVerified ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-white text-fuchsia-900 hover:bg-fuchsia-50'
                    }`}
                >
                  {isRecording ? "Recording..." : "Start Recording"}
                </button>
              </div>
            </div>

            {/* Desktop Live Feed */}
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Live Feed</h3>
              <div className="space-y-4">
                {RECENT_ACTIVITIES.map((act, i) => (
                  <div key={i} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <div>
                      <p className="text-sm text-slate-300 font-medium">{act.text}</p>
                      <p className="text-xs text-slate-500 mt-1">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* MOBILE STICKY ACTION BAR */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-30 pointer-events-none">
        <button
          disabled={!isVerified}
          onClick={() => setIsRecording(!isRecording)}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-xl pointer-events-auto ${isRecording
            ? 'bg-red-500 text-white animate-pulse'
            : !isVerified
              ? 'bg-slate-800 text-slate-500 border border-slate-700'
              : 'bg-white text-fuchsia-900'
            }`}
        >
          {isRecording ? (
            <span className="flex items-center gap-2">Recording... <span className="w-2 h-2 bg-white rounded-full animate-bounce" /></span>
          ) : (
            <span className="flex items-center gap-2"><Mic className="w-5 h-5" /> {!isVerified ? 'Voice Update Locked' : 'Record Update'}</span>
          )}
        </button>
      </div>

    </div>
  );
}
