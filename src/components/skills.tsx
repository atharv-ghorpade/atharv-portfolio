"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  SiPython, SiNumpy, SiPandas, SiScikitlearn, SiPytorch, SiTensorflow,
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss,
  SiGit, SiGithub, SiDocker, SiPostman, SiLinux
} from "react-icons/si"
import { Brain, Code2, MessageSquare, Bot, Database, Eye } from "lucide-react"

const engineeringStack = [
  {
    title: "Artificial Intelligence",
    description: "Building the core intelligence, training models, and processing complex data structures to solve real-world problems.",
    items: [
      { name: "Python", Icon: SiPython, color: "group-hover/tech:text-yellow-500" },
      { name: "Machine Learning", Icon: Brain, color: "group-hover/tech:text-blue-500" },
      { name: "Deep Learning", Icon: SiTensorflow, color: "group-hover/tech:text-orange-500" },
      { name: "NumPy", Icon: SiNumpy, color: "group-hover/tech:text-blue-400" },
      { name: "Pandas", Icon: SiPandas, color: "group-hover/tech:text-blue-600" },
      { name: "Scikit-Learn", Icon: SiScikitlearn, color: "group-hover/tech:text-orange-400" },
    ]
  },
  {
    title: "Frontend Development",
    description: "Crafting beautiful, responsive, and intuitive user interfaces that bring intelligent systems to life in the browser.",
    items: [
      { name: "HTML", Icon: SiHtml5, color: "group-hover/tech:text-orange-500" },
      { name: "CSS", Icon: SiCss, color: "group-hover/tech:text-blue-500" },
      { name: "JavaScript", Icon: SiJavascript, color: "group-hover/tech:text-yellow-400" },
      { name: "React", Icon: SiReact, color: "group-hover/tech:text-cyan-400" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "group-hover/tech:text-cyan-500" },
    ]
  },
  {
    title: "Development Workflow",
    description: "The essential tools and environments I use to maintain code quality, automate processes, and deploy reliably.",
    items: [
      { name: "Git", Icon: SiGit, color: "group-hover/tech:text-red-500" },
      { name: "GitHub", Icon: SiGithub, color: "group-hover/tech:text-black dark:group-hover/tech:text-white" },
      { name: "VS Code", Icon: Code2, color: "group-hover/tech:text-blue-400" },
      { name: "Postman", Icon: SiPostman, color: "group-hover/tech:text-orange-500" },
    ]
  },
  {
    title: "Currently Exploring",
    description: "The cutting-edge concepts I am actively researching and integrating into my newest projects.",
    items: [
      { name: "Large Language Models", Icon: MessageSquare, color: "group-hover/tech:text-purple-500" },
      { name: "AI Agents", Icon: Bot, color: "group-hover/tech:text-emerald-500" },
      { name: "RAG", Icon: Database, color: "group-hover/tech:text-amber-500" },
      { name: "Computer Vision", Icon: Eye, color: "group-hover/tech:text-indigo-500" },
    ]
  }
]

export function Skills() {
  return (
    <section id="skills" className="relative w-full py-24 md:py-32 overflow-hidden bg-[var(--background)]">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Glows */}
        <div className="absolute top-[30%] right-0 -mr-[20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--accent)]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[var(--accent)]/5 blur-[100px] rounded-full" />
        
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

      <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
          className="flex flex-col items-start mb-16 md:mb-24"
        >
          <div className="mb-4 inline-flex items-center gap-2 text-[var(--accent)] text-sm font-bold tracking-widest uppercase">
            My Engineering Stack
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--primary-text)] mb-6">
            How I Build Projects.
          </h2>
          <p className="text-lg md:text-xl text-[var(--secondary-text)] max-w-2xl font-medium leading-relaxed">
            I believe in choosing the right tool for the job. Here is the foundation of technologies I use to design, train, and deploy intelligent software.
          </p>
        </motion.div>

        {/* Horizontal Blocks */}
        <div className="flex flex-col">
          {engineeringStack.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.2 }}
              className="group relative flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 border-t border-[var(--border-color)]/50 first:border-0"
            >
              {/* Left: Description */}
              <div className="lg:w-1/3 flex flex-col gap-3">
                <h3 className="font-heading text-2xl font-bold text-[var(--primary-text)] tracking-tight">
                  {category.title}
                </h3>
                <p className="text-[var(--secondary-text)] leading-relaxed text-sm md:text-base">
                  {category.description}
                </p>
              </div>

              {/* Right: Tech Grid */}
              <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.items.map((item) => (
                  <div key={item.name} className="group/tech flex items-center gap-3 p-3 rounded-2xl bg-[var(--surface)]/30 hover:bg-[var(--surface)] border border-transparent hover:border-[var(--border-color)]/60 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="p-2.5 bg-[var(--background)] rounded-xl border border-[var(--border-color)]/50 group-hover/tech:border-[var(--border-color)] transition-colors shadow-sm">
                      <item.Icon className={`w-5 h-5 text-[var(--secondary-text)] opacity-60 group-hover/tech:opacity-100 transition-all duration-300 ${item.color}`} />
                    </div>
                    <span className="font-medium text-[var(--primary-text)] text-sm md:text-base opacity-80 group-hover/tech:opacity-100 transition-opacity">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
