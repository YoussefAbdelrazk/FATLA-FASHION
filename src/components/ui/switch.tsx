'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import { Check, X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface ModernSwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  label?: string;
  description?: string;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, ModernSwitchProps>(
  (
    { className, variant = 'default', size = 'md', showIcon = false, label, description, ...props },
    ref,
  ) => {
    const sizeClasses = {
      sm: 'h-5 w-9',
      md: 'h-6 w-11',
      lg: 'h-8 w-14',
    };

    const thumbSizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-7 w-7',
    };

    const iconSizeClasses = {
      sm: 'h-2.5 w-2.5',
      md: 'h-3 w-3',
      lg: 'h-4 w-4',
    };

    const variantClasses = {
      default: 'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      success: 'data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-input',
      warning: 'data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-input',
      destructive: 'data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-input',
    };

    const switchElement = (
      <SwitchPrimitives.Root
        className={cn(
          'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
          'hover:scale-105 active:scale-95',
          'data-[state=checked]:shadow-lg data-[state=checked]:shadow-primary/25',
          'data-[state=unchecked]:shadow-sm data-[state=unchecked]:shadow-muted/25',
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-all duration-300 ease-in-out',
            'data-[state=checked]:translate-x-1 data-[state=unchecked]:translate-x-0',
            'rtl:data-[state=checked]:-translate-x-5 rtl:data-[state=unchecked]:translate-x-0',
            'data-[state=checked]:shadow-xl data-[state=checked]:shadow-primary/30',
            'data-[state=unchecked]:shadow-md data-[state=unchecked]:shadow-muted/30',
            'hover:scale-110 active:scale-95',
            thumbSizeClasses[size],
          )}
        >
          {showIcon && (
            <div className='flex items-center justify-center h-full w-full'>
              {props.checked ? (
                <Check className={cn('text-primary', iconSizeClasses[size])} />
              ) : (
                <X className={cn('text-muted-foreground', iconSizeClasses[size])} />
              )}
            </div>
          )}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    );

    if (label || description) {
      return (
        <div className='flex items-center space-x-3 rtl:space-x-reverse'>
          {switchElement}
          <div className='space-y-1'>
            {label && (
              <label
                htmlFor={props.id}
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {label}
              </label>
            )}
            {description && <p className='text-xs text-muted-foreground'>{description}</p>}
          </div>
        </div>
      );
    }

    return switchElement;
  },
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
