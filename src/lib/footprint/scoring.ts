import { footprintQuestions } from "./questions"

export const BASE_EARTH_IMPACT = 0.5 // Baseline footprint

export function calculateScore(answers: Record<string, string | string[]>): number {
  let totalWeight = BASE_EARTH_IMPACT

  Object.entries(answers).forEach(([questionId, selectedIds]) => {
    const question = footprintQuestions.find(q => q.id === questionId)
    if (!question) return

    const selectionArray = Array.isArray(selectedIds) ? selectedIds : [selectedIds]
    
    selectionArray.forEach(selId => {
      const option = question.options.find(o => o.id === selId)
      if (option) {
        totalWeight += option.weight
      }
    })
  })

  // Ensure the score is at least 0.1 (can't have negative Earths)
  return Math.max(0.1, Number(totalWeight.toFixed(1)))
}

export function calculateBreakdowns(answers: Record<string, string | string[]>): Record<string, number> {
  const breakdowns = {
    HOUSEHOLD: 0.1, // baseline
    TRANSPORT: 0.1, // baseline
    LIFESTYLE: 0.1  // baseline
  }

  Object.entries(answers).forEach(([questionId, selectedIds]) => {
    const question = footprintQuestions.find(q => q.id === questionId)
    if (!question) return

    const selectionArray = Array.isArray(selectedIds) ? selectedIds : [selectedIds]
    
    selectionArray.forEach(selId => {
      const option = question.options.find(o => o.id === selId)
      if (option) {
        breakdowns[question.chapter] += option.weight
      }
    })
  })

  return breakdowns
}
