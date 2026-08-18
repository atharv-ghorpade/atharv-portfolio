"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { AssignmentModal } from "./AssignmentModal"
import { AssignmentFilters } from "./AssignmentFilters"
import { AssignmentSearch } from "./AssignmentSearch"
import { AssignmentGrid } from "./AssignmentGrid"

const FILTERS = ["All", "Workshop", "Research", "Presentation", "Poster", "Experiment", "Case Study", "Field Visit", "Reflection"]

interface ActivityWallProps {
  isAdmin?: boolean
}

export function ActivityWall({ isAdmin = false }: ActivityWallProps) {
  const [assignments, setAssignments] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState("All")
  const [selectedAssignment, setSelectedAssignment] = React.useState<any>(null)

  const supabase = createClient()

  React.useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .order('activity_date', { ascending: false })
      
    if (!error && data) {
      setAssignments(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    
    setAssignments(prev => prev.filter(a => a.id !== id)) // Optimistic UI update
    
    const { error } = await supabase.from('assignments').delete().eq('id', id)
    if (error) {
      alert("Failed to delete assignment.")
      fetchAssignments() // Revert if failed
    }
  }

  const filtered = assignments.filter(a => {
    const matchesFilter = activeFilter === "All" || a.category === activeFilter
    const searchLower = search.toLowerCase()
    const matchesSearch = a.title.toLowerCase().includes(searchLower) || 
                          a.tags?.some((t: string) => t.toLowerCase().includes(searchLower)) ||
                          a.description.toLowerCase().includes(searchLower)
    return matchesFilter && matchesSearch
  })

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    assignments.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1
    })
    return counts
  }, [assignments])

  return (
    <section id="ewaste-activities" className="relative w-full py-24 overflow-hidden bg-[var(--background)]">
      
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--primary-text) 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <div className="w-full max-w-3xl flex flex-col items-center text-center mb-16">
          <h3 className="text-[10px] font-bold text-[var(--secondary-text)] tracking-[0.2em] uppercase mb-4">
            E-Waste in Practice
          </h3>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-[var(--primary-text)] mb-6">
            A curated collection of assignments.
          </h2>
          <p className="text-base md:text-lg text-[var(--secondary-text)] font-medium max-w-2xl">
            Documenting {assignments.length} experiments, classroom activities, reflections, and sustainable solutions completed throughout my E-Waste Management semester.
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-[var(--border-color)] pb-6">
          <AssignmentFilters 
            filters={FILTERS} 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
            counts={categoryCounts}
            totalCount={assignments.length}
          />
          <AssignmentSearch value={search} onChange={setSearch} />
        </div>

        <AssignmentGrid 
          assignments={filtered} 
          loading={loading} 
          onSelect={setSelectedAssignment} 
          isAdmin={isAdmin}
          onDelete={handleDelete}
        />

      </div>

      {selectedAssignment && (
        <AssignmentModal 
          assignment={selectedAssignment} 
          onClose={() => setSelectedAssignment(null)} 
        />
      )}
    </section>
  )
}
