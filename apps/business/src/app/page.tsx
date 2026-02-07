'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Store, CheckCircle2, MapPin, Scan, ShieldCheck,
    Smartphone, Globe, Award, Zap, Camera,
    Share2, Facebook, Newspaper, ChevronRight, Lock, LayoutTemplate
} from 'lucide-react';
import DualFunnel from "@/components/home/DualFunnel";
import AutomationMarquee from "@/components/home/AutomationMarquee";

export default function BusinessPage() {
    const journeyRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: journeyRef,
        offset: ["start end", "end start"]
    });

    return (
        <main className="min-h-screen bg-slate-950 selection:bg-amber-500/30">

            {/* 1. CINEMATIC HERO */}
            <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden border-b border-white/5">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80')] bg-cover bg-center animate-ken-burns opacity-40"></div>
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold uppercase tracking-widest text-xs mb-8 backdrop-blur-md">
                            <Zap className="w-4 h-4 fill-amber-400" />
                            The New Standard for Local Business
                        </span>

                        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                            Turn Foot Traffic <br />
                            Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Loyal Fans.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                            Stop posting to ghosts. We put your business on the map, verify your ownership, and automate your marketing—so you can focus on running the show.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link href="/add-place" className="group relative px-8 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-lg rounded-2xl overflow-hidden shadow-2xl shadow-orange-900/40 transition-all hover:scale-105 hover:shadow-orange-500/25">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-3">
                                    <Store className="w-6 h-6" /> Claim Your Business
                                </span>
                            </Link>
                            <button onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white font-bold text-lg rounded-2xl border border-white/10 backdrop-blur-md transition-all flex items-center gap-3 group">
                                See How It Works <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
                >
                    <span className="text-xs font-bold uppercase tracking-widest">The Journey</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
                </motion.div>
            </section>

            {/* 2. THE VERIFICATION JOURNEY (Scroll-Linked) */}
            <section id="journey" ref={journeyRef} className="py-32 px-4 relative overflow-hidden bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">From Ghost to Tycoon.</h2>
                        <p className="text-slate-400 text-xl">The path to verifying your business is a quest, not a form.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-900 -translate-x-1/2 hidden md:block" />

                        {/* STEP 1: SIGNAL LOCK */}
                        <div className="flex flex-col md:flex-row items-center gap-12 mb-32 relative">
                            <div className="w-full md:w-1/2 flex justify-end">
                                <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-sm max-w-lg w-full relative group hover:border-emerald-500/30 transition-colors">
                                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all" />
                                    <Scan className="w-12 h-12 text-emerald-400 mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-4">1. Signal Lock</h3>
                                    <p className="text-slate-400">We verify you're actually there using browser geolocation. No more fake listings from scammers in random countries.</p>
                                </div>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-slate-900 border-4 border-slate-950 rounded-full z-10 hidden md:flex font-bold text-slate-500">1</div>
                            <div className="w-full md:w-1/2 pl-0 md:pl-12">
                                <div className="aspect-video bg-emerald-950/30 rounded-2xl border border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
                                    {/* Radar Animation */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-64 h-64 border border-emerald-500/30 rounded-full animate-ping-slow" />
                                        <div className="w-48 h-48 border border-emerald-500/50 rounded-full animate-ping-slower" />
                                        <MapPin className="w-12 h-12 text-emerald-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STEP 2: PROOF OF DOMINION (ID + Selfie) */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-32 relative">
                            <div className="w-full md:w-1/2 flex justify-start">
                                <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-sm max-w-lg w-full relative group hover:border-fuchsia-500/30 transition-colors">
                                    <div className="absolute -top-6 -left-6 w-20 h-20 bg-fuchsia-500/20 rounded-full blur-2xl group-hover:bg-fuchsia-500/30 transition-all" />
                                    <Camera className="w-12 h-12 text-fuchsia-400 mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-4">2. Proof of Dominion</h3>
                                    <p className="text-slate-400">Take a quick selfie and upload your ID. Our "Guardians" (Admins) review it to unlock your Tycoon features.</p>
                                </div>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-slate-900 border-4 border-slate-950 rounded-full z-10 hidden md:flex font-bold text-slate-500">2</div>
                            <div className="w-full md:w-1/2 pr-0 md:pr-12">
                                <div className="aspect-video bg-fuchsia-950/30 rounded-2xl border border-fuchsia-500/20 flex items-center justify-center p-8">
                                    <div className="grid grid-cols-2 gap-4 w-full h-full">
                                        <div className="bg-slate-900 rounded-xl border border-dashed border-slate-700 flex items-center justify-center flex-col gap-2">
                                            <div className="w-16 h-12 bg-slate-800 rounded-md" />
                                            <span className="text-xs font-bold text-slate-500">ID Card</span>
                                        </div>
                                        <div className="bg-slate-900 rounded-xl border border-dashed border-slate-700 flex items-center justify-center flex-col gap-2">
                                            <div className="w-12 h-12 bg-slate-800 rounded-full" />
                                            <span className="text-xs font-bold text-slate-500">Selfie</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STEP 3: TYCOON DASHBOARD */}
                        <div className="flex flex-col md:flex-row items-center gap-12 mb-32 relative">
                            <div className="w-full md:w-1/2 flex justify-end">
                                <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-sm max-w-lg w-full relative group hover:border-amber-500/30 transition-colors">
                                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-all" />
                                    <Award className="w-12 h-12 text-amber-400 mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-4">3. Enter Tycoon Mode</h3>
                                    <p className="text-slate-400">Unlocked! Get voice updates, see real-time analytics, and start generating AI articles for your business.</p>
                                </div>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-slate-900 border-4 border-slate-950 rounded-full z-10 hidden md:flex font-bold text-slate-500">3</div>
                            <div className="w-full md:w-1/2 pl-0 md:pl-12">
                                <div className="aspect-video bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-2xl border border-amber-500/20 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full p-4 grid grid-cols-3 gap-2 opacity-50">
                                        <div className="bg-amber-500/20 col-span-2 rounded-lg h-24" />
                                        <div className="bg-amber-500/10 rounded-lg h-24" />
                                        <div className="bg-amber-500/10 col-span-3 rounded-lg h-32" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THE ENGINE (Automated Marketing) */}
            <section className="py-24 bg-slate-900 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-amber-400 font-bold uppercase tracking-wider text-sm">We Do The Heavy Lifting</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-6">Built-In Marketing Team.</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">You cook the food, we cook the content. Our AI engine generates articles, social posts, and ads automatically.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-slate-950 p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                            <Newspaper className="w-10 h-10 text-slate-300 mb-6 group-hover:text-amber-400 transition-colors" />
                            <h3 className="text-xl font-bold text-white mb-2">3 Articles Per Month</h3>
                            <p className="text-slate-400 text-sm">We write SEO-optimized stories about your business to drive search traffic.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-slate-950 p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                            <Facebook className="w-10 h-10 text-slate-300 mb-6 group-hover:text-blue-400 transition-colors" />
                            <h3 className="text-xl font-bold text-white mb-2">Social Blast</h3>
                            <p className="text-slate-400 text-sm">Automatic posts to our Facebook page and Google Display network.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-slate-950 p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-fuchsia-500/30 transition-all">
                            <Zap className="w-10 h-10 text-slate-300 mb-6 group-hover:text-fuchsia-400 transition-colors" />
                            <h3 className="text-xl font-bold text-white mb-2">Voice Updates</h3>
                            <p className="text-slate-400 text-sm">Just talk to the app: "New Sisig on the menu!" and we update everything instantly.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PRICING TIERS */}
            <section id="pricing" className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black text-white mb-4">Choose Your Weapon.</h2>
                        <p className="text-slate-400">Start small or go nuclear. Upgrade anytime.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                        {/* TIER 1: STARTER */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-slate-600 transition-colors">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-slate-300">Starter</h3>
                                <div className="flex items-baseline gap-1 mt-4">
                                    <span className="text-4xl font-black text-white">₱500</span>
                                    <span className="text-slate-500">/mo</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-2">Perfect for small canteens.</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Basic Directory Listing</li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1 AI Article / Month</li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Small Ad Catalog</li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Basic Analytics</li>
                            </ul>
                            <button className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors">Select Starter</button>
                        </div>

                        {/* TIER 2: GROWTH (Highlight) */}
                        <div className="bg-slate-900 border-2 border-amber-500 rounded-3xl p-8 relative transform md:-translate-y-4 shadow-2xl shadow-amber-900/20">
                            <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">POPULAR</div>
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-amber-500">Growth</h3>
                                <div className="flex items-baseline gap-1 mt-4">
                                    <span className="text-5xl font-black text-white">₱1,000</span>
                                    <span className="text-slate-500">/mo</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-2">For serious restaurants.</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle2 className="w-4 h-4 text-amber-500" /> All Starter Features</li>
                                <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle2 className="w-4 h-4 text-amber-500" /> 2 AI Articles / Month</li>
                                <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle2 className="w-4 h-4 text-amber-500" /> 3 Business Tools (Logo, Edits)</li>
                                <li className="flex items-center gap-3 text-white font-medium text-sm"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Premium Catalog (More Traffic)</li>
                            </ul>
                            <button className="w-full py-4 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">Get Growth Plan</button>
                        </div>

                        {/* TIER 3: TYCOON (Pro Builder) */}
                        <div className="bg-gradient-to-b from-fuchsia-900/20 to-slate-900 border border-fuchsia-500/30 rounded-3xl p-8 hover:border-fuchsia-500/50 transition-colors">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-fuchsia-400">Tycoon</h3>
                                <div className="flex items-baseline gap-1 mt-4">
                                    <span className="text-4xl font-black text-white">Custom</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-2">"Facebook on Steroids" Page.</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-4 h-4 text-fuchsia-500" /> Full Automated Page Builder</li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-4 h-4 text-fuchsia-500" /> Unlimited AI Content Gen</li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-4 h-4 text-fuchsia-500" /> Top Tier Ad Network</li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 className="w-4 h-4 text-fuchsia-500" /> Video Generation Credits</li>
                            </ul>
                            <button className="w-full py-3 bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/50 font-bold rounded-xl hover:bg-fuchsia-600/30 transition-colors">Contact Sales</button>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. PRO BUILDER TEASER */}
            <section className="py-32 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-fixed relative">
                <div className="absolute inset-0 bg-slate-950/90" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <LayoutTemplate className="w-20 h-20 text-fuchsia-500 mx-auto mb-8" />
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Your Own Digital Empire.</h2>
                    <p className="text-xl text-slate-300 mb-10">
                        The Tycoon plan isn't just a listing. It's a fully customizable website builder powered by AI.
                        Choose your brand colors, layouts, and let our AI write your entire history.
                    </p>
                    <Link href="/add-place" className="inline-flex px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-200 transition-colors text-xl">
                        Start Building Now
                    </Link>
                </div>
            </section>

            {/* Footer CTA */}
            <DualFunnel />
        </main>
    );
}
