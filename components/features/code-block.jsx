'use client';

import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function CodeBlock({ code, language = 'bash', filename, showLineNumbers = true }) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      {filename && (
        <div className="px-4 py-2 bg-gray-800 dark:bg-gray-900 text-gray-300 text-sm font-mono border-b border-gray-700 rounded-t-lg">
          {filename}
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 
                   text-gray-300 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>

        <Highlight
          theme={theme === 'dark' ? themes.nightOwl : themes.github}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} ${filename ? 'rounded-b-lg' : 'rounded-lg'} p-4 overflow-x-auto text-sm`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell text-right pr-4 select-none opacity-50">
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
