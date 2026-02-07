'use client';

import { motion } from 'framer-motion';
import { PlayCircle, MapPin, Star, Calendar, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LiveFeed() {
    const items = [
        { type: 'story', label: "Just In", title: "Top 10 Hidden Bars", image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800", link: "/journal/hidden-bars", color: "from-fuchsia-500 to-purple-600" },
        { type: 'live', label: "Live Now", title: "Sunset Yoga BGC", image: "https://images.unsplash.com/photo-1599447421405-0c325d26d77e?auto=format&fit=crop&q=80&w=800", link: "/activity/sunset-yoga", color: "from-red-500 to-orange-500" },
        { type: 'review', label: "Review", title: "Best Sisig!", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800", link: "/place/aling-lucings", color: "from-amber-400 to-orange-500" },
        { type: 'story', label: "New Opening", title: "Cafe 1990", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800", link: "/place/cafe-1990", color: "from-emerald-400 to-teal-500" },
        { type: 'story', label: "Guide", title: "Siargao Surf", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800", link: "/journal/siargao-guide", color: "from-blue-400 to-cyan-500" },
    ];

    return (
        <div className="w-full bg-slate-950 py-8 border-b border-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 mb-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider">Live Feed</h2>
                </div>
            </div>

            {/* Horizontal Stories Container */}
            <div className="flex overflow-x-auto pb-4 gap-4 px-4 scrollbar-hide snap-x shadow-inner">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        whileTap={{ scale: 0.9 }}
                        className="snap-center shrink-0 flex flex-col items-center gap-2 cursor-pointer group w-[100px] md:w-[120px]"
                    >
                        {/* Story Ring */}
                        <div className={`p-[3px] rounded-full bg-gradient-to-tr ${item.color} group-hover:scale-105 transition-transform duration-300 relative`}>
                            <div className="rounded-full overflow-hidden w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-4 border-slate-950 relative">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                {item.type === 'live' && (
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-white animate-pulse fill-white" />
                                    </div>
                                )}
                            </div>
                            {item.type === 'live' && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-950 z-10">
                                    LIVE
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <p className="text-white text-xs font-bold truncate w-full group-hover:text-emerald-400 transition-colors">{item.title}</p>
                            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">{item.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
