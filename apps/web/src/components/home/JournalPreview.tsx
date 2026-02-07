'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

function TiltCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group cursor-pointer perspective-1000"
        >
            <div style={{ transform: "translateZ(50px)" }} className="aspect-video rounded-2xl overflow-hidden mb-6 border border-slate-700 relative shadow-2xl">
                <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1600"
                    alt="Featured"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gloss Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div style={{ transform: "translateZ(20px)" }}>
                <div className="flex gap-3 mb-4">
                    <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Adventure</span>
                    <span className="text-slate-500 text-sm">5 min read</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors">
                    Why Switzerland of the East is the Next Big Digital Nomad Hub
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                    Forget Bali. Local coffee, cooler weather, and fiber internet are turning this mountain province into the ultimate workspace.
                </p>
                <Link href="/journal/switzerland-east" className="text-white font-bold underline decoration-emerald-500 decoration-2 underline-offset-4 hover:text-emerald-400 transition-colors">
                    Read Full Story
                </Link>
            </div>
        </motion.div>
    );
}

export default function JournalPreview() {
    return (
        <section className="py-20 bg-slate-900 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-900/10 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-3">
                    Stories from the Streets
                    <span className="text-slate-600 text-lg font-normal">/ The Journal</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Featured Article with 3D Tilt */}
                    <TiltCard />

                    {/* List of Recent Articles */}
                    <div className="flex flex-row lg:flex-col gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x scrollbar-hide">
                        {[1, 2, 3].map((item, i) => (
                            <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[400px] lg:w-full flex flex-col md:flex-row gap-4 md:gap-6 group cursor-pointer lg:border-b lg:border-slate-800 lg:pb-8 last:border-0 last:pb-0">
                                <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
                                    <img
                                        src={`https://images.unsplash.com/photo-${i === 0 ? '1556910103-1c02745a30bf' : i === 1 ? '1504674900247-0877df9cc836' : '1596436890217-12a9e88086b9'}?auto=format&fit=crop&q=80&w=400`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Thumbnail"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-wide mb-2 block">
                                        {i === 0 ? 'Food & Drink' : i === 1 ? 'Culture' : 'Nightlife'}
                                    </span>
                                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                        {i === 0 ? 'The Ultimate Guide to Kampampangan Sisig' : i === 1 ? 'Art in the Park: 2026 Schedule' : 'Hidden Speakeasies of QC'}
                                    </h4>
                                    <p className="text-slate-400 text-sm line-clamp-2">
                                        Discover the authentic flavors and hidden spots that only the locals know about.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
