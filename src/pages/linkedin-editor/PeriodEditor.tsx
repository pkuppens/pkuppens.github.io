import type { PeriodModel } from '../../lib/linkedin/types'
import styles from './LinkedInEditorPage.module.css'

interface PeriodEditorProps {
  period: PeriodModel
  onChange: (period: PeriodModel) => void
}

export default function PeriodEditor({ period, onChange }: PeriodEditorProps) {
  return (
    <div className={styles.periodGrid}>
      <div className={styles.field}>
        <label className={styles.fieldLabel}>
          Start (YYYY-MM)
          <input
            type="text"
            placeholder="2026-05"
            value={period.startYearMonth ?? ''}
            onChange={(e) => onChange({ ...period, startYearMonth: e.target.value || null })}
          />
        </label>
      </div>
      <div className={styles.field}>
        <label className={`${styles.fieldLabel} ${styles.checkboxLabel}`}>
          <input
            type="checkbox"
            checked={period.endCurrent}
            onChange={(e) =>
              onChange({ ...period, endCurrent: e.target.checked, endYearMonth: e.target.checked ? null : period.endYearMonth })
            }
          />
          Current role
        </label>
      </div>
      {!period.endCurrent && (
        <div className={styles.field}>
          <label className={styles.fieldLabel}>
            End (YYYY-MM)
            <input
              type="text"
              placeholder="2025-12"
              value={period.endYearMonth ?? ''}
              onChange={(e) => onChange({ ...period, endYearMonth: e.target.value || null })}
            />
          </label>
        </div>
      )}
      <div className={styles.field}>
        <label className={styles.fieldLabel}>
          Raw period text (display)
          <input
            type="text"
            placeholder="2026 – Present"
            value={period.raw ?? ''}
            onChange={(e) => onChange({ ...period, raw: e.target.value || null })}
          />
        </label>
      </div>
    </div>
  )
}
