"use client"

import * as React from "react"
import { motion, animate, useMotionValue, useTransform } from "framer-motion"
import { CalculatorResult as CalcResultType } from "@/lib/footprint/calculator"
import { EarthResultScene } from "./earth/EarthResultScene"
import { Share2, RefreshCcw } from "lucide-react"

interface CalculatorResultProps {
  result: CalcResultType
  onRecalculate: () => void
}

export function CalculatorResult({ result, onRecalculate }: CalculatorResultProps) {
  const count = useMotionValue(0)
  const displayCount = useTransform(count, (latest) => latest.toFixed(1))

  React.useEffect(() => {
    const controls = animate(count, result.earthEquivalent, {
      duration: 2,
      ease: "easeOut",
      delay: 0.5
    })
    return controls.stop
  }, [result.earthEquivalent, count])

  const handleShare = async () => {
    const text = `My estimated environmental impact is ${result.earthEquivalent} Earths. Find out yours at my portfolio!`
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Earth Impact",
          text: text,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Share failed:", err)
      }
    } else {
      navigator.clipboard.writeText(text)
      alert("Result copied to clipboard!")
    }
  }

  const maxVal = Math.max(...Object.values(result.categoryBreakdowns), 0.1)
  const sortedCategories = Object.entries(result.categoryBreakdowns).sort((a, b) => b[1] - a[1])
  const totalWeight = Object.values(result.categoryBreakdowns).reduce((acc, curr) => acc + curr, 0)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-12"
    >
      {/* LEFT COLUMN: Data & Actions */}
      <div className="w-full lg:w-[45%] flex flex-col text-left order-2 lg:order-1 z-10 relative">
        
        <div className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-4">
          Your Environmental Impact
        </div>

        <div className="flex items-baseline gap-4 mb-4">
          <motion.span className="text-[5rem] md:text-[6rem] lg:text-[7rem] font-black font-heading text-white leading-none tracking-tighter">
            {displayCount}
          </motion.span>
          <span className="text-xl md:text-2xl font-bold text-blue-200/50 uppercase tracking-[0.2em]">
            Earths
          </span>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-base text-blue-100/90 font-medium leading-relaxed mb-10 max-w-sm"
        >
          If everyone lived like you, approximately <strong className="text-white font-black">{result.earthEquivalent} Earths</strong> would be required to sustain the population.
        </motion.p>

        {/* Compact Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mb-10 w-full max-w-sm"
        >
          <h4 className="text-[10px] font-bold text-blue-400/80 uppercase tracking-widest mb-4">
            Impact Breakdown
          </h4>
          <div className="space-y-4">
            {sortedCategories.map(([category, value], idx) => {
              const percentageRaw = Math.round((value / totalWeight) * 100)
              const widthPercent = Math.min(100, Math.max(2, (value / maxVal) * 100))
              
              return (
                <div key={category} className="w-full">
                  <div className="flex items-center justify-between text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1.5">
                    <span>{category}</span>
                    <span className="text-white">{percentageRaw}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPercent}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 2 + (idx * 0.2) }}
                      className="h-full bg-[var(--accent)] rounded-full"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Compact Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mb-12 w-full max-w-sm"
        >
          <h4 className="text-[10px] font-bold text-blue-400/80 uppercase tracking-widest mb-4">
            Improvement Tips: {result.highestImpactCategory}
          </h4>
          <div className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="flex gap-2 text-sm text-blue-200/70">
                <span className="text-[var(--accent)] font-black">•</span> {rec.title}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="flex items-center gap-4 w-full max-w-sm"
        >
          <button
            onClick={onRecalculate}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/20 hover:bg-white/5 text-white text-xs font-bold rounded-lg transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Recalculate
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </motion.div>

      </div>

      {/* RIGHT COLUMN: 3D Earth Hero */}
      <div className="w-full lg:w-[55%] flex items-center justify-center order-1 lg:order-2">
        <EarthResultScene score={result.earthEquivalent} />
      </div>

    </motion.div>
  )
}
