'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Plus, Trash2, Edit2, RotateCw, CheckCircle2, XCircle,
  Filter, Search, Sparkles, TrendingUp, Clock, Zap
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { useHydration } from '@/lib/use-hydration';

const categories = ['All', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Ansible', 'AWS', 'Monitoring'];
const confidenceLevels = ['All', 'Learning', 'Reviewing', 'Mastered'];

export default function FlashcardsPage() {
  const { flashcards, addFlashcard, deleteFlashcard, reviewFlashcard, updateFlashcard } = useStore();
  const isHydrated = useHydration();
  const safeFlashcards = isHydrated ? flashcards : [];
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedConfidence, setSelectedConfidence] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [studyMode, setStudyMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'Docker',
    tags: []
  });

  const filteredCards = safeFlashcards.filter(card => {
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
    const matchesConfidence = selectedConfidence === 'All' ||
      (selectedConfidence === 'Learning' && card.confidence < 30) ||
      (selectedConfidence === 'Reviewing' && card.confidence >= 30 && card.confidence < 70) ||
      (selectedConfidence === 'Mastered' && card.confidence >= 70);
    const matchesSearch = searchTerm === '' ||
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesConfidence && matchesSearch;
  });

  const handleCreateCard = (e) => {
    e.preventDefault();
    if (formData.question && formData.answer) {
      addFlashcard(formData);
      setFormData({ question: '', answer: '', category: 'Docker', tags: [] });
      setShowCreateForm(false);
    }
  };

  const handleReview = (confidence) => {
    const card = filteredCards[currentCardIndex];
    reviewFlashcard(card.id, confidence);
    setIsFlipped(false);

    // Move to next card
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const statistics = {
    total: safeFlashcards.length,
    learning: safeFlashcards.filter(c => c.confidence < 30).length,
    reviewing: safeFlashcards.filter(c => c.confidence >= 30 && c.confidence < 70).length,
    mastered: safeFlashcards.filter(c => c.confidence >= 70).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Flashcards
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Master DevOps concepts through spaced repetition
          </p>
        </motion.div>

        {!studyMode ? (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard icon={<Sparkles />} label="Total Cards" value={statistics.total} color="from-blue-500 to-cyan-500" />
              <StatCard icon={<Brain />} label="Learning" value={statistics.learning} color="from-yellow-500 to-orange-500" />
              <StatCard icon={<RotateCw />} label="Reviewing" value={statistics.reviewing} color="from-green-500 to-emerald-500" />
              <StatCard icon={<CheckCircle2 />} label="Mastered" value={statistics.mastered} color="from-purple-500 to-pink-500" />
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search flashcards..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  {/* Confidence Filter */}
                  <select
                    value={selectedConfidence}
                    onChange={(e) => setSelectedConfidence(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  >
                    {confidenceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                  >
                    <Plus className="w-5 h-5" />
                    Create Card
                  </button>

                  {filteredCards.length > 0 && (
                    <button
                      onClick={() => {
                        setStudyMode(true);
                        setCurrentCardIndex(0);
                        setIsFlipped(false);
                      }}
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                    >
                      <Zap className="w-5 h-5" />
                      Start Study Session
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Create Form */}
            <AnimatePresence>
              {showCreateForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Create New Flashcard</h3>
                  <form onSubmit={handleCreateCard} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Question</label>
                      <textarea
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                        rows="3"
                        placeholder="What command lists all running Docker containers?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Answer</label>
                      <textarea
                        value={formData.answer}
                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                        rows="3"
                        placeholder="docker ps"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      >
                        {categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                      >
                        Create Flashcard
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flashcards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card, index) => (
                <FlashcardPreview key={card.id} card={card} onDelete={() => deleteFlashcard(card.id)} />
              ))}
            </div>

            {filteredCards.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No flashcards found. Create your first one!</p>
              </div>
            )}
          </>
        ) : (
          /* Study Mode */
          <StudyMode
            cards={filteredCards}
            currentIndex={currentCardIndex}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
            onReview={handleReview}
            onExit={() => setStudyMode(false)}
          />
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-2`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </motion.div>
  );
}

function FlashcardPreview({ card, onDelete }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getConfidenceColor = (confidence) => {
    if (confidence < 30) return 'bg-yellow-500';
    if (confidence < 70) return 'bg-green-500';
    return 'bg-purple-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow min-h-[200px] flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
              {card.category}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-gray-900 dark:text-white font-medium mb-2">
            {isFlipped ? 'Answer:' : 'Question:'}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {isFlipped ? card.answer : card.question}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-2">
            <span>Confidence</span>
            <span>{card.confidence || 0}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${getConfidenceColor(card.confidence || 0)} transition-all`}
              style={{ width: `${card.confidence || 0}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StudyMode({ cards, currentIndex, isFlipped, onFlip, onReview, onExit }) {
  const card = cards[currentIndex];

  if (!card) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-24 h-24 mx-auto mb-4 text-green-500" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Study Session Complete!
        </h2>
        <button
          onClick={onExit}
          className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
        >
          Back to Flashcards
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="text-gray-600 dark:text-gray-400">
          Card {currentIndex + 1} of {cards.length}
        </div>
        <button
          onClick={onExit}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Exit Study Mode
        </button>
      </div>

      {/* Flashcard */}
      <motion.div
        key={currentIndex}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={onFlip}
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 cursor-pointer min-h-[400px] flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className={`text-center ${isFlipped ? 'hidden' : 'block'}`}>
          <div className="text-gray-500 dark:text-gray-400 mb-4">Question</div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{card.question}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-8">Click to reveal answer</p>
        </div>

        <div className={`text-center ${isFlipped ? 'block' : 'hidden'}`} style={{ transform: 'rotateY(180deg)' }}>
          <div className="text-gray-500 dark:text-gray-400 mb-4">Answer</div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{card.answer}</h3>
        </div>
      </motion.div>

      {/* Review Buttons */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mt-8"
        >
          <button
            onClick={() => onReview(0)}
            className="flex flex-col items-center gap-2 p-6 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
          >
            <XCircle className="w-8 h-8" />
            <span className="font-semibold">Again</span>
            <span className="text-xs">Need more practice</span>
          </button>

          <button
            onClick={() => onReview(50)}
            className="flex flex-col items-center gap-2 p-6 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-xl hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
          >
            <RotateCw className="w-8 h-8" />
            <span className="font-semibold">Good</span>
            <span className="text-xs">Got it right</span>
          </button>

          <button
            onClick={() => onReview(100)}
            className="flex flex-col items-center gap-2 p-6 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
          >
            <CheckCircle2 className="w-8 h-8" />
            <span className="font-semibold">Easy</span>
            <span className="text-xs">I know this well</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
