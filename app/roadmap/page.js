'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, CheckCircle2, Circle, Lock, ArrowRight, Target, 
  TrendingUp, Award, BookOpen, Clock, Star, Zap
} from 'lucide-react';
import { useStore } from '@/lib/store';
import Link from 'next/link';

const learningPaths = {
  beginner: {
    title: 'Beginner Path',
    subtitle: 'Start Your DevOps Journey',
    description: 'Perfect for those new to DevOps. Build strong foundations.',
    color: 'from-green-500 to-emerald-600',
    icon: '🌱',
    estimatedTime: '3-4 months',
    skills: [
      { id: 'docker', name: 'Docker', slug: 'docker', duration: '2 weeks', difficulty: 'Beginner' },
      { id: 'git', name: 'Git & GitHub', slug: 'git', duration: '1 week', difficulty: 'Beginner' },
      { id: 'linux', name: 'Linux Basics', slug: 'linux', duration: '2 weeks', difficulty: 'Beginner' },
      { id: 'jenkins', name: 'Jenkins CI/CD', slug: 'jenkins', duration: '2 weeks', difficulty: 'Beginner' },
      { id: 'github-actions', name: 'GitHub Actions', slug: 'github-actions', duration: '1 week', difficulty: 'Beginner' }
    ]
  },
  intermediate: {
    title: 'Intermediate Path',
    subtitle: 'Level Up Your Skills',
    description: 'For developers ready to dive deeper into automation and orchestration.',
    color: 'from-blue-500 to-cyan-600',
    icon: '🚀',
    estimatedTime: '4-6 months',
    skills: [
      { id: 'kubernetes', name: 'Kubernetes', slug: 'kubernetes', duration: '4 weeks', difficulty: 'Intermediate' },
      { id: 'terraform', name: 'Terraform', slug: 'terraform', duration: '3 weeks', difficulty: 'Intermediate' },
      { id: 'ansible', name: 'Ansible', slug: 'ansible', duration: '2 weeks', difficulty: 'Intermediate' },
      { id: 'prometheus', name: 'Prometheus', slug: 'prometheus', duration: '2 weeks', difficulty: 'Intermediate' },
      { id: 'grafana', name: 'Grafana', slug: 'grafana', duration: '1 week', difficulty: 'Intermediate' }
    ]
  },
  advanced: {
    title: 'Advanced Path',
    subtitle: 'Master Cloud & Scale',
    description: 'Enterprise-level skills for production-ready deployments.',
    color: 'from-purple-500 to-pink-600',
    icon: '⚡',
    estimatedTime: '6-8 months',
    skills: [
      { id: 'aws', name: 'AWS', slug: 'aws', duration: '6 weeks', difficulty: 'Advanced' },
      { id: 'azure', name: 'Azure', slug: 'azure', duration: '6 weeks', difficulty: 'Advanced' },
      { id: 'helm', name: 'Helm', slug: 'helm', duration: '2 weeks', difficulty: 'Advanced' },
      { id: 'service-mesh', name: 'Service Mesh (Istio)', slug: 'istio', duration: '3 weeks', difficulty: 'Advanced' },
      { id: 'security', name: 'DevSecOps', slug: 'security', duration: '4 weeks', difficulty: 'Advanced' }
    ]
  }
};

export default function RoadmapPage() {
  const { learningPath, setLearningPath, pathProgress, completedSkills } = useStore();
  const [selectedPath, setSelectedPath] = useState(learningPath || 'beginner');

  const currentPath = learningPaths[selectedPath];
  const progress = pathProgress[selectedPath] || { completed: [], current: null };

  const handlePathSelect = (path) => {
    setSelectedPath(path);
    setLearningPath(path);
  };

  const getSkillStatus = (skill) => {
    if (completedSkills.includes(skill.slug)) return 'completed';
    if (progress.current === skill.id) return 'current';
    
    const skillIndex = currentPath.skills.findIndex(s => s.id === skill.id);
    const completedCount = currentPath.skills.slice(0, skillIndex).filter(s => 
      completedSkills.includes(s.slug)
    ).length;
    
    if (skillIndex === 0 || completedCount === skillIndex) return 'unlocked';
    return 'locked';
  };

  const calculateProgress = () => {
    const completed = currentPath.skills.filter(s => completedSkills.includes(s.slug)).length;
    return Math.round((completed / currentPath.skills.length) * 100);
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
            <Target className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learning Roadmap
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Follow a structured path from beginner to advanced. Master DevOps one skill at a time.
          </p>
        </motion.div>

        {/* Path Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(learningPaths).map(([key, path], index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handlePathSelect(key)}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                selectedPath === key
                  ? 'border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-800 shadow-xl scale-105'
                  : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="text-4xl mb-3">{path.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {path.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {path.subtitle}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                {path.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{path.estimatedTime}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your Progress: {currentPath.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {currentPath.skills.filter(s => completedSkills.includes(s.slug)).length} of {currentPath.skills.length} skills completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {calculateProgress()}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Complete</p>
            </div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full bg-gradient-to-r ${currentPath.color} rounded-full`}
            />
          </div>
        </motion.div>

        {/* Skills Roadmap */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 hidden md:block" />

          <div className="space-y-6">
            {currentPath.skills.map((skill, index) => {
              const status = getSkillStatus(skill);
              
              return (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  status={status}
                  index={index}
                  pathColor={currentPath.color}
                />
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <Rocket className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-6 opacity-90">
            Begin your DevOps journey today and master the skills that matter.
          </p>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse All Skills <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function SkillCard({ skill, status, index, pathColor }) {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      case 'current':
        return <Circle className="w-8 h-8 text-blue-500 animate-pulse" />;
      case 'unlocked':
        return <Circle className="w-8 h-8 text-gray-400" />;
      case 'locked':
        return <Lock className="w-8 h-8 text-gray-300" />;
      default:
        return <Circle className="w-8 h-8 text-gray-400" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            ✓ Completed
          </span>
        );
      case 'current':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 animate-pulse">
            → In Progress
          </span>
        );
      case 'unlocked':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
            ○ Ready to Start
          </span>
        );
      case 'locked':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
            🔒 Locked
          </span>
        );
      default:
        return null;
    }
  };

  const isInteractive = status === 'unlocked' || status === 'current';

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <div className={`md:ml-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 transition-all ${
        status === 'completed'
          ? 'border-green-500 dark:border-green-400'
          : status === 'current'
          ? 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-100 dark:ring-blue-900/30'
          : status === 'unlocked'
          ? 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl cursor-pointer'
          : 'border-gray-200 dark:border-gray-700 opacity-60'
      }`}>
        {/* Icon Circle */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-gray-100 dark:border-gray-700">
          {getStatusIcon()}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {skill.name}
              </h3>
              {getStatusBadge()}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{skill.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{skill.difficulty}</span>
              </div>
            </div>
          </div>

          {isInteractive && (
            <Link
              href={`/skills/${skill.slug}`}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                status === 'current'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status === 'current' ? 'Continue Learning' : 'Start Learning'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
          
          {status === 'locked' && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
              <Lock className="w-5 h-5" />
              <span className="text-sm">Complete previous skills to unlock</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
