"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Wand2, Copy, Check } from "lucide-react";
import MagicLoader from "@/components/MagicLoader";
import SamplePosts from "@/components/SamplePosts";

interface Post {
  id: number;
  type: "viral" | "product" | "trust";
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

export default function StartPage() {
  const [businessName, setBusinessName] = useState("");
  const [step, setStep] = useState<"input" | "loading" | "results">("input");
  const [generatedPosts, setGeneratedPosts] = useState<Post[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setStep("loading");

    try {
      // Simulation for prototype
      setTimeout(() => {
        setGeneratedPosts(getMockPosts(businessName.trim()));
        setStep("results");
        setIsSubmitting(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };

  const getMockPosts = (name: string): Post[] => [
    {
      id: 1,
      type: "viral",
      content: `Sino ang mas excited sa weekend kaysa sa Monday? 😅🙋‍♀️\n\nKami sa ${name}, honestly, EVERYDAY is a good day kasi nakakapag-serve kami sa inyo! 💜\n\nPero seryoso, anong plans niyo this weekend? Comment below! 👇`,
      likes: 247,
      comments: 56,
      shares: 12,
    },
    {
      id: 2,
      type: "product",
      content: `✨ NEW ARRIVAL ALERT ✨\n\nMga ka-${name}! May bagong stocks na naman tayo! Fresh na fresh, gaya ng service na binibigay namin sa inyo araw-araw 🌟\n\n📍 Available na sa amin\n💳 GCash accepted\n🚚 Free delivery around Pampanga\n\nMessage us now!`,
      likes: 189,
      comments: 34,
      shares: 28,
    },
    {
      id: 3,
      type: "trust",
      content: `"Hindi ko in-expect na ganito kaganda yung quality! Sulit na sulit!" - Maria, Angeles City 💎\n\nSalamat po sa tiwala! Kayo ang dahilan kung bakit kami ginigising ng maaga araw-araw. ☀️\n\n⭐⭐⭐⭐⭐ 4.9/5 rating from 200+ customers\n\n#${name.replace(/\s+/g, '')} #Trusted`,
      likes: 312,
      comments: 42,
      shares: 18,
    },
  ];

  const handleGetStarted = () => {
    window.location.href = "/auth?view=signup&role=business";
  };

  return (
    <main className="min-h-screen bg-[#030712] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Cinematic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              className="flex flex-col items-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 backdrop-blur-md shadow-lg shadow-fuchsia-500/10">
                  <Wand2 className="w-4 h-4 text-fuchsia-400" />
                  <span className="text-fuchsia-200 text-sm font-bold tracking-wide uppercase">AI Content Generator</span>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-center mb-8"
              >
                <span className="text-white">See the </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400 animate-gradient-x">Magic.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-xl text-center max-w-2xl mb-12 leading-relaxed"
              >
                Enter your business name, and watch our AI generate 3 professional social media posts in seconds.
                <span className="block mt-2 text-cyan-400 font-medium">No login required.</span>
              </motion.p>

              {/* Input Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="w-full max-w-xl relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
                <div className="relative flex items-center bg-slate-900 border border-slate-700/50 rounded-xl p-2 shadow-2xl">
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Tita's Kitchen or Pampanga Tires"
                    className="w-full bg-transparent border-none px-6 py-4 text-lg text-white placeholder:text-slate-600 focus:outline-none focus:ring-0"
                    disabled={isSubmitting}
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!businessName.trim() || isSubmitting}
                    className="px-8 py-4 bg-white text-slate-950 rounded-lg font-bold hover:bg-fuchsia-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <Wand2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Generate</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>

              {/* Quick examples */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm"
              >
                <span className="text-slate-500">Try these:</span>
                {["Bean There Coffee", "Iron Gym", "Happy Teeth Clinic", "Lola's Lechon"].map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setBusinessName(example)}
                    className="px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-fuchsia-400 hover:border-fuchsia-500/50 transition-all font-medium"
                  >
                    {example}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {step === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-2xl mx-auto px-4 py-20 text-center"
            >
              <MagicLoader
                businessName={businessName}
                onComplete={() => { }}
              />
              <p className="mt-8 text-slate-500 animate-pulse">Consulting the digital spirits...</p>
            </motion.div>
          )}

          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-bold mb-4">
                  <Check className="w-4 h-4" /> Generated Successfully
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Magic Results for <span className="text-fuchsia-400">{businessName}</span>
                </h2>
                <p className="text-slate-400">Here are 3 posts ready for your Facebook page.</p>
              </div>

              <SamplePosts
                businessName={businessName}
                posts={generatedPosts}
                onGetStarted={handleGetStarted}
              />

              <div className="text-center mt-12">
                <button
                  onClick={() => {
                    setStep("input");
                    setBusinessName("");
                    setGeneratedPosts([]);
                  }}
                  className="text-slate-500 hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-2 mx-auto"
                >
                  <Wand2 className="w-4 h-4" /> Try another business
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
