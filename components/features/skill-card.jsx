'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Terminal, HelpCircle, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function SkillCard({ skill, index }) {
  const { completedLessons } = useStore();
  const progress = completedLessons[skill.slug] || 0;
  const totalLessons = skill.concepts?.length || 100;
  const progressPercentage = Math.round((progress / totalLessons) * 100);

  const gradients = [
    'from-amber-400 to-orange-500',
    'from-teal-400 to-cyan-500',
    'from-rose-400 to-pink-500',
    'from-purple-400 to-indigo-500',
    'from-blue-400 to-sky-500',
    'from-green-400 to-emerald-500',
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/skills/${skill.slug}`}>
        <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
          {/* Gradient Header */}
          <div className={cn(
            'h-32 bg-gradient-to-br relative overflow-hidden',
            gradient
          )}>
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative h-full flex items-center justify-center">
              {skill.icon ? (
                <div className="text-6xl filter drop-shadow-lg">
                  {skill.icon}
                </div>
              ) : (
                <BookOpen className="h-16 w-16 text-white drop-shadow-lg" />
              )}
            </div>
            {progress > 0 && (
              <Badge
                variant="default"
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900"
              >
                {progressPercentage}% Complete
              </Badge>
            )}
          </div>

          <CardHeader>
            <CardTitle className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {skill.name}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {skill.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Progress */}
            {progress > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {progress}/{totalLessons} lessons
                  </span>
                </div>
                <Progress value={progress} max={totalLessons} />
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-amber-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {skill.conceptsCount || 100}+ concepts
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Terminal className="h-4 w-4 text-teal-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {skill.commandsCount || 100}+ commands
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <HelpCircle className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {skill.qaCount || 75}+ Q&A
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-rose-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {skill.troubleshootingCount || 30}+ scenarios
                </span>
              </div>
            </div>

            {/* Difficulty */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <Badge
                variant={
                  skill.difficulty === 'beginner'
                    ? 'success'
                    : skill.difficulty === 'intermediate'
                    ? 'warning'
                    : 'danger'
                }
                size="sm"
              >
                {skill.difficulty || 'intermediate'}
              </Badge>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
