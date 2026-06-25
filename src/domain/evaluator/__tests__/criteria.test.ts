import { describe, it, expect } from 'vitest'
import { CRITERIA } from '../criteria'
import { DEFAULT_PREFERENCES } from '../defaultPreferences'
import type { OpportunityInput, ProfilePreferences } from '../types'

const baseInput: OpportunityInput = {
  title: 'Test',
  domain: 'Finance',
  hoursPerWeek: 40,
  hourlyRate: 120,
  commuteMinutes: 30,
  hybridDaysOnsite: 2,
  durationMonths: 6,
  technologies: ['Python'],
  notes: '',
}

function scoreCriterion(
  id: string,
  input: OpportunityInput,
  prefs: ProfilePreferences = DEFAULT_PREFERENCES,
): number {
  const criterion = CRITERIA.find(c => c.id === id)
  if (!criterion) throw new Error(`unknown criterion: ${id}`)
  return criterion.evaluate(input, prefs)
}

describe('criteria', () => {
  describe('domain', () => {
    it('returns 100 when domain matches a preferred domain', () => {
      expect(scoreCriterion('domain', { ...baseInput, domain: 'Healthcare AI' })).toBe(100)
    })

    it('returns 40 when domain does not match', () => {
      expect(scoreCriterion('domain', { ...baseInput, domain: 'Construction' })).toBe(40)
    })

    it('returns 50 when domain is empty', () => {
      expect(scoreCriterion('domain', { ...baseInput, domain: '' })).toBe(50)
    })
  })

  describe('rate', () => {
    it('returns 100 at or above target hourly rate', () => {
      expect(scoreCriterion('rate', { ...baseInput, hourlyRate: 140 })).toBe(100)
      expect(scoreCriterion('rate', { ...baseInput, hourlyRate: 150 })).toBe(100)
    })

    it('returns 0 below minimum hourly rate', () => {
      expect(scoreCriterion('rate', { ...baseInput, hourlyRate: 99 })).toBe(0)
    })
  })

  describe('hours', () => {
    it('returns 100 within preferred hours band', () => {
      expect(scoreCriterion('hours', { ...baseInput, hoursPerWeek: 36 })).toBe(100)
    })

    it('penalises hours below minimum', () => {
      expect(scoreCriterion('hours', { ...baseInput, hoursPerWeek: 24 })).toBeLessThan(100)
    })

    it('penalises hours above maximum', () => {
      expect(scoreCriterion('hours', { ...baseInput, hoursPerWeek: 48 })).toBeLessThan(100)
    })
  })

  describe('commute', () => {
    it('returns 100 for fully remote (0 onsite days)', () => {
      expect(
        scoreCriterion('commute', { ...baseInput, commuteMinutes: 90, hybridDaysOnsite: 0 }),
      ).toBe(100)
    })

    it('penalises full onsite with a long commute below zero', () => {
      expect(
        scoreCriterion('commute', { ...baseInput, commuteMinutes: 90, hybridDaysOnsite: 5 }),
      ).toBeLessThan(0)
    })

    it('scores 25 for 60 minutes with 1 onsite day', () => {
      expect(
        scoreCriterion('commute', { ...baseInput, commuteMinutes: 60, hybridDaysOnsite: 1 }),
      ).toBe(25)
    })

    it('scores -50 for 60 minutes with 4 onsite days', () => {
      expect(
        scoreCriterion('commute', { ...baseInput, commuteMinutes: 60, hybridDaysOnsite: 4 }),
      ).toBe(-50)
    })
  })

  describe('hybrid', () => {
    it('returns 100 when onsite days are within limit', () => {
      expect(scoreCriterion('hybrid', { ...baseInput, hybridDaysOnsite: 2 })).toBe(100)
    })

    it('penalises excess onsite days', () => {
      expect(scoreCriterion('hybrid', { ...baseInput, hybridDaysOnsite: 5 })).toBeLessThan(100)
    })
  })

  describe('duration', () => {
    it('returns 100 inside preferred duration range', () => {
      expect(scoreCriterion('duration', { ...baseInput, durationMonths: 6 })).toBe(100)
    })

    it('penalises duration below minimum', () => {
      expect(scoreCriterion('duration', { ...baseInput, durationMonths: 1 })).toBeLessThan(100)
    })
  })

  describe('technology', () => {
    it('returns 50 when no technologies listed', () => {
      expect(scoreCriterion('technology', { ...baseInput, technologies: [] })).toBe(50)
    })

    it('returns 100 when all technologies match preferences', () => {
      expect(
        scoreCriterion('technology', { ...baseInput, technologies: ['Python', 'Azure'] }),
      ).toBe(100)
    })

    it('returns 0 when no technologies match', () => {
      expect(
        scoreCriterion('technology', { ...baseInput, technologies: ['COBOL'] }),
      ).toBe(0)
    })
  })
})
