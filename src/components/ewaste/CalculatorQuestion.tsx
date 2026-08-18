"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CalculatorQuestion as QuestionType, QuestionOption } from "@/lib/footprint/questions"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"

interface CalculatorQuestionProps {
  question: QuestionType
  currentStep: number
  totalSteps: number
  selectedOptionIds: string[]
  onSelect: (option: QuestionOption, allowMultiple: boolean) => void
  onNext: () => void
  onPrev: () => void
}

export function CalculatorQuestion({
  question,
  currentStep,
  totalSteps,
  selectedOptionIds,
  onSelect,
  onNext,
  onPrev
}: CalculatorQuestionProps) {
  
  return (
    <motion.div 
      key={question.id}
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full flex flex-col max-w-xl mx-auto"
    >
      {/* Progress Navigation */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] mb-4 text-[var(--secondary-text)]">
          <span className={question.chapter === "HOUSEHOLD" ? "text-[var(--primary-text)] border-b border-[var(--primary-text)] pb-1" : ""}>HOUSEHOLD</span>
          <span className="opacity-30">───</span>
          <span className={question.chapter === "TRANSPORT" ? "text-[var(--primary-text)] border-b border-[var(--primary-text)] pb-1" : ""}>TRANSPORT</span>
          <span className="opacity-30">───</span>
          <span className={question.chapter === "LIFESTYLE" ? "text-[var(--primary-text)] border-b border-[var(--primary-text)] pb-1" : ""}>LIFESTYLE</span>
        </div>
        <div className="text-xs font-bold text-[var(--secondary-text)] tracking-wider">
          {String(currentStep).padStart(2, '0')} / {totalSteps}
        </div>
      </div>

      {/* Question Text */}
      <h3 className="font-heading text-xl md:text-3xl font-bold text-[var(--primary-text)] mb-8 leading-snug text-center">
        {question.questionText}
      </h3>

      {/* Options Grid */}
      <div className="flex flex-col gap-3 mb-10">
        {question.options.map(option => {
          const isSelected = selectedOptionIds.includes(option.id)
          
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option, !!question.allowMultiple)}
              className={`
                group relative w-full px-6 py-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between
                ${isSelected 
                  ? 'bg-[var(--surface)] border-[var(--accent)] shadow-sm scale-[1.01]' 
                  : 'bg-transparent border-[var(--border-color)] hover:border-[var(--primary-text)]/30 hover:bg-[var(--surface)]/50'}
              `}
            >
              <span className={`font-medium text-base md:text-lg transition-colors ${isSelected ? 'text-[var(--primary-text)]' : 'text-[var(--secondary-text)] group-hover:text-[var(--primary-text)]'}`}>
                {option.label}
              </span>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border-color)]'}`}>
                 {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-6">
        <button
          onClick={onPrev}
          disabled={currentStep === 1}
          className="flex items-center gap-2 text-sm font-bold text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors disabled:opacity-0 disabled:pointer-events-none"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <button
          onClick={onNext}
          disabled={selectedOptionIds.length === 0}
          className={`
            flex items-center gap-2 text-sm font-bold transition-all duration-300
            ${selectedOptionIds.length > 0
              ? 'text-[var(--accent)] hover:text-blue-600' 
              : 'text-[var(--secondary-text)] opacity-30 cursor-not-allowed'}
          `}
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </motion.div>
  )
}
