"use client"

import * as React from "react"
import { useForm, useWatch, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/lib/supabase/client"
import { Upload, Loader2, CheckCircle2, Film, ImageIcon } from "lucide-react"
import { AssignmentCard } from "../ewaste/AssignmentCard"

const CATEGORIES = [
  "Workshop", "Research", "Poster", "Presentation", 
  "Field Visit", "Recycling", "Awareness", "Experiment", 
  "Case Study", "Reflection"
]

const formSchema = z.object({
  title: z.string().min(3, "Required"),
  category: z.string().min(1, "Required"),
  activity_date: z.string().min(1, "Required"),
  description: z.string().min(10, "Required"),
  reflection: z.string().optional(),
  tags: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface AssignmentFormProps {
  onPublish?: () => void
}

export function AssignmentForm({ onPublish }: AssignmentFormProps) {
  const [coverFile, setCoverFile] = React.useState<File | null>(null)
  const [coverPreview, setCoverPreview] = React.useState<string | null>(null)
  const [galleryFiles, setGalleryFiles] = React.useState<File[]>([])
  const [videoFile, setVideoFile] = React.useState<File | null>(null)
  
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  
  const supabase = createClient()

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      activity_date: new Date().toISOString().split('T')[0],
      description: "",
      reflection: "",
      tags: ""
    }
  })

  // Watch form data for Live Preview
  const watchedValues = useWatch({ control })

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setCoverFile(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setCoverPreview(url)
    } else {
      setCoverPreview(null)
    }
  }

  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${folder}/${fileName}`
    
    // Using the requested 'assignment-images' bucket
    const { error } = await supabase.storage
      .from('assignment-images')
      .upload(filePath, file)
      
    if (error) throw error
    
    const { data: publicUrlData } = supabase.storage
      .from('assignment-images')
      .getPublicUrl(filePath)
      
    return publicUrlData.publicUrl
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!coverFile) {
      alert("Cover image is required")
      return
    }

    setIsSubmitting(true)
    try {
      // 1. Upload Media
      const cover_image = await uploadFile(coverFile, 'covers')

      const gallery: string[] = []
      for (const file of galleryFiles) {
        gallery.push(await uploadFile(file, 'gallery'))
      }

      let video_url = null
      if (videoFile) video_url = await uploadFile(videoFile, 'videos')

      // 2. Parse Tags
      const tagsArray = data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : []

      // 3. Insert Database
      const { error } = await supabase
        .from('assignments')
        .insert({
          title: data.title,
          category: data.category,
          activity_date: data.activity_date,
          description: data.description,
          reflection: data.reflection,
          tags: tagsArray,
          cover_image,
          gallery,
          video_url
        })

      if (error) throw error

      setSuccess(true)
      reset()
      setCoverFile(null)
      setCoverPreview(null)
      setGalleryFiles([])
      setVideoFile(null)
      
      if (onPublish) onPublish()

      setTimeout(() => setSuccess(false), 3000)

    } catch (err: any) {
      console.error(err)
      alert(err.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Construct fake assignment object for Live Preview
  const previewAssignment = {
    title: watchedValues.title || "Assignment Title",
    category: watchedValues.category || "Category",
    description: watchedValues.description || "Start typing a description to see the live preview...",
    cover_image: coverPreview,
    activity_date: watchedValues.activity_date || new Date().toISOString(),
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      {/* Form Section */}
      <div className="lg:col-span-2 bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-6 md:p-10 shadow-sm">
        {success && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-3 font-medium">
            <CheckCircle2 className="w-5 h-5" />
            Assignment published successfully!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Basic Info */}
          <div>
            <h3 className="text-sm font-bold tracking-widest text-[var(--secondary-text)] uppercase mb-6 flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold mb-2">Title *</label>
                <input {...register("title")} placeholder="E-Waste Segregation" className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm focus:border-[var(--accent)] outline-none" />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold mb-2">Category *</label>
                <select {...register("category")} className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm focus:border-[var(--accent)] outline-none">
                  <option value="">Select Category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold mb-2">Activity Date *</label>
                <input type="date" {...register("activity_date")} className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm focus:border-[var(--accent)] outline-none" />
                {errors.activity_date && <p className="text-red-500 text-xs mt-1">{errors.activity_date.message}</p>}
              </div>
            </div>
          </div>

          {/* Media */}
          <div>
            <h3 className="text-sm font-bold tracking-widest text-[var(--secondary-text)] uppercase mb-6 flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" /> Media & Attachments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold mb-2">Cover Image *</label>
                <div className="border-2 border-dashed border-[var(--border-color)] rounded-xl p-8 flex flex-col items-center justify-center text-center relative hover:bg-[var(--background)] transition-colors overflow-hidden">
                  <input 
                    type="file" accept="image/*" 
                    onChange={handleCoverChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  {coverPreview ? (
                    <img src={coverPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
                  ) : null}
                  <ImageIcon className="w-6 h-6 text-[var(--secondary-text)] mb-2 relative z-10" />
                  <p className="text-sm font-medium relative z-10">Upload Cover Image</p>
                  {coverFile && <p className="text-xs text-[var(--accent)] mt-2 font-bold relative z-10 bg-black/50 px-2 rounded">{coverFile.name}</p>}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold mb-2">Gallery Images</label>
                <div className="border-2 border-dashed border-[var(--border-color)] rounded-xl p-8 flex flex-col items-center justify-center text-center relative hover:bg-[var(--background)] transition-colors">
                  <input 
                    type="file" accept="image/*" multiple
                    onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <ImageIcon className="w-6 h-6 text-[var(--secondary-text)] mb-2" />
                  <p className="text-sm font-medium">Upload Multiple Gallery Images</p>
                  {galleryFiles.length > 0 && <p className="text-xs text-[var(--accent)] mt-2 font-bold">{galleryFiles.length} files selected</p>}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold mb-2">Video URL (Optional)</label>
                <div className="border-2 border-dashed border-[var(--border-color)] rounded-xl p-6 flex flex-col items-center justify-center text-center relative hover:bg-[var(--background)] transition-colors">
                  <input 
                    type="file" accept="video/*" 
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <Film className="w-6 h-6 text-[var(--secondary-text)] mb-2" />
                  <p className="text-sm font-medium">Upload Video</p>
                  {videoFile && <p className="text-xs text-[var(--accent)] mt-2 font-bold max-w-[200px] truncate">{videoFile.name}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-sm font-bold tracking-widest text-[var(--secondary-text)] uppercase mb-6 flex items-center gap-2 border-b border-[var(--border-color)] pb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" /> Content & Reflections
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold mb-2">Detailed Description *</label>
                <textarea {...register("description")} rows={6} className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm focus:border-[var(--accent)] outline-none resize-none" placeholder="Full details of the assignment..."></textarea>
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold mb-2">Personal Reflection (Optional)</label>
                <textarea {...register("reflection")} rows={4} className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm focus:border-[var(--accent)] outline-none resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold mb-2">Tags (comma separated)</label>
                <input {...register("tags")} placeholder="sustainability, sorting, lifecycle" className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm focus:border-[var(--accent)] outline-none" />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end pt-6 border-t border-[var(--border-color)]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-10 py-4 bg-[var(--primary-text)] hover:bg-[var(--accent)] text-[var(--background)] font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              {isSubmitting ? 'Publishing...' : 'Publish Assignment'}
            </button>
          </div>

        </form>
      </div>

      {/* Live Preview Section */}
      <div className="lg:col-span-1">
        <div className="sticky top-12">
          <h3 className="text-sm font-bold tracking-widest text-[var(--secondary-text)] uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Preview
          </h3>
          <div className="pointer-events-none">
            <AssignmentCard assignment={previewAssignment} onClick={() => {}} />
          </div>
        </div>
      </div>

    </div>
  )
}
