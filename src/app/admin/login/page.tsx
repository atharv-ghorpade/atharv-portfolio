"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  // Redirect if already logged in
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/admin")
      }
    })
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/admin")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[var(--surface)] border border-[var(--border-color)] rounded-[2rem] p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-4 text-[var(--accent)]">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-[var(--primary-text)]">
            Admin CMS
          </h1>
          <p className="text-[var(--secondary-text)] font-medium mt-2">
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] text-[var(--primary-text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[var(--primary-text)] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] text-[var(--primary-text)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </main>
  )
}
