'use client'

import { useState, useMemo, useEffect } from 'react'
import { modules, Question } from '@/lib/questions'
import Link from 'next/link'

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

function pickQuestions(): QuizQuestion[] {
  const perModule = 10
  const picked: QuizQuestion[] = []

  modules.forEach((mod) => {
    const tagged: QuizQuestion[] = mod.questions.map((q) => ({
      ...q,
      moduleTitle: mod.title,
      moduleSubject: mod.subject,
    }))
    const shuffled = shuffleArray(tagged)
    const count = Math.min(perModule, shuffled.length)
    picked.push(...shuffled.slice(0, count))
  })

  return shuffleArray(picked)
}

export default function PracticePage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(false)
  const [history, setHistory] = useState<
    { correct: boolean; question: string; yourAnswer: string; correctAnswer: string; module: string }[]
  >([])

  // Pick questions once on mount
  useEffect(() => {
    setQuestions(pickQuestions())
  }, [])

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-pulse text-xl text-indigo-600 font-semibold">Loading quiz...</div>
      </div>
    )
  }

  const q = questions[current]
  const total = questions.length
  const progress = ((current + (answered ? 1 : 0)) / total) * 100

  const handleSelect = (optIndex: number) => {
    if (answered) return
    setSelected(optIndex)
    setAnswered(true)

    const isCorrect = optIndex === q.answer
    if (isCorrect) setScore((s) => s + 1)

    setHistory((h) => [
      ...h,
      {
        correct: isCorrect,
        question: q.q,
        yourAnswer: q.options[optIndex],
        correctAnswer: q.options[q.answer],
        module: q.moduleTitle,
      },
    ])
  }

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true)
      return
    }
    setCurrent((c) => c + 1)
    setSelected(null)
    setAnswered(false)
  }

  const handleRestart = () => {
    setQuestions(pickQuestions())
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setAnswered(false)
    setFinished(false)
    setHistory([])
  }

  // --- Finished Screen ---
  if (finished) {
    const pct = Math.round((score / total) * 100)
    let emoji = '😢'
    let message = "Keep studying, you'll get there!"
    let color = 'text-red-600'

    if (pct >= 90) {
      emoji = '🏆'
      message = 'Outstanding! You really know your stuff!'
      color = 'text-green-600'
    } else if (pct >= 75) {
      emoji = '🎉'
      message = 'Great job! Almost perfect!'
      color = 'text-green-500'
    } else if (pct >= 60) {
      emoji = '👍'
      message = 'Good effort! A bit more review will help.'
      color = 'text-yellow-600'
    } else if (pct >= 40) {
      emoji = '📖'
      message = 'Not bad, but definitely revise the weak modules.'
      color = 'text-orange-500'
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Score Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8">
            <div className="text-6xl mb-4">{emoji}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
            <p className={`text-lg font-semibold mb-4 ${color}`}>{message}</p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6 inline-block">
              <div className="text-5xl font-bold text-indigo-600 mb-1">{score}/{total}</div>
              <div className="text-gray-500 text-sm">({pct}%)</div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-xs text-green-700">Correct</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-600">{total - score}</div>
                <div className="text-xs text-red-700">Wrong</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-indigo-600">{total}</div>
                <div className="text-xs text-indigo-700">Total</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                🔄 Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
              >
                ← Back to Study Material
              </Link>
            </div>
          </div>

          {/* Review Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Review Your Answers</h2>
            <div className="space-y-3">
              {history.map((item, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border-l-4 ${
                    item.correct
                      ? 'bg-green-50 border-green-400'
                      : 'bg-red-50 border-red-400'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-bold mt-0.5">
                      {item.correct ? '✅' : '❌'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 break-words">
                        Q{i + 1}. {item.question}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.module}</p>
                      {!item.correct && (
                        <div className="mt-1 text-xs">
                          <span className="text-red-600">Your answer: {item.yourAnswer}</span>
                          <span className="mx-1">•</span>
                          <span className="text-green-600">Correct: {item.correctAnswer}</span>
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
  const labels = ['A', 'B', 'C', 'D']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors text-sm">
            ← Exit Quiz
          </Link>
          <div className="text-sm text-gray-600 font-medium">
            Question <span className="text-indigo-600 font-bold">{current + 1}</span> / {total}
          </div>
          <div className="text-sm font-semibold text-green-600">
            Score: {score}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          {/* Module Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
              {q.moduleTitle}
            </span>
            {q.difficulty && (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                  q.difficulty === 'Easy'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {q.difficulty}
              </span>
            )}
          </div>

          {/* Question */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-relaxed">
            {q.q}
          </h2>

          {/* Image */}
          {q.image && (
            <div className="my-4">
              <img
                src={q.image}
                alt="Question diagram"
                className="w-full max-w-[280px] sm:max-w-sm rounded-lg border border-gray-200 shadow-sm mx-auto"
              />
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 mt-6">
            {q.options.map((opt, optIndex) => {
              let optClass =
                'bg-gray-50 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer'

              if (answered) {
                if (optIndex === q.answer) {
                  // Correct answer — always green
                  optClass = 'bg-green-50 border-green-400 ring-2 ring-green-300'
                } else if (optIndex === selected && selected !== q.answer) {
                  // User's wrong selection — red
                  optClass = 'bg-red-50 border-red-400 ring-2 ring-red-300'
                } else {
                  optClass = 'bg-gray-50 border-gray-200 opacity-60'
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
                        ? 'bg-green-500 text-white'
                        : answered && optIndex === selected && selected !== q.answer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {labels[optIndex]}
                  </span>
                  <span className="flex-1 text-sm sm:text-base text-gray-800 pt-1">
                    {opt}
                  </span>
                  {answered && optIndex === q.answer && (
                    <span className="text-green-600 font-bold text-lg flex-shrink-0">✓</span>
                  )}
                  {answered && optIndex === selected && selected !== q.answer && (
                    <span className="text-red-600 font-bold text-lg flex-shrink-0">✗</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Explanation after answering */}
          {answered && q.explanation && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-900">
                <span className="font-semibold">💡 Explanation:</span> {q.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {answered && (
          <div className="text-center">
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl active:scale-95 transform transition-transform"
            >
              {current + 1 >= total ? '🎯 See Results' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
