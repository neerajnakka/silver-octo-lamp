'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, BookOpen, Terminal, HelpCircle, Clock, TrendingUp } from 'lucide-react';
import Fuse from 'fuse.js';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function SearchModal({ isOpen, onClose, skills }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { searchHistory, addSearchHistory } = useStore();
  const router = useRouter();

  // Create search index
  const fuse = useMemo(() => {
    const searchData = [];
    
    skills.forEach((skill) => {
      // Add skill itself
      searchData.push({
        type: 'skill',
        title: skill.name,
        description: skill.description,
        href: `/skills/${skill.slug}`,
        skill: skill.name,
        icon: 'skill',
      });

      // Add concepts
      skill.concepts?.forEach((concept) => {
        searchData.push({
          type: 'concept',
          title: concept.title,
          description: concept.explanation?.substring(0, 100),
          href: `/skills/${skill.slug}#concept-${concept.id}`,
          skill: skill.name,
          icon: 'concept',
        });
      });

      // Add commands
      skill.commands?.forEach((command) => {
        searchData.push({
          type: 'command',
          title: command.command,
          description: command.description,
          href: `/skills/${skill.slug}#command-${command.id}`,
          skill: skill.name,
          icon: 'command',
        });
      });

      // Add Q&A
      skill.qa?.forEach((item) => {
        searchData.push({
          type: 'qa',
          title: item.question,
          description: item.answer?.substring(0, 100),
          href: `/skills/${skill.slug}#qa-${item.id}`,
          skill: skill.name,
          icon: 'qa',
        });
      });
    });

    return new Fuse(searchData, {
      keys: ['title', 'description', 'skill'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [skills]);

  const results = useMemo(() => {
    if (!query) {
      // Show recent searches
      return searchHistory.slice(0, 5).map((item) => ({
        item,
        isHistory: true,
      }));
    }
    return fuse.search(query).slice(0, 10);
  }, [query, fuse, searchHistory]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleSelect = (result) => {
    const item = result.isHistory ? result.item : result.item;
    if (!result.isHistory) {
      addSearchHistory(item);
    }
    router.push(item.href);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'skill':
        return <BookOpen className="h-4 w-4" />;
      case 'concept':
        return <BookOpen className="h-4 w-4" />;
      case 'command':
        return <Terminal className="h-4 w-4" />;
      case 'qa':
        return <HelpCircle className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'skill':
        return 'primary';
      case 'concept':
        return 'secondary';
      case 'command':
        return 'success';
      case 'qa':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" className="!p-0">
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          autoFocus
          placeholder="Search skills, concepts, commands, Q&A..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-0 focus:ring-0 text-lg"
        />
      </div>

      <div className="max-h-[60vh] overflow-y-auto p-2">
        {results.length === 0 ? (
          <div className="py-12 text-center">
            <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {query ? 'No results found' : 'Start typing to search...'}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {!query && (
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Recent Searches
              </div>
            )}
            {query && (
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                Top Results
              </div>
            )}
            {results.map((result, index) => {
              const item = result.isHistory ? result.item : result.item;
              return (
                <button
                  key={index}
                  onClick={() => handleSelect(result)}
                  className={cn(
                    'w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-colors',
                    index === selectedIndex
                      ? 'bg-amber-50 dark:bg-amber-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  <div className="mt-1 text-gray-500 dark:text-gray-400">
                    {getIcon(item.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {item.title}
                      </span>
                      {item.type && (
                        <Badge variant={getTypeColor(item.type)} size="sm">
                          {item.type}
                        </Badge>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                    {item.skill && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        in {item.skill}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
              ↑↓
            </kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
              ↵
            </kbd>
            Select
          </span>
        </div>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
            ESC
          </kbd>
          Close
        </span>
      </div>
    </Modal>
  );
}
