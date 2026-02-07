/**
 * BE SEEN.PH - Sign Up Form
 * Registration with role selection
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import { Chrome, Facebook, Loader2, Eye, EyeOff, Building2, User } from 'lucide-react';
import type { UserRole } from '@/lib/database.types';

interface SignUpFormProps {
  onSuccess?: () => void;
  onSignInClick?: () => void;
  defaultRole?: UserRole;
}

export function SignUpForm({ onSuccess, onSignInClick, defaultRole = 'public' }: SignUpFormProps) {
  const { signUp, signInWithOAuth } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, fullName, role);

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setSuccess(true);
    
    // Call onSuccess after showing success message briefly
    setTimeout(() => {
      onSuccess?.();
    }, 2000);
  };

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    const { error } = await signInWithOAuth(provider);
    
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <GlassCard className="w-full max-w-md p-8" intensity="high">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
          <p className="text-slate-400">
            We&apos;ve sent a confirmation link to <span className="text-white">{email}</span>
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="w-full max-w-md p-8" intensity="high">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Create Account</h2>
        <p className="text-slate-400 mt-1">Join BE SEEN.PH today</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Role Selection */}
      <div className="mb-6">
        <Label className="text-slate-300 mb-2 block">I am a...</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole('public')}
            className={`p-4 rounded-xl border-2 transition-all ${
              role === 'public'
                ? 'border-fuchsia-500 bg-fuchsia-500/10'
                : 'border-slate-700/50 bg-slate-900/30 hover:border-slate-600'
            }`}
          >
            <User className={`w-6 h-6 mx-auto mb-2 ${role === 'public' ? 'text-fuchsia-400' : 'text-slate-500'}`} />
            <span className={`text-sm font-medium ${role === 'public' ? 'text-white' : 'text-slate-400'}`}>
              Consumer
            </span>
            <p className="text-xs text-slate-500 mt-1">Find local businesses</p>
          </button>
          <button
            type="button"
            onClick={() => setRole('business')}
            className={`p-4 rounded-xl border-2 transition-all ${
              role === 'business'
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-slate-700/50 bg-slate-900/30 hover:border-slate-600'
            }`}
          >
            <Building2 className={`w-6 h-6 mx-auto mb-2 ${role === 'business' ? 'text-cyan-400' : 'text-slate-500'}`} />
            <span className={`text-sm font-medium ${role === 'business' ? 'text-white' : 'text-slate-400'}`}>
              Business Owner
            </span>
            <p className="text-xs text-slate-500 mt-1">Claim & manage listings</p>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            required
            className="mt-1 bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-fuchsia-500/50 focus:ring-fuchsia-500/20"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-slate-300">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="mt-1 bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-fuchsia-500/50 focus:ring-fuchsia-500/20"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-slate-300">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
              className="mt-1 bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-fuchsia-500/50 focus:ring-fuchsia-500/20 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters</p>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="mt-1 bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-fuchsia-500/50 focus:ring-fuchsia-500/20"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 text-white font-semibold h-12"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700/50"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-900/80 px-2 text-slate-500">Or sign up with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuth('google')}
          disabled={isLoading}
          className="bg-slate-900/50 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600"
        >
          <Chrome className="w-4 h-4 mr-2" />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuth('facebook')}
          disabled={isLoading}
          className="bg-slate-900/50 border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600"
        >
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSignInClick}
          className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors"
        >
          Sign in
        </button>
      </p>
    </GlassCard>
  );
}
