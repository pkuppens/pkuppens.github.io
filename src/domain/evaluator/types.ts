export type ScoreLevel = 'excellent' | 'good' | 'fair' | 'poor'

export interface CriterionScore {
  criterionId: string
  label: string
  weight: number
  rawScore: number      // 0–100
  weightedScore: number // rawScore * weight / totalWeight
}

export interface EvaluationResult {
  totalScore: number           // 0–100
  level: ScoreLevel
  criterionScores: CriterionScore[]
  recommendation: string
}

export interface OpportunityInput {
  title: string
  domain: string
  hoursPerWeek: number
  dailyRate: number             // EUR
  commuteMinutes: number
  hybridDaysOnsite: number      // days per week onsite
  durationMonths: number
  technologies: string[]
  notes: string
}

export interface CriterionConfig {
  id: string
  label: string
  weight: number               // relative weight (will be normalised)
  evaluate: (input: OpportunityInput, prefs: ProfilePreferences) => number  // returns 0–100
}

export interface ProfilePreferences {
  preferredDomains: string[]
  minHoursPerWeek: number
  maxHoursPerWeek: number
  minDailyRate: number
  targetDailyRate: number
  maxCommuteMinutes: number
  maxOnsiteDaysPerWeek: number
  minDurationMonths: number
  maxDurationMonths: number
  preferredTechnologies: string[]
}
