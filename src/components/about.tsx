"use client"

import * as React from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"

function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (inView) {
      let start = 0
      const end = value
      const totalFrames = Math.round(duration * 60)
      let frame = 0

      const easeOutQuad = (t: number) => t * (2 - t)

      const timer = setInterval(() => {
        frame++
        const progress = easeOutQuad(frame / totalFrames)
        setCount(Math.round(start + (end - start) * progress))

        if (frame === totalFrames) {
          clearInterval(timer)
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [inView, value, duration])

  return <span ref={ref}>{count}</span>
}

export function About() {
  const sectionRef = React.useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-24 md:py-32 overflow-hidden bg-[var(--background)]">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Glow (Left) */}
        <div className="absolute top-0 left-0 -ml-[10%] -mt-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[var(--accent)]/5 blur-[120px] rounded-full" />
        
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

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Section Label */}
            <div className="mb-6 inline-flex items-center gap-2 text-[var(--accent)] text-sm font-bold tracking-widest uppercase">
              About Me
            </div>

            {/* Large Heading */}
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--primary-text)] leading-[1.1] mb-8">
              Curiosity Drives Everything I Build.
            </h2>

            {/* Personal Story */}
            <p className="text-base md:text-lg text-[var(--secondary-text)] leading-relaxed mb-8">
              My journey into Artificial Intelligence and Software Engineering didn't begin with a 
              textbook, it started with a relentless urge to understand how things work. I believe that 
              technology is at its best when it solves real human problems. Rather than just learning frameworks, 
              I focus on the fundamental principles of machine learning and system design to build 
              intelligent, meaningful products that leave a lasting impact.
            </p>

            {/* Badges */}

            {/* Statistics Row */}
          </motion.div>

          {/* RIGHT COLUMN: Portrait */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.2, delay: 0.2 }}
            className="lg:col-span-5 relative w-full h-[500px] lg:h-[650px] flex justify-center items-center"
          >
            {/* Background Glow specific to portrait (8-10% opacity) */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.1, 0.08] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[90%] h-[90%] bg-[var(--accent)] blur-[80px] rounded-full z-0 pointer-events-none" 
            />

            {/* Decorative Dotted Pattern Behind Card */}
            <div 
              className="absolute -right-6 -bottom-6 w-48 h-48 opacity-30 z-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at center, var(--primary-text) 1.5px, transparent 1.5px)',
                backgroundSize: '16px 16px'
              }}
            />

            {/* Minimal Blue Accent Line behind top-left corner */}
            <div className="absolute top-8 -left-4 w-24 h-1 bg-gradient-to-r from-[var(--accent)] to-transparent rounded-full z-0 opacity-80 pointer-events-none" />
            <div className="absolute top-8 -left-4 w-1 h-24 bg-gradient-to-b from-[var(--accent)] to-transparent rounded-full z-0 opacity-80 pointer-events-none" />

            {/* The Floating Portrait Card */}
            <motion.div 
              animate={{ y: ["-3px", "3px"] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(37,99,235,0.1)"
              }}
              className="relative z-20 w-full h-full max-w-[400px] rounded-[32px] overflow-hidden border border-white/30 dark:border-white/10 bg-[var(--surface)] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] flex items-center justify-center transition-shadow duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/about-me.jpg" 
                alt="Atharva Ghorpade Professional"
                className="w-full h-full object-cover object-center relative z-20 contrast-[1.05] saturate-[1.02]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
