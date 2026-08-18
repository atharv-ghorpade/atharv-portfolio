import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryViewerProps {
  images: string[]
  title: string
}

export function GalleryViewer({ images, title }: GalleryViewerProps) {
  const [currentIdx, setCurrentIdx] = React.useState(0)

  // Preload next image
  React.useEffect(() => {
    if (images.length > 1) {
      const nextIdx = (currentIdx + 1) % images.length
      const img = new window.Image()
      img.src = images[nextIdx]
    }
  }, [currentIdx, images])

  const nextImage = () => setCurrentIdx(prev => (prev + 1) % images.length)
  const prevImage = () => setCurrentIdx(prev => (prev - 1 + images.length) % images.length)

  if (images.length === 0) return null

  return (
    <div className="relative w-full h-[40vh] md:h-[50vh] bg-black shrink-0 group rounded-t-3xl md:rounded-3xl md:mx-6 md:mt-6 overflow-hidden border border-white/10">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image 
            src={images[currentIdx]}
            alt={`${title} - Image ${currentIdx + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 80vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIdx ? 'bg-white scale-125 w-3' : 'bg-white/40 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
