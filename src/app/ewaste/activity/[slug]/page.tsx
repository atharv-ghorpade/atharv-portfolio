"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, FileText, Image as ImageIcon, Video, Download } from "lucide-react"

type ActivityData = {
  id: string
  title: string
  slug: string
  activity_number: string
  date: string
  category: string
  short_description: string
  description: string
  learning_outcomes: string
  reflection: string
  cover_image_url: string
}

type MediaData = {
  id: string
  file_url: string
  file_name: string
  file_type: 'image' | 'video' | 'document'
}

export default function ActivityDetail() {
  const { slug } = useParams()
  const router = useRouter()
  
  const [activity, setActivity] = React.useState<ActivityData | null>(null)
  const [media, setMedia] = React.useState<MediaData[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    async function fetchData() {
      // 1. Fetch Activity
      const { data: actData, error: actError } = await supabase
        .from("activities")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single()
      
      if (actError || !actData) {
        console.error(actError)
        setError(true)
        setLoading(false)
        return
      }
      
      setActivity(actData)

      // 2. Fetch Media
      const { data: mediaData, error: mediaError } = await supabase
        .from("activity_media")
        .select("*")
        .eq("activity_id", actData.id)
        .order("created_at", { ascending: true })

      if (!mediaError && mediaData) {
        setMedia(mediaData)
      }

      setLoading(false)
    }

    if (slug) fetchData()
  }, [slug])

  if (loading) {
    return (
      <main className="flex-1 flex flex-col bg-[var(--background)] min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !activity) {
    return (
      <main className="flex-1 flex flex-col bg-[var(--background)] min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-2xl font-bold text-[var(--primary-text)] mb-4">Activity Not Found</h1>
          <button onClick={() => router.push('/#ewaste-wall')} className="text-[var(--accent)] hover:underline">
            Return to Portfolio
          </button>
        </div>
        <Footer />
      </main>
    )
  }

  const galleryImages = media.filter(m => m.file_type === 'image')
  const videos = media.filter(m => m.file_type === 'video')
  const documents = media.filter(m => m.file_type === 'document')

  return (
    <main className="flex-1 flex flex-col bg-[var(--background)] min-h-screen">
      <Navbar />
      
      <article className="w-full max-w-4xl mx-auto px-6 py-32 md:py-40 flex-1">
        
        {/* Back Navigation */}
        <button 
          onClick={() => router.push('/#ewaste-wall')}
          className="flex items-center gap-2 text-sm font-bold text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to E-Waste in Practice
        </button>

        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="px-3 py-1 bg-[var(--surface)] border border-[var(--border-color)] rounded-full text-[var(--primary-text)] text-xs font-bold tracking-wider uppercase">
              {activity.category}
            </div>
            {activity.activity_number && (
              <div className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-xs font-bold tracking-wider uppercase">
                Activity {activity.activity_number}
              </div>
            )}
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--secondary-text)]">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(activity.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--primary-text)] leading-[1.1] mb-6">
            {activity.title}
          </h1>
          <p className="text-xl text-[var(--secondary-text)] font-medium leading-relaxed max-w-3xl">
            {activity.short_description}
          </p>
        </motion.header>

        {/* Cover Image */}
        {activity.cover_image_url && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 border border-[var(--border-color)] bg-[var(--surface)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activity.cover_image_url} alt={activity.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {activity.description && (
              <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-bold text-[var(--primary-text)] mb-6 border-b border-[var(--border-color)] pb-4">Detailed Description</h2>
                <div className="prose prose-sm dark:prose-invert max-w-none text-[var(--secondary-text)] leading-relaxed whitespace-pre-wrap">
                  {activity.description}
                </div>
              </motion.section>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-bold text-[var(--primary-text)] mb-6 border-b border-[var(--border-color)] pb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[var(--secondary-text)]" /> Image Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryImages.map(img => (
                    <div key={img.id} className="aspect-video rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--surface)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.file_url} alt={img.file_name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-bold text-[var(--primary-text)] mb-6 border-b border-[var(--border-color)] pb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-[var(--secondary-text)]" /> Video Documentation
                </h2>
                <div className="space-y-4">
                  {videos.map(video => (
                    <div key={video.id} className="aspect-video rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--surface)]">
                      <video src={video.file_url} controls className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {activity.learning_outcomes && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[var(--surface)] border border-[var(--border-color)] rounded-[2rem] p-8"
              >
                <h3 className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase mb-4">What I Learned</h3>
                <div className="text-[var(--secondary-text)] text-sm leading-relaxed whitespace-pre-wrap">
                  {activity.learning_outcomes}
                </div>
              </motion.div>
            )}

            {activity.reflection && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[var(--surface)] border border-[var(--border-color)] rounded-[2rem] p-8"
              >
                <h3 className="text-xs font-bold text-[var(--accent)] tracking-widest uppercase mb-4">Reflection</h3>
                <blockquote className="text-[var(--secondary-text)] text-sm leading-relaxed italic border-l-2 border-[var(--accent)] pl-4">
                  "{activity.reflection}"
                </blockquote>
              </motion.div>
            )}

            {/* Documents */}
            {documents.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[var(--surface)] border border-[var(--border-color)] rounded-[2rem] p-8"
              >
                <h3 className="text-xs font-bold text-[var(--primary-text)] tracking-widest uppercase mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Attachments
                </h3>
                <div className="space-y-3">
                  {documents.map(doc => (
                    <a 
                      key={doc.id} 
                      href={doc.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] group transition-colors"
                    >
                      <span className="text-sm font-medium truncate max-w-[150px]">{doc.file_name}</span>
                      <Download className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </article>

      <Footer />
    </main>
  )
}
