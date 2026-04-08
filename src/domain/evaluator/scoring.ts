import type {
  CriterionConfig,
  EvaluationResult,
  OpportunityInput,
  ProfilePreferences,
  ScoreLevel,
} from './types'

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'good'
  if (score >= 40) return 'fair'
  return 'poor'
}

export function getRecommendation(_score: number, level: ScoreLevel): string {
  switch (level) {
    case 'excellent':
      return 'Strong fit — this opportunity closely matches your profile. Strongly recommended to pursue.'
    case 'good':
      return 'Good fit — most criteria match well. Worth pursuing with minor considerations.'
    case 'fair':
      return 'Moderate fit — some criteria diverge significantly. Evaluate trade-offs carefully before proceeding.'
    case 'poor':
      return 'Poor fit — multiple key criteria are below threshold. Recommend passing unless circumstances change.'
  }
}

export function evaluateOpportunity(
  input: OpportunityInput,
  prefs: ProfilePreferences,
  criteria: CriterionConfig[],
): EvaluationResult {
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0)

  const criterionScores = criteria.map(criterion => {
    const rawScore = criterion.evaluate(input, prefs)
    const weightedScore = (rawScore * criterion.weight) / totalWeight
    return {
      criterionId: criterion.id,
      label: criterion.label,
      weight: criterion.weight,
      rawScore: Math.round(rawScore),
      weightedScore,
    }
  })

  const totalScore = Math.round(criterionScores.reduce((sum, s) => sum + s.weightedScore, 0))
  const level = getScoreLevel(totalScore)
  const recommendation = getRecommendation(totalScore, level)

  return { totalScore, level, criterionScores, recommendation }
}
