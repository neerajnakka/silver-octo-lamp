'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/features/header';
import { Footer } from '@/components/features/footer';
import GlobalSearch from '@/components/features/global-search';
import { useStore } from '@/lib/store';

export default function RootLayoutClient({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme } = useStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <>
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <GlobalSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
