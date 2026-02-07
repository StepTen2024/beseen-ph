'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Chrome } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement auth
    console.log({ mode, email, password, name });
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-700/50">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              BE SEEN
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              {mode === 'signin' ? 'Welcome back!' : 'Join the community'}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 p-1 rounded-xl bg-slate-800/50 mb-6">
            {['signin', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as 'signin' | 'signup')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === m
                    ? 'bg-fuchsia-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-bold hover:from-fuchsia-500 hover:to-cyan-500 transition-all flex items-center justify-center gap-2"
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-slate-500 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* OAuth */}
          <button className="w-full py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-slate-500 text-sm mt-6">
            {mode === 'signin' ? (
              <>Don't have an account? <button onClick={() => setMode('signup')} className="text-fuchsia-400">Sign up</button></>
            ) : (
              <>Already have an account? <button onClick={() => setMode('signin')} className="text-fuchsia-400">Sign in</button></>
            )}
          </p>
        </div>

        {/* Business CTA */}
        <div className="mt-6 text-center">
          <Link href="/business" className="text-slate-400 text-sm hover:text-fuchsia-400 transition-colors">
            Own a business? <span className="text-fuchsia-400">Claim it here →</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
