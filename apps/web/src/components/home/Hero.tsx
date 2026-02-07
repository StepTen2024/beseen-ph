'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, ArrowRight, Activity, Zap, Store, Users } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SearchOverlay from '@/components/search/SearchOverlay';

export default function HomeHero() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Video/Image Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-slate-950/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />

                {/* Placeholder for Video - Using a high-quality night market image for now */}
                <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874&auto=format&fit=crop"
                    alt="Filipino Night Market"
                    className="w-full h-full object-cover scale-110"
                />

                {/* Ambient Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 z-10" />
            </motion.div>

            {/* Main Content */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-fuchsia-500/30 text-fuchsia-400 text-sm font-medium"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                        </span>
                        The #1 "Anti-Ghost" Map of the Philippines
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
                        Find What's <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-500 to-purple-600 animate-pulse">
                            Actually Open.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-slate-300 leading-relaxed">
                        Google Maps is full of ghosts. We have heartbeats.
                        <br />
                        If it's on <span className="text-fuchsia-400 font-bold">Be Seen</span>, it's alive right now.
                    </p>

                    {/* Search Trigger */}
                    <div className="max-w-xl mx-auto pt-8">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="group w-full relative flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:border-fuchsia-500/50 transition-all duration-300 shadow-2xl shadow-fuchsia-900/20"
                        >
                            <Search className="w-6 h-6 text-fuchsia-400" />
                            <span className="text-xl text-slate-400 group-hover:text-slate-200 transition-colors">
                                Try "Late night pares..."
                            </span>
                            <div className="absolute right-4 px-3 py-1.5 rounded-lg bg-white/10 text-xs text-slate-400 font-mono border border-white/10">
                                CDM + K
                            </div>
                        </button>
                    </div>

                    {/* Quick Categories */}
                    <div className="flex flex-wrap justify-center gap-4 pt-8 text-sm text-slate-400">
                        {['Must Try Food', 'Hidden Bars', 'Live Music', 'Wellness'].map((tag, i) => (
                            <span key={tag} className="px-4 py-2 rounded-full bg-slate-950/50 border border-slate-800/50 hover:border-fuchsia-500/30 transition-colors cursor-pointer">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </section>
    );
}
