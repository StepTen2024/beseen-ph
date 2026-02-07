'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, Phone, MapPin, Share2, TrendingUp, TrendingDown,
  Calendar, ArrowUp, ArrowDown, BarChart2, Users
} from 'lucide-react';

const STATS = [
  { label: 'Page Views', value: '2,847', change: '+12.5%', up: true, icon: Eye },
  { label: 'Phone Clicks', value: '156', change: '+8.2%', up: true, icon: Phone },
  { label: 'Direction Clicks', value: '89', change: '-3.1%', up: false, icon: MapPin },
  { label: 'Shares', value: '34', change: '+22.4%', up: true, icon: Share2 },
];

const DAILY_DATA = [
  { day: 'Mon', views: 320, calls: 18, directions: 12 },
  { day: 'Tue', views: 445, calls: 24, directions: 15 },
  { day: 'Wed', views: 380, calls: 21, directions: 10 },
  { day: 'Thu', views: 520, calls: 32, directions: 18 },
  { day: 'Fri', views: 680, calls: 45, directions: 24 },
  { day: 'Sat', views: 720, calls: 52, directions: 28 },
  { day: 'Sun', views: 590, calls: 38, directions: 20 },
];

const TOP_SOURCES = [
  { source: 'BE SEEN Directory', visits: 1245, percent: 45 },
  { source: 'Google Search', visits: 678, percent: 24 },
  { source: 'Facebook', visits: 432, percent: 15 },
  { source: 'Instagram', visits: 289, percent: 10 },
  { source: 'Direct', visits: 167, percent: 6 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const maxViews = Math.max(...DAILY_DATA.map(d => d.views));

  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Analytics</h1>
            <p className="text-slate-400 text-sm">Track your performance</p>
          </div>
          <div className="flex gap-2">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-fuchsia-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5 text-slate-400" />
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  stat.up ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-fuchsia-400" /> Daily Traffic
            </h2>
          </div>
          
          <div className="flex items-end gap-2 h-48">
            {DAILY_DATA.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.views / maxViews) * 100}%` }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full bg-gradient-to-t from-fuchsia-600 to-cyan-600 rounded-t-lg relative group cursor-pointer"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.views} views
                  </div>
                </motion.div>
                <span className="text-xs text-slate-500">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <h2 className="font-bold flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-cyan-400" /> Traffic Sources
          </h2>
          
          <div className="space-y-4">
            {TOP_SOURCES.map((source, i) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{source.source}</span>
                  <span className="text-slate-400">{source.visits} visits ({source.percent}%)</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percent}%` }}
                    transition={{ delay: i * 0.1 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
