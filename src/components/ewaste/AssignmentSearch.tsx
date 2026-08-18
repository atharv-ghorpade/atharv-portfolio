import * as React from "react"
import { Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AssignmentSearchProps {
  value: string
  onChange: (val: string) => void
}

export function AssignmentSearch({ value, onChange }: AssignmentSearchProps) {
  return (
    <div className="relative w-full md:w-80 shrink-0 group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--secondary-text)] group-focus-within:text-[var(--accent)] transition-colors">
        <Search className="w-4 h-4" />
      </div>
      <input 
        type="text" 
        placeholder="Search assignments..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[var(--surface)] border border-[var(--border-color)] rounded-full pl-11 pr-10 py-3 text-sm outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-[var(--primary-text)] placeholder-[var(--secondary-text)] shadow-sm"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--background)] rounded-full flex items-center justify-center text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors"
          >
            <X className="w-3 h-3" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
