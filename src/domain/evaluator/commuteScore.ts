/**
 * Commute criterion scoring (0–100 raw score; may go negative before weighting).
 *
 * The first 30 minutes of round-trip commute per day are free (15 min one-way).
 * Degradation is based on round-trip excess beyond 30 min/day:
 *   - 0 min excess → 0 degradation (100% score)
 *   - 120 min excess → 100 degradation (0% score)
 *   - 240 min excess → 200 degradation (-100% score)
 * Degradation is amplified by sqrt(onsite days per week).
 */

const FREE_ROUND_TRIP_MINUTES = 30
const EXCESS_TO_ZERO_SCORE = 120
const MAX_EXCESS = 240

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Degradation points (0–200) based on round-trip commute excess.
 */
export function commuteDegradation(commuteMinutes: number): number {
  const roundTrip = 2 * commuteMinutes
  const excess = Math.max(0, roundTrip - FREE_ROUND_TRIP_MINUTES)

  if (excess <= 0) return 0

  if (excess <= EXCESS_TO_ZERO_SCORE) {
    return (excess / EXCESS_TO_ZERO_SCORE) * 100
  }

  if (excess <= MAX_EXCESS) {
    const extraExcess = excess - EXCESS_TO_ZERO_SCORE
    const extraDegradation = (extraExcess / (MAX_EXCESS - EXCESS_TO_ZERO_SCORE)) * 100
    return 100 + extraDegradation
  }

  return 200
}

/**
 * Raw commute score for an opportunity.
 *
 * Args:
 *   commuteMinutes: one-way commute duration in minutes (per office day).
 *   hybridDaysOnsite: expected onsite days per week (0 = fully remote).
 *
 * Returns:
 *   number: raw score from -100 to 100.
 */
export function scoreCommute(commuteMinutes: number, hybridDaysOnsite: number): number {
  if (hybridDaysOnsite === 0) {
    return 100
  }

  const degradation = commuteDegradation(commuteMinutes)
  const weightedDegradation = degradation * Math.sqrt(Math.max(1, hybridDaysOnsite))
  return clamp(100 - weightedDegradation, -100, 100)
}
