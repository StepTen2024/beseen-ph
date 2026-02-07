/**
 * BE SEEN.PH - Protected Route Component
 * Guards routes based on authentication and role
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { AuthModal } from './AuthModal';
import type { UserRole } from '@/lib/database.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole,
  fallback,
  redirectTo = '/'
}: ProtectedRouteProps) {
  const { isAuthenticated, profile, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setHasChecked(true);
      
      if (!isAuthenticated) {
        setShowAuthModal(true);
      } else if (requiredRole) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!roles.includes(profile?.role as UserRole)) {
          // User doesn't have required role
          if (redirectTo) {
            router.push(redirectTo);
          }
        }
      }
    }
  }, [isLoading, isAuthenticated, profile, requiredRole, redirectTo, router]);

  // Show loading state
  if (isLoading || !hasChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-2 border-fuchsia-500/30 border-t-fuchsia-500"
        />
      </div>
    );
  }

  // Not authenticated - show auth modal with optional fallback
  if (!isAuthenticated) {
    return (
      <>
        {fallback || (
          <div className="min-h-screen flex items-center justify-center p-4">
            <GlassCard className="max-w-md w-full p-8 text-center" intensity="high">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 flex items-center justify-center"
              >
                <span className="text-3xl">🔒</span>
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
              <p className="text-slate-400 mb-6">
                Please sign in to access this page
              </p>
              <Button
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 text-white"
              >
                Sign In
              </Button>
            </GlassCard>
          </div>
        )}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultView="signin"
          onSuccess={() => {
            setShowAuthModal(false);
          }}
        />
      </>
    );
  }

  // Check role requirements
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(profile?.role as UserRole)) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full p-8 text-center" intensity="high">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500/20 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-slate-400 mb-6">
              You don&apos;t have permission to access this page
            </p>
            <Button
              onClick={() => router.push(redirectTo)}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Go Back
            </Button>
          </GlassCard>
        </div>
      );
    }
  }

  // All checks passed
  return <>{children}</>;
}
