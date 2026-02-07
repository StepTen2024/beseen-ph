'use client';

import { motion } from 'framer-motion';
import { Activity, DollarSign, Users, Zap, ArrowUpRight, Globe, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function AdminDashboardHero() {
    const stats = [
        { label: "Active Revenue", value: "₱145,500", change: "+12%", icon: DollarSign, color: "emerald", gradient: "from-emerald-500 to-teal-500" },
        { label: "Live Campaigns", value: "842", change: "+45", icon: Zap, color: "amber", gradient: "from-amber-500 to-orange-500" },
        { label: "Total Traffic", value: "24.5k", change: "+18%", icon: Users, color: "fuchsia", gradient: "from-fuchsia-500 to-pink-500" },
        { label: "System Health", value: "OPTIMAL", change: "99.9%", icon: ShieldCheck, color: "cyan", gradient: "from-cyan-500 to-blue-500" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 uppercase tracking-widest">
                            <Cpu className="w-3 h-3" /> God Mode Active
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                        Mission Control
                    </h1>
                    <p className="text-slate-400 max-w-lg">
                        System is running at <span className="text-emerald-400 font-bold">98% efficiency</span>. The automation engine is processing 3 queues.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="px-5 py-2.5 bg-slate-800/50 text-slate-300 rounded-xl border border-white/5 hover:bg-slate-700/50 hover:text-white transition-all flex items-center gap-2 font-medium">
                        <Globe className="w-4 h-4" /> Live Site
                    </button>
                    <button className="relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-xl shadow-lg shadow-fuchsia-900/20 hover:scale-105 transition-transform flex items-center gap-2 font-bold group">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                        <Zap className="w-4 h-4 group-hover:text-yellow-300 transition-colors" />
                        <span className="relative z-10">Global Boost</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative overflow-hidden p-6 rounded-3xl bg-slate-900/80 border border-white/5 backdrop-blur-md hover:border-white/10 transition-all group"
                    >
                        {/* Interactive Background Glow */}
                        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity blur-[50px]`} />

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-400 border border-${stat.color}-500/20`}>
                                {stat.change} <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-1 tracking-tight group-hover:translate-x-1 transition-transform">
                                {stat.value}
                            </h3>
                            <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">
                                {stat.label}
                            </p>
                        </div>

                        {/* Animated Sparkline/Bar */}
                        <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${stat.gradient}`}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
