import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import RootLayoutClient from '@/components/root-layout-client';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const interTight = Inter_Tight({ 
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata = {
  title: 'DevOps Mastery Hub | Learn DevOps Skills',
  description: 'Master DevOps with comprehensive tutorials, interactive quizzes, and hands-on challenges. Learn Docker, Kubernetes, AWS, Terraform, and more.',
  keywords: 'DevOps, Docker, Kubernetes, AWS, Terraform, Jenkins, CI/CD, Cloud Computing',
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
