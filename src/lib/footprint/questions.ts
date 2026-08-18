export type Chapter = "HOUSEHOLD" | "TRANSPORT" | "LIFESTYLE"

export type QuestionOption = {
  id: string
  label: string
  weight: number
}

export type CalculatorQuestion = {
  id: string
  chapter: Chapter
  questionText: string
  description?: string
  options: QuestionOption[]
  allowMultiple?: boolean
}

export const footprintQuestions: CalculatorQuestion[] = [
  // ==========================================
  // CHAPTER 01: HOUSEHOLD
  // ==========================================
  {
    id: "h1",
    chapter: "HOUSEHOLD",
    questionText: "How many people live in your household?",
    options: [
      { id: "h1_1", label: "1", weight: 1.5 },
      { id: "h1_2", label: "2", weight: 1.0 },
      { id: "h1_3", label: "3", weight: 0.8 },
      { id: "h1_4", label: "4", weight: 0.6 },
      { id: "h1_5", label: "5+", weight: 0.5 },
    ]
  },
  {
    id: "h2",
    chapter: "HOUSEHOLD",
    questionText: "Approximately how large is your home?",
    options: [
      { id: "h2_under50", label: "Under 50 m²", weight: 0.5 },
      { id: "h2_50_100", label: "50–100 m²", weight: 0.8 },
      { id: "h2_100_150", label: "100–150 m²", weight: 1.0 },
      { id: "h2_150_250", label: "150–250 m²", weight: 1.5 },
      { id: "h2_250plus", label: "250+ m²", weight: 2.0 },
      { id: "h2_dunno", label: "I don't know", weight: 1.0 },
    ]
  },
  {
    id: "h3",
    chapter: "HOUSEHOLD",
    questionText: "What type of home do you live in?",
    options: [
      { id: "h3_flat", label: "Flat / Apartment", weight: 0.7 },
      { id: "h3_attached", label: "Attached House", weight: 0.9 },
      { id: "h3_semi", label: "Semi-detached House", weight: 1.1 },
      { id: "h3_detached", label: "Detached House", weight: 1.4 },
    ]
  },
  {
    id: "h4",
    chapter: "HOUSEHOLD",
    questionText: "How energy efficient is your home?",
    options: [
      { id: "h4_high", label: "Highly Efficient (Solar, LED, Insulation)", weight: 0.5 },
      { id: "h4_avg", label: "Average Efficiency", weight: 1.0 },
      { id: "h4_low", label: "Below Average (Older appliances, high usage)", weight: 1.8 },
    ]
  },
  {
    id: "h5",
    chapter: "HOUSEHOLD",
    questionText: "How much of your electricity comes from clean / renewable sources?",
    options: [
      { id: "h5_0", label: "0%", weight: 1.5 },
      { id: "h5_25", label: "25%", weight: 1.2 },
      { id: "h5_50", label: "50%", weight: 0.8 },
      { id: "h5_75", label: "75%", weight: 0.4 },
      { id: "h5_100", label: "100%", weight: 0.0 },
      { id: "h5_dunno", label: "Not sure", weight: 1.0 },
    ]
  },
  {
    id: "h6",
    chapter: "HOUSEHOLD",
    questionText: "What is the main source of heating/cooling energy in your home?",
    options: [
      { id: "h6_elec", label: "Electricity", weight: 0.8 },
      { id: "h6_gas", label: "Natural Gas", weight: 1.2 },
      { id: "h6_oil", label: "Oil", weight: 1.6 },
      { id: "h6_coal", label: "Coal", weight: 2.5 },
      { id: "h6_wood", label: "Wood", weight: 1.0 },
      { id: "h6_none", label: "No heating", weight: 0.1 },
    ]
  },

  // ==========================================
  // CHAPTER 02: TRANSPORT
  // ==========================================
  {
    id: "t1",
    chapter: "TRANSPORT",
    questionText: "How do you usually travel?",
    description: "Select your primary mode of daily transportation.",
    options: [
      { id: "t1_walk", label: "Walking", weight: 0.0 },
      { id: "t1_bike", label: "Bicycle", weight: 0.1 },
      { id: "t1_bus", label: "Public Bus", weight: 0.5 },
      { id: "t1_train", label: "Train / Metro", weight: 0.3 },
      { id: "t1_scooter", label: "Motorbike / Scooter", weight: 1.0 },
      { id: "t1_car", label: "Car", weight: 2.0 },
    ]
  },
  {
    id: "t2",
    chapter: "TRANSPORT",
    questionText: "How many hours per week do you use public transportation?",
    options: [
      { id: "t2_0", label: "0 hours", weight: 0.0 },
      { id: "t2_1_3", label: "1–3 hours", weight: 0.3 },
      { id: "t2_4_6", label: "4–6 hours", weight: 0.6 },
      { id: "t2_7plus", label: "7+ hours", weight: 1.0 },
    ]
  },
  {
    id: "t3",
    chapter: "TRANSPORT",
    questionText: "Do you regularly use a car?",
    options: [
      { id: "t3_no", label: "No", weight: 0.0 },
      { id: "t3_rarely", label: "Rarely (Under 50 km/week)", weight: 0.5 },
      { id: "t3_often", label: "Often (50–200 km/week)", weight: 1.5 },
      { id: "t3_heavy", label: "Very Often (200+ km/week)", weight: 3.0 },
    ]
  },
  {
    id: "t4",
    chapter: "TRANSPORT",
    questionText: "Do you regularly use a motorbike or scooter?",
    options: [
      { id: "t4_no", label: "No", weight: 0.0 },
      { id: "t4_rarely", label: "Rarely (Under 50 km/week)", weight: 0.3 },
      { id: "t4_often", label: "Often (50–200 km/week)", weight: 0.8 },
      { id: "t4_heavy", label: "Very Often (200+ km/week)", weight: 1.5 },
    ]
  },
  {
    id: "t5",
    chapter: "TRANSPORT",
    questionText: "How many flights do you take in a typical year?",
    description: "Count round trips as 1 flight.",
    options: [
      { id: "t5_0", label: "0 flights", weight: 0.0 },
      { id: "t5_1_2", label: "1–2 short/domestic flights", weight: 0.5 },
      { id: "t5_3_5", label: "3–5 short or 1–2 medium flights", weight: 1.5 },
      { id: "t5_6_plus", label: "6+ short or 2+ long-haul flights", weight: 3.5 },
    ]
  },

  // ==========================================
  // CHAPTER 03: LIFESTYLE
  // ==========================================
  {
    id: "l1",
    chapter: "LIFESTYLE",
    questionText: "Which best describes your usual diet?",
    options: [
      { id: "l1_meat_heavy", label: "Meat with most meals", weight: 2.5 },
      { id: "l1_meat_some", label: "Meat with some meals", weight: 1.5 },
      { id: "l1_fish", label: "Meat rarely / mostly fish", weight: 1.0 },
      { id: "l1_veg", label: "Vegetarian", weight: 0.5 },
      { id: "l1_vegan", label: "Vegan", weight: 0.2 },
    ]
  },
  {
    id: "l2",
    chapter: "LIFESTYLE",
    questionText: "How often does your household eat outside / order food?",
    options: [
      { id: "l2_never", label: "Never", weight: 0.0 },
      { id: "l2_1_2", label: "1–2 times/week", weight: 0.3 },
      { id: "l2_3_4", label: "3–4 times/week", weight: 0.8 },
      { id: "l2_5plus", label: "5+ times/week", weight: 1.5 },
    ]
  },
  {
    id: "l3",
    chapter: "LIFESTYLE",
    questionText: "Do you usually buy local products?",
    options: [
      { id: "l3_often", label: "Often", weight: 0.2 },
      { id: "l3_sometimes", label: "Sometimes", weight: 0.6 },
      { id: "l3_rarely", label: "Rarely", weight: 1.0 },
      { id: "l3_dunno", label: "Not sure", weight: 0.8 },
    ]
  },
  {
    id: "l4",
    chapter: "LIFESTYLE",
    questionText: "How often do you consider whether a company is environmentally responsible?",
    options: [
      { id: "l4_often", label: "Often", weight: 0.2 },
      { id: "l4_sometimes", label: "Sometimes", weight: 0.6 },
      { id: "l4_rarely", label: "Rarely", weight: 1.0 },
      { id: "l4_never", label: "Never", weight: 1.2 },
    ]
  },
  {
    id: "l5",
    chapter: "LIFESTYLE",
    questionText: "How often do you purchase new electronics (phones, laptops)?",
    options: [
      { id: "l5_rare", label: "Only when broken (4+ years)", weight: 0.3 },
      { id: "l5_occ", label: "Every 2-3 years", weight: 1.0 },
      { id: "l5_freq", label: "Every year (Always upgrading)", weight: 2.5 },
    ]
  },
  {
    id: "l6",
    chapter: "LIFESTYLE",
    questionText: "How often do you recycle or compost?",
    options: [
      { id: "l6_always", label: "Always", weight: 0.0 },
      { id: "l6_often", label: "Often", weight: 0.3 },
      { id: "l6_sometimes", label: "Sometimes", weight: 0.8 },
      { id: "l6_rarely", label: "Rarely", weight: 1.2 },
      { id: "l6_never", label: "Never", weight: 1.8 },
    ]
  },
  {
    id: "l7",
    chapter: "LIFESTYLE",
    questionText: "Which of these do you regularly recycle?",
    description: "Select all that apply.",
    allowMultiple: true,
    options: [
      { id: "l7_food", label: "Food / compost", weight: -0.2 },
      { id: "l7_paper", label: "Paper", weight: -0.1 },
      { id: "l7_plastic", label: "Plastic", weight: -0.2 },
      { id: "l7_glass", label: "Glass", weight: -0.1 },
      { id: "l7_metal", label: "Metal", weight: -0.2 },
      { id: "l7_ewaste", label: "Electronic waste", weight: -0.3 },
    ]
  }
]
