import { describe, it, expect } from 'vitest'
import { commuteDegradation, scoreCommute } from '../commuteScore'

describe('commuteDegradation', () => {
  it('returns 0 up to 10 minutes per day', () => {
    expect(commuteDegradation(0)).toBe(0)
    expect(commuteDegradation(10)).toBe(0)
  })

  it('degrades linearly from 10 to 60 minutes', () => {
    expect(commuteDegradation(35)).toBe(50)
    expect(commuteDegradation(60)).toBe(100)
  })

  it('adds up to 60 penalty points from 60 to 90 minutes', () => {
    expect(commuteDegradation(75)).toBe(130)
    expect(commuteDegradation(90)).toBe(160)
  })
})

describe('scoreCommute', () => {
  it('returns 100 for fully remote (0 onsite days)', () => {
    expect(scoreCommute(120, 0)).toBe(100)
  })

  it('penalises full onsite with a long commute below zero', () => {
    expect(scoreCommute(90, 5)).toBeLessThan(0)
  })

  it('returns 100 for full onsite when commute is acceptable', () => {
    expect(scoreCommute(10, 5)).toBe(100)
  })

  it('returns 100 when commute is within 10 minutes on hybrid days', () => {
    expect(scoreCommute(10, 2)).toBe(100)
  })

  it('scores 0% for 60 minutes with 1 onsite day', () => {
    expect(scoreCommute(60, 1)).toBe(0)
  })

  it('scores -100% for 60 minutes with 4 onsite days', () => {
    expect(scoreCommute(60, 4)).toBe(-100)
  })

  it('scales penalty by sqrt(onsite days)', () => {
    const oneDay = scoreCommute(45, 1)
    const fourDays = scoreCommute(45, 4)
    expect(fourDays).toBeLessThan(oneDay)
    expect(oneDay - fourDays).toBeGreaterThan(0)
  })
})
