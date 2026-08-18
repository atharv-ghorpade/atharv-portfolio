import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Image as ImageIcon } from "lucide-react"

export interface Activity {
  id: string
  title: string
  slug: string
  activity_number: string
  date: string
  category: string
  short_description: string
  cover_image_url: string | null
}

interface ActivityCardProps {
  activity: Activity
  index: number
}

export function ActivityCard({ activity, index }: ActivityCardProps) {
  return (
    <Link href={`/ewaste/activity/${activity.slug}`} className="block h-full group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        className="flex flex-col h-full"
      >
        {/* Large Cover Image (No border, minimal radius) */}
        <div className="w-full aspect-[4/3] overflow-hidden mb-6 bg-[var(--surface)]">
          {activity.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={activity.cover_image_url} 
              alt={activity.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--border-color)] bg-[var(--surface)]">
              <ImageIcon className="w-12 h-12 opacity-50" />
            </div>
          )}
        </div>

        {/* Minimal Metadata */}
        <div className="flex items-center text-xs font-bold text-[var(--secondary-text)] tracking-wider mb-3">
          <span>{activity.activity_number ? `NO. ${activity.activity_number}` : 'CASE STUDY'}</span>
          <span className="mx-2 opacity-50">/</span>
          <span className="uppercase">{activity.category}</span>
        </div>
        
        <h3 className="font-heading text-2xl font-bold text-[var(--primary-text)] mb-3 leading-snug group-hover:text-[var(--accent)] transition-colors">
          {activity.title}
        </h3>
        
        <p className="text-[var(--secondary-text)] text-sm leading-relaxed line-clamp-3 mb-6">
          {activity.short_description}
        </p>
        
        <div className="flex items-center gap-2 text-[var(--primary-text)] text-sm font-bold transition-all mt-auto group-hover:gap-4 group-hover:text-[var(--accent)]">
          View Activity <ArrowRight className="w-4 h-4" />
        </div>
      </motion.div>
    </Link>
  )
}
