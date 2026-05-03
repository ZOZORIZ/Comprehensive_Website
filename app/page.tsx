'use client'

import { Button } from '@/components/ui/button'
import { modules } from '@/lib/questions'
import { Download } from 'lucide-react'
import { jsPDF } from 'jspdf'

export default function ExamQuestionsPage() {
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
        const questionLines = doc.splitTextToSize(
          `${questionNum}. ${q.q}`,
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
        yPos += 4 // Space between questions
      })

      yPos += 6 // Space between modules
    })

    doc.save('comprehensive-exam-questions.pdf')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
                  <p className="font-semibold text-gray-900 mb-3">
                    {qIndex + 1}. {q.q}
                  </p>
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
