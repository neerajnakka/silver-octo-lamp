'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/lib/store';
import { dockerQuiz } from '@/data/quizzes/docker-quiz';

const quizData = {
  docker: dockerQuiz,
};

export default function QuizPage({ params }) {
  const { skill } = use(params);
  const quiz = quizData[skill];
  const router = useRouter();
  const { addQuizScore, addPoints } = useStore();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit * 60 || 900);

  useEffect(() => {
    if (!quiz) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz not found</h2>
          <Button onClick={() => router.push('/skills')}>Back to Skills</Button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    setAnswers([...answers, selectedAnswer]);
    setSelectedAnswer(null);
    
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleFinish = () => {
    const finalAnswers = selectedAnswer !== null ? [...answers, selectedAnswer] : answers;
    const score = calculateScore(finalAnswers);
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    // Add quiz score (this now also calls updateStreak and checkAchievements internally)
    addQuizScore(skill, percentage);
    
    // Add points for correct answers
    addPoints(score * 10);
    
    setShowResults(true);
  };

  const calculateScore = (userAnswers) => {
    return quiz.questions.reduce((score, question, index) => {
      return score + (question.correctAnswer === userAnswers[index] ? 1 : 0);
    }, 0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const finalAnswers = [...answers];
    const score = calculateScore(finalAnswers);
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const passed = percentage >= quiz.passingScore;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center">
              <CardContent className="p-12">
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  passed ? 'bg-green-100 dark:bg-green-900/20' : 'bg-rose-100 dark:bg-rose-900/20'
                }`}>
                  {passed ? (
                    <Trophy className="h-12 w-12 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-12 w-12 text-rose-600 dark:text-rose-400" />
                  )}
                </div>

                <h2 className="text-4xl font-bold mb-4">
                  {passed ? 'Congratulations!' : 'Keep Learning!'}
                </h2>

                <div className="text-6xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-teal-500 bg-clip-text text-transparent">
                  {percentage}%
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  You scored {score} out of {quiz.questions.length} questions correctly
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {score}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Correct
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                      {quiz.questions.length - score}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Incorrect
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => router.push(`/skills/${skill}`)}
                    className="w-full"
                  >
                    Back to Lessons
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.location.reload()}
                    className="w-full"
                  >
                    Retake Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Review Answers */}
            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold">Review Answers</h3>
              {quiz.questions.map((q, index) => {
                const userAnswer = finalAnswers[index];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <Card key={q.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">
                          {index + 1}. {q.question}
                        </CardTitle>
                        {isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-6 w-6 text-rose-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        {q.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-3 rounded-lg border-2 ${
                              optIndex === q.correctAnswer
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : optIndex === userAnswer
                                ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{quiz.description}</p>
            </div>
            <Badge variant={timeLeft < 60 ? 'danger' : 'outline'} className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Progress
                value={currentQuestion + 1}
                max={quiz.questions.length}
                className="h-2"
              />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {currentQuestion + 1} / {quiz.questions.length}
            </span>
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">Question {currentQuestion + 1}</Badge>
                  <Badge variant="outline">{question.points} points</Badge>
                </div>
                <CardTitle className="text-2xl">{question.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index
                            ? 'border-amber-500 bg-amber-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedAnswer === index && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={selectedAnswer === null}
            >
              Finish Quiz
              <Trophy className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={selectedAnswer === null}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
