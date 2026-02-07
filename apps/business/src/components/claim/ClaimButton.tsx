'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import ClaimWizard from './ClaimWizard';

interface ClaimButtonProps {
  businessName: string;
  businessSlug: string;
}

export default function ClaimButton({ businessName, businessSlug }: ClaimButtonProps) {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsWizardOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group overflow-hidden"
      >
        {/* Animated background glow */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(217,70,239,0.4)',
              '0 0 40px rgba(217,70,239,0.6)',
              '0 0 20px rgba(217,70,239,0.4)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600"
        />

        {/* Glassmorphism overlay */}
        <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-fuchsia-400/30">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="w-4 h-4 text-fuchsia-400" />
          </motion.div>
          <span className="text-sm font-medium text-slate-100">Claim Business</span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </motion.div>
        </div>
      </motion.button>

      <ClaimWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        businessName={businessName}
      />
    </>
  );
}
