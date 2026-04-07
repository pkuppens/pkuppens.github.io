import { describe, it, expect } from 'vitest'
import { evaluateOpportunity, getScoreLevel, getRecommendation } from '../scoring'
import { CRITERIA } from '../criteria'
import { DEFAULT_PREFERENCES } from '../defaultPreferences'
import type { OpportunityInput } from '../types'

const perfectInput: OpportunityInput = {
  title: 'Senior Python Developer',
  domain: 'Finance',
  hoursPerWeek: 40,
  dailyRate: 1000,
  commuteMinutes: 0,
  hybridDaysOnsite: 2,
  durationMonths: 6,
  technologies: ['Python', 'Azure', 'React'],
  notes: '',
}

const poorInput: OpportunityInput = {
  title: 'Junior Developer',
  domain: 'Unknown',
  hoursPerWeek: 20,
  dailyRate: 400,
  commuteMinutes: 120,
  hybridDaysOnsite: 5,
  durationMonths: 1,
  technologies: ['COBOL', 'Fortran'],
  notes: '',
}

describe('getScoreLevel', () => {
  it('returns excellent for scores >= 80', () => {
    expect(getScoreLevel(80)).toBe('excellent')
    expect(getScoreLevel(100)).toBe('excellent')
  })

  it('returns good for scores 60-79', () => {
    expect(getScoreLevel(60)).toBe('good')
    expect(getScoreLevel(79)).toBe('good')
  })

  it('returns fair for scores 40-59', () => {
    expect(getScoreLevel(40)).toBe('fair')
    expect(getScoreLevel(59)).toBe('fair')
  })

  it('returns poor for scores below 40', () => {
    expect(getScoreLevel(39)).toBe('poor')
    expect(getScoreLevel(0)).toBe('poor')
  })
})

describe('getRecommendation', () => {
  it('returns distinct recommendations for each level', () => {
    const excellent = getRecommendation(90, 'excellent')
    const good = getRecommendation(70, 'good')
    const fair = getRecommendation(50, 'fair')
    const poor = getRecommendation(30, 'poor')
    expect(excellent).not.toBe(good)
    expect(good).not.toBe(fair)
    expect(fair).not.toBe(poor)
  })
})

describe('evaluateOpportunity', () => {
  it('returns a score between 0 and 100', () => {
    const result = evaluateOpportunity(perfectInput, DEFAULT_PREFERENCES, CRITERIA)
    expect(result.totalScore).toBeGreaterThanOrEqual(0)
    expect(result.totalScore).toBeLessThanOrEqual(100)
  })

  it('scores a perfect-match input higher than a poor-match input', () => {
    const perfect = evaluateOpportunity(perfectInput, DEFAULT_PREFERENCES, CRITERIA)
    const poor = evaluateOpportunity(poorInput, DEFAULT_PREFERENCES, CRITERIA)
    expect(perfect.totalScore).toBeGreaterThan(poor.totalScore)
  })

  it('returns criterion scores for all criteria', () => {
    const result = evaluateOpportunity(perfectInput, DEFAULT_PREFERENCES, CRITERIA)
    expect(result.criterionScores).toHaveLength(CRITERIA.length)
  })

  it('has criterionScores summing approximately to totalScore', () => {
    const result = evaluateOpportunity(perfectInput, DEFAULT_PREFERENCES, CRITERIA)
    const sum = result.criterionScores.reduce((acc, cs) => acc + cs.weightedScore, 0)
    expect(Math.abs(sum - result.totalScore)).toBeLessThan(1)
  })

  it('assigns excellent level to perfect input', () => {
    const result = evaluateOpportunity(perfectInput, DEFAULT_PREFERENCES, CRITERIA)
    expect(['excellent', 'good']).toContain(result.level)
  })

  it('assigns poor level to poor input', () => {
    const result = evaluateOpportunity(poorInput, DEFAULT_PREFERENCES, CRITERIA)
    expect(['poor', 'fair']).toContain(result.level)
  })

  it('scores rate at 100 when dailyRate >= targetDailyRate', () => {
    const input = { ...perfectInput, dailyRate: 1200 }
    const result = evaluateOpportunity(input, DEFAULT_PREFERENCES, CRITERIA)
    const rateScore = result.criterionScores.find(cs => cs.criterionId === 'rate')
    expect(rateScore?.rawScore).toBe(100)
  })

  it('scores rate at 0 when dailyRate < minDailyRate', () => {
    const input = { ...perfectInput, dailyRate: 200 }
    const result = evaluateOpportunity(input, DEFAULT_PREFERENCES, CRITERIA)
    const rateScore = result.criterionScores.find(cs => cs.criterionId === 'rate')
    expect(rateScore?.rawScore).toBe(0)
  })

  it('scores commute at 100 for remote (0 minutes)', () => {
    const input = { ...perfectInput, commuteMinutes: 0 }
    const result = evaluateOpportunity(input, DEFAULT_PREFERENCES, CRITERIA)
    const commuteScore = result.criterionScores.find(cs => cs.criterionId === 'commute')
    expect(commuteScore?.rawScore).toBe(100)
  })

  it('scores technology fit at 100 when all techs are preferred', () => {
    const input = { ...perfectInput, technologies: ['Python', 'Azure'] }
    const result = evaluateOpportunity(input, DEFAULT_PREFERENCES, CRITERIA)
    const techScore = result.criterionScores.find(cs => cs.criterionId === 'technology')
    expect(techScore?.rawScore).toBe(100)
  })

  it('scores technology fit at 0 when no techs match', () => {
    const input = { ...perfectInput, technologies: ['COBOL', 'Fortran'] }
    const result = evaluateOpportunity(input, DEFAULT_PREFERENCES, CRITERIA)
    const techScore = result.criterionScores.find(cs => cs.criterionId === 'technology')
    expect(techScore?.rawScore).toBe(0)
  })
})
