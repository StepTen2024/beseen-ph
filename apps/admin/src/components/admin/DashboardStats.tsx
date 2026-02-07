/**
 * BE SEEN.PH - Dashboard Stats Component
 * Phase 2: The Delivery Engine ("Pinky")
 * 
 * Real-time dashboard statistics
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface StatsData {
  totalRevenue: number;
  activeClients: number;
  postsThisMonth: number;
  avgEngagement: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // This would fetch aggregated stats from an API endpoint
      // For now, using placeholder data
      setStats({
        totalRevenue: 45000,
        activeClients: 12,
        postsThisMonth: 156,
        avgEngagement: 4.2,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-slate-800/50" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Monthly Revenue"
        value={formatCurrency(stats.totalRevenue)}
        change={+12}
        icon={<TrendingUp className="h-5 w-5" />}
        color="emerald"
      />
      <StatCard
        title="Active Clients"
        value={stats.activeClients}
        change={+3}
        icon={<Users className="h-5 w-5" />}
        color="cyan"
      />
      <StatCard
        title="Posts This Month"
        value={stats.postsThisMonth}
        change={+8}
        icon={<FileText className="h-5 w-5" />}
        color="fuchsia"
      />
      <StatCard
        title="Avg Engagement"
        value={`${stats.avgEngagement}%`}
        change={-2}
        icon={<Activity className="h-5 w-5" />}
        color="amber"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: 'emerald' | 'cyan' | 'fuchsia' | 'amber';
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  const colorStyles = {
    emerald: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
    cyan: 'from-cyan-500/20 to-blue-500/20 text-cyan-400',
    fuchsia: 'from-fuchsia-500/20 to-purple-500/20 text-fuchsia-400',
    amber: 'from-amber-500/20 to-orange-500/20 text-amber-400',
  };

  const isPositive = change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorStyles[color]} opacity-10`} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <div className={`rounded-lg bg-gradient-to-br ${colorStyles[color]} p-2`}>
            {icon}
          </div>
        </div>
        <p className="mt-2 text-2xl font-bold text-slate-100">{value}</p>
        <div className={`mt-2 flex items-center gap-1 text-xs ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          <span>{Math.abs(change)}% from last month</span>
        </div>
      </div>
    </motion.div>
  );
}
