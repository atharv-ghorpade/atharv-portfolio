"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface ImpactBreakdownProps {
  breakdowns: Record<string, number>
}

export function ImpactBreakdown({ breakdowns }: ImpactBreakdownProps) {
  // Find max value to calculate relative widths
  const maxVal = Math.max(...Object.values(breakdowns), 0.1)
  
  // Sort categories by impact (highest first)
  const sortedCategories = Object.entries(breakdowns).sort((a, b) => b[1] - a[1])

  return (
    <div className="w-full mt-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
      <h4 className="font-heading text-lg font-bold text-white mb-6 tracking-wide">
        Impact Breakdown
      </h4>
      
      <div className="space-y-6">
        {sortedCategories.map(([category, value], index) => {
          const percentage = Math.min(100, Math.max(5, (value / maxVal) * 100))
          
          return (
            <div key={category} className="w-full">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-blue-100/70 uppercase tracking-widest">
                  {category}
                </span>
                <span className="text-sm font-bold text-white/90">
                  {value.toFixed(1)}
                </span>
              </div>
              
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.2), type: "spring", bounce: 0 }}
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    boxShadow: "0 0 20px rgba(59,130,246,0.5)"
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
