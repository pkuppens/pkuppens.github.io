import type { EvaluationResult, ScoreLevel } from '../../domain/evaluator/types'
import styles from './EvaluatorResults.module.css'

interface Props {
  result: EvaluationResult
}

const LEVEL_CONFIG: Record<ScoreLevel, { label: string; color: string; bg: string }> = {
  excellent: { label: '🌟 Excellent Fit', color: '#16a34a', bg: '#f0fdf4' },
  good: { label: '✅ Good Fit', color: '#2563eb', bg: '#eff6ff' },
  fair: { label: '⚠️ Fair Fit', color: '#d97706', bg: '#fffbeb' },
  poor: { label: '❌ Poor Fit', color: '#dc2626', bg: '#fef2f2' },
}

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className={styles.scoreBarTrack}>
      <div
        className={styles.scoreBarFill}
        style={{ width: `${score}%`, background: color }}
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}

export default function EvaluatorResults({ result }: Props) {
  const cfg = LEVEL_CONFIG[result.level]

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
            <ScoreBar
              score={cs.rawScore}
              color={cs.rawScore >= 80 ? '#16a34a' : cs.rawScore >= 60 ? '#2563eb' : cs.rawScore >= 40 ? '#d97706' : '#dc2626'}
            />
            <div className={styles.criterionMeta}>
              Weight: {cs.weight} · Contribution: {cs.weightedScore.toFixed(1)} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
