'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BarChart3, Trophy, Flame, Target, BookOpen, Terminal,
  TrendingUp, Calendar, Award, Star, Clock, CheckCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { skills } from '@/data/skills';

export default function DashboardPage() {
  const { completedLessons, quizScores, totalPoints, streak, lastActive, achievements } = useStore();

  // Calculate statistics
  const totalLessons = skills.reduce((acc, skill) => acc + (skill.conceptsCount || 100), 0);
  const completedCount = Object.values(completedLessons).reduce((acc, val) => acc + val, 0);
  const overallProgress = Math.round((completedCount / totalLessons) * 100);

  const quizzesTaken = Object.keys(quizScores).length;
  const avgQuizScore = quizzesTaken > 0
    ? Math.round(Object.values(quizScores).reduce((acc, val) => acc + val, 0) / quizzesTaken)
    : 0;

  // Recent activity
  const recentSkills = skills.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 via-teal-500 to-rose-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <BarChart3 className="h-12 w-12" />
              <div>
                <h1 className="text-4xl font-bold">Your Dashboard</h1>
                <p className="text-white/90">Track your progress and achievements</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Target}
            title="Overall Progress"
            value={`${overallProgress}%`}
            subtitle={`${completedCount} of ${totalLessons} lessons`}
            color="text-amber-500"
            bgColor="bg-amber-100 dark:bg-amber-900/20"
          />
          <StatCard
            icon={Flame}
            title="Current Streak"
            value={`${streak} days`}
            subtitle="Keep it going!"
            color="text-orange-500"
            bgColor="bg-orange-100 dark:bg-orange-900/20"
          />
          <StatCard
            icon={Trophy}
            title="Total Points"
            value={totalPoints}
            subtitle="Experience points"
            color="text-teal-500"
            bgColor="bg-teal-100 dark:bg-teal-900/20"
          />
          <StatCard
            icon={Award}
            title="Achievements"
            value={achievements.length}
            subtitle="Badges earned"
            color="text-purple-500"
            bgColor="bg-purple-100 dark:bg-purple-900/20"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your journey across all DevOps skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Overall Completion</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {completedCount}/{totalLessons} lessons
                      </span>
                    </div>
                    <Progress value={completedCount} max={totalLessons} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {quizzesTaken}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Quizzes Taken
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {avgQuizScore}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Average Score
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Breakdown</CardTitle>
                <CardDescription>Your progress in each skill area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.slice(0, 6).map((skill) => {
                    const progress = completedLessons[skill.slug] || 0;
                    const total = skill.conceptsCount || 100;
                    const percentage = Math.round((progress / total) * 100);

                    return (
                      <div key={skill.slug}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{skill.icon}</span>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {skill.name}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {progress}/{total} lessons
                              </div>
                            </div>
                          </div>
                          <Badge variant={percentage > 0 ? 'success' : 'outline'} size="sm">
                            {percentage}%
                          </Badge>
                        </div>
                        <Progress value={progress} max={total} />
                      </div>
                    );
                  })}
                  <Link href="/skills">
                    <Button variant="outline" className="w-full mt-4">
                      View All Skills
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/skills">
                  <Button variant="primary" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Button>
                </Link>
                <Link href="/quiz/docker">
                  <Button variant="secondary" className="w-full justify-start">
                    <Terminal className="mr-2 h-4 w-4" />
                    Take a Quiz
                  </Button>
                </Link>
                <Link href="/achievements">
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="mr-2 h-4 w-4" />
                    View Achievements
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest milestones</CardDescription>
              </CardHeader>
              <CardContent>
                {achievements.length > 0 ? (
                  <div className="space-y-3">
                    {achievements.slice(0, 3).map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <div className="text-3xl">{achievement.icon || '🏆'}</div>
                        <div>
                          <div className="font-medium text-sm text-gray-900 dark:text-white">
                            {achievement.title || 'Achievement Unlocked'}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {achievement.description || 'Keep up the great work!'}
                          </div>
                        </div>
                      </div>
                    ))}
                    <Link href="/achievements">
                      <Button variant="ghost" size="sm" className="w-full">
                        View All
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No achievements yet</p>
                    <p className="text-xs">Start learning to earn badges!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Last Active
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {lastActive ? new Date(lastActive).toLocaleDateString() : 'Today'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Lessons Completed
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {completedCount} total
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-amber-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Average Score
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {avgQuizScore}% on quizzes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtitle, color, bgColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${bgColor}`}>
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {value}
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              {title}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {subtitle}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
