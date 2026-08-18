"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function EwasteIntro() {
  const scrollToCalculator = () => {
    document.getElementById('ewaste-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center items-center py-16 overflow-hidden bg-[var(--background)]">
      
      {/* Subtle Dot Texture Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--primary-text) 1px, transparent 0)', backgroundSize: '24px 24px' }}
      />
      {/* Subtle blue radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="w-full max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 text-[var(--secondary-text)] text-[10px] font-bold tracking-[0.2em] uppercase">
            Sustainability / E-Waste Management
          </div>
          
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--primary-text)] mb-6 max-w-3xl mx-auto leading-[1.05]">
            Technology Shouldn't End<br/>As Electronic Waste.
          </h2>
          
          <p className="text-base md:text-lg text-[var(--secondary-text)] max-w-xl mx-auto font-medium leading-relaxed mb-10">
            Every device has a lifecycle. Explore how our everyday choices affect the planet, test your knowledge of electronic waste, and discover what we can do differently.
          </p>

          {/* Minimal Fact */}
          <div className="mb-10 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] max-w-md w-full">
            <h4 className="text-[10px] font-bold text-[var(--accent)] tracking-widest uppercase mb-1">Did You Know?</h4>
            <p className="text-sm text-[var(--primary-text)] font-medium">
              Electronic waste is one of the world's fastest-growing waste streams.
            </p>
          </div>

          {/* Primary CTA */}
          <button
            onClick={scrollToCalculator}
            className="group flex items-center gap-3 px-8 py-4 bg-[var(--primary-text)] hover:bg-[var(--accent)] text-[var(--background)] font-bold rounded-full transition-all shadow-lg hover:shadow-xl mb-6"
          >
            Calculate My Impact
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-[var(--secondary-text)] tracking-widest uppercase opacity-80">
            <span>Under the guidance of</span>
            <span className="text-[var(--primary-text)]">Prof. Nilima Main</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
