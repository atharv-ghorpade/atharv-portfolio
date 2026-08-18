"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Journey", href: "#journey" },
  { name: "Assignments", href: "#assignments" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null)
  const [activeSection, setActiveSection] = React.useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-[1280px] rounded-full flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "top-4 h-[64px] bg-[var(--surface)]/65 backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/30 dark:border-white/10"
            : "top-8 h-[72px] bg-[var(--surface)]/45 backdrop-blur-[16px] shadow-sm border border-white/20 dark:border-white/5"
        }`}
        style={{
          paddingLeft: "1.5rem",
          paddingRight: "0.75rem"
        }}
      >
        {/* Left: Logo */}
        <Link href="/" className="flex items-center group">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-heading font-black text-[1.4rem] tracking-tighter text-[var(--primary-text)] transition-colors"
          >
            &lt;AG/&gt;
          </motion.span>
        </Link>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex items-center h-full relative" onMouseLeave={() => setHoveredLink(null)}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onClick={() => setActiveSection(link.name)}
              className="relative px-5 py-2 text-[15px] font-medium text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors"
            >
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-[var(--primary-text)]/5 dark:bg-white/10 rounded-full z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {activeSection === link.name && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <motion.div whileTap={{ rotate: 15 }}>
            <ThemeToggle />
          </motion.div>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-[0_4px_14px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] flex items-center gap-1.5 group"
          >
            Resume
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform opacity-80" />
          </motion.a>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-3 md:hidden pr-3">
          <motion.div whileTap={{ rotate: 15 }}>
            <ThemeToggle />
          </motion.div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[var(--primary-text)]"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[100px] left-4 right-4 z-40 md:hidden bg-[var(--surface)]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors p-2 rounded-xl hover:bg-[var(--primary-text)]/5"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 mt-2 text-center rounded-2xl bg-[var(--accent)] text-white font-semibold shadow-md flex justify-center items-center gap-2"
              >
                Resume
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
