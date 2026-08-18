export function getRecommendations(breakdowns: Record<string, number>): { category: string, title: string, text: string }[] {
  // Find the highest impact category
  const sortedCategories = Object.entries(breakdowns).sort((a, b) => b[1] - a[1])
  const highestCategory = sortedCategories[0][0]

  const suggestions: Record<string, { title: string, text: string }[]> = {
    "HOUSEHOLD": [
      { title: "Reduce Passive Energy", text: "Unplug devices when not in use. Ghost power can account for up to 10% of home electricity." },
      { title: "Efficient Appliances", text: "Consider upgrading to high-efficiency LEDs and checking insulation to reduce HVAC loads." }
    ],
    "TRANSPORT": [
      { title: "Rethink Commutes", text: "Your transportation choices contribute most to your current result. Consider carpooling, public transit, or cycling." },
      { title: "Consolidate Trips", text: "Combining multiple errands into one trip significantly reduces weekly fuel consumption." }
    ],
    "LIFESTYLE": [
      { title: "Dietary Adjustments", text: "Meat-heavy diets drastically increase your footprint. Consider incorporating 2-3 plant-based meals per week." },
      { title: "E-Waste Mindfulness", text: "Avoid upgrading electronics yearly. Repair devices or ensure they reach certified E-Waste recyclers." }
    ]
  }

  const result = suggestions[highestCategory] || suggestions["LIFESTYLE"]
  
  return result.map(s => ({
    category: highestCategory,
    title: s.title,
    text: s.text
  }))
}
