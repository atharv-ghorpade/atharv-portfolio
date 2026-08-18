"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QuizQuestion as QuestionType } from "./quizQuestions"
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react"

interface QuizQuestionProps {
  question: QuestionType
  currentStep: number
  totalSteps: number
  onNext: (isCorrect: boolean) => void
}

export function QuizQuestion({
  question,
  currentStep,
  totalSteps,
  onNext
}: QuizQuestionProps) {
  
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const isCorrect = selectedId ? question.options.find(o => o.id === selectedId)?.isCorrect : false

  const handleNext = () => {
    onNext(isCorrect || false)
    setSelectedId(null)
  }

  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <motion.div 
      key={question.id}
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full flex flex-col max-w-xl mx-auto"
    >
      {/* Progress */}
      <div className="flex flex-col items-center justify-center mb-8 w-full">
        <div className="text-xs font-bold text-[var(--secondary-text)] tracking-wider mb-3">
          {String(currentStep).padStart(2, '0')} / {totalSteps}
        </div>
        <div className="w-full h-1 bg-[var(--border-color)] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-[var(--primary-text)]"
          />
        </div>
      </div>

      {/* Question Text */}
      <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--primary-text)] mb-8 leading-snug text-center">
        {question.questionText}
      </h3>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-6">
        {question.options.map((option, idx) => {
          const isSelected = selectedId === option.id
          const showCorrect = selectedId && option.isCorrect
          const showWrong = isSelected && !option.isCorrect
          
          let btnClass = 'bg-transparent border-[var(--border-color)] hover:border-[var(--primary-text)]/30 hover:bg-[var(--surface)]/50'
          let textClass = 'text-[var(--secondary-text)] group-hover:text-[var(--primary-text)]'

          if (showCorrect) {
            btnClass = 'bg-emerald-500/10 border-emerald-500 shadow-sm'
            textClass = 'text-emerald-700 dark:text-emerald-400'
          } else if (showWrong) {
            btnClass = 'bg-red-500/10 border-red-500 shadow-sm'
            textClass = 'text-red-700 dark:text-red-400'
          } else if (selectedId) {
            btnClass = 'bg-transparent border-[var(--border-color)] opacity-50'
          }

          const labels = ['A', 'B', 'C', 'D']

          return (
            <button
              key={option.id}
              disabled={selectedId !== null}
              onClick={() => setSelectedId(option.id)}
              className={`group relative w-full px-6 py-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-4 ${btnClass}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${selectedId ? 'bg-transparent border border-inherit text-inherit' : 'bg-[var(--surface)] border border-[var(--border-color)] text-[var(--secondary-text)] group-hover:bg-[var(--primary-text)] group-hover:text-[var(--background)]'}`}>
                {labels[idx]}
              </div>
              <span className={`font-medium text-base flex-1 transition-colors ${textClass}`}>
                {option.label}
              </span>
              
              {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              {showWrong && <XCircle className="w-5 h-5 text-red-500" />}
            </button>
          )
        })}
      </div>

      {/* Feedback & Next */}
      <div className="min-h-[80px]">
        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-sm font-medium text-[var(--secondary-text)] mb-4">
                {question.explanation}
              </p>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--primary-text)] hover:bg-[var(--accent)] text-[var(--background)] font-bold rounded-lg transition-all"
              >
                Next Question <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  )
}
