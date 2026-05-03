'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { modules } from '@/lib/questions'
import { Download } from 'lucide-react'
import { jsPDF } from 'jspdf'

export default function ExamQuestionsPage() {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500)
    const removeTimer = setTimeout(() => setShowSplash(false), 2000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  const generatePDF = () => {
    const doc = new jsPDF()
    let yPos = 20
    const lineHeight = 6
    const pageHeight = doc.internal.pageSize.height
    const marginBottom = 20

    // Title
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('Comprehensive Exam - MCQ Questions', 105, yPos, { align: 'center' })
    yPos += 12

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('All modules covered • Correct answers marked with ✓', 105, yPos, { align: 'center' })
    yPos += 12

    modules.forEach((module, modIndex) => {
      // Module header
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

        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 35) {
          doc.addPage()
          yPos = 20
        }

        // Question text
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        const diffTag = q.difficulty ? `[${q.difficulty}] ` : ''
        const questionLines = doc.splitTextToSize(
          `${questionNum}. ${diffTag}${q.q}`,
          180
        )
        doc.text(questionLines, 14, yPos)
        yPos += questionLines.length * lineHeight

        // Options
        doc.setFont('helvetica', 'normal')
        q.options.forEach((opt, optIndex) => {
          const isCorrect = optIndex === q.answer
          const prefix = ['A)', 'B)', 'C)', 'D)'][optIndex]

          if (isCorrect) {
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(0, 128, 0) // Green
          } else {
            doc.setFont('helvetica', 'normal')
            doc.setTextColor(0, 0, 0) // Black
          }

          const optionLines = doc.splitTextToSize(
            `${prefix} ${opt}${isCorrect ? ' ✓' : ''}`,
            170
          )
          doc.text(optionLines, 20, yPos)
          yPos += optionLines.length * lineHeight
        })

        doc.setTextColor(0, 0, 0)

        // Explanation
        if (q.explanation) {
          if (yPos > pageHeight - marginBottom - 15) {
            doc.addPage()
            yPos = 20
          }
          doc.setFontSize(8)
          doc.setFont('helvetica', 'italic')
          doc.setTextColor(150, 100, 0)
          const explanationLines = doc.splitTextToSize(
            `💡 ${q.explanation}`,
            165
          )
          doc.text(explanationLines, 24, yPos)
          yPos += explanationLines.length * lineHeight
          doc.setTextColor(0, 0, 0)
        }

        yPos += 4 // Space between questions
      })

      yPos += 6 // Space between modules
    })

    doc.save('comprehensive-exam-questions.pdf')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Jojo Splash Overlay */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className={`transition-transform duration-500 ${fadeOut ? 'scale-75' : 'scale-100 animate-bounce'}`}>
            <img
              src="/jojo.png"
              alt="Jojo"
              className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Comprehensive Exam Questions
          </h1>
          <p className="text-gray-600 mb-4">
            meow meow nigga. ith nee padicha full mark urapp. Correct answers are marked inline with a green checkmark.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-sm text-gray-500">
              Total Questions: <strong className="text-gray-900">{modules.reduce((sum, m) => sum + m.questions.length, 0)}</strong>
            </div>
            <div className="text-sm text-gray-500">•</div>
            <div className="text-sm text-gray-500">
              Modules: <strong className="text-gray-900">{modules.length}</strong>
            </div>
          </div>
          <Button onClick={generatePDF} className="mt-6" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download PDF
          </Button>

          {/* Aswin's Quote */}
          <div className="mt-6 flex flex-col items-center sm:items-start">
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-700 bg-transparent w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
              <img
                src="/aswin.png"
                alt="Aswin's motivational quote"
                className="w-full h-auto block"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 italic text-center sm:text-left">
              — by not aswin
            </p>
          </div>
        </div>

        {/* Questions Display */}
        {modules.map((module, modIndex) => (
          <div key={modIndex} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-indigo-900">{module.title}</h2>
              <p className="text-lg text-gray-600 mt-1">{module.subject}</p>
              <p className="text-sm text-gray-500 mt-2">
                {module.questions.length} questions
              </p>
            </div>

            <div className="space-y-8">
              {module.questions.map((q, qIndex) => (
                <div key={qIndex} className="border-l-4 border-indigo-200 pl-4">
                  <div className="flex items-start gap-2 mb-3">
                    <p className="font-semibold text-gray-900">
                      {qIndex + 1}. {q.q}
                    </p>
                    {q.difficulty && (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${q.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                        {q.difficulty}
                      </span>
                    )}
                  </div>
                  {q.image && (
                    <div className="my-3 ml-0 sm:ml-4">
                      <img
                        src={q.image}
                        alt="Question diagram"
                        className="w-full max-w-[280px] sm:max-w-sm rounded-lg border border-gray-200 shadow-sm mx-auto sm:mx-0"
                      />
                    </div>
                  )}
                  <div className="space-y-2 ml-4">
                    {q.options.map((opt, optIndex) => {
                      const isCorrect = optIndex === q.answer
                      const label = ['A', 'B', 'C', 'D'][optIndex]
                      return (
                        <div
                          key={optIndex}
                          className={`flex items-start gap-2 p-2 rounded ${isCorrect
                            ? 'bg-green-50 border border-green-300'
                            : 'bg-gray-50'
                            }`}
                        >
                          <span className="font-semibold text-gray-700 min-w-[24px]">
                            {label})
                          </span>
                          <span
                            className={`flex-1 ${isCorrect
                              ? 'text-green-900 font-medium'
                              : 'text-gray-700'
                              }`}
                          >
                            {opt}
                            {isCorrect && (
                              <span className="ml-2 text-green-600 font-bold">
                                ✓
                              </span>
                            )}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  {q.explanation && (
                    <div className="mt-3 ml-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-900">
                        <span className="font-semibold">💡 Explanation:</span>{' '}
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <p className="text-gray-600">
            undakiyath by claude
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Questions cover: Data Structures, Logic Circuit Design, Computer Organization & Architecture, Operating Systems, and Digital Signal Processing
          </p>
        </div>
      </div>
    </div>
  )
}
