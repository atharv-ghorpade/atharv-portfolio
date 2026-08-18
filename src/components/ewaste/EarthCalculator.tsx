"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { footprintQuestions, QuestionOption } from "@/lib/footprint/questions"
import { generateCalculatorResult, CalculatorResult as CalcResultType } from "@/lib/footprint/calculator"
import { CalculatorQuestion } from "./CalculatorQuestion"
import { CalculatorResult } from "./CalculatorResult"

type ViewState = 'questions' | 'calculating' | 'result'

export function EarthCalculator() {
  const [view, setView] = React.useState<ViewState>('questions')
  const [currentStep, setCurrentStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, string[]>>({})
  const [resultData, setResultData] = React.useState<CalcResultType | null>(null)

  const handleStart = () => {
    setView('questions')
    setCurrentStep(0)
    setAnswers({})
    setResultData(null)
  }

  const handleSelectOption = (questionId: string, option: QuestionOption, allowMultiple: boolean) => {
    setAnswers(prev => {
      const currentSelections = prev[questionId] || []
      
      if (!allowMultiple) {
        return { ...prev, [questionId]: [option.id] }
      }

      // Toggle selection for multiple
      if (currentSelections.includes(option.id)) {
        return { ...prev, [questionId]: currentSelections.filter(id => id !== option.id) }
      } else {
        return { ...prev, [questionId]: [...currentSelections, option.id] }
      }
    })
  }

  const handleNext = () => {
    if (currentStep < footprintQuestions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Calculate
      const res = generateCalculatorResult(answers)
      setResultData(res)
      
      setView('calculating')
      // Cinematic transition
      setTimeout(() => {
        setView('result')
      }, 1200)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const currentQuestion = footprintQuestions[currentStep]

  return (
    <section id="ewaste-calculator" className="relative w-full min-h-[60vh] flex flex-col items-center overflow-hidden transition-colors duration-1000"
      style={{
        backgroundColor: view === 'result' || view === 'calculating' ? '#050B1F' : 'var(--background)'
      }}
    >
      <div className="w-full max-w-5xl mx-auto px-6 relative z-10 py-16 md:py-20 flex-1 flex flex-col justify-center">
        
        {view === 'questions' && (
          <div className="w-full flex flex-col items-center mb-10">
            <h3 className="text-[10px] font-bold text-[var(--secondary-text)] tracking-[0.2em] uppercase mb-2">
              Your Environmental Impact
            </h3>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[var(--primary-text)] mb-3 text-center">
              How Many Earths Would We Need?
            </h2>
            <p className="text-sm text-[var(--secondary-text)] text-center max-w-lg font-medium">
              Answer a few simple questions about your household, transportation, and lifestyle to estimate your environmental impact.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* QUESTIONS VIEW */}
          {view === 'questions' && (
            <motion.div 
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <CalculatorQuestion
                question={currentQuestion}
                currentStep={currentStep + 1}
                totalSteps={footprintQuestions.length}
                selectedOptionIds={answers[currentQuestion.id] || []}
                onSelect={(opt, allowMult) => handleSelectOption(currentQuestion.id, opt, allowMult)}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </motion.div>
          )}

          {/* CALCULATING VIEW */}
          {view === 'calculating' && (
            <motion.div 
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center justify-center py-20"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-xl md:text-2xl font-bold text-white tracking-widest uppercase mb-6"
              >
                Analyzing your footprint...
              </motion.h3>
              
              <div className="flex gap-3">
                {[0,1,2].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* RESULT VIEW */}
          {view === 'result' && resultData && (
            <motion.div key="result" className="w-full">
              <CalculatorResult 
                result={resultData}
                onRecalculate={handleStart} 
              />
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  )
}
