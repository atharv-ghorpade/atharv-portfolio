"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { AssignmentForm } from "@/components/admin/AssignmentForm"
import { ActivityWall } from "@/components/ewaste/ActivityWall"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function AdminPage() {
  const [session, setSession] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [authError, setAuthError] = React.useState("")
  const [refreshKey, setRefreshKey] = React.useState(0)
  
  const supabase = createClient()

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setAuthError(error.message)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-8 shadow-xl shadow-[var(--glow)]"
        >
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-[var(--primary-text)] mb-2">Admin Access</h1>
            <p className="text-sm text-[var(--secondary-text)]">Enter your credentials to manage assignments.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--secondary-text)] tracking-wider uppercase mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--secondary-text)] tracking-wider uppercase mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 text-sm focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            
            {authError && <p className="text-red-500 text-xs font-medium">{authError}</p>}

            <button
              type="submit"
              className="w-full bg-[var(--primary-text)] hover:bg-[var(--accent)] text-[var(--background)] font-bold py-3 rounded-lg transition-colors mt-4"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-6">
      <div className="max-w-4xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[var(--primary-text)]">E-Waste Workspace</h1>
            <p className="text-[var(--secondary-text)]">Upload and manage your assignments.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm font-bold text-[var(--secondary-text)] hover:text-red-500 transition-colors"
          >
            Sign Out
          </button>
        </div>
        
        <AssignmentForm onPublish={() => setRefreshKey(prev => prev + 1)} />
      </div>

      {/* Render the Activity Wall directly in Admin to preview changes */}
      <div className="border-t border-[var(--border-color)] pt-12">
        <ActivityWall key={refreshKey} isAdmin={true} />
      </div>
    </div>
  )
}
