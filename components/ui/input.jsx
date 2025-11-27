import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600',
        'bg-white dark:bg-gray-800 px-3 py-2 text-sm',
        'text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all duration-200',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[80px] w-full rounded-lg border border-gray-300 dark:border-gray-600',
        'bg-white dark:bg-gray-800 px-3 py-2 text-sm',
        'text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all duration-200',
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Input, Textarea };
