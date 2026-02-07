'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Crown, Shield } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PricingPage() {
    const tiers = [
        {
            name: 'Tingiy',
            tagline: 'Just a taste.',
            price: 'Free',
            description: 'Perfect for testing the waters. No commitment.',
            features: [
                '1 AI Post per week',
                'Basic listing on map',
                'Community access',
                '30-day active status'
            ],
            cta: 'Start Free',
            ctaLink: '/start',
            color: 'slate',
            icon: Shield
        },
        {
            name: 'Seryoso',
            tagline: 'For real growth.',
            price: '₱499',
            period: '/mo',
            description: 'The standard for growing businesses.',
            features: [
                'Daily AI Content (30 posts/mo)',
                'Priority listing boost',
                'Automated Facebook posting',
                'Review management',
                'Analytics dashboard'
            ],
            cta: 'Go Seryoso',
            ctaLink: '/auth?view=signup&role=business',
            color: 'emerald',
            popular: true,
            icon: Zap
        },
        {
            name: 'Boss',
            tagline: 'Total domination.',
            price: '₱1,499',
            period: '/mo',
            description: 'Full automation suite for serious brands.',
            features: [
                'Unlimited AI Generation',
                'Top 3 Map Ranking',
                'Competitor spying',
                'Dedicated account manager',
                'Multi-branch support',
                'API Access'
            ],
            cta: 'Become the Boss',
            ctaLink: '/contact',
            color: 'amber',
            icon: Crown
        }
    ];

    return (
        <main className="min-h-screen bg-[#030712] text-white overflow-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-900/20 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Price like a
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"> Sari-Sari Store.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Buy what you need. Upgrade when you grow. No hidden corporate fees.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className={`relative p-8 rounded-3xl border transition-all duration-300 ${tier.popular
                                    ? 'bg-slate-900/80 border-emerald-500/50 shadow-2xl shadow-emerald-900/20 z-10 scale-105'
                                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-900 text-xs font-bold uppercase tracking-wider shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${tier.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                                    tier.color === 'amber' ? 'bg-amber-500/10 text-amber-400' :
                                        'bg-slate-800 text-slate-400'
                                }`}>
                                <tier.icon className="w-6 h-6" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                            <p className={`text-sm font-medium mb-6 ${tier.color === 'emerald' ? 'text-emerald-400' :
                                    tier.color === 'amber' ? 'text-amber-400' :
                                        'text-slate-400'
                                }`}>{tier.tagline}</p>

                            <div className="flex items-baseline justify-center mb-6">
                                <span className="text-4xl font-bold text-white tracking-tight">{tier.price}</span>
                                {tier.period && <span className="text-slate-500 ml-1">{tier.period}</span>}
                            </div>

                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                {tier.description}
                            </p>

                            <ul className="space-y-4 mb-8 text-left">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.color === 'emerald' ? 'text-emerald-500' :
                                                tier.color === 'amber' ? 'text-amber-500' :
                                                    'text-slate-600'
                                            }`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={tier.ctaLink}
                                className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${tier.popular
                                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-lg shadow-emerald-900/20'
                                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 p-8 rounded-3xl bg-slate-900/30 border border-slate-800 max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-left">
                            <h4 className="text-xl font-bold text-white mb-2">Need a Custom Enterprise Plan?</h4>
                            <p className="text-slate-400 text-sm">For franchises with 5+ locations, we offer dedicated API access and white-glove onboarding.</p>
                        </div>
                        <Link href="/contact" className="px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors font-bold text-white whitespace-nowrap">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
