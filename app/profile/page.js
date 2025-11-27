'use client';

import { motion } from 'framer-motion';
import { User, Mail, Calendar, Trophy, Flame, Target, Edit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { useHydration } from '@/lib/use-hydration';
import { skills } from '@/data/skills';

export default function ProfilePage() {
  const { completedLessons, totalPoints, streak, achievements } = useStore();
  const isHydrated = useHydration();
  const safeCompletedLessons = isHydrated ? completedLessons : {};
  const safeTotalPoints = isHydrated ? totalPoints : 0;
  const safeStreak = isHydrated ? streak : 0;
  const safeAchievements = isHydrated ? achievements : [];

  const totalCompleted = Object.values(safeCompletedLessons).reduce((acc, val) => acc + val, 0);
  const totalLessons = skills.reduce((acc, skill) => acc + (skill.conceptsCount || 100), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">DevOps Learner</h1>
                  <p className="text-white/90 mb-3">Member since 2025</p>
                  <div className="flex gap-2">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white">
                      Level {Math.floor(safeTotalPoints / 1000) + 1}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white">
                      {totalCompleted} Lessons
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StatItem icon={Trophy} label="Total Points" value={safeTotalPoints} />
                <StatItem icon={Flame} label="Current Streak" value={`${safeStreak} days`} />
                <StatItem icon={Target} label="Lessons Completed" value={totalCompleted} />
                <StatItem icon={Trophy} label="Achievements" value={safeAchievements.length} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">learner@devops.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">Joined January 2025</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Skills Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill) => {
                    const progress = safeCompletedLessons[skill.slug] || 0;
                    const total = skill.conceptsCount || 100;
                    const percentage = Math.round((progress / total) * 100);

                    return (
                      <div key={skill.slug} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{skill.icon}</span>
                          <div>
                            <div className="font-medium">{skill.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {progress}/{total} completed
                            </div>
                          </div>
                        </div>
                        <Badge variant={percentage > 0 ? 'success' : 'outline'}>
                          {percentage}%
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20">
        <Icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      </div>
      <div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
      </div>
    </div>
  );
}
