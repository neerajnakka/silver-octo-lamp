import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Progress = forwardRef(({ 
  className, 
  value = 0, 
  max = 100,
  showLabel = false,
  variant = 'default',
  ...props 
}, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const variants = {
    default: 'bg-amber-500',
    secondary: 'bg-teal-500',
    success: 'bg-green-500',
    danger: 'bg-rose-500',
  };

  return (
    <div className="w-full">
      <div
        ref={ref}
        className={cn(
          'relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out',
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
});

Progress.displayName = 'Progress';

export { Progress };
