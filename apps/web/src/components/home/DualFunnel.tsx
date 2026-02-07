'use client';

import { motion } from 'framer-motion';
import { Store, Users, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DualFunnel() {
    return (
        <section className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Scout Card (Consumer) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-fuchsia-500/50 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-10 relative z-10 h-full flex flex-col">
                            <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center mb-8">
                                <Users className="w-8 h-8 text-fuchsia-400" />
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-4">
                                For Scouts
                            </h3>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Be the explorer who finds the hidden gems before anyone else. Pin places, earn reputation, and never get fooled by a "closed" sign again.
                            </p>

                            <div className="mt-auto">
                                <ul className="space-y-4 mb-8">
                                    {['Find "Real" Places', 'Earn Finder\'s Credit', 'Create Lists'].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/directory"
                                    className="inline-flex items-center gap-2 text-fuchsia-400 font-semibold group-hover:gap-4 transition-all"
                                >
                                    Start Exploring <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tycoon Card (Business) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/50 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-10 relative z-10 h-full flex flex-col">
                            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8">
                                <Store className="w-8 h-8 text-amber-400" />
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-4">
                                For Tycoons
                            </h3>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Turn your business into a marketing powerhouse. We automate your ads, your posts, and your growth. Stop posting to ghosts.
                            </p>

                            <div className="mt-auto">
                                <ul className="space-y-4 mb-8">
                                    {['Claim in 60 Seconds', 'Automated Facebook Ads', '3 Free Content Campaigns'].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/add-place"
                                    className="inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-4 transition-all"
                                >
                                    Claim & Grow <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
