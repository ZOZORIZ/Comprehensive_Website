'use client'

import { useState, useMemo, useEffect } from 'react'
import { modules, Question } from '@/lib/questions'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useAppStore } from '@/lib/store'
import { Clock, Play, AlertCircle, RefreshCcw } from 'lucide-react'

type QuizQuestion = Question & {
  moduleTitle: string
  moduleSubject: string
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function PracticePage() {
  // Configuration State
  const [hasStarted, setHasStarted] = useState(false)
  const [selectedModule, setSelectedModule] = useState<number | 'all'>('all')
  const [hardModeOnly, setHardModeOnly] = useState(false)
  const [useTimer, setUseTimer] = useState(true)

  // Quiz State
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(false)
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 mins
  
  const [history, setHistory] = useState<
    { correct: boolean; question: string; yourAnswer: string; correctAnswer: string; moduleTitle: string }[]
  >([])

  const { updateQuizStats } = useAppStore()

  // Setup Quiz
  const startQuiz = () => {
    let pool: QuizQuestion[] = []
    
    if (selectedModule === 'all') {
      modules.forEach((mod) => {
        let qs = mod.questions
        if (hardModeOnly) qs = qs.filter(q => q.difficulty === 'Hard')
        
        const tagged = qs.map((q) => ({ ...q, moduleTitle: mod.title, moduleSubject: mod.subject }))
        const shuffled = shuffleArray(tagged)
        // Take 10 per module if 'all', else take all available
        pool.push(...shuffled.slice(0, Math.min(10, shuffled.length)))
      })
    } else {
      let qs = modules[selectedModule].questions
      if (hardModeOnly) qs = qs.filter(q => q.difficulty === 'Hard')
      pool = qs.map((q) => ({ ...q, moduleTitle: modules[selectedModule].title, moduleSubject: modules[selectedModule].subject }))
    }

    const finalQuestions = shuffleArray(pool).slice(0, 50) // Max 50 questions
    
    if (finalQuestions.length === 0) {
      alert("No questions found for this configuration!")
      return
    }

    setQuestions(finalQuestions)
    setTimeLeft(useTimer ? 30 * 60 : 0)
    setHasStarted(true)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setAnswered(false)
    setFinished(false)
    setHistory([])
  }

  // Timer Effect
  useEffect(() => {
    if (hasStarted && !finished && useTimer && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
      return () => clearInterval(timer)
    } else if (hasStarted && !finished && useTimer && timeLeft === 0) {
      handleFinish()
    }
  }, [hasStarted, finished, useTimer, timeLeft])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const handleSelect = (optIndex: number) => {
    if (answered) return
    setSelected(optIndex)
    setAnswered(true)

    const q = questions[current]
    const isCorrect = optIndex === q.answer
    if (isCorrect) setScore((s) => s + 1)

    setHistory((h) => [
      ...h,
      {
        correct: isCorrect,
        question: q.q,
        yourAnswer: q.options[optIndex],
        correctAnswer: q.options[q.answer],
        moduleTitle: q.moduleTitle,
      },
    ])
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      handleFinish()
      return
    }
    setCurrent((c) => c + 1)
    setSelected(null)
    setAnswered(false)
  }

  const handleFinish = () => {
    setFinished(true)
    const modeName = selectedModule === 'all' 
      ? (hardModeOnly ? 'All Modules (Hard)' : 'All Modules (Mixed)') 
      : modules[selectedModule as number].title
      
    updateQuizStats(modeName, score + (answered && selected === questions[current].answer ? 1 : 0), questions.length)
    
    const finalScore = score + (answered && selected === questions[current].answer ? 1 : 0)
    if (finalScore === questions.length && questions.length > 0) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#10b981', '#f59e0b']
      })
    }
  }

  // --- Pre-Quiz Configuration Screen ---
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 py-12 px-4 transition-colors">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
          <Link href="/" className="inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6">
            ← Back to Material
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Setup</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Configure your practice session to target specific weak points or simulate a full exam.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject Scope</label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Mix of All Modules (50 Qs max)</option>
                {modules.map((m, i) => (
                  <option key={i} value={i}>{m.title}: {m.subject}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Hard Mode Only</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Filter out easy questions</p>
              </div>
              <button 
                onClick={() => setHardModeOnly(!hardModeOnly)}
                className={`w-12 h-6 rounded-full transition-colors relative ${hardModeOnly ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${hardModeOnly ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">30-Minute Timer</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Simulate exam conditions</p>
              </div>
              <button 
                onClick={() => setUseTimer(!useTimer)}
                className={`w-12 h-6 rounded-full transition-colors relative ${useTimer ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${useTimer ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <button
              onClick={startQuiz}
              className="w-full py-4 mt-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" /> Start Practice
            </button>
          </div>
        </div>
      </div>
    )
  }

  const total = questions.length

  // --- Finished Screen ---
  if (finished) {
    const pct = Math.round((score / total) * 100)
    let emoji = '😢'
    let message = "Keep studying, you'll get there!"
    let color = 'text-red-600 dark:text-red-400'

    if (pct >= 90) {
      emoji = '🏆'
      message = 'Outstanding! You really know your stuff!'
      color = 'text-green-600 dark:text-green-400'
    } else if (pct >= 75) {
      emoji = '🎉'
      message = 'Great job! Almost perfect!'
      color = 'text-green-500 dark:text-green-400'
    } else if (pct >= 60) {
      emoji = '👍'
      message = 'Good effort! A bit more review will help.'
      color = 'text-yellow-600 dark:text-yellow-400'
    } else if (pct >= 40) {
      emoji = '📖'
      message = 'Not bad, but definitely revise the weak modules.'
      color = 'text-orange-500 dark:text-orange-400'
    }

    // Weakness Analysis
    const moduleStats: Record<string, { correct: number, total: number }> = {}
    history.forEach(h => {
      if (!moduleStats[h.moduleTitle]) moduleStats[h.moduleTitle] = { correct: 0, total: 0 }
      moduleStats[h.moduleTitle].total++
      if (h.correct) moduleStats[h.moduleTitle].correct++
    })

    const weakModules = Object.entries(moduleStats)
      .map(([title, stats]) => ({ title, pct: stats.correct / stats.total }))
      .filter(m => m.pct < 0.6)
      .sort((a, b) => a.pct - b.pct)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 py-8 px-4 transition-colors">
        <div className="max-w-2xl mx-auto">
          {/* Score Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center mb-8 border border-gray-100 dark:border-gray-800">
            <div className="text-6xl mb-4">{emoji}</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h1>
            <p className={`text-lg font-semibold mb-4 ${color}`}>{message}</p>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-6 inline-block border border-gray-100 dark:border-gray-700">
              <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{score}/{total}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">({pct}%)</div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-100 dark:border-green-800/50">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</div>
                <div className="text-xs text-green-700 dark:text-green-300">Correct</div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-100 dark:border-red-800/50">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{total - score}</div>
                <div className="text-xs text-red-700 dark:text-red-300">Wrong</div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800/50">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{total}</div>
                <div className="text-xs text-indigo-700 dark:text-indigo-300">Total</div>
              </div>
            </div>

            {weakModules.length > 0 && (
              <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-xl text-left">
                <h3 className="font-bold text-orange-800 dark:text-orange-300 flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5" /> Area for Improvement
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-200 mb-2">You scored below 60% in the following modules. Consider reviewing them:</p>
                <ul className="list-disc list-inside text-sm text-orange-700 dark:text-orange-200 font-medium">
                  {weakModules.map(m => (
                    <li key={m.title}>{m.title} ({Math.round(m.pct * 100)}%)</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setHasStarted(false)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" /> New Quiz
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
              >
                ← Home
              </Link>
            </div>
          </div>

          {/* Review Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Review Your Answers</h2>
            <div className="space-y-3">
              {history.map((item, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    item.correct
                      ? 'bg-green-50 border-green-400 dark:bg-green-900/10 dark:border-green-600'
                      : 'bg-red-50 border-red-400 dark:bg-red-900/10 dark:border-red-600'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-bold mt-0.5">
                      {item.correct ? '✅' : '❌'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200 break-words">
                        Q{i + 1}. {item.question}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.moduleTitle}</p>
                      {!item.correct && (
                        <div className="mt-1 text-xs">
                          <span className="text-red-600 dark:text-red-400 font-semibold block sm:inline">Your answer: {item.yourAnswer}</span>
                          <span className="hidden sm:inline mx-1 text-gray-400">•</span>
                          <span className="text-green-600 dark:text-green-400 font-semibold block sm:inline mt-1 sm:mt-0">Correct: {item.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- Quiz Screen ---
  const q = questions[current]
  const progress = ((current + (answered ? 1 : 0)) / total) * 100
  const labels = ['A', 'B', 'C', 'D']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 py-6 px-4 transition-colors">
      <div className="max-w-2xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setHasStarted(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm font-medium">
            ← Quit
          </button>
          
          {useTimer && (
            <div className={`flex items-center gap-1.5 font-mono text-sm font-bold px-3 py-1 rounded-full ${timeLeft < 60 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
              <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
            </div>
          )}

          <div className="text-sm font-semibold text-green-600 dark:text-green-400">
            Score: {score}
          </div>
        </div>

        {/* Progress Bar & Question Tracker */}
        <div className="mb-6">
           <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            <span>Question {current + 1} of {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card with Framer Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-100 dark:border-gray-800"
          >
            {/* Module Tag */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {q.moduleTitle}
              </span>
              {q.difficulty && (
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    q.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}
                >
                  {q.difficulty}
                </span>
              )}
            </div>

            {/* Question */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 leading-relaxed">
              {q.q}
            </h2>

            {/* Image */}
            {q.image && (
              <div className="my-4">
                <img
                  src={q.image}
                  alt="Question diagram"
                  className="w-full max-w-[280px] sm:max-w-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mx-auto dark:brightness-90"
                />
              </div>
            )}

            {/* Options */}
            <div className="space-y-3 mt-6">
              {q.options.map((opt, optIndex) => {
                let optClass =
                  'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer'

                if (answered) {
                  if (optIndex === q.answer) {
                    optClass = 'bg-green-50 border-green-400 ring-2 ring-green-300 dark:bg-green-900/20 dark:border-green-700 dark:ring-green-800/50'
                  } else if (optIndex === selected && selected !== q.answer) {
                    optClass = 'bg-red-50 border-red-400 ring-2 ring-red-300 dark:bg-red-900/20 dark:border-red-700 dark:ring-red-800/50'
                  } else {
                    optClass = 'bg-gray-50 border-gray-200 dark:bg-gray-800/30 dark:border-gray-800 opacity-50'
                  }
                }

                return (
                  <button
                    key={optIndex}
                    onClick={() => handleSelect(optIndex)}
                    disabled={answered}
                    className={`w-full flex items-start gap-3 p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 ${optClass}`}
                  >
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        answered && optIndex === q.answer
                          ? 'bg-green-500 text-white border-transparent'
                          : answered && optIndex === selected && selected !== q.answer
                          ? 'bg-red-500 text-white border-transparent'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {labels[optIndex]}
                    </span>
                    <span className={`flex-1 text-sm sm:text-base pt-1 ${
                       answered && optIndex === q.answer ? 'text-green-900 dark:text-green-100 font-medium' :
                       answered && optIndex === selected ? 'text-red-900 dark:text-red-100 font-medium' :
                       'text-gray-800 dark:text-gray-200'
                    }`}>
                      {opt}
                    </span>
                    {answered && optIndex === q.answer && (
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg flex-shrink-0">✓</span>
                    )}
                    {answered && optIndex === selected && selected !== q.answer && (
                      <span className="text-red-600 dark:text-red-400 font-bold text-lg flex-shrink-0">✗</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {answered && q.explanation && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-xl">
                    <p className="text-sm text-amber-900 dark:text-amber-200">
                      <span className="font-semibold block mb-1">💡 Explanation:</span> {q.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        {answered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl active:scale-95 transform"
            >
              {current + 1 >= total ? '🎯 Finish & See Results' : 'Next Question →'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
