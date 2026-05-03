'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { modules } from '@/lib/questions'
import { Download, Menu, X, Search, Star, BookOpen, Clock, Moon, Sun, ChevronDown, ChevronUp } from 'lucide-react'
import { jsPDF } from 'jspdf'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { useTheme } from 'next-themes'

export default function ExamQuestionsPage() {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false)
  const [expandedSummary, setExpandedSummary] = useState<number | null>(null)

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const { bookmarks, toggleBookmark, isBookmarked, lastStudyPosition, setStudyPosition } = useAppStore()

  useEffect(() => {
    setMounted(true)
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500)
    const removeTimer = setTimeout(() => setShowSplash(false), 2000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  // Filter modules based on search and bookmarks
  const filteredModules = useMemo(() => {
    return modules.map((mod, modIndex) => {
      const filteredQuestions = mod.questions.filter((q, qIndex) => {
        const id = `M${modIndex}-Q${qIndex}`
        const matchesSearch = q.q.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesBookmark = showOnlyBookmarked ? isBookmarked(id) : true
        return matchesSearch && matchesBookmark
      })
      return { ...mod, questions: filteredQuestions, originalIndex: modIndex }
    }).filter(mod => mod.questions.length > 0)
  }, [searchQuery, showOnlyBookmarked, bookmarks, isBookmarked])

  const generatePDF = () => {
    const doc = new jsPDF()
    let yPos = 20
    const lineHeight = 6
    const pageHeight = doc.internal.pageSize.height
    const marginBottom = 20

    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('Comprehensive Exam - MCQ Questions', 105, yPos, { align: 'center' })
    yPos += 12

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('All modules covered • Correct answers marked with ✓', 105, yPos, { align: 'center' })
    yPos += 12

    filteredModules.forEach((module) => {
      if (yPos > pageHeight - marginBottom) {
        doc.addPage()
        yPos = 20
      }

      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text(`${module.title}: ${module.subject}`, 14, yPos)
      yPos += 8

      module.questions.forEach((q, qIndex) => {
        const questionNum = qIndex + 1

        if (yPos > pageHeight - marginBottom - 35) {
          doc.addPage()
          yPos = 20
        }

        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        const diffTag = q.difficulty ? `[${q.difficulty}] ` : ''
        const questionLines = doc.splitTextToSize(`${questionNum}. ${diffTag}${q.q}`, 180)
        doc.text(questionLines, 14, yPos)
        yPos += questionLines.length * lineHeight

        doc.setFont('helvetica', 'normal')
        q.options.forEach((opt, optIndex) => {
          const isCorrect = optIndex === q.answer
          const prefix = ['A)', 'B)', 'C)', 'D)'][optIndex]

          if (isCorrect) {
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(0, 128, 0)
          } else {
            doc.setFont('helvetica', 'normal')
            doc.setTextColor(0, 0, 0)
          }

          const optionLines = doc.splitTextToSize(`${prefix} ${opt}${isCorrect ? ' ✓' : ''}`, 170)
          doc.text(optionLines, 20, yPos)
          yPos += optionLines.length * lineHeight
        })

        doc.setTextColor(0, 0, 0)

        if (q.explanation) {
          if (yPos > pageHeight - marginBottom - 15) {
            doc.addPage()
            yPos = 20
          }
          doc.setFontSize(8)
          doc.setFont('helvetica', 'italic')
          doc.setTextColor(150, 100, 0)
          const explanationLines = doc.splitTextToSize(`💡 ${q.explanation}`, 165)
          doc.text(explanationLines, 24, yPos)
          yPos += explanationLines.length * lineHeight
          doc.setTextColor(0, 0, 0)
        }
        yPos += 4
      })
      yPos += 6
    })

    doc.save('comprehensive-exam-questions.pdf')
  }

  // Find the exact question in the original array to scroll to it
  const scrollToLastPosition = () => {
    if (!lastStudyPosition) return
    const id = `question-M${lastStudyPosition.moduleIndex}-Q${lastStudyPosition.questionIndex}`
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('ring-4', 'ring-indigo-400', 'transition-all', 'duration-1000')
      setTimeout(() => el.classList.remove('ring-4', 'ring-indigo-400'), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 transition-colors duration-300">
      {/* Splash */}
      {showSplash && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-500 bg-white/80 dark:bg-black/80 backdrop-blur-sm ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`transition-transform duration-500 flex flex-col items-center justify-center ${fadeOut ? 'scale-75' : 'scale-100 animate-bounce'}`}>
            <img src="/jojo.png" alt="Jojo" className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-contain drop-shadow-2xl" />
            <span className="mt-6 text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400 tracking-widest animate-pulse">
              Load akuva...
            </span>
          </div>
        </div>
      )}

      {/* Floating Menu */}
      <div className="fixed top-4 right-4 z-40 flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5 text-gray-700 dark:text-gray-300" /> : <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
          </button>
        </div>

        {menuOpen && (
          <div className="w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <Link href="/practice" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors group" onClick={() => setMenuOpen(false)}>
              <span className="text-xl">📝</span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">Practice Quiz</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Timed exams & specific modules</p>
              </div>
            </Link>
            <div className="h-px bg-gray-100 dark:bg-gray-700" />
            <Link href="/flashcards" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors group" onClick={() => setMenuOpen(false)}>
              <span className="text-xl">🎴</span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">Flashcards</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Interactive quick review</p>
              </div>
            </Link>
            <div className="h-px bg-gray-100 dark:bg-gray-700" />
            <button
              onClick={() => {
                setShowOnlyBookmarked(true)
                setMenuOpen(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <span className="text-xl">⭐</span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">Bookmarked</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Review your saved questions</p>
              </div>
            </button>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl pt-20">

        {/* Resume Banner */}
        {mounted && lastStudyPosition && (
          <div className="mb-6 bg-indigo-600 rounded-xl shadow-md p-4 flex items-center justify-between text-white animate-in slide-in-from-top fade-in">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-indigo-200" />
              <div>
                <p className="text-sm font-medium">Welcome back!</p>
                <p className="text-xs text-indigo-200">You left off at Module {lastStudyPosition.moduleIndex + 1}, Question {lastStudyPosition.questionIndex + 1}</p>
              </div>
            </div>
            <button onClick={scrollToLastPosition} className="px-4 py-1.5 bg-white text-indigo-700 text-sm font-bold rounded-lg hover:bg-indigo-50 transition-colors">
              Resume
            </button>
          </div>
        )}

        {/* Header */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8 mb-8 border border-gray-100 dark:border-gray-800">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Comprehensive Exam Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            meow meow nigga. ith nee padicha nink full mark urapp!!!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search keywords (e.g. paging, BST)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
              />
            </div>
            <button
              onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${showOnlyBookmarked
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <Star className={`w-4 h-4 ${showOnlyBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              {showOnlyBookmarked ? 'Bookmarked' : 'All Questions'}
            </button>
          </div>

          <div className="flex items-center gap-4 flex-wrap pb-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total Questions: <strong className="text-gray-900 dark:text-white">{modules.reduce((sum, m) => sum + m.questions.length, 0)}</strong>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">•</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Modules: <strong className="text-gray-900 dark:text-white">{modules.length}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
            <Button onClick={generatePDF} size="lg" className="w-full sm:w-auto shrink-0">
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>

            <div className="flex flex-col items-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 self-start sm:self-end">Jump to:</span>
              <div className="flex flex-wrap gap-2 justify-start sm:justify-end w-full">
                {modules.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      document.getElementById(`module-${i}`)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 transition-colors border border-indigo-100 dark:border-indigo-800 shadow-sm"
                  >
                    {m.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Questions Display */}
        {filteredModules.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No questions found matching your criteria.
          </div>
        ) : (
          filteredModules.map((module) => {
            const isSummaryExpanded = expandedSummary === module.originalIndex

            return (
              <div id={`module-${module.originalIndex}`} key={module.originalIndex} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6 mb-6 border border-gray-100 dark:border-gray-800 scroll-mt-24">
                <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400">{module.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">{module.subject}</p>

                  {/* Collapsible Summary */}
                  <div className="mt-4">
                    <button
                      onClick={() => setExpandedSummary(isSummaryExpanded ? null : module.originalIndex)}
                      className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      {isSummaryExpanded ? 'Hide Module Summary' : 'View Module Summary'}
                      {isSummaryExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {isSummaryExpanded && (
                      <div className="mt-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-sm text-indigo-900 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-800/50">
                        <strong>Key Concepts:</strong> {module.summary}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  {module.questions.map((q, filteredQIndex) => {
                    // Find original index for ID
                    const originalQIndex = modules[module.originalIndex].questions.findIndex(oq => oq.q === q.q)
                    const id = `M${module.originalIndex}-Q${originalQIndex}`
                    const domId = `question-${id}`
                    const bookmarked = mounted ? isBookmarked(id) : false

                    return (
                      <div
                        id={domId}
                        key={id}
                        className="border-l-4 border-indigo-200 dark:border-indigo-800 pl-4 relative group"
                        onMouseEnter={() => setStudyPosition(module.originalIndex, originalQIndex)}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <p className="font-semibold text-gray-900 dark:text-gray-100 flex-1 mt-1">
                            {originalQIndex + 1}. {q.q}
                          </p>
                          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                            {q.difficulty && (
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${q.difficulty === 'Easy'
                                ? 'bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                                : 'bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                                }`}>
                                {q.difficulty}
                              </span>
                            )}
                            <button
                              onClick={() => toggleBookmark(id)}
                              className={`p-1.5 rounded-md transition-colors border ${bookmarked
                                  ? 'bg-amber-50 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:border-amber-700 dark:hover:bg-amber-900/50'
                                  : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
                                }`}
                              title={bookmarked ? "Remove Bookmark" : "Bookmark Question"}
                            >
                              <Star className={`w-4 h-4 ${bookmarked ? 'fill-amber-500 text-amber-500' : 'text-gray-400 dark:text-gray-500'}`} />
                            </button>
                          </div>
                        </div>
                        {q.image && (
                          <div className="my-3 ml-0 sm:ml-4">
                            <img
                              src={q.image}
                              alt="Question diagram"
                              className="w-full max-w-[280px] sm:max-w-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mx-auto sm:mx-0 dark:brightness-90"
                            />
                          </div>
                        )}
                        <div className="space-y-2 ml-0 sm:ml-4">
                          {q.options.map((opt, optIndex) => {
                            const isCorrect = optIndex === q.answer
                            const label = ['A', 'B', 'C', 'D'][optIndex]
                            return (
                              <div
                                key={optIndex}
                                className={`flex items-start gap-2 p-2 rounded ${isCorrect
                                  ? 'bg-green-50 border border-green-300 dark:bg-green-900/20 dark:border-green-800'
                                  : 'bg-gray-50 dark:bg-gray-800/50 dark:border-transparent'
                                  }`}
                              >
                                <span className={`font-semibold min-w-[24px] ${isCorrect ? 'text-green-800 dark:text-green-400' : 'text-gray-700 dark:text-gray-400'}`}>
                                  {label})
                                </span>
                                <span
                                  className={`flex-1 ${isCorrect
                                    ? 'text-green-900 dark:text-green-300 font-medium'
                                    : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                  {opt}
                                  {isCorrect && (
                                    <span className="ml-2 text-green-600 dark:text-green-400 font-bold">
                                      ✓
                                    </span>
                                  )}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                        {q.explanation && (
                          <div className="mt-3 ml-0 sm:ml-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg">
                            <p className="text-sm text-amber-900 dark:text-amber-200">
                              <span className="font-semibold">💡 Explanation:</span>{' '}
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div >
            )
          })
        )}

        {/* Footer */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 text-center border border-indigo-100 dark:border-indigo-800/50">
          <p className="text-gray-600 dark:text-gray-400">
            made by claude opus 4.7 :D
          </p>
        </div>
      </div >
    </div >
  )
}
