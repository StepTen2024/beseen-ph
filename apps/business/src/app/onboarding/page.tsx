'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, Camera, Clock, Palette, Mic, Facebook, 
  ArrowRight, ArrowLeft, Check, Sparkles
} from 'lucide-react';

type Step = 'basics' | 'hours' | 'photos' | 'branding' | 'social' | 'complete';

const STEPS = [
  { id: 'basics', title: 'Basic Info', icon: Store },
  { id: 'hours', title: 'Business Hours', icon: Clock },
  { id: 'photos', title: 'Photos', icon: Camera },
  { id: 'branding', title: 'Branding', icon: Palette },
  { id: 'social', title: 'Social Media', icon: Facebook },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('basics');
  const currentIndex = STEPS.findIndex(s => s.id === step);

  const nextStep = () => {
    if (currentIndex < STEPS.length - 1) {
      setStep(STEPS[currentIndex + 1].id as Step);
    } else {
      setStep('complete');
    }
  };

  const prevStep = () => {
    if (currentIndex > 0) {
      setStep(STEPS[currentIndex - 1].id as Step);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      {step !== 'complete' && (
        <div className="max-w-2xl mx-auto px-4 pt-8">
          <div className="flex justify-between mb-8">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  i <= currentIndex ? 'bg-fuchsia-600' : 'bg-slate-800'
                }`}>
                  {i < currentIndex ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <s.icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs text-slate-500 mt-2 hidden md:block">{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {step !== 'complete' ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h1 className="text-2xl font-bold">
                {STEPS[currentIndex].title}
              </h1>
              
              {/* Form content would go here based on step */}
              <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-slate-500">
                Form fields for {step} would go here
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={prevStep}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500"
                >
                  {currentIndex === STEPS.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 mx-auto flex items-center justify-center mb-6">
                <Sparkles className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-bold mb-4">You're all set!</h1>
              <p className="text-slate-400 mb-8">Your business profile is now complete. Let's get you some customers!</p>
              <button className="px-8 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 font-bold">
                Go to Dashboard →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
