import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Clock, Trash2 } from "lucide-react"

interface AssignmentCardProps {
  assignment: any
  onClick: () => void
  isAdmin?: boolean
  onDelete?: (id: string) => void
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export function AssignmentCard({ assignment, onClick, isAdmin, onDelete }: AssignmentCardProps) {
  const readingTime = React.useMemo(() => calculateReadingTime(assignment.description), [assignment.description])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="group flex flex-col bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-[var(--glow)] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full aspect-[4/3] bg-[var(--background)] overflow-hidden border-b border-[var(--border-color)]">
        {assignment.cover_image ? (
          <Image 
            src={assignment.cover_image} 
            alt={assignment.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] to-[var(--background)] flex items-center justify-center">
            <span className="text-[var(--secondary-text)] font-medium">No Image</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-[var(--background)]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-[var(--primary-text)] uppercase border border-[var(--border-color)] shadow-sm">
          {assignment.category}
        </div>
        
        {isAdmin && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(assignment.id);
            }}
            className="absolute top-4 right-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white backdrop-blur-md p-2 rounded-full border border-red-500/20 transition-all shadow-sm z-10"
            title="Delete Assignment"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="p-6 md:p-8 flex flex-col flex-1 bg-gradient-to-b from-[var(--surface)] to-transparent">
        <h4 className="font-heading text-xl md:text-2xl font-bold text-[var(--primary-text)] mb-3 line-clamp-2 leading-tight group-hover:text-[var(--accent)] transition-colors">
          {assignment.title}
        </h4>
        <p className="text-sm text-[var(--secondary-text)] mb-6 line-clamp-3 leading-relaxed">
          {assignment.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-[var(--secondary-text)]">
          <span className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} min read
          </span>
          <span className="flex items-center gap-1 group-hover:text-[var(--accent)] transition-colors">
            Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}
