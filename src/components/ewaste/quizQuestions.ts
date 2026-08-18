export type QuizOption = {
  id: string
  label: string
  isCorrect: boolean
}

export type QuizQuestion = {
  id: string
  questionText: string
  options: QuizOption[]
  explanation: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    questionText: "What exactly is E-Waste?",
    options: [
      { id: "a", label: "Spam emails and digital clutter", isCorrect: false },
      { id: "b", label: "Any electrical or electronic equipment that has been discarded", isCorrect: true },
      { id: "c", label: "Only broken computers and phones", isCorrect: false },
      { id: "d", label: "Radioactive materials from power plants", isCorrect: false },
    ],
    explanation: "E-waste includes practically anything with a plug or battery that is no longer wanted."
  },
  {
    id: "q2",
    questionText: "Which of these devices can become E-Waste?",
    options: [
      { id: "a", label: "Only laptops and smartphones", isCorrect: false },
      { id: "b", label: "Only large appliances like refrigerators", isCorrect: false },
      { id: "c", label: "Everything from smartwatches to microwaves and electric toothbrushes", isCorrect: true },
      { id: "d", label: "Only devices with screens", isCorrect: false },
    ],
    explanation: "Any device that relies on electric currents or electromagnetic fields becomes e-waste when discarded."
  },
  {
    id: "q3",
    questionText: "Why is E-Waste considered hazardous?",
    options: [
      { id: "a", label: "It takes up too much physical space", isCorrect: false },
      { id: "b", label: "It contains toxic substances like lead, mercury, and cadmium", isCorrect: true },
      { id: "c", label: "It emits radiation indefinitely", isCorrect: false },
      { id: "d", label: "It cannot be physically destroyed", isCorrect: false },
    ],
    explanation: "When improperly disposed of, these heavy metals can leach into soil and groundwater, causing severe health and environmental damage."
  },
  {
    id: "q4",
    questionText: "Which highly valuable materials can often be recovered from circuit boards?",
    options: [
      { id: "a", label: "Gold, silver, and palladium", isCorrect: true },
      { id: "b", label: "Diamonds and sapphires", isCorrect: false },
      { id: "c", label: "Plutonium and uranium", isCorrect: false },
      { id: "d", label: "Titanium and carbon fiber", isCorrect: false },
    ],
    explanation: "Circuit boards contain trace amounts of precious metals that can be recovered through urban mining."
  },
  {
    id: "q5",
    questionText: "What is the correct way to dispose of old electronics?",
    options: [
      { id: "a", label: "Throw them in the general trash bin", isCorrect: false },
      { id: "b", label: "Bury them in the garden", isCorrect: false },
      { id: "c", label: "Take them to certified e-waste recycling centers", isCorrect: true },
      { id: "d", label: "Burn them in an incinerator", isCorrect: false },
    ],
    explanation: "Certified recyclers ensure hazardous materials are handled safely and valuable components are recovered."
  },
  {
    id: "q6",
    questionText: "Why should lithium-ion batteries never be thrown into normal municipal waste?",
    options: [
      { id: "a", label: "They are too heavy for garbage trucks", isCorrect: false },
      { id: "b", label: "They can easily puncture, short circuit, and cause massive fires", isCorrect: true },
      { id: "c", label: "They dissolve into acid immediately", isCorrect: false },
      { id: "d", label: "They are illegal to own", isCorrect: false },
    ],
    explanation: "Crushed lithium batteries are the leading cause of fires in garbage trucks and recycling facilities worldwide."
  },
  {
    id: "q7",
    questionText: "What is the primary environmental benefit of recycling electronics?",
    options: [
      { id: "a", label: "It reduces the need to mine virgin materials from the Earth", isCorrect: true },
      { id: "b", label: "It produces clean energy", isCorrect: false },
      { id: "c", label: "It stops global warming entirely", isCorrect: false },
      { id: "d", label: "It cleans the oceans", isCorrect: false },
    ],
    explanation: "Mining virgin materials is incredibly carbon-intensive. Recovering metals from e-waste requires a fraction of the energy."
  },
  {
    id: "q8",
    questionText: "What typically happens to electronics after collection by certified recyclers?",
    options: [
      { id: "a", label: "They are immediately melted into a liquid", isCorrect: false },
      { id: "b", label: "They are sorted, shredded, and separated into core materials", isCorrect: true },
      { id: "c", label: "They are buried in special e-waste landfills", isCorrect: false },
      { id: "d", label: "They are launched into space", isCorrect: false },
    ],
    explanation: "Devices are shredded and then separated using magnets, eddy currents, and optical sorting to isolate plastics and metals."
  },
  {
    id: "q9",
    questionText: "What does 'refurbishment' mean in the context of electronics?",
    options: [
      { id: "a", label: "Painting the device a new color", isCorrect: false },
      { id: "b", label: "Repairing and restoring a device to a functional state for reuse", isCorrect: true },
      { id: "c", label: "Destroying the device permanently", isCorrect: false },
      { id: "d", label: "Breaking the device into its raw elements", isCorrect: false },
    ],
    explanation: "Refurbishment extends the lifespan of a product, keeping it in the circular economy longer before it needs to be recycled."
  },
  {
    id: "q10",
    questionText: "What is ultimately the best approach to reducing the e-waste crisis?",
    options: [
      { id: "a", label: "Building larger recycling facilities", isCorrect: false },
      { id: "b", label: "Buying more electronics to support the recycling industry", isCorrect: false },
      { id: "c", label: "Reducing consumption, repairing devices, and extending product lifespans", isCorrect: true },
      { id: "d", label: "Exporting e-waste to other countries", isCorrect: false },
    ],
    explanation: "While recycling is important, reducing initial consumption and extending the life of devices has the greatest environmental impact."
  }
]

export function getQuizResultLevel(score: number, total: number): { title: string, message: string } {
  if (score <= 3) {
    return { title: "Getting Started", message: "You are just beginning your sustainability journey. Keep exploring!" }
  } else if (score <= 6) {
    return { title: "E-Waste Explorer", message: "You've got a solid foundation in understanding electronic waste." }
  } else if (score <= 8) {
    return { title: "Sustainability Thinker", message: "Great job! You clearly understand the nuances of the circular economy." }
  } else {
    return { title: "E-Waste Champion", message: "Excellent! You are a true advocate for sustainable technology." }
  }
}
