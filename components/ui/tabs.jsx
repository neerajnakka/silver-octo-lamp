'use client';

import { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

const TabsContext = createContext();

export function Tabs({ defaultValue, value: controlledValue, onValueChange, children, className }) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const setValue = onValueChange ?? setUncontrolledValue;

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }) {
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-lg',
        'bg-gray-100 dark:bg-gray-800 p-1',
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className, children, disabled }) {
  const context = useContext(TabsContext);
  const isActive = context.value === value;

  return (
    <button
      onClick={() => !disabled && context.setValue(value)}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5',
        'text-sm font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }) {
  const context = useContext(TabsContext);
  
  if (context.value !== value) return null;

  return (
    <div className={cn('mt-4 animate-fadeIn', className)}>
      {children}
    </div>
  );
}
