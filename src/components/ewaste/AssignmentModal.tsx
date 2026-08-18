"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Tag, PlayCircle } from "lucide-react"
import { GalleryViewer } from "./GalleryViewer"

interface AssignmentModalProps {
  assignment: any
  onClose: () => void
}

export function AssignmentModal({ assignment, onClose }: AssignmentModalProps) {
  const allImages = React.useMemo(() => {
    const images = [assignment.cover_image]
    if (assignment.gallery && Array.isArray(assignment.gallery)) {
      images.push(...assignment.gallery)
    }
    return images
  }, [assignment])

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => { 
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-0 sm:px-4 py-0 md:py-6 lg:py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl h-full md:h-auto md:max-h-full bg-[var(--background)] border border-[var(--border-color)] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          <GalleryViewer images={allImages} title={assignment.title} />

          <button 
            onClick={onClose}
            className="absolute top-4 md:top-10 right-4 md:right-10 w-10 h-10 bg-black/20 hover:bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-y-auto p-6 md:p-12 no-scrollbar">
            <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-[var(--accent)] uppercase mb-4">
              <span>{assignment.category}</span>
            </div>

            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-[var(--primary-text)] mb-6 leading-tight">
              {assignment.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-[var(--secondary-text)] mb-12">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(assignment.activity_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              {assignment.tags && assignment.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {assignment.tags.join(", ")}
                </div>
              )}
            </div>

            <div className="prose prose-blue dark:prose-invert max-w-none">
              <p className="text-base md:text-lg leading-relaxed text-[var(--primary-text)] font-medium mb-12">
                {assignment.description}
              </p>

              {assignment.video_url && (
                <div className="mb-12 w-full aspect-video bg-black rounded-2xl overflow-hidden border border-[var(--border-color)] relative">
                  <video 
                    src={assignment.video_url} 
                    controls 
                    className="w-full h-full object-cover"
                    poster={assignment.cover_image}
                  />
                </div>
              )}

              {assignment.reflection && (
                <div className="bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-6 md:p-8 mt-12 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
                  <h3 className="text-sm font-bold tracking-widest text-[var(--primary-text)] uppercase mb-4">Personal Reflection</h3>
                  <p className="text-base leading-relaxed text-[var(--secondary-text)] italic">
                    "{assignment.reflection}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
