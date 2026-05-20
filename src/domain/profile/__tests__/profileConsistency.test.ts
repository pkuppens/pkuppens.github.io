import { describe, it, expect } from 'vitest'
import { DISPLAY_PREFERENCES, PROFILE_EVALUATOR_PREFERENCES } from '../profileData'
import { DEFAULT_PREFERENCES } from '../../evaluator/defaultPreferences'

describe('profile consistency', () => {
  it('evaluator defaults re-export profile scoring preferences', () => {
    expect(DEFAULT_PREFERENCES).toEqual(PROFILE_EVALUATOR_PREFERENCES)
  })

  it('displays rate range aligned with scoring minimum and target', () => {
    const rateCard = DISPLAY_PREFERENCES.find(p => p.label === 'Rate range')
    expect(rateCard?.value).toBe(
      `€${PROFILE_EVALUATOR_PREFERENCES.minHourlyRate}–€${PROFILE_EVALUATOR_PREFERENCES.targetHourlyRate}/hour`,
    )
  })

  it('displays contract duration aligned with scoring bounds', () => {
    const durationCard = DISPLAY_PREFERENCES.find(p => p.label === 'Contract duration')
    expect(durationCard?.value).toBe(
      `${PROFILE_EVALUATOR_PREFERENCES.minDurationMonths}–${PROFILE_EVALUATOR_PREFERENCES.maxDurationMonths} months preferred`,
    )
  })
})
