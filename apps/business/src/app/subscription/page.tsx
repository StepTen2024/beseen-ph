'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Shield, ArrowRight, CreditCard, Sparkles } from 'lucide-react';

const TIERS = [
  {
    id: 'free',
    name: 'Tingiy',
    tagline: 'Just a taste',
    price: 0,
    current: true,
    features: [
      'Basic listing on map',
      '1 AI post per week',
      'Community access',
      '30-day active status',
    ],
    color: 'slate',
    icon: Shield,
  },
  {
    id: 'starter',
    name: 'Seryoso',
    tagline: 'For real growth',
    price: 499,
    popular: true,
    features: [
      'Everything in Tingiy',
      'Daily AI content (30 posts/mo)',
      'Facebook catalog ads',
      'Google Display ads',
      '1 article per month',
      'Analytics dashboard',
      'Priority listing',
    ],
    color: 'emerald',
    icon: Zap,
  },
  {
    id: 'growth',
    name: 'Malakas',
    tagline: 'Scale faster',
    price: 1000,
    features: [
      'Everything in Seryoso',
      'Unlimited AI posts',
      '3 articles per month',
      'SEO optimization',
      'Competitor insights',
      'Dedicated ad budget',
      'Priority support',
    ],
    color: 'cyan',
    icon: Sparkles,
  },
  {
    id: 'premium',
    name: 'Boss',
    tagline: 'Total domination',
    price: 5000,
    features: [
      'Everything in Malakas',
      'Full custom website',
      'Logo & branding',
      'Professional copywriting',
      'Multi-branch support',
      'API access',
      'White-glove onboarding',
    ],
    color: 'amber',
    icon: Crown,
  },
];

export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Upgrade Your Plan</h1>
          <p className="text-slate-400 text-sm">Grow faster with premium features</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-xl bg-slate-800/50">
            {['monthly', 'yearly'].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle as 'monthly' | 'yearly')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === cycle
                    ? 'bg-fuchsia-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cycle === 'monthly' ? 'Monthly' : 'Yearly (2 months free)'}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-3xl border transition-all ${
                tier.popular
                  ? 'bg-emerald-900/20 border-emerald-500/50 scale-105'
                  : tier.current
                  ? 'bg-slate-900/30 border-slate-700'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-xs font-bold">
                  MOST POPULAR
                </div>
              )}
              {tier.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-600 text-xs font-bold">
                  CURRENT PLAN
                </div>
              )}

              <div className="text-center mb-6">
                <tier.icon className={`w-10 h-10 mx-auto mb-3 ${
                  tier.color === 'emerald' ? 'text-emerald-400' :
                  tier.color === 'cyan' ? 'text-cyan-400' :
                  tier.color === 'amber' ? 'text-amber-400' :
                  'text-slate-400'
                }`} />
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="text-slate-500 text-sm">{tier.tagline}</p>
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-black">
                  {tier.price === 0 ? 'Free' : `₱${tier.price.toLocaleString()}`}
                </span>
                {tier.price > 0 && <span className="text-slate-500">/mo</span>}
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      tier.color === 'emerald' ? 'text-emerald-400' :
                      tier.color === 'cyan' ? 'text-cyan-400' :
                      tier.color === 'amber' ? 'text-amber-400' :
                      'text-slate-500'
                    }`} />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={tier.current}
                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  tier.current
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : tier.popular
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {tier.current ? 'Current Plan' : (
                  <>Upgrade <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
          <div className="flex items-center gap-4 mb-4">
            <CreditCard className="w-6 h-6 text-slate-400" />
            <div>
              <h3 className="font-bold">Payment Methods</h3>
              <p className="text-slate-500 text-sm">GCash, Maya, Credit Card, Bank Transfer</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 text-sm font-medium">GCash</div>
            <div className="px-4 py-2 rounded-lg bg-green-600/20 text-green-400 text-sm font-medium">Maya</div>
            <div className="px-4 py-2 rounded-lg bg-slate-600/20 text-slate-400 text-sm font-medium">Credit Card</div>
          </div>
        </div>
      </main>
    </div>
  );
}
