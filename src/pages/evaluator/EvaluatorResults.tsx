import type { EvaluationResult } from '../../domain/evaluator/types'
import { getRawScoreColor, LEVEL_PRESENTATION } from '../../domain/evaluator/scoreBands'
import styles from './EvaluatorResults.module.css'

interface Props {
  result: EvaluationResult
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className={styles.scoreBarTrack}>
      <div
        className={styles.scoreBarFill}
        style={{ width: `${Math.max(0, Math.min(100, score))}%`, background: color }}
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={-100}
        aria-valuemax={100}
      />
    </div>
  )
}

export default function EvaluatorResults({ result }: Props) {
  const cfg = LEVEL_PRESENTATION[result.level]

  return (
    <div className={styles.results} aria-label="Evaluation results">
      {/* Overall score */}
      <div className={styles.scoreCard} style={{ background: cfg.bg, borderColor: cfg.color }}>
        <div className={styles.scoreLabel}>{cfg.label}</div>
        <div className={styles.scoreValue} style={{ color: cfg.color }}>
          {result.totalScore}
          <span className={styles.scoreMax}>/100</span>
        </div>
        <p className={styles.recommendation}>{result.recommendation}</p>
      </div>

      {/* Breakdown */}
      <h3 className={styles.breakdownTitle}>Score Breakdown</h3>
      <div className={styles.breakdown}>
        {result.criterionScores.map(cs => (
          <div key={cs.criterionId} className={styles.criterion}>
            <div className={styles.criterionHeader}>
              <span className={styles.criterionLabel}>{cs.label}</span>
              <span className={styles.criterionScore}>{cs.rawScore}%</span>
            </div>
            <ScoreBar score={cs.rawScore} color={getRawScoreColor(cs.rawScore)} />
            <div className={styles.criterionMeta}>
              Weight: {cs.weight} · Contribution: {cs.weightedScore.toFixed(1)} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
