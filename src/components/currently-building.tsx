"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Activity } from "lucide-react"

export function CurrentlyBuilding() {
  return (
    <section id="currently-building" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, type: "spring" }}
          className="relative group"
        >
          {/* Animated Gradient Border Effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-3xl opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          
          <div className="relative bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[var(--accent)]/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex-1 space-y-6 z-10">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  Currently Building
                </span>
                <span className="px-3 py-1 text-xs font-medium text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full">
                  In Progress
                </span>
              </div>
              
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                AI Gaming Team Builder
              </h2>
              
              <p className="text-[var(--secondary-text)] text-lg leading-relaxed max-w-2xl">
                Building an AI-powered platform that intelligently forms balanced 
                gaming teams using machine learning, player analytics, and real-time collaboration.
              </p>
            </div>
            
            <div className="flex-shrink-0 z-10 w-full md:w-auto">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="group flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-[var(--background)] border border-[var(--border-color)] rounded-full text-foreground font-medium hover:bg-[var(--accent)] hover:text-white hover:border-transparent transition-all shadow-sm"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
            
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}
