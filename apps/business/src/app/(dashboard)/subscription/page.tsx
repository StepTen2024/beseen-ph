'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Crown, Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const TIERS = [
  {
    name: 'Tingiy',
    tagline: 'Free forever',
    price: 0,
    period: '',
    features: [
      'Basic business listing',
      'Contact information display',
      'Customer reviews',
      'Business hours',
    ],
    cta: 'Get Started',
    popular: false,
    icon: Zap,
  },
  {
    name: 'Seryoso',
    tagline: 'For growing businesses',
    price: 499,
    period: '/month',
    features: [
      'Everything in Tingiy',
      'AI-generated social posts',
      'Featured in city listings',
      'Analytics dashboard',
      'Priority support',
      '50 Gold Tokens/month',
    ],
    cta: 'Start Free Trial',
    popular: true,
    icon: Crown,
  },
  {
    name: 'Bossing',
    tagline: 'For market leaders',
    price: 1499,
    period: '/month',
    features: [
      'Everything in Seryoso',
      'Dedicated account manager',
      'Custom AI voice & content',
      'Multi-location support',
      'API access',
      '200 Gold Tokens/month',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
    icon: Rocket,
  },
];

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Choose Your <span className="text-fuchsia-400">Power Level</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From free listings to AI-powered marketing machines. Pick what works for your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl border ${
                tier.popular
                  ? 'bg-gradient-to-b from-fuchsia-900/30 to-slate-900/50 border-fuchsia-500/50'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-fuchsia-600 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <tier.icon className={`w-10 h-10 mb-4 ${tier.popular ? 'text-fuchsia-400' : 'text-slate-400'}`} />
              <h2 className="text-2xl font-bold mb-1">{tier.name}</h2>
              <p className="text-slate-500 text-sm mb-4">{tier.tagline}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-black">₱{tier.price}</span>
                <span className="text-slate-400">{tier.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/claim"
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                  tier.popular
                    ? 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {tier.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
