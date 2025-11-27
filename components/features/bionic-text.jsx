'use client';

import { useStore } from '@/lib/store';

/**
 * BionicText Component - Enhances reading speed by bolding the first half of each word
 * @param {string} text - The text to apply bionic reading to
 * @param {string} className - Additional CSS classes
 */
export default function BionicText({ text, className = '' }) {
  const bionicReading = useStore((state) => state.bionicReading);

  if (!bionicReading || !text) {
    return <span className={className}>{text}</span>;
  }

  const processBionicText = (text) => {
    // Split text into words while preserving spaces and punctuation
    const words = text.split(/(\s+|[.,!?;:])/);
    
    return words.map((word, index) => {
      // Skip if it's whitespace or punctuation
      if (/^\s+$/.test(word) || /^[.,!?;:]$/.test(word)) {
        return <span key={index}>{word}</span>;
      }

      // For words, bold the first half
      const wordLength = word.length;
      const boldLength = Math.ceil(wordLength / 2);
      const boldPart = word.substring(0, boldLength);
      const normalPart = word.substring(boldLength);

      return (
        <span key={index}>
          <strong className="font-bold">{boldPart}</strong>
          {normalPart}
        </span>
      );
    });
  };

  return (
    <span className={className}>
      {processBionicText(text)}
    </span>
  );
}

/**
 * Hook version for use in components
 */
export function useBionicText(text) {
  const bionicReading = useStore((state) => state.bionicReading);

  if (!bionicReading || !text) {
    return text;
  }

  const words = text.split(/(\s+)/);
  return words.map((word, index) => {
    if (/^\s+$/.test(word)) {
      return word;
    }

    const wordLength = word.length;
    const boldLength = Math.ceil(wordLength / 2);
    const boldPart = word.substring(0, boldLength);
    const normalPart = word.substring(boldLength);

    return `<strong>${boldPart}</strong>${normalPart}`;
  }).join('');
}
