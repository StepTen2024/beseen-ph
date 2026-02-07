'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Crown, Sparkles, Palette, Mic, Coins, ChevronRight, Star } from 'lucide-react';

interface ClaimWizardProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
}

type Step = 'intro' | 'verify' | 'profile' | 'reward';

const TOKEN_COLORS = [
  'from-amber-300 via-yellow-400 to-amber-500',
  'from-amber-400 via-yellow-500 to-amber-600',
  'from-yellow-300 via-amber-400 to-yellow-500',
];

export default function ClaimWizard({ isOpen, onClose, businessName }: ClaimWizardProps) {
  const [step, setStep] = useState<Step>('intro');
  const [isSpinning, setIsSpinning] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleNext = () => {
    if (step === 'intro') setStep('verify');
    else if (step === 'verify') setStep('profile');
    else if (step === 'profile') {
      setStep('reward');
      triggerSlotMachine();
    }
  };

  const triggerSlotMachine = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setShowReward(true);
    }, 2000);
  };

  const reset = () => {
    setStep('intro');
    setIsSpinning(false);
    setShowReward(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
          />

          {/* Main Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg"
          >
            {/* Glassmorphism Container */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50">
              {/* Animated gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-fuchsia-500 opacity-20 blur-xl"
              />

              <div className="relative p-8">
                {/* Close Button */}
                <button
                  onClick={reset}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800/50 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>

                {/* STEP: INTRO */}
                {step === 'intro' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center space-y-6"
                  >
                    <motion.div
                      animate={{ 
                        boxShadow: ['0 0 20px rgba(217,70,239,0.3)', '0 0 60px rgba(217,70,239,0.6)', '0 0 20px rgba(217,70,239,0.3)']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center"
                    >
                      <Crown className="w-10 h-10 text-white" />
                    </motion.div>

                    <div>
                      <h2 className="text-2xl font-bold text-slate-100">Claim {businessName}</h2>
                      <p className="mt-2 text-slate-400">
                        Take ownership of your business profile and unlock powerful tools
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { icon: Palette, label: 'Customize' },
                        { icon: Mic, label: 'Voice AI' },
                        { icon: Coins, label: 'Earn' },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                        >
                          <item.icon className="w-6 h-6 mx-auto text-fuchsia-400" />
                          <p className="mt-2 text-xs text-slate-400">{item.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold hover:from-fuchsia-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
                    >
                      Start Claiming
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {/* STEP: VERIFY */}
                {step === 'verify' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-fuchsia-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-100">Step 1: Verify Ownership</h3>
                        <p className="text-sm text-slate-500">Confirm you're the business owner</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-4">
                      <div>
                        <label className="text-sm text-slate-400">Business Email</label>
                        <input
                          type="email"
                          placeholder="owner@business.com"
                          className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-100 focus:border-fuchsia-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+63 917 123 4567"
                          className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-100 focus:border-fuchsia-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-500/20">
                      <p className="text-sm text-slate-300">
                        We'll send a verification code to confirm ownership
                      </p>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold hover:from-fuchsia-500 hover:to-purple-500 transition-all"
                    >
                      Send Verification
                    </button>
                  </motion.div>
                )}

                {/* STEP: PROFILE */}
                {step === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <Palette className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-100">Step 2: Customize</h3>
                        <p className="text-sm text-slate-500">Make it yours</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-slate-400">Brand Color</label>
                        <div className="mt-2 flex gap-3">
                          {['fuchsia', 'cyan', 'amber', 'emerald'].map((color) => (
                            <motion.button
                              key={color}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-12 h-12 rounded-full bg-${color}-500 border-2 border-white/20`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400">AI Voice Personality</label>
                        <div className="mt-2 grid grid-cols-2 gap-3">
                          {['Friendly', 'Professional', 'Witty', 'Casual'].map((voice) => (
                            <button
                              key={voice}
                              className="px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-fuchsia-500/50 transition-colors"
                            >
                              {voice}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold hover:from-fuchsia-500 hover:to-purple-500 transition-all"
                    >
                      Continue to Reward
                    </button>
                  </motion.div>
                )}

                {/* STEP: REWARD - SLOT MACHINE */}
                {step === 'reward' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-6"
                  >
                    {!showReward ? (
                      <>
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="text-2xl font-bold text-fuchsia-400"
                        >
                          Spinning...
                        </motion.div>

                        {/* Slot Machine Animation */}
                        <div className="flex justify-center gap-4 py-8">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={isSpinning ? {
                                y: [0, -100, 0, -50, 0],
                                rotate: [0, 360, 720, 1080, 1440],
                              } : {}}
                              transition={{ 
                                duration: 2, 
                                delay: i * 0.2,
                                ease: 'easeOut'
                              }}
                              className="relative"
                            >
                              <motion.div
                                animate={isSpinning ? {
                                  boxShadow: [
                                    '0 0 20px rgba(245,158,11,0.5)',
                                    '0 0 60px rgba(245,158,11,0.8)',
                                    '0 0 20px rgba(245,158,11,0.5)',
                                  ]
                                } : {
                                  boxShadow: '0 0 40px rgba(245,158,11,0.6)'
                                }}
                                transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0 }}
                                className={`w-24 h-24 rounded-full bg-gradient-to-br ${TOKEN_COLORS[i]} flex items-center justify-center border-4 border-amber-200`}
                              >
                                <Coins className="w-10 h-10 text-amber-900" />
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', duration: 0.8 }}
                        className="space-y-6"
                      >
                        <motion.div
                          animate={{ 
                            boxShadow: [
                              '0 0 60px rgba(245,158,11,0.8)',
                              '0 0 100px rgba(245,158,11,1)',
                              '0 0 60px rgba(245,158,11,0.8)',
                            ]
                          }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border-4 border-amber-200"
                        >
                          <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                          >
                            <Sparkles className="w-16 h-16 text-amber-900" />
                          </motion.div>
                        </motion.div>

                        <div>
                          <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
                          >
                            JACKPOT!
                          </motion.h2>
                          <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-2 text-xl text-slate-300"
                          >
                            You won <span className="text-amber-400 font-bold">3 Gold Tokens!</span>
                          </motion.p>
                        </div>

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30"
                        >
                          <p className="text-sm text-slate-300">
                            Use tokens to boost your visibility, unlock AI features, and more!
                          </p>
                        </motion.div>

                        <motion.button
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          onClick={reset}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-bold hover:from-amber-400 hover:to-yellow-400 transition-all"
                        >
                          Go to Dashboard
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Progress Dots */}
                {step !== 'reward' && (
                  <div className="flex justify-center gap-2 mt-6">
                    {['intro', 'verify', 'profile'].map((s, i) => (
                      <div
                        key={s}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          step === s ? 'bg-fuchsia-500' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
