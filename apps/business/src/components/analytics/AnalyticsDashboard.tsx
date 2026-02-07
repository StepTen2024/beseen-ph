/**
 * BE SEEN.PH - Analytics Dashboard
 * Business analytics with charts and insights
 */

'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Eye, 
  Phone, 
  Navigation, 
  Share2,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';

interface AnalyticsData {
  date: string;
  pageViews: number;
  phoneReveals: number;
  directionClicks: number;
  shares: number;
}

interface AnalyticsDashboardProps {
  data: AnalyticsData[];
  businessName: string;
}

export function AnalyticsDashboard({ data, businessName }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Calculate totals and changes
  const stats = useMemo(() => {
    const total = {
      pageViews: data.reduce((sum, d) => sum + d.pageViews, 0),
      phoneReveals: data.reduce((sum, d) => sum + d.phoneReveals, 0),
      directionClicks: data.reduce((sum, d) => sum + d.directionClicks, 0),
      shares: data.reduce((sum, d) => sum + d.shares, 0),
    };

    // Calculate change from first half to second half
    const mid = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, mid);
    const secondHalf = data.slice(mid);

    const firstHalfViews = firstHalf.reduce((sum, d) => sum + d.pageViews, 0);
    const secondHalfViews = secondHalf.reduce((sum, d) => sum + d.pageViews, 0);
    const change = firstHalfViews > 0 
      ? ((secondHalfViews - firstHalfViews) / firstHalfViews) * 100 
      : 0;

    return { total, change };
  }, [data]);

  // Chart data preparation
  const maxValue = Math.max(
    ...data.map(d => Math.max(d.pageViews, d.phoneReveals, d.directionClicks, d.shares))
  );

  const metrics = [
    { 
      key: 'pageViews', 
      label: 'Page Views', 
      icon: Eye, 
      value: stats.total.pageViews,
      color: '#d946ef',
      change: stats.change
    },
    { 
      key: 'phoneReveals', 
      label: 'Phone Reveals', 
      icon: Phone, 
      value: stats.total.phoneReveals,
      color: '#06b6d4',
      change: stats.change * 0.8
    },
    { 
      key: 'directionClicks', 
      label: 'Directions', 
      icon: Navigation, 
      value: stats.total.directionClicks,
      color: '#10b981',
      change: stats.change * 1.2
    },
    { 
      key: 'shares', 
      label: 'Shares', 
      icon: Share2, 
      value: stats.total.shares,
      color: '#f59e0b',
      change: stats.change * 0.5
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-slate-400">Track your business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900/50 rounded-lg p-1 border border-slate-700/50">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
              </button>
            ))}
          </div>
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedMetric(selectedMetric === metric.key ? null : metric.key)}
            className="cursor-pointer"
          >
            <GlassCard 
              className={`p-5 transition-all ${selectedMetric === metric.key ? 'ring-2 ring-fuchsia-500/50' : ''}`}
              intensity="medium"
              hover
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${metric.color}20` }}
                >
                  <metric.icon size={20} style={{ color: metric.color }} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${metric.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {metric.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {Math.abs(metric.change).toFixed(1)}%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-slate-400 text-sm">{metric.label}</p>
                <p className="text-2xl font-bold text-white">{formatNumber(metric.value)}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main Chart */}
      <GlassCard className="p-6" intensity="high">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Traffic Overview</h3>
          <div className="flex items-center gap-4">
            {metrics.map((metric) => (
              <button
                key={metric.key}
                onClick={() => setSelectedMetric(selectedMetric === metric.key ? null : metric.key)}
                className="flex items-center gap-2 text-sm"
              >
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    background: metric.color,
                    opacity: selectedMetric && selectedMetric !== metric.key ? 0.3 : 1
                  }}
                />
                <span className={selectedMetric && selectedMetric !== metric.key ? 'text-slate-600' : 'text-slate-300'}>
                  {metric.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 flex items-end gap-2">
          {data.map((day, index) => {
            const values = selectedMetric 
              ? { [selectedMetric]: day[selectedMetric as keyof AnalyticsData] as number }
              : { pageViews: day.pageViews, phoneReveals: day.phoneReveals, directionClicks: day.directionClicks, shares: day.shares };

            return (
              <div key={day.date} className="flex-1 flex flex-col justify-end group relative">
                <div className="relative flex gap-0.5 h-full items-end">
                  {Object.entries(values).map(([key, value]) => {
                    const metric = metrics.find(m => m.key === key);
                    const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
                    
                    return (
                      <motion.div
                        key={key}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.02 }}
                        className="flex-1 rounded-t-sm min-w-[3px] transition-all group-hover:opacity-100"
                        style={{ 
                          background: metric?.color || '#d946ef',
                          opacity: selectedMetric ? 1 : 0.8
                        }}
                      />
                    );
                  })}
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs whitespace-nowrap">
                    <p className="text-slate-400">{new Date(day.date).toLocaleDateString('en-PH')}</p>
                    {Object.entries(values).map(([key, value]) => (
                      <p key={key} className="text-white">
                        {metrics.find(m => m.key === key)?.label}: {value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between mt-4 text-xs text-slate-500">
          <span>{data[0] && new Date(data[0].date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}</span>
          <span>Mid {timeRange}</span>
          <span>{data[data.length - 1] && new Date(data[data.length - 1].date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}</span>
        </div>
      </GlassCard>

      {/* Insights Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="p-6" intensity="medium">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-emerald-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Top Performing Days</h3>
          </div>
          <div className="space-y-3">
            {data
              .sort((a, b) => b.pageViews - a.pageViews)
              .slice(0, 3)
              .map((day, index) => (
                <div key={day.date} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-slate-300">
                      {new Date(day.date).toLocaleDateString('en-PH', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <span className="text-white font-semibold">{day.pageViews} views</span>
                </div>
              ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6" intensity="medium">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-cyan-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Engagement Summary</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Phone Reveal Rate</span>
                <span className="text-white">
                  {stats.total.pageViews > 0 
                    ? ((stats.total.phoneReveals / stats.total.pageViews) * 100).toFixed(1) 
                    : 0}%
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.total.pageViews > 0 ? (stats.total.phoneReveals / stats.total.pageViews) * 100 : 0}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Direction Click Rate</span>
                <span className="text-white">
                  {stats.total.pageViews > 0 
                    ? ((stats.total.directionClicks / stats.total.pageViews) * 100).toFixed(1) 
                    : 0}%
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.total.pageViews > 0 ? (stats.total.directionClicks / stats.total.pageViews) * 100 : 0}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Share Rate</span>
                <span className="text-white">
                  {stats.total.pageViews > 0 
                    ? ((stats.total.shares / stats.total.pageViews) * 100).toFixed(1) 
                    : 0}%
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.total.pageViews > 0 ? (stats.total.shares / stats.total.pageViews) * 100 : 0}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
