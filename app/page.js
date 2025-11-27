'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, BookOpen, Trophy, BarChart3, Search,
  Zap, Shield, Code, Terminal, CheckCircle, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: BookOpen,
    title: '1300+ Concepts',
    description: 'Comprehensive coverage of DevOps concepts across 13 skills',
    color: 'text-amber-500',
  },
  {
    icon: Terminal,
    title: '1300+ Commands',
    description: 'Real-world commands with examples and best practices',
    color: 'text-teal-500',
  },
  {
    icon: Search,
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with 975+ quiz questions',
    color: 'text-blue-500',
  },
  {
    icon: Shield,
    title: '390+ Troubleshooting',
    description: 'Real-world scenarios with detailed solutions',
    color: 'text-rose-500',
  },
  {
    icon: Trophy,
    title: 'Achievements System',
    description: 'Earn badges and track your progress',
    color: 'text-purple-500',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Visualize your learning journey with detailed analytics',
    color: 'text-green-500',
  },
];

const stats = [
  { label: 'Skills', value: '13' },
  { label: 'Concepts', value: '1300+' },
  { label: 'Commands', value: '1300+' },
  { label: 'Q&A', value: '975+' },
];

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'DevOps Engineer',
    content: 'This platform helped me transition from development to DevOps in just 3 months. The hands-on approach is exactly what I needed.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Cloud Architect',
    content: 'The comprehensive coverage and real-world scenarios make this the best DevOps learning resource I\'ve found.',
    rating: 5,
  },
  {
    name: 'Michael Park',
    role: 'Site Reliability Engineer',
    content: 'Excellent platform for both beginners and experienced professionals. The troubleshooting section is particularly valuable.',
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-teal-50 to-rose-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 -z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex mb-6"
            >
              <Badge variant="primary" className="px-4 py-2 text-sm">
                <Zap className="h-4 w-4 mr-2" />
                Master DevOps Skills Faster 🚀
              </Badge>
            </motion.div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              Master DevOps,
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-teal-500 to-rose-500 bg-clip-text text-transparent">
                One Skill at a Time
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Comprehensive learning platform with 1300+ concepts, interactive quizzes,
              real-world troubleshooting scenarios, and progress tracking across 13 essential DevOps skills.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/skills">
                <Button size="lg" variant="primary" className="group">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-teal-500 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Everything You Need to Master DevOps
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools and resources to accelerate your DevOps learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-3 rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 ${feature.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Loved by DevOps Professionals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join thousands of engineers advancing their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-amber-500 via-teal-500 to-rose-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Level Up Your DevOps Skills?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start your journey today with our comprehensive learning platform
            </p>
            <Link href="/skills">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
