'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId } from './utils'
import { achievements as achievementsData } from '@/data/achievements'

const useStore = create(
  persist(
    (set, get) => ({
      // User ID
      userId: typeof window !== 'undefined' ? (localStorage.getItem('userId') || generateId()) : generateId(),
      
      // Hydration State
      _hasHydrated: false,
      
      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      
      // Font Size
      fontSize: '16px',
      setFontSize: (fontSize) => set({ fontSize }),
      
      // Accessibility Features
      bionicReading: false,
      setBionicReading: (enabled) => set({ bionicReading: enabled }),
      highContrast: false,
      setHighContrast: (enabled) => set({ highContrast: enabled }),
      dyslexiaFont: false,
      setDyslexiaFont: (enabled) => set({ dyslexiaFont: enabled }),
      
      // Bookmarks
      bookmarks: [],
      addBookmark: (bookmark) => set((state) => ({
        bookmarks: [...state.bookmarks, { ...bookmark, id: generateId(), createdAt: new Date().toISOString() }]
      })),
      removeBookmark: (id) => set((state) => ({
        bookmarks: state.bookmarks.filter(b => b.id !== id)
      })),
      
      // Search History
      searchHistory: [],
      addSearchHistory: (item) => set((state) => {
        const newHistory = [item, ...state.searchHistory.filter(h => h.title !== item.title)].slice(0, 10);
        return { searchHistory: newHistory };
      }),
      
      // Notes with enhanced features
      notes: {},
      addNote: (skillId, conceptId, note) => set((state) => ({
        notes: {
          ...state.notes,
          [`${skillId}-${conceptId}`]: {
            content: note,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: []
          }
        }
      })),
      updateNote: (skillId, conceptId, note, tags = []) => set((state) => ({
        notes: {
          ...state.notes,
          [`${skillId}-${conceptId}`]: {
            ...state.notes[`${skillId}-${conceptId}`],
            content: note,
            updatedAt: new Date().toISOString(),
            tags
          }
        }
      })),
      deleteNote: (skillId, conceptId) => set((state) => {
        const newNotes = { ...state.notes };
        delete newNotes[`${skillId}-${conceptId}`];
        return { notes: newNotes };
      }),
      
      // Flashcards
      flashcards: [],
      addFlashcard: (card) => set((state) => ({
        flashcards: [...state.flashcards, { ...card, id: generateId(), createdAt: new Date().toISOString(), lastReviewed: null, reviewCount: 0, confidence: 0 }]
      })),
      updateFlashcard: (id, updates) => set((state) => ({
        flashcards: state.flashcards.map(card => 
          card.id === id ? { ...card, ...updates, updatedAt: new Date().toISOString() } : card
        )
      })),
      reviewFlashcard: (id, confidence) => set((state) => ({
        flashcards: state.flashcards.map(card => 
          card.id === id ? { 
            ...card, 
            lastReviewed: new Date().toISOString(), 
            reviewCount: card.reviewCount + 1,
            confidence 
          } : card
        )
      })),
      deleteFlashcard: (id) => set((state) => ({
        flashcards: state.flashcards.filter(card => card.id !== id)
      })),
      
      // Learning Path Progress
      learningPath: 'beginner', // beginner, intermediate, advanced
      setLearningPath: (path) => set({ learningPath: path }),
      pathProgress: {
        beginner: { completed: [], current: null },
        intermediate: { completed: [], current: null },
        advanced: { completed: [], current: null }
      },
      updatePathProgress: (path, skillId, status) => set((state) => ({
        pathProgress: {
          ...state.pathProgress,
          [path]: {
            ...state.pathProgress[path],
            completed: status === 'completed' 
              ? [...state.pathProgress[path].completed, skillId]
              : state.pathProgress[path].completed,
            current: status === 'current' ? skillId : state.pathProgress[path].current
          }
        }
      })),
      
      // Learning Progress
      completedConcepts: [],
      completedSkills: [], // Array of completed skill slugs
      skillProgress: {}, // { skillSlug: percentage }
      updateSkillProgress: (skillSlug, percentage) => set((state) => ({
        skillProgress: {
          ...state.skillProgress,
          [skillSlug]: percentage
        },
        // Auto-add to completed if 100%
        completedSkills: percentage >= 100 && !state.completedSkills.includes(skillSlug)
          ? [...state.completedSkills, skillSlug]
          : state.completedSkills
      })),
      completedLessons: {}, // { skillSlug: completedCount }
      addCompletedConcept: (skillId, conceptId) => set((state) => {
        if (!state.completedConcepts.includes(`${skillId}-${conceptId}`)) {
          return {
            completedConcepts: [...state.completedConcepts, `${skillId}-${conceptId}`],
            lastActivityDate: new Date().toISOString()
          }
        }
        return state
      }),
      markLessonComplete: (skillSlug) => {
        // Update streak first
        get().updateStreak();
        
        // Add points for lesson completion
        get().addPoints(10);
        
        // Update lesson count
        set((state) => ({
          completedLessons: {
            ...state.completedLessons,
            [skillSlug]: (state.completedLessons[skillSlug] || 0) + 1
          }
        }));
        
        // Check for achievements
        get().checkAchievements();
      },
      
      // Points System
      totalPoints: 0,
      addPoints: (points) => {
        set((state) => ({
          totalPoints: state.totalPoints + points
        }));
        // Check for point-based achievements
        setTimeout(() => get().checkAchievements(), 100);
      },
      
      // Quiz Scores
      quizScores: {},
      addQuizScore: (skill, score) => {
        // Update streak
        get().updateStreak();
        
        // Store quiz score
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [skill]: score
          }
        }));
        
        // Check for quiz achievements
        get().checkAchievements();
      },
      
      // Challenge Scores
      challengeScores: [],
      addChallengeScore: (challengeId, score) => set((state) => {
        const existing = state.challengeScores.find(s => s.challengeId === challengeId)
        if (existing && score.score > existing.score) {
          return {
            challengeScores: state.challengeScores.map(s =>
              s.challengeId === challengeId ? { ...score, challengeId, completedAt: new Date().toISOString() } : s
            )
          }
        } else if (!existing) {
          return {
            challengeScores: [...state.challengeScores, { ...score, challengeId, completedAt: new Date().toISOString() }]
          }
        }
        return state
      }),
      
      // Streaks
      currentStreak: 0,
      longestStreak: 0,
      streak: 0, // Alias for currentStreak for compatibility
      lastActivityDate: null,
      lastActive: null, // Alias for lastActivityDate
      updateStreak: () => {
        const state = get();
        const today = new Date().toDateString();
        const lastActivity = state.lastActivityDate ? new Date(state.lastActivityDate).toDateString() : null;
        
        if (lastActivity === today) {
          return; // Already updated today
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        let newStreak = state.currentStreak;
        if (lastActivity === yesterdayStr) {
          newStreak = state.currentStreak + 1;
        } else if (!lastActivity) {
          newStreak = 1; // First time
        } else {
          newStreak = 1; // Streak broken
        }
        
        set({
          currentStreak: newStreak,
          streak: newStreak, // Update alias
          longestStreak: Math.max(newStreak, state.longestStreak),
          lastActivityDate: new Date().toISOString(),
          lastActive: new Date().toISOString()
        });
        
        // Check streak achievements
        setTimeout(() => get().checkAchievements(), 100);
      },
      
      // Achievements/Badges
      earnedBadges: [],
      get unlockedAchievements() {
        return get().earnedBadges;
      },
      get achievements() {
        return get().earnedBadges;
      },
      addBadge: (badge) => {
        const state = get();
        if (!state.earnedBadges.find(b => b.id === badge.id)) {
          set({
            earnedBadges: [...state.earnedBadges, { ...badge, earnedAt: new Date().toISOString() }]
          });
          
          // Award achievement points
          if (badge.points) {
            get().addPoints(badge.points);
          }
        }
      },
      
      // Achievement Checking System
      checkAchievements: () => {
        const state = get();
        const totalCompleted = Object.values(state.completedLessons).reduce((acc, val) => acc + val, 0);
        const quizCount = Object.keys(state.quizScores).length;
        const maxQuizScore = Math.max(...Object.values(state.quizScores), 0);
        
        achievementsData.forEach(achievement => {
          // Skip if already earned
          if (state.earnedBadges.find(b => b.id === achievement.id)) {
            return;
          }
          
          let unlocked = false;
          
          switch(achievement.type) {
            case 'lessons':
              unlocked = totalCompleted >= achievement.target;
              break;
              
            case 'points':
              unlocked = state.totalPoints >= achievement.target;
              break;
              
            case 'quiz':
              if (achievement.id === 'quiz-ace') {
                unlocked = maxQuizScore >= 100;
              } else if (achievement.id === 'quiz-master') {
                unlocked = quizCount >= achievement.target;
              }
              break;
              
            case 'streak':
              unlocked = state.currentStreak >= achievement.target;
              break;
              
            case 'skill':
              // Check if specific skill is completed
              const skillProgress = state.completedLessons[achievement.target] || 0;
              unlocked = skillProgress >= 100; // Assuming 100 lessons per skill
              break;
              
            case 'special':
              // Time-based achievements
              const hour = new Date().getHours();
              if (achievement.id === 'early-bird' && hour < 9) {
                unlocked = true;
              } else if (achievement.id === 'night-owl' && hour >= 22) {
                unlocked = true;
              }
              break;
          }
          
          if (unlocked) {
            get().addBadge(achievement);
          }
        });
      },
      },
      
      setHasHydrated: () => set({ _hasHydrated: true }),
    }),
    {
      name: 'devops-mastery-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    }
  )
)

export { useStore }
export default useStore
