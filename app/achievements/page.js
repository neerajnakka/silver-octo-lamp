'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Lock, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/lib/store';
import { achievements as achievementsData } from '@/data/achievements';

export default function AchievementsPage() {
  const { achievements: unlockedAchievements, totalPoints, completedLessons } = useStore();

  const enhancedAchievements = achievementsData.map((achievement) => ({
    ...achievement,
    unlocked: unlockedAchievements.some((a) => a.id === achievement.id),
    progress: calculateProgress(achievement, { totalPoints, completedLessons }),
  }));

  const unlockedCount = enhancedAchievements.filter((a) => a.unlocked).length;
  const totalCount = enhancedAchievements.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <Trophy className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4">Achievements</h1>
            <p className="text-xl text-white/90 mb-6">
              Track your milestones and earn badges as you master DevOps
            </p>
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-center">
                <div className="text-3xl font-bold">{unlockedCount}</div>
                <div className="text-sm">Unlocked</div>
              </div>
              <div className="text-2xl">/</div>
              <div className="text-center">
                <div className="text-3xl font-bold">{totalCount}</div>
                <div className="text-sm">Total</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Overall Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Overall Achievement Progress</span>
              <span className="text-gray-600 dark:text-gray-400">
                {unlockedCount}/{totalCount} ({Math.round((unlockedCount / totalCount) * 100)}%)
              </span>
            </div>
            <Progress value={unlockedCount} max={totalCount} variant="secondary" />
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enhancedAchievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AchievementCard({ achievement, index }) {
  const { unlocked, progress } = achievement;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`relative overflow-hidden ${!unlocked ? 'opacity-60' : ''}`}>
        {unlocked && (
          <div className="absolute top-3 right-3">
            <div className="bg-green-500 rounded-full p-1">
              <Check className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
        {!unlocked && (
          <div className="absolute top-3 right-3">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
        )}

        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div
              className={`text-6xl mb-3 ${
                !unlocked ? 'grayscale opacity-50' : ''
              }`}
            >
              {achievement.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {achievement.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {achievement.description}
            </p>
          </div>

          {achievement.category && (
            <div className="flex justify-center mb-3">
              <Badge variant="outline" size="sm">
                {achievement.category}
              </Badge>
            </div>
          )}

          {unlocked ? (
            <div className="text-center">
              <Badge variant="success" className="w-full justify-center">
                <Trophy className="h-3 w-3 mr-1" />
                Unlocked!
              </Badge>
              {achievement.points && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  +{achievement.points} points earned
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} max={100} variant="default" />
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-center">
                {achievement.requirement}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function calculateProgress(achievement, { totalPoints, completedLessons }) {
  // Simple progress calculation based on achievement type
  if (achievement.type === 'points') {
    return Math.min(100, Math.round((totalPoints / achievement.target) * 100));
  }
  if (achievement.type === 'lessons') {
    const total = Object.values(completedLessons).reduce((acc, val) => acc + val, 0);
    return Math.min(100, Math.round((total / achievement.target) * 100));
  }
  return 0;
}
