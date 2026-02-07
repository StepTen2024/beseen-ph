'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Globe, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

export default function FeedStatus() {
    const feeds = [
        { name: "Facebook Catalog", status: "healthy", lastSync: "2 mins ago", icon: Facebook, color: "blue" },
        { name: "Instagram Shop", status: "healthy", lastSync: "2 mins ago", icon: Instagram, color: "pink" },
        { name: "Google Merchant", status: "syncing", lastSync: "Processing...", icon: Globe, color: "orange" },
        { name: "TikTok Ads", status: "warning", lastSync: "Auth Error", icon: ZapIcon, color: "cyan" },
    ];

    function ZapIcon(props: any) {
        return (
            <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
        )
    }

    return (
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-fuchsia-500" />
                    XML Feed Status
                </h3>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Auto-Sync Active</span>
            </div>

            <div className="space-y-4">
                {feeds.map((feed, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-${feed.color}-500/10 text-${feed.color}-500`}>
                                <feed.icon className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-200">{feed.name}</p>
                                <p className="text-xs text-slate-500">{feed.lastSync}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {feed.status === 'healthy' && <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md"><CheckCircle className="w-3 h-3" /> Live</span>}
                            {feed.status === 'syncing' && <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md animate-pulse"><RefreshCw className="w-3 h-3 animate-spin" /> Syncing</span>}
                            {feed.status === 'warning' && <span className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-md"><AlertCircle className="w-3 h-3" /> Error</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
