import * as React from "react"
import { Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--background)] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-xl tracking-tighter text-foreground">
            &lt;AK/&gt;
          </span>
          <span className="text-[var(--secondary-text)] text-sm ml-4 border-l border-[var(--border-color)] pl-4">
            © {new Date().getFullYear()} Atharva Kulkarni. All rights reserved.
          </span>
        </div>
        
        <div className="flex items-center gap-5">
          <a href="https://github.com/atharvakulkarni" target="_blank" rel="noreferrer" className="text-[var(--secondary-text)] hover:text-[var(--accent)] transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/atharvakulkarni" target="_blank" rel="noreferrer" className="text-[var(--secondary-text)] hover:text-[var(--accent)] transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="mailto:contact@atharvakulkarni.com" className="text-[var(--secondary-text)] hover:text-[var(--accent)] transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
