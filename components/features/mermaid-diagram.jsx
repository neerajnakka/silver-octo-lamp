'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';

export default function MermaidDiagram({ chart, title }) {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    let mermaid;

    const renderDiagram = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dynamically import mermaid from CDN
        if (typeof window !== 'undefined' && !window.mermaid) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
          script.type = 'module';
          
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });

          // Import mermaid module
          mermaid = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs');
          window.mermaid = mermaid.default;
        } else {
          mermaid = window.mermaid;
        }

        // Configure mermaid for dark/light theme
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          themeVariables: {
            primaryColor: theme === 'dark' ? '#f59e0b' : '#f59e0b',
            primaryTextColor: theme === 'dark' ? '#fff' : '#000',
            primaryBorderColor: theme === 'dark' ? '#f59e0b' : '#f59e0b',
            lineColor: theme === 'dark' ? '#6b7280' : '#9ca3af',
            secondaryColor: theme === 'dark' ? '#1f2937' : '#f3f4f6',
            tertiaryColor: theme === 'dark' ? '#111827' : '#fff',
          },
        });

        // Render the diagram
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart);
          containerRef.current.innerHTML = svg;
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram');
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [chart, theme]);

  return (
    <div className="my-6">
      {title && (
        <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          {title}
        </h4>
      )}
      
      <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 overflow-x-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <span className="ml-3 text-gray-600 dark:text-gray-400">
              Rendering diagram...
            </span>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-rose-500">
            {error}
          </div>
        )}

        <div
          ref={containerRef}
          className={`mermaid-container ${isLoading ? 'hidden' : ''}`}
          style={{ minHeight: isLoading ? '0' : '200px' }}
        />
      </div>
    </div>
  );
}
