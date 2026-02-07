/**
 * BE SEEN.PH - Auth Page
 * Standalone authentication page
 */

'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, User, UserPlus } from 'lucide-react';
import type { UserRole } from '@/lib/database.types';

function AuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultView = searchParams.get('view') === 'signup' ? 'signup' : 'signin';
  const defaultRole = (searchParams.get('role') as UserRole) || 'public';
  const redirectTo = searchParams.get('redirect') || '/';

  const [view, setView] = useState<'signin' | 'signup'>(defaultView);

  const handleSuccess = () => {
    router.push(redirectTo);
  };

  return (
    <div className="min-h-screen flex bg-[#030712] text-white">
      {/* Left Side - VIP Visual */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-slate-950 items-center justify-center">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        </div>

        {/* Floating Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md mb-8 shadow-2xl">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium tracking-wide text-emerald-200">JOIN THE NETWORK</span>
          </div>

          <h1 className="text-6xl font-bold tracking-tight mb-6 drop-shadow-lg">
            Your Access to the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-emerald-400">
              Future of Manila.
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
            Whether you're a Scout finding hidden gems or a Tycoon building a legacy, it all starts here.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 md:p-12 relative z-20 shadow-2xl shadow-black/50 border-l border-white/5">

        {/* Top Nav */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-slate-400 hover:text-white hover:bg-white/5 transition-all -ml-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Be Seen
          </Button>
        </div>

        {/* Main Card */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Toggle Switch */}
            <div className="flex p-1 bg-slate-900/50 rounded-xl border border-white/10 mb-8 backdrop-blur-md">
              <button
                onClick={() => setView('signin')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${view === 'signin' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <User className="w-4 h-4" /> Sign In
              </button>
              <button
                onClick={() => setView('signup')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${view === 'signup' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <UserPlus className="w-4 h-4" /> Sign Up
              </button>
            </div>

            <motion.div
              key={view}
              initial={{ opacity: 0, x: view === 'signup' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/40 border border-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-md"
            >
              {view === 'signin' ? (
                <SignInForm
                  onSuccess={handleSuccess}
                  onSignUpClick={() => setView('signup')}
                />
              ) : (
                <SignUpForm
                  onSuccess={handleSuccess}
                  onSignInClick={() => setView('signin')}
                  defaultRole={defaultRole}
                />
              )}
            </motion.div>

            {/* Demo Mode - Skip Auth for Testing */}
            <div className="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
              <p className="text-red-400 text-xs text-center mb-3">🔐 Admin Demo Mode</p>
              <button
                onClick={() => router.push('/claims')}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 font-bold text-sm transition-all"
              >
                Skip to Admin Dashboard →
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-600">
          Secure Access • Encrypted Connection • 2050 Ready
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-8 h-8 border-2 border-fuchsia-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
