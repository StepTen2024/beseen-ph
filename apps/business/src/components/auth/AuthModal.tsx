/**
 * BE SEEN.PH - Auth Modal
 * Modal dialog for sign in / sign up
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { X } from 'lucide-react';
import type { UserRole } from '@/lib/database.types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'signin' | 'signup';
  defaultRole?: UserRole;
  onSuccess?: () => void;
}

export function AuthModal({ 
  isOpen, 
  onClose, 
  defaultView = 'signin',
  defaultRole = 'public',
  onSuccess 
}: AuthModalProps) {
  const [view, setView] = useState<'signin' | 'signup'>(defaultView);

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10"
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800/50"
          >
            <X size={20} />
          </button>

          <AnimatePresence mode="wait">
            {view === 'signin' ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <SignInForm
                  onSuccess={handleSuccess}
                  onSignUpClick={() => setView('signup')}
                />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <SignUpForm
                  onSuccess={handleSuccess}
                  onSignInClick={() => setView('signin')}
                  defaultRole={defaultRole}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
