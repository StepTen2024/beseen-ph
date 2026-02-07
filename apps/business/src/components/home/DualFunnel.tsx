'use client';

import { motion } from 'framer-motion';
import { Store, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DualFunnel() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800"
        >
          <Store className="w-16 h-16 text-fuchsia-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Grow Your Business</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join thousands of Filipino businesses getting discovered by local customers every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/claim"
              className="px-8 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 font-bold flex items-center justify-center gap-2"
            >
              Claim Your Business <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/subscription"
              className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" /> View Plans
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
