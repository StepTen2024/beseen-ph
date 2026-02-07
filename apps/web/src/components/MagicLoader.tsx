"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MagicLoaderProps {
  businessName: string;
  onComplete: () => void;
}

const loadingSteps = [
  { text: "Identifying niche...", duration: 800 },
  { text: "Analyzing local competitors...", duration: 1000 },
  { text: "Crafting brand voice...", duration: 900 },
  { text: "Generating visuals...", duration: 1200 },
  { text: "Optimizing for engagement...", duration: 800 },
  { text: "Finalizing content strategy...", duration: 700 },
];

export default function MagicLoader({ businessName, onComplete }: MagicLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    if (currentStep >= loadingSteps.length) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }

    const step = loadingSteps[currentStep];
    let charIndex = 0;
    
    // Type out the current step
    const typingInterval = setInterval(() => {
      if (charIndex <= step.text.length) {
        setDisplayedText(step.text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Wait then move to next step
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, step.text]);
          setDisplayedText("");
          setCurrentStep(prev => prev + 1);
        }, 400);
      }
    }, 25);

    return () => clearInterval(typingInterval);
  }, [currentStep, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Brain/Pulse Visualization */}
      <div className="flex justify-center mb-12">
        <div className="relative">
          {/* Outer rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: 120, height: 120, left: -20, top: -20 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/30 to-cyan-500/30"
            animate={{
              scale: [1.1, 1.4, 1.1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            style={{ width: 140, height: 140, left: -30, top: -30 }}
          />
          
          {/* Center brain icon */}
          <motion.div
            className="relative w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center glow-orchid"
            animate={{
              boxShadow: [
                "0 0 20px rgba(217, 70, 239, 0.4)",
                "0 0 40px rgba(6, 182, 212, 0.6)",
                "0 0 20px rgba(217, 70, 239, 0.4)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" 
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Business Name Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center px-4 py-2 rounded-full glass text-sm text-cyan-300 border border-cyan-500/30">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-2" />
          Analyzing: <span className="font-semibold ml-1 text-white">{businessName}</span>
        </span>
      </motion.div>

      {/* Terminal Output */}
      <div className="glass-card rounded-xl p-6 font-mono text-sm">
        {/* Completed Steps */}
        {completedSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-3 text-slate-400"
          >
            <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="line-through opacity-60">{step}</span>
          </motion.div>
        ))}

        {/* Current Typing Step */}
        {currentStep < loadingSteps.length && (
          <div className="flex items-center gap-3 text-cyan-300">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full flex-shrink-0"
            />
            <span className="cursor-blink">{displayedText}</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-6 h-1 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep) / loadingSteps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="mt-2 text-right text-xs text-slate-500">
          {Math.round(((currentStep) / loadingSteps.length) * 100)}%
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-fuchsia-400/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
