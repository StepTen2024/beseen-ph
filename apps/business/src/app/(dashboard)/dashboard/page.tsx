'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Eye,
  Phone,
  MapPin,
  Star,
  Mic,
  Activity,
  Lock,
  ChevronRight,
  ShieldAlert
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
  const [isVerified, setIsVerified] = useState(false);

  const maxViews = Math.max(...TRAFFIC_DATA.map(d => d.views));

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Verification Status Banner */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-white/5">
        {isVerified ? (
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Verified Owner
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
            <ShieldAlert className="w-4 h-4" />
            Unverified Owner
          </div>
        )}
        <button 
          onClick={() => setIsVerified(!isVerified)} 
          className="ml-auto text-xs text-slate-500 hover:text-white"
        >
          (Toggle)
        </button>
      </div>

      {/* MOBILE ONLY: Live Feed (Prioritized) */}
      <div className="md:hidden p-4 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
          Live Pulse <Activity className="w-3 h-3 text-emerald-500" />
        </h3>
        <div className="space-y-3">
          {RECENT_ACTIVITIES.slice(0, 2).map((act, i) => (
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
          className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <Lock className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white mb-1">Unlock Tycoon Features</h2>
              <p className="text-slate-300 text-sm">
                You are in <span className="text-amber-400 font-bold">Squatter Mode</span>. Verify to unlock Analytics.
              </p>
            </div>
          </div>
          <Link
            href="/claim"
            className="w-full md:w-auto text-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            Verify Now <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}

      {/* Key Metrics Grid */}
      <div className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-hide md:grid md:grid-cols-4 md:pb-0 md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
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
            className={`snap-start shrink-0 w-[140px] md:w-auto p-4 md:p-6 rounded-2xl border backdrop-blur-sm ${
              !isVerified && i > 0 
                ? 'bg-slate-900/20 border-slate-800 opacity-60 grayscale' 
                : 'bg-slate-900/50 border-white/5'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 md:p-3 rounded-xl ${stat.bg} ${stat.color}`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 relative">
          {!isVerified && (
            <div className="absolute inset-0 z-20 backdrop-blur-md bg-slate-950/50 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analytics Locked</h3>
              <p className="text-slate-400 text-sm">Verify ownership to see who is viewing your business.</p>
            </div>
          )}

          <div className={`p-4 md:p-6 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm min-h-[280px] md:min-h-[350px] flex flex-col transition-all ${!isVerified ? 'opacity-20 pointer-events-none' : ''}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Traffic Overview</h2>
                <p className="text-slate-400 text-sm">Customer interest over time</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors">
                Last 7 Days
              </button>
            </div>

            <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 pb-4">
              {TRAFFIC_DATA.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end">
                  <div
                    className="w-full bg-slate-800/50 rounded-t-xl relative overflow-hidden transition-all group-hover:bg-slate-800"
                    style={{ height: `${(d.views / maxViews) * 100}%` }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-fuchsia-600/50 to-purple-600/50 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[10px] md:text-sm font-bold text-slate-500 group-hover:text-white transition-colors">
                    {d.day.charAt(0)}
                  </span>
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-xl border border-white/10 z-10 pointer-events-none">
                    {d.views}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Center - Desktop Only */}
        <div className="space-y-4 hidden md:block">
          <div className={`p-5 rounded-2xl border relative overflow-hidden ${
            !isVerified
              ? 'bg-slate-900/20 border-slate-800'
              : 'bg-gradient-to-br from-fuchsia-900/20 to-purple-900/20 border-fuchsia-500/20'
          }`}>
            <h3 className={`text-lg font-bold mb-2 ${!isVerified ? 'text-slate-500' : 'text-white'}`}>Voice Update</h3>
            <p className={`text-sm mb-4 ${!isVerified ? 'text-slate-600' : 'text-fuchsia-200/70'}`}>
              Record a quick update and AI will update your listing.
            </p>
            <button
              disabled={!isVerified}
              onClick={() => setIsRecording(!isRecording)}
              className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : !isVerified 
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                    : 'bg-white text-fuchsia-900 hover:bg-fuchsia-50'
              }`}
            >
              {isRecording ? "Recording..." : "Start Recording"}
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Live Feed</h3>
            <div className="space-y-3">
              {RECENT_ACTIVITIES.map((act, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
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

      {/* MOBILE STICKY ACTION BAR */}
      <div className="md:hidden fixed bottom-24 left-0 right-0 px-4 z-30">
        <button
          disabled={!isVerified}
          onClick={() => setIsRecording(!isRecording)}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-xl ${
            isRecording
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
