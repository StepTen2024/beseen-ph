/**
 * BE SEEN.PH - Glass Card Component
 * Bioluminescent glassmorphism card
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'low' | 'medium' | 'high';
  hover?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = 'medium', hover = false, children, ...props }, ref) => {
    const intensities = {
      low: 'bg-slate-900/30 backdrop-blur-sm border-slate-800/30',
      medium: 'bg-slate-900/50 backdrop-blur-md border-slate-700/30',
      high: 'bg-slate-900/80 backdrop-blur-xl border-slate-600/30 shadow-2xl shadow-fuchsia-500/5',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border',
          intensities[intensity],
          hover && 'transition-all duration-300 hover:bg-slate-800/50 hover:border-slate-600/50 hover:shadow-lg hover:shadow-fuchsia-500/10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
