import type { ScoreLevel } from './types'

/** Shared thresholds (0–100) for overall Evaluation level and per-criterion bars. */
export const SCORE_BAND_THRESHOLDS = {
  excellent: 90,
  good: 60,
  fair: 40,
} as const

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= SCORE_BAND_THRESHOLDS.excellent) return 'excellent'
  if (score >= SCORE_BAND_THRESHOLDS.good) return 'good'
  if (score >= SCORE_BAND_THRESHOLDS.fair) return 'fair'
  return 'poor'
}

export const LEVEL_PRESENTATION: Record<
  ScoreLevel,
  { label: string; color: string; bg: string }
> = {
  excellent: { label: 'Excellent fit', color: '#16a34a', bg: '#f0fdf4' },
  good: { label: 'Good fit', color: '#2563eb', bg: '#eff6ff' },
  fair: { label: 'Fair fit', color: '#d97706', bg: '#fffbeb' },
  poor: { label: 'Poor fit', color: '#dc2626', bg: '#fef2f2' },
}

/** Colour for a raw criterion score bar (same bands as overall level). */
export function getRawScoreColor(rawScore: number): string {
  const level = getScoreLevel(rawScore)
  return LEVEL_PRESENTATION[level].color
}
