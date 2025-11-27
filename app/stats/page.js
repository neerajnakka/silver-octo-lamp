'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Award, Target, Calendar, Zap, BookOpen,
  CheckCircle2, Trophy, Flame, Clock, BarChart3, Activity
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { useHydration } from '@/lib/use-hydration';

export default function StatsPage() {
  const completedSkills = useStore(state => state.completedSkills);
  const skillProgress = useStore(state => state.skillProgress);
  const achievements = useStore(state => state.achievements);
  const bookmarks = useStore(state => state.bookmarks);
  const streak = useStore(state => state.streak);

  const isHydrated = useHydration();
  const safeCompletedSkills = isHydrated ? completedSkills : [];
  const safeSkillProgress = isHydrated ? skillProgress : {};
  const safeAchievements = isHydrated ? achievements : [];
  const safeBookmarks = isHydrated ? bookmarks : [];
  const safeStreak = isHydrated ? streak : 0;

  // Calculate statistics directly
  const totalSkills = 10;
  const completedCount = safeCompletedSkills.length;
  const inProgressCount = Object.keys(safeSkillProgress).filter(
    skill => safeSkillProgress[skill] > 0 && safeSkillProgress[skill] < 100
  ).length;
  const completionRate = Math.round((completedCount / totalSkills) * 100);
  const totalAchievements = safeAchievements.length;
  const studyTime = completedCount * 45 + inProgressCount * 20;

  // Weekly activity simulation (static for now, could be moved to store later)
  const weeklyActivity = [
    { day: 'Mon', completions: 3 },
    { day: 'Tue', completions: 5 },
    { day: 'Wed', completions: 2 },
    { day: 'Thu', completions: 8 },
    { day: 'Fri', completions: 4 },
    { day: 'Sat', completions: 6 },
    { day: 'Sun', completions: 7 }
  ];

  const stats = {
    totalSkills,
    completedSkills: completedCount,
    inProgressSkills: inProgressCount,
    completionRate,
    totalAchievements,
    currentStreak: safeStreak,
    longestStreak: 15, // Placeholder, should ideally come from store
    totalBookmarks: safeBookmarks.length,
    studyTime,
    lastActive: new Date().toLocaleDateString()
  };


  const skillCategories = [
    { name: 'Containerization', completed: safeCompletedSkills.filter(s => ['Docker', 'Kubernetes'].includes(s)).length, total: 2 },
    { name: 'CI/CD', completed: safeCompletedSkills.filter(s => ['Jenkins', 'GitHub Actions'].includes(s)).length, total: 2 },
    { name: 'IaC', completed: safeCompletedSkills.filter(s => ['Terraform', 'Ansible'].includes(s)).length, total: 2 },
    { name: 'Monitoring', completed: safeCompletedSkills.filter(s => ['Prometheus', 'Grafana'].includes(s)).length, total: 2 },
    { name: 'Cloud', completed: safeCompletedSkills.filter(s => ['AWS', 'Azure'].includes(s)).length, total: 2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Learning Statistics
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Track your progress and celebrate your achievements
          </p>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Target className="w-8 h-8" />}
            label="Completion Rate"
            value={`${stats.completionRate}%`}
            color="from-blue-500 to-cyan-500"
            delay={0.1}
          />
          <StatCard
            icon={<CheckCircle2 className="w-8 h-8" />}
            label="Completed Skills"
            value={`${stats.completedSkills}/${stats.totalSkills}`}
            color="from-green-500 to-emerald-500"
            delay={0.2}
          />
          <StatCard
            icon={<Flame className="w-8 h-8" />}
            label="Current Streak"
            value={`${stats.currentStreak} days`}
            color="from-orange-500 to-red-500"
            delay={0.3}
          />
          <StatCard
            icon={<Trophy className="w-8 h-8" />}
            label="Achievements"
            value={stats.totalAchievements}
            color="from-purple-500 to-pink-500"
            delay={0.4}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard
            icon={<Clock className="w-6 h-6" />}
            label="Study Time"
            value={`${stats.studyTime} min`}
            subtext="Total learning time"
          />
          <InfoCard
            icon={<BookOpen className="w-6 h-6" />}
            label="In Progress"
            value={stats.inProgressSkills}
            subtext="Skills you're learning"
          />
          <InfoCard
            icon={<Award className="w-6 h-6" />}
            label="Longest Streak"
            value={`${stats.longestStreak} days`}
            subtext="Keep it up!"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weekly Activity</h2>
            </div>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.completions / 8) * 100}%` }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{day.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skill Categories Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Category Progress</h2>
            </div>
            <div className="space-y-4">
              {skillCategories.map((category, index) => (
                <div key={category.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {category.completed}/{category.total}
                    </span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(category.completed / category.total) * 100}%` }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Milestones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {safeAchievements.slice(0, 6).map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-xl"
              >
                <div className="text-3xl">{achievement.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
    >
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
      <p className="text-gray-600 dark:text-gray-400">{label}</p>
    </motion.div>
  );
}

function InfoCard({ icon, label, value, subtext }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-xs text-gray-500 dark:text-gray-500">{subtext}</p>
      </div>
    </div>
  );
}
