/**
 * BE SEEN.PH - Label Component
 * Form label with bioluminescent styling
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium text-slate-300',
          'cursor-pointer',
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';
