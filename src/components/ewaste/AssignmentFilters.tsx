import * as React from "react"
import { motion } from "framer-motion"

interface CategoryCount {
  [key: string]: number
}

interface AssignmentFiltersProps {
  filters: string[]
  activeFilter: string
  onFilterChange: (filter: string) => void
  counts: CategoryCount
  totalCount: number
}

export function AssignmentFilters({ filters, activeFilter, onFilterChange, counts, totalCount }: AssignmentFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
      {filters.map(f => {
        const isActive = activeFilter === f
        const count = f === "All" ? totalCount : (counts[f] || 0)
        
        return (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`relative px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 overflow-hidden ${
              isActive 
                ? 'text-[var(--background)]' 
                : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)] bg-[var(--surface)] border border-[var(--border-color)]'
            }`}
          >
            {isActive && (
              <motion.div 
                layoutId="activeFilterBg"
                className="absolute inset-0 bg-[var(--primary-text)] rounded-full z-0"
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              />
            )}
            <span className="relative z-10">{f}</span>
            <span className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-[var(--background)]/20 text-[var(--background)]' : 'bg-[var(--background)] text-[var(--secondary-text)]'}`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
