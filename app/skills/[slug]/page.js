'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, HelpCircle, AlertTriangle, Clock, Trophy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/lib/store';
import { skills } from '@/data/skills';
import { dockerData } from '@/data/skills/docker';

// Map of skill data
const skillDataMap = {
  docker: dockerData,
  // Add more as we create them
};

export default function SkillPage({ params }) {
  const { slug } = use(params);
  const skillInfo = skills.find((s) => s.slug === slug);
  const skillData = skillDataMap[slug];

  if (!skillInfo || !skillData) {
    notFound();
  }

  const { completedLessons, markLessonComplete } = useStore();
  const progress = completedLessons[slug] || 0;
  const totalLessons = skillData.concepts?.length || 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 via-teal-500 to-rose-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/skills">
            <Button variant="ghost" className="mb-4 text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Skills
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{skillInfo.icon}</div>
              <div>
                <h1 className="text-5xl font-bold mb-2">{skillInfo.name}</h1>
                <p className="text-xl text-white/90">{skillInfo.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{skillData.concepts?.length || 0}</div>
                <div className="text-sm text-white/80">Concepts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{skillData.commands?.length || 0}</div>
                <div className="text-sm text-white/80">Commands</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{skillData.qa?.length || 0}</div>
                <div className="text-sm text-white/80">Q&A</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{skillData.troubleshooting?.length || 0}</div>
                <div className="text-sm text-white/80">Scenarios</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{skillInfo.estimatedHours}h</div>
                <div className="text-sm text-white/80">Est. Time</div>
              </div>
            </div>

            {/* Progress */}
            {progress > 0 && (
              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Your Progress</span>
                  <span className="font-semibold">
                    {progress}/{totalLessons} lessons ({Math.round((progress / totalLessons) * 100)}%)
                  </span>
                </div>
                <Progress value={progress} max={totalLessons} variant="secondary" />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="concepts">
          <TabsList className="mb-8">
            <TabsTrigger value="concepts">
              <BookOpen className="h-4 w-4 mr-2" />
              Concepts
            </TabsTrigger>
            <TabsTrigger value="commands">
              <Terminal className="h-4 w-4 mr-2" />
              Commands
            </TabsTrigger>
            <TabsTrigger value="qa">
              <HelpCircle className="h-4 w-4 mr-2" />
              Q&A
            </TabsTrigger>
            <TabsTrigger value="troubleshooting">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Troubleshooting
            </TabsTrigger>
          </TabsList>

          {/* Concepts Tab */}
          <TabsContent value="concepts">
            <div className="space-y-6">
              {skillData.concepts?.map((concept, index) => (
                <ConceptCard key={concept.id} concept={concept} index={index} skillSlug={slug} />
              ))}
            </div>
          </TabsContent>

          {/* Commands Tab */}
          <TabsContent value="commands">
            <div className="space-y-6">
              {skillData.commands?.map((command, index) => (
                <CommandCard key={command.id} command={command} index={index} />
              ))}
            </div>
          </TabsContent>

          {/* Q&A Tab */}
          <TabsContent value="qa">
            <div className="space-y-6">
              {skillData.qa?.map((qa, index) => (
                <QACard key={qa.id} qa={qa} index={index} />
              ))}
            </div>
          </TabsContent>

          {/* Troubleshooting Tab */}
          <TabsContent value="troubleshooting">
            <div className="space-y-6">
              {skillData.troubleshooting?.map((trouble, index) => (
                <TroubleshootingCard key={trouble.id} trouble={trouble} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Concept Card Component
function ConceptCard({ concept, index, skillSlug }) {
  const { markLessonComplete, completedLessons } = useStore();
  const isCompleted = completedLessons[skillSlug] >= index + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      id={`concept-${concept.id}`}
    >
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle>{concept.title}</CardTitle>
                <Badge variant="secondary" size="sm">
                  {concept.category}
                </Badge>
                <Badge
                  variant={
                    concept.difficulty === 'beginner'
                      ? 'success'
                      : concept.difficulty === 'intermediate'
                      ? 'warning'
                      : 'danger'
                  }
                  size="sm"
                >
                  {concept.difficulty}
                </Badge>
              </div>
            </div>
            {!isCompleted && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => markLessonComplete(skillSlug)}
              >
                Mark Complete
              </Button>
            )}
            {isCompleted && (
              <Badge variant="success">
                <Trophy className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">{concept.explanation}</p>

          {concept.keyPoints && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Points:</h4>
              <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                {concept.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {concept.useCases && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Use Cases:</h4>
              <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                {concept.useCases.map((useCase, i) => (
                  <li key={i}>{useCase}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Command Card Component
function CommandCard({ command, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      id={`command-${command.id}`}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <CardTitle className="font-mono text-teal-600 dark:text-teal-400">
              {command.command}
            </CardTitle>
            <Badge variant="secondary" size="sm">
              {command.category}
            </Badge>
            <Badge
              variant={
                command.difficulty === 'beginner'
                  ? 'success'
                  : command.difficulty === 'intermediate'
                  ? 'warning'
                  : 'danger'
              }
              size="sm"
            >
              {command.difficulty}
            </Badge>
          </div>
          <CardDescription>{command.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
              {command.syntax}
            </p>
          </div>

          {command.examples && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Examples:</h4>
              <div className="space-y-3">
                {command.examples.map((example, i) => (
                  <div key={i} className="border-l-4 border-teal-500 pl-4">
                    <code className="block bg-gray-900 dark:bg-gray-950 text-green-400 p-3 rounded text-sm mb-2">
                      $ {example.command}
                    </code>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {example.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {command.commonOptions && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common Options:</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {command.commonOptions.map((option, i) => (
                  <li key={i} className="font-mono">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Q&A Card Component
function QACard({ qa, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      id={`qa-${qa.id}`}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            <CardTitle>{qa.question}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" size="sm">
              {qa.category}
            </Badge>
            <Badge
              variant={
                qa.difficulty === 'beginner'
                  ? 'success'
                  : qa.difficulty === 'intermediate'
                  ? 'warning'
                  : 'danger'
              }
              size="sm"
            >
              {qa.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{qa.answer}</p>
          {qa.tags && (
            <div className="flex gap-2 mt-4">
              {qa.tags.map((tag) => (
                <Badge key={tag} variant="outline" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Troubleshooting Card Component
function TroubleshootingCard({ trouble, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      id={`trouble-${trouble.id}`}
    >
      <Card className="border-l-4 border-rose-500">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-5 w-5 text-rose-500" />
            <CardTitle>{trouble.title}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Badge variant="danger" size="sm">
              {trouble.category}
            </Badge>
            <Badge variant="outline" size="sm">
              {trouble.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Problem:</h4>
            <p className="text-gray-700 dark:text-gray-300">{trouble.problem}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Symptoms:</h4>
            <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
              {trouble.symptoms.map((symptom, i) => (
                <li key={i}>{symptom}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Possible Causes:</h4>
            <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
              {trouble.causes.map((cause, i) => (
                <li key={i}>{cause}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
              Solutions:
            </h4>
            <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300">
              {trouble.solutions.map((solution, i) => (
                <li key={i} className="pl-2">
                  {solution}
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
