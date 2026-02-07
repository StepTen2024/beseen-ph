/**
 * BE SEEN.PH - Sign In Form
 * Bioluminescent glassmorphism login form
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import { Chrome, Facebook, Loader2, Eye, EyeOff } from 'lucide-react';

interface SignInFormProps {
  onSuccess?: () => void;
  onSignUpClick?: () => void;
}

export function SignInForm({ onSuccess, onSignUpClick }: SignInFormProps) {
  const { signIn, signInWithOAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    onSuccess?.();
  };

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    const { error } = await signInWithOAuth(provider);
    
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
    // OAuth will redirect, no need to handle success
  };

  return (
    <GlassCard className="w-full max-w-md p-8" intensity="high">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center"
        >
          <span className="text-2xl">👁️</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
        <p className="text-slate-400 mt-1">Sign in to manage your business</p>
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

      <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-slate-400">
            <input type="checkbox" className="mr-2 rounded border-slate-700 bg-slate-900/50" />
            Remember me
          </label>
          <button type="button" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 text-white font-semibold h-12"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700/50"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-900/80 px-2 text-slate-500">Or continue with</span>
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
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSignUpClick}
          className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors"
        >
          Sign up
        </button>
      </p>
    </GlassCard>
  );
}
