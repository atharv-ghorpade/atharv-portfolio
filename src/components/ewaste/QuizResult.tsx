"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { RefreshCcw } from "lucide-react"

interface QuizResultProps {
  score: number
  total: number
  resultLevel: { title: string, message: string }
  onRetry: () => void
}

export function QuizResult({ score, total, resultLevel, onRetry }: QuizResultProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center text-center py-12"
    >
      <div className="text-[10px] font-bold text-[var(--secondary-text)] tracking-[0.2em] uppercase mb-6">
        Your Score
      </div>

      <div className="flex items-baseline justify-center gap-2 mb-6">
        <span className="font-heading text-6xl md:text-8xl font-black text-[var(--primary-text)] tracking-tighter">
          {score}
        </span>
        <span className="text-3xl md:text-4xl font-bold text-[var(--secondary-text)] opacity-50">
          / {total}
        </span>
      </div>

      <div className="bg-[var(--primary-text)] text-[var(--background)] px-6 py-2 rounded-full font-bold text-sm tracking-wider uppercase mb-6">
        {resultLevel.title}
      </div>

      <p className="text-[var(--secondary-text)] font-medium max-w-sm mb-12">
        {resultLevel.message}
      </p>

      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-8 py-4 bg-transparent border border-[var(--border-color)] hover:border-[var(--primary-text)] text-[var(--primary-text)] font-bold rounded-xl transition-all"
      >
        <RefreshCcw className="w-4 h-4" /> Try Again
      </button>

    </motion.div>
  )
}
