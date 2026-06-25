import { describe, it, expect } from 'vitest'
import { commuteDegradation, scoreCommute } from '../commuteScore'

describe('commuteDegradation', () => {
  it('returns 0 up to 15 minutes one-way (30 min round trip free)', () => {
    expect(commuteDegradation(0)).toBe(0)
    expect(commuteDegradation(10)).toBe(0)
    expect(commuteDegradation(15)).toBe(0)
  })

  it('degrades linearly based on round-trip excess beyond 30 min', () => {
    // 35 min one-way = 70 min round trip = 40 min excess
    // 40/120 * 100 = 33.33...
    expect(commuteDegradation(35)).toBeCloseTo(33.33, 0)
    // 60 min one-way = 120 min round trip = 90 min excess
    // 90/120 * 100 = 75
    expect(commuteDegradation(60)).toBe(75)
  })

  it('reaches 100 degradation at 75 min one-way (150 min round trip = 120 excess)', () => {
    expect(commuteDegradation(75)).toBe(100)
  })

  it('extends degradation beyond 100 up to 200 for extreme commutes', () => {
    // 90 min one-way = 180 min round trip = 150 min excess
    // 100 + (150-120)/120*100 = 100 + 25 = 125
    expect(commuteDegradation(90)).toBe(125)
    // 135 min one-way = 270 min round trip = 240 min excess → cap at 200
    expect(commuteDegradation(135)).toBe(200)
  })
})

describe('scoreCommute', () => {
  it('returns 100 for fully remote (0 onsite days) regardless of commute', () => {
    expect(scoreCommute(120, 0)).toBe(100)
  })

  it('returns 100 for any commute under 15 min one-way regardless of days', () => {
    expect(scoreCommute(11, 2)).toBe(100)
    expect(scoreCommute(15, 5)).toBe(100)
  })

  it('penalises full onsite with a long commute below zero', () => {
    expect(scoreCommute(90, 5)).toBeLessThan(0)
  })

  it('scores 25% for 60 min one-way with 1 onsite day', () => {
    expect(scoreCommute(60, 1)).toBe(25)
  })

  it('scores -50% for 60 min one-way with 4 onsite days', () => {
    expect(scoreCommute(60, 4)).toBe(-50)
  })

  it('scales penalty by sqrt(onsite days)', () => {
    const oneDay = scoreCommute(45, 1)
    const fourDays = scoreCommute(45, 4)
    expect(fourDays).toBeLessThan(oneDay)
    expect(oneDay - fourDays).toBeGreaterThan(0)
  })
})
