"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { LogOut, Save, Loader2, CheckCircle2, UploadCloud, X } from "lucide-react"

// Define Zod Schema for validation
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  activity_number: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Category is required"),
  short_description: z.string().min(10, "Short description is required (min 10 chars)"),
  description: z.string().optional(),
  learning_outcomes: z.string().optional(),
  reflection: z.string().optional(),
  published: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

export default function EWasteAdmin() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [globalError, setGlobalError] = React.useState("")

  // File States
  const [coverImage, setCoverImage] = React.useState<File | null>(null)
  const [galleryImages, setGalleryImages] = React.useState<File[]>([])
  const [videos, setVideos] = React.useState<File[]>([])
  const [documents, setDocuments] = React.useState<File[]>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      published: false
    }
  })

  // Auth Check
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/admin/login")
      else setLoading(false)
    })
  }, [router])

  const uploadFile = async (file: File, bucket: string, pathPrefix: string) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
    const filePath = `${pathPrefix}/${fileName}`

    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file)
    if (uploadError) throw uploadError

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
    return { url: data.publicUrl, name: file.name }
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSaving(true)
    setGlobalError("")
    setSuccess(false)

    try {
      // 1. Upload Cover Image (if exists)
      let cover_image_url = ""
      if (coverImage) {
        const res = await uploadFile(coverImage, 'ewaste-images', 'covers')
        cover_image_url = res.url
      }

      // 2. Insert Activity Record
      const { data: activityRecord, error: dbError } = await supabase.from('activities').insert([
        {
          title: data.title,
          slug: data.slug,
          activity_number: data.activity_number || null,
          date: data.date,
          category: data.category,
          short_description: data.short_description,
          description: data.description || null,
          learning_outcomes: data.learning_outcomes || null,
          reflection: data.reflection || null,
          published: data.published,
          cover_image_url: cover_image_url || null,
        }
      ]).select('id').single()

      if (dbError) throw dbError
      const activityId = activityRecord.id

      // 3. Upload and Insert Media Records
      const mediaUploads: Promise<any>[] = []
      
      galleryImages.forEach(file => {
        mediaUploads.push(
          uploadFile(file, 'ewaste-images', 'gallery').then(res => 
            supabase.from('activity_media').insert({ activity_id: activityId, file_url: res.url, file_name: res.name, file_type: 'image' })
          )
        )
      })

      videos.forEach(file => {
        mediaUploads.push(
          uploadFile(file, 'ewaste-videos', 'videos').then(res => 
            supabase.from('activity_media').insert({ activity_id: activityId, file_url: res.url, file_name: res.name, file_type: 'video' })
          )
        )
      })

      documents.forEach(file => {
        mediaUploads.push(
          uploadFile(file, 'ewaste-documents', 'documents').then(res => 
            supabase.from('activity_media').insert({ activity_id: activityId, file_url: res.url, file_name: res.name, file_type: 'document' })
          )
        )
      })

      await Promise.all(mediaUploads)

      // Success
      setSuccess(true)
      reset()
      setCoverImage(null)
      setGalleryImages([])
      setVideos([])
      setDocuments([])
      
    } catch (err: any) {
      console.error(err)
      setGlobalError(err.message || "Failed to publish activity. Is the slug unique? Are the storage buckets configured?")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--background)]"><Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" /></div>
  }

  return (
    <main className="min-h-screen bg-[var(--background)] py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-heading text-3xl font-extrabold text-[var(--primary-text)]">E-Waste CMS</h1>
            <p className="text-[var(--secondary-text)]">Manage your E-Waste in Practice activities.</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-color)] hover:bg-[var(--surface)] transition-all text-sm font-bold">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {globalError && <div className="p-4 mb-8 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold">{globalError}</div>}
        {success && <div className="p-4 mb-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Activity successfully published to the E-Waste Wall!</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-[var(--surface)] p-8 md:p-10 rounded-[2rem] border border-[var(--border-color)] shadow-xl space-y-10">
          
          {/* Top Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">Title *</label>
              <input {...register("title")} className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] outline-none focus:border-[var(--accent)]" />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">URL Slug * (e.g. ewaste-field-trip)</label>
              <input {...register("slug")} className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] outline-none focus:border-[var(--accent)]" />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">Category *</label>
              <select {...register("category")} className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] outline-none focus:border-[var(--accent)]">
                <option value="">Select Category...</option>
                <option value="Awareness">Awareness</option>
                <option value="Research">Research</option>
                <option value="Practical">Practical</option>
                <option value="Field Visit">Field Visit</option>
                <option value="Reflection">Reflection</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">Date *</label>
                <input type="date" {...register("date")} className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] outline-none focus:border-[var(--accent)]" />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">Act. #</label>
                <input {...register("activity_number")} placeholder="01" className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] outline-none focus:border-[var(--accent)]" />
              </div>
            </div>
          </div>

          <hr className="border-[var(--border-color)]" />

          {/* Descriptions */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">Short Description (Card View) *</label>
              <textarea {...register("short_description")} rows={2} className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] outline-none focus:border-[var(--accent)]" />
              {errors.short_description && <p className="text-red-500 text-xs mt-1">{errors.short_description.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">Detailed Description</label>
                <textarea {...register("description")} rows={5} className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] outline-none focus:border-[var(--accent)]" />
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">Learning Outcomes</label>
                  <textarea {...register("learning_outcomes")} rows={2} className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] outline-none focus:border-[var(--accent)]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">Reflection</label>
                  <textarea {...register("reflection")} rows={2} className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] outline-none focus:border-[var(--accent)]" />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[var(--border-color)]" />

          {/* Media Uploaders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cover Image */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[var(--primary-text)]">Cover Image</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-[var(--border-color)] rounded-xl cursor-pointer hover:bg-[var(--background)] transition-colors w-full">
                  <UploadCloud className="w-5 h-5 text-[var(--secondary-text)]" />
                  <span className="text-sm font-medium text-[var(--secondary-text)]">Select Cover Image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
                </label>
              </div>
              {coverImage && <div className="text-xs text-[var(--accent)] font-bold flex items-center justify-between bg-[var(--accent)]/10 px-3 py-2 rounded-lg">{coverImage.name} <X className="w-4 h-4 cursor-pointer" onClick={() => setCoverImage(null)} /></div>}
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[var(--primary-text)]">Gallery Images</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-[var(--border-color)] rounded-xl cursor-pointer hover:bg-[var(--background)] transition-colors w-full">
                  <UploadCloud className="w-5 h-5 text-[var(--secondary-text)]" />
                  <span className="text-sm font-medium text-[var(--secondary-text)]">Select Multiple Images</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => setGalleryImages(e.target.files ? Array.from(e.target.files) : [])} />
                </label>
              </div>
              {galleryImages.length > 0 && <div className="text-xs text-[var(--accent)] font-bold bg-[var(--accent)]/10 px-3 py-2 rounded-lg">{galleryImages.length} files selected</div>}
            </div>

            {/* Videos */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[var(--primary-text)]">Videos</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-[var(--border-color)] rounded-xl cursor-pointer hover:bg-[var(--background)] transition-colors w-full">
                  <UploadCloud className="w-5 h-5 text-[var(--secondary-text)]" />
                  <span className="text-sm font-medium text-[var(--secondary-text)]">Select Videos</span>
                  <input type="file" accept="video/*" multiple className="hidden" onChange={(e) => setVideos(e.target.files ? Array.from(e.target.files) : [])} />
                </label>
              </div>
              {videos.length > 0 && <div className="text-xs text-[var(--accent)] font-bold bg-[var(--accent)]/10 px-3 py-2 rounded-lg">{videos.length} videos selected</div>}
            </div>

            {/* Documents */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[var(--primary-text)]">PDFs / Documents</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-[var(--border-color)] rounded-xl cursor-pointer hover:bg-[var(--background)] transition-colors w-full">
                  <UploadCloud className="w-5 h-5 text-[var(--secondary-text)]" />
                  <span className="text-sm font-medium text-[var(--secondary-text)]">Select Documents</span>
                  <input type="file" accept=".pdf,.doc,.docx" multiple className="hidden" onChange={(e) => setDocuments(e.target.files ? Array.from(e.target.files) : [])} />
                </label>
              </div>
              {documents.length > 0 && <div className="text-xs text-[var(--accent)] font-bold bg-[var(--accent)]/10 px-3 py-2 rounded-lg">{documents.length} docs selected</div>}
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border-color)] flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" {...register("published")} className="w-5 h-5 rounded accent-[var(--accent)]" />
              <span className="text-sm font-bold text-[var(--primary-text)]">Publish immediately to Wall</span>
            </label>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-md hover:-translate-y-1"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? "Publishing Activity..." : "Publish Activity"}
            </button>
          </div>

        </form>
      </div>
    </main>
  )
}
