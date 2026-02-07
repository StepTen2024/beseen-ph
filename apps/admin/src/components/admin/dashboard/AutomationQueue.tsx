'use client';

import { motion } from 'framer-motion';
import { Play, FileText, Share2, MoreHorizontal } from 'lucide-react';

export default function AutomationQueue() {
    const tasks = [
        { business: "Tita's BBQ", action: "Generate Monthly Article", type: "content", status: "ready" },
        { business: "Jepoy's Gym", action: "Push to Facebook Ads", type: "ads", status: "pending" },
        { business: "Barber King", action: "Verify Location (Heartbeat)", type: "verify", status: "urgent" },
    ];

    return (
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Play className="w-5 h-5 text-emerald-500" />
                    Automation Queue
                </h3>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">3 Pending</span>
            </div>

            <div className="space-y-3">
                {tasks.map((task, i) => (
                    <div key={i} className="group relative p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-emerald-500/30 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{task.type}</span>
                            <button className="text-slate-600 hover:text-white transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                        <h4 className="text-white font-semibold mb-1">{task.business}</h4>
                        <p className="text-sm text-slate-400 mb-3">{task.action}</p>

                        <div className="flex items-center gap-2">
                            <button className="flex-1 py-2 rounded-lg bg-emerald-600/10 text-emerald-500 text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:bg-emerald-600 group-hover:text-white">
                                <Play className="w-3 h-3 fill-current" /> Run Auto-Pilot
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
