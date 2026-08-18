"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Mail, Download } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { 
  SiPython, 
  SiTensorflow, 
  SiPytorch,
  SiDocker, 
  SiGit 
} from "react-icons/si"

const FloatingIcon = ({ 
  icon: Icon,
  delay = 0, 
  className = "",
  color = "text-[var(--secondary-text)]"
}: { 
  icon: any,
  delay?: number,
  className?: string,
  color?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay,
        type: "spring",
      }}
      className={`absolute z-30 pointer-events-none ${className}`}
    >
      <motion.div
        animate={{ 
          y: ["-10%", "10%"],
          rotate: [-5, 5]
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: delay * 0.5 },
          rotate: { duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: delay * 0.5 }
        }}
        className={`p-2 bg-[var(--surface)]/50 border border-[var(--border-color)]/20 rounded-xl shadow-lg backdrop-blur-sm ${color} text-xl lg:text-2xl opacity-50`}
      >
        <Icon />
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-[var(--background)]">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Glow behind portrait (Right side) with subtle pulse */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-0 md:-right-[5%] -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--accent)] blur-[120px] rounded-full" 
        />
        
        {/* Faint Radial Gradient (Left side) */}
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[var(--accent-hover)]/10 blur-[100px] rounded-full" />

        {/* Subtle Dot Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at center, var(--primary-text) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Light Grain/Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
      </div>

      {/* Main Content Layout */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between h-full pt-16">
        
        {/* Left Content Area (Reading Flow) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
          className="w-full md:w-[70%] flex flex-col items-start justify-center z-20"
        >
          {/* 1. Category Label */}
          <div className="mb-4 inline-flex items-center gap-2 text-[var(--accent)] text-sm sm:text-base font-bold tracking-widest uppercase">
            Aspiring AI Engineer
          </div>

          {/* 2. Massive Name Typography */}
          <h1 className="font-heading text-[14vw] md:text-[9vw] lg:text-[7.5rem] font-black tracking-tighter leading-[0.8] uppercase flex flex-col mb-4">
            <span className="text-[var(--primary-text)]">
              ATHARVA
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-extrabold opacity-80 mt-2">
              GHORPADE
            </span>
          </h1>

          {/* 3. Personal Statement / Value Proposition */}
          <p className="text-base md:text-lg lg:text-xl text-[var(--secondary-text)] max-w-[500px] leading-relaxed mb-8 font-medium">
            Driven by curiosity and continuous learning. I build intelligent, real-world software powered by AI, machine learning, and thoughtful engineering.
          </p>

          {/* 4 & 5. Action Elements Group (CTAs & Socials) */}
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#contact" 
              className="px-8 py-3 rounded-full bg-[var(--accent)] text-white text-sm lg:text-base font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-[0_4px_20px_rgba(var(--glow),0.4)] hover:shadow-[0_6px_25px_rgba(var(--glow),0.6)] hover:-translate-y-1 active:translate-y-0"
            >
              Contact Me
            </a>
            
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="px-8 py-3 rounded-full border border-[var(--border-color)] text-[var(--primary-text)] bg-[var(--surface)]/50 hover:bg-[var(--surface)] text-sm lg:text-base font-medium transition-all flex items-center gap-2 group hover:-translate-y-1 active:translate-y-0"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Resume
            </a>

            <div className="flex items-center gap-3 border-l border-[var(--border-color)] pl-4 ml-2">
              <a href="https://github.com/atharvakulkarni" target="_blank" rel="noreferrer" className="text-[var(--secondary-text)] hover:text-[var(--accent)] hover:-translate-y-1 transition-all p-2 rounded-full hover:bg-[var(--surface)]">
                <FaGithub className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
              <a href="https://linkedin.com/in/atharvakulkarni" target="_blank" rel="noreferrer" className="text-[var(--secondary-text)] hover:text-[var(--accent)] hover:-translate-y-1 transition-all p-2 rounded-full hover:bg-[var(--surface)]">
                <FaLinkedin className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Portrait Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="absolute right-0 bottom-0 md:relative md:w-[30%] h-[50vh] md:h-full z-10 flex justify-center items-end pointer-events-none md:-ml-24 lg:-ml-32"
        >
          {/* Portrait overlapping the typography strongly, with soft blue rim light */}
          <div className="relative w-[300px] md:w-[450px] lg:w-[550px] h-full flex justify-center items-end md:absolute md:bottom-0 md:right-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/me.png" 
              alt="Atharva Ghorpade"
              className="w-full h-auto object-contain object-bottom scale-100 origin-bottom"
              style={{ filter: "drop-shadow(0 -5px 25px rgba(37,99,235,0.25)) drop-shadow(0 20px 20px rgba(0,0,0,0.2))" }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* Floating Tech Icons */}
            <div className="absolute inset-0 w-full h-full">
              <FloatingIcon icon={SiPython} delay={0.1} className="top-[30%] left-[5%]" color="text-yellow-500" />
              <FloatingIcon icon={SiTensorflow} delay={0.3} className="top-[35%] right-[10%]" color="text-orange-500" />
              <FloatingIcon icon={SiPytorch} delay={0.5} className="top-[60%] -left-[5%]" color="text-orange-600" />
              <FloatingIcon icon={SiDocker} delay={0.7} className="top-[65%] -right-[5%]" color="text-blue-500" />
              <FloatingIcon icon={SiGit} delay={0.9} className="bottom-[15%] left-[20%]" color="text-red-500" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
