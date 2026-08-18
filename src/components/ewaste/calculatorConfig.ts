// calculatorConfig.ts
// This engine drives the Earth Footprint Calculator
// Separating this from the UI allows it to be easily replaced with a real course questionnaire later.

export type AnswerOption = {
  id: string
  label: string
  impactValue: number // The relative impact score of this choice
}

export type CalculatorQuestion = {
  id: string
  category: "Household" | "Transportation" | "Lifestyle" | "Waste"
  questionText: string
  options: AnswerOption[]
}

export const calculatorQuestions: CalculatorQuestion[] = [
  {
    id: "q1",
    category: "Transportation",
    questionText: "How do you usually travel to college or work?",
    options: [
      { id: "walk", label: "Walk / Cycle", impactValue: 0.1 },
      { id: "public", label: "Public Transport", impactValue: 0.4 },
      { id: "two-wheeler", label: "Two Wheeler", impactValue: 0.8 },
      { id: "car", label: "Personal Car", impactValue: 1.5 },
    ]
  },
  {
    id: "q2",
    category: "Household",
    questionText: "How energy efficient is your home?",
    options: [
      { id: "high", label: "Highly Efficient (Solar, LED, Insulation)", impactValue: 0.2 },
      { id: "med", label: "Average Efficiency", impactValue: 0.7 },
      { id: "low", label: "Below Average (Older appliances, high usage)", impactValue: 1.2 },
    ]
  },
  {
    id: "q3",
    category: "Lifestyle",
    questionText: "How often do you purchase new electronics (phones, laptops)?",
    options: [
      { id: "rare", label: "Only when broken (4+ years)", impactValue: 0.2 },
      { id: "occ", label: "Every 2-3 years", impactValue: 0.8 },
      { id: "freq", label: "Every year (Always upgrading)", impactValue: 1.5 },
    ]
  },
  {
    id: "q4",
    category: "Waste",
    questionText: "What do you do with your old electronics?",
    options: [
      { id: "recycle", label: "Take them to certified e-waste recyclers", impactValue: 0.1 },
      { id: "donate", label: "Donate or hand down", impactValue: 0.2 },
      { id: "drawer", label: "Keep them in a drawer indefinitely", impactValue: 0.5 },
      { id: "trash", label: "Throw them in the regular trash", impactValue: 1.8 },
    ]
  }
]

// The formula engine calculates the "Earths" required.
export function calculateEarthImpact(answers: Record<string, AnswerOption>): number {
  let totalImpact = 0;
  
  // Base cost of living in modern society (arbitrary base value)
  const baseImpact = 0.8;

  Object.values(answers).forEach(option => {
    totalImpact += option.impactValue;
  });

  return Number((baseImpact + totalImpact).toFixed(1));
}

// Generate the category breakdown for the visual bar chart
export function calculateCategoryBreakdowns(answers: Record<string, AnswerOption>, questions: CalculatorQuestion[]) {
  const categories = {
    "Household": 0,
    "Transportation": 0,
    "Lifestyle": 0,
    "Waste": 0
  }

  Object.entries(answers).forEach(([qId, option]) => {
    const question = questions.find(q => q.id === qId)
    if (question) {
      categories[question.category] += option.impactValue
    }
  });

  return categories;
}

// Generate an actionable recommendation based on the highest impact category
export function generateRecommendation(breakdowns: Record<string, number>): { category: string, suggestion: string } {
  const highestCategory = Object.keys(breakdowns).reduce((a, b) => breakdowns[a] > breakdowns[b] ? a : b);
  
  const suggestions: Record<string, string> = {
    "Transportation": "Consider using public transportation or cycling more frequently to reduce your daily carbon footprint.",
    "Household": "Look into energy-efficient appliances or reducing passive energy consumption (phantom power) in your home.",
    "Lifestyle": "Try extending the lifecycle of your devices by repairing instead of replacing.",
    "Waste": "Make sure you are utilizing certified E-Waste drop-off points rather than throwing electronics in standard waste bins."
  }

  return {
    category: highestCategory,
    suggestion: suggestions[highestCategory] || "Small daily habits can make a large impact over time."
  }
}
