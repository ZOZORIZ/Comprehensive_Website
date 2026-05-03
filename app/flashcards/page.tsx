'use client'

import { useState, useMemo } from 'react'
import { modules } from '@/lib/questions'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, RotateCcw, Shuffle } from 'lucide-react'

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function FlashcardsPage() {
  const [selectedModule, setSelectedModule] = useState<number | 'all'>('all')
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Memoize questions so they don't reshuffle on every render
  const allQuestions = useMemo(() => {
    let qs = []
    if (selectedModule === 'all') {
      modules.forEach((mod) => qs.push(...mod.questions))
    } else {
      qs.push(...modules[selectedModule].questions)
    }
    return shuffleArray(qs)
  }, [selectedModule])

  const handleNext = () => {
    if (currentIndex < allQuestions.length - 1) {
      setIsFlipped(false)
      // Slight delay so it doesn't flip while animating out
      setTimeout(() => setCurrentIndex((c) => c + 1), 150)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false)
      setTimeout(() => setCurrentIndex((c) => c - 1), 150)
    }
  }

  const q = allQuestions[currentIndex]

  if (!q) return null

  const correctOptionText = q.options[q.answer]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 py-8 px-4 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Exit Flashcards
          </Link>
          <div className="flex items-center gap-4">
            <select
              value={selectedModule}
              onChange={(e) => {
                setSelectedModule(e.target.value === 'all' ? 'all' : Number(e.target.value))
                setCurrentIndex(0)
                setIsFlipped(false)
              }}
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Modules</option>
              {modules.map((m, i) => (
                <option key={i} value={i}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Card {currentIndex + 1} of {allQuestions.length}
          </p>
        </div>

        {/* Flashcard Container */}
        <div className="relative w-full h-[400px] perspective-[1000px] mb-8 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + (isFlipped ? '-back' : '-front')}
              initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full"
            >
              <div className={`w-full h-full rounded-3xl shadow-xl p-8 sm:p-12 flex flex-col items-center justify-center text-center transition-colors border-2 ${
                isFlipped 
                  ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-700/50' 
                  : 'bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700'
              }`}>
                {!isFlipped ? (
                  <>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Question</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {q.q}
                    </h2>
                    {q.image && (
                      <div className="mt-6">
                        <img src={q.image} alt="diagram" className="max-h-32 rounded object-contain" />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-4">Answer</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                      {correctOptionText}
                    </h2>
                    {q.explanation && (
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-4 max-w-lg border-t border-indigo-200 dark:border-indigo-800 pt-4">
                        💡 {q.explanation}
                      </p>
                    )}
                  </>
                )}
                
                <div className="absolute bottom-6 text-gray-400 text-sm flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Click to flip
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-md disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          
          <button
            onClick={() => {
              setCurrentIndex(0)
              setIsFlipped(false)
            }}
            className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title="Restart / Shuffle"
          >
            <Shuffle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === allQuestions.length - 1}
            className="p-4 rounded-full bg-indigo-600 shadow-md disabled:opacity-50 hover:bg-indigo-700 transition-colors"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
