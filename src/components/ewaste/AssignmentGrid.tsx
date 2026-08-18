import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AssignmentCard } from "./AssignmentCard"
import { Filter } from "lucide-react"

interface AssignmentGridProps {
  assignments: any[]
  loading: boolean
  onSelect: (assignment: any) => void
  isAdmin?: boolean
  onDelete?: (id: string) => void
}

export function AssignmentGrid({ assignments, loading, onSelect, isAdmin, onDelete }: AssignmentGridProps) {
  if (loading) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="w-full aspect-[4/5] bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (assignments.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full py-32 flex flex-col items-center text-center bg-[var(--surface)]/50 rounded-3xl border border-[var(--border-color)] border-dashed"
      >
        <div className="w-24 h-24 rounded-full bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center mb-6 shadow-sm">
          <Filter className="w-10 h-10 text-[var(--secondary-text)] opacity-50" />
        </div>
        <h4 className="font-heading text-2xl font-bold text-[var(--primary-text)] mb-3">No Assignments Yet</h4>
        <p className="text-[var(--secondary-text)] max-w-sm">
          Assignments published during the semester will appear here.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div layout className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {assignments.map((assignment, index) => (
          <AssignmentCard 
            key={assignment.id} 
            assignment={assignment} 
            onClick={() => onSelect(assignment)}
            isAdmin={isAdmin}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
