import type { CriterionConfig, OpportunityInput, ProfilePreferences } from './types'

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function lerp(value: number, low: number, high: number): number {
  if (high <= low) return value >= high ? 100 : 0
  return clamp(((value - low) / (high - low)) * 100, 0, 100)
}

export const CRITERIA: CriterionConfig[] = [
  {
    id: 'domain',
    label: 'Domain Fit',
    weight: 20,
    evaluate(input: OpportunityInput, prefs: ProfilePreferences): number {
      if (!input.domain) return 50
      const match = prefs.preferredDomains.some(
        d => input.domain.toLowerCase().includes(d.toLowerCase()) ||
             d.toLowerCase().includes(input.domain.toLowerCase())
      )
      return match ? 100 : 40
    },
  },
  {
    id: 'rate',
    label: 'Daily Rate',
    weight: 25,
    evaluate(input: OpportunityInput, prefs: ProfilePreferences): number {
      const { minDailyRate, targetDailyRate } = prefs
      if (input.dailyRate >= targetDailyRate) return 100
      if (input.dailyRate < minDailyRate) return 0
      return lerp(input.dailyRate, minDailyRate, targetDailyRate)
    },
  },
  {
    id: 'hours',
    label: 'Hours / Week',
    weight: 15,
    evaluate(input: OpportunityInput, prefs: ProfilePreferences): number {
      const { minHoursPerWeek, maxHoursPerWeek } = prefs
      if (input.hoursPerWeek < minHoursPerWeek) {
        return lerp(input.hoursPerWeek, minHoursPerWeek - 8, minHoursPerWeek) * 0.5
      }
      if (input.hoursPerWeek > maxHoursPerWeek) {
        return clamp(100 - (input.hoursPerWeek - maxHoursPerWeek) * 10, 0, 80)
      }
      return 100
    },
  },
  {
    id: 'commute',
    label: 'Commute',
    weight: 15,
    evaluate(input: OpportunityInput, prefs: ProfilePreferences): number {
      if (input.commuteMinutes === 0) return 100
      if (input.commuteMinutes > prefs.maxCommuteMinutes) {
        return clamp(100 - (input.commuteMinutes - prefs.maxCommuteMinutes) * 2, 0, 30)
      }
      return lerp(prefs.maxCommuteMinutes - input.commuteMinutes, 0, prefs.maxCommuteMinutes) * 0.5 + 50
    },
  },
  {
    id: 'hybrid',
    label: 'Hybrid Arrangement',
    weight: 10,
    evaluate(input: OpportunityInput, prefs: ProfilePreferences): number {
      if (input.hybridDaysOnsite <= prefs.maxOnsiteDaysPerWeek) return 100
      const excess = input.hybridDaysOnsite - prefs.maxOnsiteDaysPerWeek
      return clamp(100 - excess * 25, 0, 100)
    },
  },
  {
    id: 'duration',
    label: 'Contract Duration',
    weight: 10,
    evaluate(input: OpportunityInput, prefs: ProfilePreferences): number {
      const { minDurationMonths, maxDurationMonths } = prefs
      if (input.durationMonths >= minDurationMonths && input.durationMonths <= maxDurationMonths) return 100
      if (input.durationMonths < minDurationMonths) {
        return lerp(input.durationMonths, 0, minDurationMonths) * 0.7
      }
      return 80
    },
  },
  {
    id: 'technology',
    label: 'Technology Fit',
    weight: 20,
    evaluate(input: OpportunityInput, prefs: ProfilePreferences): number {
      if (!input.technologies || input.technologies.length === 0) return 50
      const matches = input.technologies.filter(t =>
        prefs.preferredTechnologies.some(
          p => p.toLowerCase() === t.toLowerCase() ||
               p.toLowerCase().includes(t.toLowerCase()) ||
               t.toLowerCase().includes(p.toLowerCase())
        )
      )
      return Math.round((matches.length / input.technologies.length) * 100)
    },
  },
]
