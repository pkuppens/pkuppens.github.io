import { describe, it, expect, beforeEach } from 'vitest'
import {
  createDefaultOpportunityInput,
  loadEvaluatorInput,
  loadEvaluatorPreferences,
  persistEvaluatorPreferences,
  runEvaluation,
} from '../evaluatorSession'
import { DEFAULT_PREFERENCES } from '../defaultPreferences'
import { STORAGE_KEYS } from '../../../infrastructure/storageKeys'

describe('evaluatorSession', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('createDefaultOpportunityInput uses target hourly rate from preferences', () => {
    const input = createDefaultOpportunityInput(DEFAULT_PREFERENCES)
    expect(input.hourlyRate).toBe(DEFAULT_PREFERENCES.targetHourlyRate)
  })

  it('loadEvaluatorPreferences returns defaults when storage is empty', () => {
    expect(loadEvaluatorPreferences()).toEqual(DEFAULT_PREFERENCES)
  })

  it('persists and reloads visitor preference overrides', () => {
    const custom = { ...DEFAULT_PREFERENCES, targetHourlyRate: 120 }
    persistEvaluatorPreferences(custom)
    expect(loadEvaluatorPreferences()).toEqual(custom)
  })

  it('loadEvaluatorInput falls back to defaults when storage is empty', () => {
    const input = loadEvaluatorInput()
    expect(input.hourlyRate).toBe(DEFAULT_PREFERENCES.targetHourlyRate)
  })

  it('runEvaluation returns a score between 0 and 100', () => {
    const input = createDefaultOpportunityInput()
    const result = runEvaluation(
      { ...input, domain: 'Finance', hourlyRate: 140, commuteMinutes: 0 },
      DEFAULT_PREFERENCES,
    )
    expect(result.totalScore).toBeGreaterThanOrEqual(0)
    expect(result.totalScore).toBeLessThanOrEqual(100)
  })

  it('uses namespaced storage keys', () => {
    persistEvaluatorPreferences(DEFAULT_PREFERENCES)
    expect(localStorage.getItem(`pkuppens_${STORAGE_KEYS.evaluatorPreferences}`)).not.toBeNull()
  })
})
