import { calculateScore, calculateBreakdowns } from "./scoring"
import { getRecommendations } from "./recommendations"

export type CalculatorResult = {
  earthEquivalent: number
  categoryBreakdowns: Record<string, number>
  highestImpactCategory: string
  recommendations: { title: string, text: string }[]
}

export function generateCalculatorResult(answers: Record<string, string | string[]>): CalculatorResult {
  const earthEquivalent = calculateScore(answers)
  const breakdowns = calculateBreakdowns(answers)
  
  // Find highest category
  const highestImpactCategory = Object.keys(breakdowns).reduce((a, b) => breakdowns[a] > breakdowns[b] ? a : b)
  
  const recommendations = getRecommendations(breakdowns)

  return {
    earthEquivalent,
    categoryBreakdowns: breakdowns,
    highestImpactCategory,
    recommendations
  }
}
