/**
 * Commute criterion scoring (0–100 raw score; may go negative before weighting).
 *
 * One-way `commuteMinutes` is compared to per-day thresholds. Degradation is
 * multiplied by sqrt(onsite days per week) so more office days amplify the penalty.
 */

const ACCEPTABLE_MINUTES = 10
const LINEAR_MAX_MINUTES = 60
const PENALTY_MAX_MINUTES = 90
const MAX_EXTRA_PENALTY = 60

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Degradation points subtracted from 100 before onsite-day weighting.
 * Up to 10 min/day: 0. Linear 10→60: 0→100. Extra 60→90: up to +60 penalty.
 */
export function commuteDegradation(commuteMinutes: number): number {
  if (commuteMinutes <= ACCEPTABLE_MINUTES) return 0

  if (commuteMinutes <= LINEAR_MAX_MINUTES) {
    return ((commuteMinutes - ACCEPTABLE_MINUTES) / (LINEAR_MAX_MINUTES - ACCEPTABLE_MINUTES)) * 100
  }

  const linearDegradation = 100
  if (commuteMinutes <= PENALTY_MAX_MINUTES) {
    const extra =
      ((commuteMinutes - LINEAR_MAX_MINUTES) / (PENALTY_MAX_MINUTES - LINEAR_MAX_MINUTES)) *
      MAX_EXTRA_PENALTY
    return linearDegradation + extra
  }

  return linearDegradation + MAX_EXTRA_PENALTY
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
