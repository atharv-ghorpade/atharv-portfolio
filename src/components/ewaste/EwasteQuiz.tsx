"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { quizQuestions, QuizOption, getQuizResultLevel } from "./quizQuestions"
import { QuizQuestion } from "./QuizQuestion"
import { QuizResult } from "./QuizResult"

type QuizState = 'questions' | 'result'

export function EwasteQuiz() {
  const [view, setView] = React.useState<QuizState>('questions')
  const [currentStep, setCurrentStep] = React.useState(0)
  const [score, setScore] = React.useState(0)

  const handleStart = () => {
    setView('questions')
    setCurrentStep(0)
    setScore(0)
  }

  const handleNext = (isCorrect: boolean) => {
    if (isCorrect) setScore(prev => prev + 1)
    
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setView('result')
    }
  }

  const currentQuestion = quizQuestions[currentStep]

  return (
    <section id="ewaste-quiz" className="relative w-full py-16 md:py-20 overflow-hidden bg-[var(--surface)] border-t border-[var(--border-color)]">
      
      {/* Subtle Dot Texture Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--primary-text) 1px, transparent 0)', backgroundSize: '24px 24px' }}
      />

      <div className="w-full max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {view === 'questions' && (
          <div className="w-full flex flex-col items-center mb-10 text-center">
            <h3 className="text-[10px] font-bold text-[var(--secondary-text)] tracking-[0.2em] uppercase mb-2">
              E-Waste Knowledge
            </h3>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[var(--primary-text)] mb-3">
              How Much Do You Know About E-Waste?
            </h2>
            <p className="text-sm text-[var(--secondary-text)] max-w-lg font-medium">
              Test what you know about electronic waste, responsible disposal, recycling, and sustainable technology.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {view === 'questions' && (
            <motion.div 
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <QuizQuestion
                question={currentQuestion}
                currentStep={currentStep + 1}
                totalSteps={quizQuestions.length}
                onNext={handleNext}
              />
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div 
              key="result" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <QuizResult 
                score={score} 
                total={quizQuestions.length} 
                resultLevel={getQuizResultLevel(score, quizQuestions.length)}
                onRetry={handleStart} 
              />
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  )
}
