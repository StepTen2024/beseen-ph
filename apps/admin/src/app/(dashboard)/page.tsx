'use client';

import { motion } from 'framer-motion';
import { 
  Users, Store, FileText, DollarSign,
  Clock, CheckCircle, ChevronRight,
  BarChart2, Activity, Sparkles
} from 'lucide-react';
import Link from 'next/link';

const STATS = [
  { label: 'Total Users', value: '1,247', change: '+89 today', icon: Users, color: 'text-fuchsia-400', href: '/clients' },
  { label: 'Active Businesses', value: '156', change: '+12 this week', icon: Store, color: 'text-emerald-400', href: '/clients' },
  { label: 'Articles Published', value: '423', change: '+15 today', icon: FileText, color: 'text-cyan-400', href: '/content' },
  { label: 'Monthly Revenue', value: '₱78,500', change: '+23%', icon: DollarSign, color: 'text-amber-400', href: '#' },
];

const PENDING_TASKS = [
  { id: 1, type: 'claim', title: 'New business claim: Cafe Lupe', time: '5 min ago', priority: 'high' },
  { id: 2, type: 'review', title: 'Article needs review: Best Bars in Clark', time: '1 hour ago', priority: 'medium' },
  { id: 3, type: 'claim', title: 'New business claim: The Local Bar', time: '2 hours ago', priority: 'high' },
  { id: 4, type: 'content', title: 'Generate batch: Angeles City restaurants', time: '3 hours ago', priority: 'low' },
];

const RECENT_ACTIVITY = [
  { action: 'Business verified', subject: 'Wings & Things', time: '10 min ago', icon: CheckCircle, color: 'text-emerald-400' },
  { action: 'Article published', subject: 'Top 10 Pizza Places', time: '30 min ago', icon: FileText, color: 'text-cyan-400' },
  { action: 'New signup', subject: 'juan@email.com', time: '1 hour ago', icon: Users, color: 'text-fuchsia-400' },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link 
              href={stat.href}
              className="block p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
              <p className="text-emerald-400 text-xs mt-1">{stat.change}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Tasks */}
        <div className="lg:col-span-2">
          <div className="p-4 md:p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" /> Pending Tasks
              </h2>
              <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                {PENDING_TASKS.length} items
              </span>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              {PENDING_TASKS.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 md:gap-4 min-w-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-amber-500' :
                      'bg-slate-500'
                    }`} />
                    <div className="min-w-0">
                      <p className="font-medium text-sm md:text-base truncate">{task.title}</p>
                      <p className="text-slate-500 text-xs md:text-sm">{task.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 shrink-0" />
                </motion.div>
              ))}
            </div>

            <Link 
              href="/claims"
              className="block mt-4 text-center text-fuchsia-400 text-sm font-medium hover:text-fuchsia-300"
            >
              View all pending items →
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4 md:p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <h2 className="font-bold flex items-center gap-2 mb-4 md:mb-6">
            <Activity className="w-5 h-5 text-cyan-400" /> Recent Activity
          </h2>
          
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-slate-800 ${activity.color} shrink-0`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-slate-400 text-sm truncate">{activity.subject}</p>
                  <p className="text-slate-600 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href="/claims"
          className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-fuchsia-900/30 to-purple-900/30 border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all"
        >
          <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-fuchsia-400 mb-3" />
          <h3 className="font-bold mb-1">Review Claims</h3>
          <p className="text-slate-400 text-sm">3 businesses waiting for verification</p>
        </Link>
        
        <Link
          href="/content"
          className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
        >
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mb-3" />
          <h3 className="font-bold mb-1">Generate Content</h3>
          <p className="text-slate-400 text-sm">AI article generation queue</p>
        </Link>
        
        <Link
          href="/clients"
          className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/20 hover:border-amber-500/40 transition-all"
        >
          <BarChart2 className="w-6 h-6 md:w-8 md:h-8 text-amber-400 mb-3" />
          <h3 className="font-bold mb-1">View Analytics</h3>
          <p className="text-slate-400 text-sm">Platform performance metrics</p>
        </Link>
      </div>
    </div>
  );
}
