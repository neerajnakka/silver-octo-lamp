'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command, BookOpen, FileText, MessageSquare, Award, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function GlobalSearch({ isOpen, onClose }) {
  const router = useRouter();
  const { notes, bookmarks, flashcards } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sample searchable content
  const searchableContent = [
    // Skills
    { type: 'skill', title: 'Docker', description: 'Containerization platform', path: '/skills/docker', icon: '🐳' },
    { type: 'skill', title: 'Kubernetes', description: 'Container orchestration', path: '/skills/kubernetes', icon: '☸️' },
    { type: 'skill', title: 'Jenkins', description: 'CI/CD automation server', path: '/skills/jenkins', icon: '🔨' },
    { type: 'skill', title: 'GitHub Actions', description: 'GitHub CI/CD workflows', path: '/skills/github-actions', icon: '⚡' },
    { type: 'skill', title: 'Terraform', description: 'Infrastructure as Code', path: '/skills/terraform', icon: '🏗️' },
    { type: 'skill', title: 'Ansible', description: 'Configuration management', path: '/skills/ansible', icon: '📋' },
    { type: 'skill', title: 'Prometheus', description: 'Monitoring and alerting', path: '/skills/prometheus', icon: '📊' },
    { type: 'skill', title: 'Grafana', description: 'Metrics visualization', path: '/skills/grafana', icon: '📈' },
    { type: 'skill', title: 'AWS', description: 'Amazon Web Services', path: '/skills/aws', icon: '☁️' },
    { type: 'skill', title: 'Azure', description: 'Microsoft Azure cloud', path: '/skills/azure', icon: '🌐' },
    
    // Pages
    { type: 'page', title: 'Learning Roadmap', description: 'Structured learning paths', path: '/roadmap', icon: '🗺️' },
    { type: 'page', title: 'Flashcards', description: 'Study with flashcards', path: '/flashcards', icon: '🎴' },
    { type: 'page', title: 'My Notes', description: 'Personal learning notes', path: '/notes', icon: '📝' },
    { type: 'page', title: 'Interview Prep', description: 'Interview questions', path: '/interview', icon: '💼' },
    { type: 'page', title: 'Achievements', description: 'Your badges and progress', path: '/achievements', icon: '🏆' },
    { type: 'page', title: 'Dashboard', description: 'Learning dashboard', path: '/dashboard', icon: '📊' },
    { type: 'page', title: 'Statistics', description: 'Your learning stats', path: '/stats', icon: '📈' },
    { type: 'page', title: 'Profile', description: 'Your profile settings', path: '/profile', icon: '👤' },
    { type: 'page', title: 'Settings', description: 'Customize your experience', path: '/settings', icon: '⚙️' },
    
    // Commands
    { type: 'command', title: 'docker ps', description: 'List running containers', path: '/skills/docker', icon: '💻' },
    { type: 'command', title: 'kubectl get pods', description: 'List Kubernetes pods', path: '/skills/kubernetes', icon: '💻' },
    { type: 'command', title: 'terraform apply', description: 'Apply Terraform configuration', path: '/skills/terraform', icon: '💻' },
    { type: 'command', title: 'ansible-playbook', description: 'Run Ansible playbook', path: '/skills/ansible', icon: '💻' },
  ];

  // Add dynamic content
  const allContent = [
    ...searchableContent,
    ...Object.entries(notes).map(([key, note]) => ({
      type: 'note',
      title: note.content.substring(0, 50) + '...',
      description: `Note from ${key.split('-')[0]}`,
      path: `/notes`,
      icon: '📝'
    })),
    ...bookmarks.map(bookmark => ({
      type: 'bookmark',
      title: bookmark.title,
      description: bookmark.description || 'Bookmarked content',
      path: bookmark.path || '/skills',
      icon: '🔖'
    })),
    ...flashcards.map(card => ({
      type: 'flashcard',
      title: card.question,
      description: card.category,
      path: '/flashcards',
      icon: '🎴'
    }))
  ];

  useEffect(() => {
    if (query.trim()) {
      const filtered = allContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setResults(filtered);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (item) => {
    router.push(item.path);
    onClose();
    setQuery('');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'skill':
        return <BookOpen className="w-5 h-5" />;
      case 'page':
        return <TrendingUp className="w-5 h-5" />;
      case 'note':
        return <FileText className="w-5 h-5" />;
      case 'bookmark':
        return <Award className="w-5 h-5" />;
      case 'flashcard':
      case 'command':
        return <Command className="w-5 h-5" />;
      default:
        return <Search className="w-5 h-5" />;
    }
  };

  const getTypeBadge = (type) => {
    const colors = {
      skill: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      page: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      note: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      bookmark: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      flashcard: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
      command: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[type] || colors.skill}`}>
        {type}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills, pages, notes, commands..."
                className="w-full pl-12 pr-12 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Keyboard Hints */}
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[500px] overflow-y-auto">
            {query && results.length === 0 && (
              <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No results found for "{query}"</p>
              </div>
            )}

            {!query && (
              <div className="p-8">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">QUICK ACCESS</h3>
                <div className="grid grid-cols-2 gap-3">
                  {searchableContent.slice(0, 6).filter(item => item.type === 'page').map(item => (
                    <button
                      key={item.path}
                      onClick={() => handleSelect(item)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{item.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="p-2">
                {results.map((result, index) => (
                  <motion.button
                    key={`${result.type}-${result.title}-${index}`}
                    onClick={() => handleSelect(result)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                      index === selectedIndex
                        ? 'bg-blue-100 dark:bg-blue-900/30'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      index === selectedIndex
                        ? 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {result.icon ? (
                        <span className="text-xl">{result.icon}</span>
                      ) : (
                        getTypeIcon(result.type)
                      )}
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900 dark:text-white">{result.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{result.description}</div>
                    </div>
                    
                    {getTypeBadge(result.type)}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
