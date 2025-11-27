'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Search, BookOpen, Clock, Star, Filter, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';
import Link from 'next/link';

export default function InterviewPrepPage() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const { bookmarks, addBookmark, removeBookmark } = useStore();

  // Load interview questions
  useEffect(() => {
    // Sample interview questions data structure
    const sampleQuestions = [
      {
        id: 'q1',
        skill: 'docker',
        question: 'What is the difference between a Docker image and a Docker container?',
        answer: 'A Docker image is a read-only template with instructions for creating a Docker container. It includes the application code, runtime, libraries, and dependencies. A container is a runnable instance of an image. When you run an image, Docker creates a container from it. Images are immutable, while containers have a writable layer on top of the image.',
        difficulty: 'junior',
        estimatedTime: '5 min',
        companies: ['Amazon', 'Google', 'Microsoft'],
        tags: ['containers', 'fundamentals'],
      },
      {
        id: 'q2',
        skill: 'kubernetes',
        question: 'Explain the concept of Kubernetes pods and why they are needed.',
        answer: 'A Pod is the smallest deployable unit in Kubernetes and represents a single instance of a running process. Pods can contain one or more containers that share storage, network, and specifications. They are needed because they provide a higher level of abstraction, allowing containers to share resources and communicate easily. Pods enable tight coupling of related containers while maintaining container isolation.',
        difficulty: 'mid',
        estimatedTime: '8 min',
        companies: ['Netflix', 'Uber', 'Spotify'],
        tags: ['orchestration', 'fundamentals'],
      },
      {
        id: 'q3',
        skill: 'terraform',
        question: 'What is Terraform state and why is it important?',
        answer: 'Terraform state is a file that maps your configuration to real-world resources. It keeps track of metadata and resource dependencies. State is crucial because it allows Terraform to know what infrastructure exists, calculate what changes are needed, and manage resource dependencies. It enables team collaboration through remote state backends and prevents conflicts through state locking.',
        difficulty: 'mid',
        estimatedTime: '10 min',
        companies: ['HashiCorp', 'AWS', 'Cloudflare'],
        tags: ['IaC', 'state-management'],
      },
      {
        id: 'q4',
        skill: 'jenkins',
        question: 'How would you secure Jenkins in a production environment?',
        answer: 'To secure Jenkins: 1) Enable security and configure authentication (LDAP, SAML, OAuth), 2) Implement proper authorization strategies (Matrix-based or Project-based), 3) Use credentials plugin for secrets, never hardcode, 4) Keep Jenkins and plugins updated, 5) Run Jenkins behind reverse proxy with HTTPS, 6) Limit Jenkins executors and use agents, 7) Implement audit logging, 8) Use CSRF protection, 9) Regular security scans, 10) Follow principle of least privilege.',
        difficulty: 'senior',
        estimatedTime: '15 min',
        companies: ['CloudBees', 'Red Hat', 'IBM'],
        tags: ['CI/CD', 'security'],
      },
      {
        id: 'q5',
        skill: 'aws',
        question: 'Explain the difference between Security Groups and NACLs in AWS.',
        answer: 'Security Groups operate at the instance level and act as virtual firewalls for EC2 instances. They are stateful (return traffic is automatically allowed) and support allow rules only. NACLs (Network Access Control Lists) operate at the subnet level, are stateless (return traffic must be explicitly allowed), and support both allow and deny rules. Security Groups evaluate all rules before deciding, while NACLs process rules in number order.',
        difficulty: 'mid',
        estimatedTime: '7 min',
        companies: ['Amazon', 'Capital One', 'Airbnb'],
        tags: ['cloud', 'networking', 'security'],
      },
      {
        id: 'q6',
        skill: 'docker',
        question: 'What are Docker multi-stage builds and when would you use them?',
        answer: 'Multi-stage builds allow you to use multiple FROM statements in a Dockerfile. Each FROM instruction starts a new build stage. You can selectively copy artifacts from one stage to another, leaving behind everything you don\'t need. This is useful for: 1) Reducing final image size by excluding build tools, 2) Separating build and runtime dependencies, 3) Creating different images for different environments, 4) Improving security by minimizing attack surface.',
        difficulty: 'mid',
        estimatedTime: '10 min',
        companies: ['Docker', 'GitLab', 'CircleCI'],
        tags: ['containers', 'optimization'],
      },
      {
        id: 'q7',
        skill: 'kubernetes',
        question: 'Describe Kubernetes deployment strategies and when to use each.',
        answer: 'Main strategies: 1) Rolling Update (default) - gradually replaces old pods, zero downtime, 2) Recreate - terminates all old pods before creating new ones, brief downtime, 3) Blue-Green - runs two identical environments, instant switch, 4) Canary - gradually shifts traffic to new version, monitors health, 5) A/B Testing - routes traffic based on rules for testing. Use rolling for standard updates, recreate for breaking changes, blue-green for critical apps, canary for risk mitigation, A/B for feature testing.',
        difficulty: 'senior',
        estimatedTime: '15 min',
        companies: ['Google', 'Microsoft', 'Red Hat'],
        tags: ['orchestration', 'deployment'],
      },
      {
        id: 'q8',
        skill: 'git',
        question: 'Explain Git rebase vs merge and when to use each.',
        answer: 'Git merge creates a new commit that combines two branches, preserving history. Rebase moves the entire feature branch to begin on the tip of the main branch, creating a linear history. Use merge for: public branches, maintaining complete history, collaborative features. Use rebase for: cleaning up local commits, maintaining linear history, feature branches before merging. Never rebase public/shared branches as it rewrites history.',
        difficulty: 'mid',
        estimatedTime: '8 min',
        companies: ['GitHub', 'GitLab', 'Atlassian'],
        tags: ['version-control', 'fundamentals'],
      },
      {
        id: 'q9',
        skill: 'prometheus',
        question: 'How does Prometheus scraping work and what are exporters?',
        answer: 'Prometheus uses a pull model where it actively scrapes metrics from configured targets at regular intervals. Targets expose metrics via HTTP endpoints (usually /metrics) in Prometheus format. Exporters are programs that collect metrics from systems that don\'t natively expose Prometheus metrics (databases, hardware, third-party APIs) and translate them into Prometheus format. Popular exporters include node_exporter (system metrics), postgres_exporter, blackbox_exporter (probing), and custom exporters.',
        difficulty: 'mid',
        estimatedTime: '10 min',
        companies: ['SoundCloud', 'Grafana Labs', 'CoreOS'],
        tags: ['monitoring', 'observability'],
      },
      {
        id: 'q10',
        skill: 'ansible',
        question: 'What is idempotency in Ansible and why is it important?',
        answer: 'Idempotency means that running an Ansible playbook multiple times produces the same result as running it once. It ensures that tasks only make changes when necessary. This is important because: 1) Prevents unintended state changes, 2) Makes playbooks safe to run repeatedly, 3) Enables easier troubleshooting and recovery, 4) Improves performance by skipping unnecessary operations. Ansible modules are designed to be idempotent by default, checking current state before making changes.',
        difficulty: 'mid',
        estimatedTime: '8 min',
        companies: ['Red Hat', 'Ansible', 'IBM'],
        tags: ['configuration-management', 'fundamentals'],
      },
    ];

    setQuestions(sampleQuestions);
    setFilteredQuestions(sampleQuestions);
  }, []);

  // Filter questions based on search and filters
  useEffect(() => {
    let filtered = questions;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Skill filter
    if (selectedSkill !== 'all') {
      filtered = filtered.filter((q) => q.skill === selectedSkill);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty);
    }

    // Company filter
    if (selectedCompany !== 'all') {
      filtered = filtered.filter((q) => q.companies.includes(selectedCompany));
    }

    setFilteredQuestions(filtered);
  }, [searchQuery, selectedSkill, selectedDifficulty, selectedCompany, questions]);

  const isBookmarked = (questionId) => {
    return bookmarks.some((b) => b.id === questionId && b.type === 'interview-question');
  };

  const toggleBookmark = (question) => {
    if (isBookmarked(question.id)) {
      const bookmark = bookmarks.find((b) => b.id === question.id && b.type === 'interview-question');
      removeBookmark(bookmark.id);
    } else {
      addBookmark({
        id: question.id,
        type: 'interview-question',
        skill: question.skill,
        title: question.question,
        url: `/interview#${question.id}`,
      });
    }
  };

  const difficultyColors = {
    junior: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
    mid: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
    senior: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20',
    staff: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  };

  const skillsWithQuestions = [...new Set(questions.map((q) => q.skill))];
  const companies = [...new Set(questions.flatMap((q) => q.companies))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 dark:from-amber-600 dark:via-amber-700 dark:to-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Interview Preparation
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Master your DevOps interviews with {questions.length}+ curated questions from top tech companies
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {questions.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Questions</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {skillsWithQuestions.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Skills Covered</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {companies.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Companies</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {bookmarks.filter((b) => b.type === 'interview-question').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bookmarked</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Skill Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skill
              </label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All Skills</option>
                {skillsWithQuestions.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            {/* Company Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company
              </label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All Companies</option>
                {companies.sort().map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredQuestions.length} of {questions.length} questions
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16">
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <div
              key={question.id}
              id={question.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Q{index + 1}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[question.difficulty]}`}>
                      {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                      {question.skill.charAt(0).toUpperCase() + question.skill.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {question.question}
                  </h3>
                </div>
                <button
                  onClick={() => toggleBookmark(question)}
                  className="ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={isBookmarked(question.id) ? 'Remove bookmark' : 'Add bookmark'}
                >
                  {isBookmarked(question.id) ? (
                    <BookmarkCheck className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Answer */}
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {question.answer}
                </p>
              </div>

              {/* Meta Information */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{question.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>Asked at: {question.companies.join(', ')}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No questions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
