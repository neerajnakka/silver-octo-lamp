'use client';

import { useEffect, useRef, useState } from 'react';

export default function TypedCommand({ commands = [], loop = true, typeSpeed = 80, deleteSpeed = 50, delayBetween = 2000 }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (commands.length === 0) return;

    const currentCommand = commands[currentIndex];

    if (isPaused) {
      intervalRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delayBetween);
      return;
    }

    if (!isDeleting && displayText === currentCommand) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (loop ? (prev + 1) % commands.length : Math.min(prev + 1, commands.length - 1)));
      return;
    }

    const timeout = isDeleting ? deleteSpeed : typeSpeed;

    intervalRef.current = setTimeout(() => {
      setDisplayText((prev) => {
        if (isDeleting) {
          return currentCommand.substring(0, prev.length - 1);
        } else {
          return currentCommand.substring(0, prev.length + 1);
        }
      });
    }, timeout);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [displayText, currentIndex, isDeleting, isPaused, commands, loop, typeSpeed, deleteSpeed, delayBetween]);

  if (commands.length === 0) {
    return null;
  }

  return (
    <div className="font-mono text-sm md:text-base">
      <span className="text-gray-400 dark:text-gray-500">$ </span>
      <span className="text-amber-500 dark:text-amber-400">{displayText}</span>
      <span className="inline-block w-[2px] h-5 ml-1 bg-amber-500 animate-pulse" />
    </div>
  );
}
