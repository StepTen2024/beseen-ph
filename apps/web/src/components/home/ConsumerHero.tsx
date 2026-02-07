'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchOverlay from '@/components/search/SearchOverlay';
import Magnetic from '@/components/ui/Magnetic';

export default function ConsumerHero() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Mouse Move Parallax Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Background separation for parallax
    const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-5%", "5%"]);
    const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-5%", "5%"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPct = clientX / innerWidth - 0.5;
        const yPct = clientY / innerHeight - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative h-[95vh] flex items-center justify-center overflow-hidden perspective-1000 bg-slate-950"
        >
            {/* Cinematic Background Parallax Layer */}
            <motion.div
                style={{ x: bgX, y: bgY, scale: 1.1 }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-slate-950/20 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"
                    alt="Cinematic Philippines"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-0"
                        animate={{
                            x: [Math.random() * 1000, Math.random() * 1000],
                            y: [Math.random() * 1000, Math.random() * 1000],
                            opacity: [0, 0.5, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            {/* 3D Content Container */}
            <motion.div
                style={{ rotateX, rotateY, z: 100 }}
                className="relative z-20 text-center px-4 max-w-6xl mx-auto mt-16 perspective-content"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, z: -100 }}
                    animate={{ opacity: 1, scale: 1, z: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-slate-900/50 text-emerald-300 text-sm font-bold mb-8 border border-emerald-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-shadow cursor-default"
                    >
                        <Sparkles className="w-4 h-4 fill-emerald-300 animate-pulse" />
                        <span>The Ultimate Guide to Philippine Nightlife & Culture</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-8 drop-shadow-2xl leading-[0.9]">
                        Don't be a Ghost. <br />
                        <span className="relative inline-block">
                            <span className="absolute -inset-2 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 blur-xl rounded-full" />
                            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 animate-gradient-x">
                                Be Seen.
                            </span>
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-300 leading-relaxed mb-12 font-medium text-shadow-sm">
                        Discover the hidden gems, the secret spots, and the heartbeat of the city.
                        If it's here, it's <span className="text-emerald-400 font-bold border-b-2 border-emerald-500/50">alive right now</span>.
                    </p>

                    <Magnetic>
                        <motion.button
                            layoutId="search-bar"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsSearchOpen(true)}
                            className="group relative inline-flex items-center gap-6 bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-2xl border border-white/10 hover:border-emerald-500/50 text-white pl-8 pr-4 py-6 rounded-3xl w-full max-w-xl transition-all shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden"
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent z-0" />

                            <Search className="w-8 h-8 text-emerald-400 relative z-10" />
                            <div className="flex flex-col items-start relative z-10 flex-1">
                                <span className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">Start your search...</span>
                                <span className="text-xs text-slate-400 font-medium tracking-wide">Food • Nightlife • Adventures</span>
                            </div>
                            <div className="bg-emerald-500 rounded-2xl p-3 text-slate-950 group-hover:scale-110 group-hover:rotate-12 transition-all relative z-10 shadow-lg shadow-emerald-500/50">
                                <ArrowRight className="w-6 h-6" />
                            </div>
                        </motion.button>
                    </Magnetic>
                </motion.div>
            </motion.div>

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </section>
    );
}
