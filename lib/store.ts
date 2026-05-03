import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type QuizStats = {
  highestScore: number
  totalAttempted: number
  totalCorrect: number
}

interface AppState {
  bookmarks: string[]
  toggleBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
  
  lastStudyPosition: { moduleIndex: number; questionIndex: number } | null
  setStudyPosition: (moduleIndex: number, questionIndex: number) => void
  
  quizStats: Record<string, QuizStats>
  updateQuizStats: (mode: string, score: number, total: number) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(id)
            ? state.bookmarks.filter((b) => b !== id)
            : [...state.bookmarks, id],
        })),
      isBookmarked: (id) => get().bookmarks.includes(id),

      lastStudyPosition: null,
      setStudyPosition: (moduleIndex, questionIndex) =>
        set({ lastStudyPosition: { moduleIndex, questionIndex } }),

      quizStats: {},
      updateQuizStats: (mode, score, total) =>
        set((state) => {
          const current = state.quizStats[mode] || {
            highestScore: 0,
            totalAttempted: 0,
            totalCorrect: 0,
          }
          return {
            quizStats: {
              ...state.quizStats,
              [mode]: {
                highestScore: Math.max(current.highestScore, score),
                totalAttempted: current.totalAttempted + total,
                totalCorrect: current.totalCorrect + score,
              },
            },
          }
        }),
    }),
    {
      name: 'comprehensive-exam-storage',
    }
  )
)
