'use client';

import { motion } from 'framer-motion';
import { Search, Filter, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { SkillCard } from '@/components/features/skill-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/data/skills';

const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === 'all' || skill.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-500 via-teal-500 to-rose-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <BookOpen className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4">DevOps Skills</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Master 13 essential DevOps skills with comprehensive tutorials, commands, and real-world scenarios
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Filter className="h-4 w-4" />
              <span>Difficulty:</span>
            </div>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className="relative"
              >
                <Badge
                  variant={selectedDifficulty === diff ? 'primary' : 'outline'}
                  className="cursor-pointer capitalize px-4 py-2"
                >
                  {diff}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredSkills.length}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{skills.length}</span> skills
          </p>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.slug} skill={skill} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No skills found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
