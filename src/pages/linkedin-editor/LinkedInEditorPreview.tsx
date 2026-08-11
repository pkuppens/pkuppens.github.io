import type { ExperiencesItem, PeriodModel } from '../../lib/linkedin/types'
import styles from './LinkedInEditorPage.module.css'

function periodText(period: PeriodModel): string {
  if (period.raw) return period.raw
  const start = period.startYearMonth ?? '?'
  const end = period.endCurrent ? 'Present' : (period.endYearMonth ?? '?')
  return `${start} – ${end}`
}

interface LinkedInEditorPreviewCardProps {
  item: ExperiencesItem
}

export default function LinkedInEditorPreviewCard({ item }: LinkedInEditorPreviewCardProps) {
  if (item.kind === 'experience') {
    return (
      <div className={styles.previewCard}>
        <div className={styles.previewTagline}>{item.tagline || '(no tagline)'}</div>
        <div className={styles.previewCompany}>
          {item.company}
          {item.employmentType ? ` · ${item.employmentType}` : ''}
        </div>
        <div className={styles.previewMeta}>{periodText(item.period)}</div>
        {(item.location || item.workMode) && (
          <div className={styles.previewMeta}>{[item.location, item.workMode].filter(Boolean).join(' · ')}</div>
        )}
        {item.description && <p className={styles.previewDescription}>{item.description}</p>}
        {item.tasks.length > 0 && (
          <ul className={styles.previewTasks}>
            {item.tasks.map((t, j) => (
              <li key={j}>{t}</li>
            ))}
          </ul>
        )}
        {item.skills.length > 0 && (
          <div className={styles.previewSkills}>
            {item.skills.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles.previewCard}>
      <div className={styles.previewCompany}>{item.company}</div>
      {item.groupSummary && (
        <div className={styles.previewMeta}>
          {[item.groupSummary.employmentType, item.groupSummary.totalDurationText].filter(Boolean).join(' · ')}
        </div>
      )}
      {item.location && <div className={styles.previewMeta}>{item.location}</div>}
      <div className={styles.previewNestedList}>
        {item.experiences.map((exp, j) => (
          <div key={j} className={styles.previewNestedItem}>
            <div className={styles.previewTagline}>{exp.tagline || '(no tagline)'}</div>
            <div className={styles.previewMeta}>{periodText(exp.period)}</div>
            {exp.description && <p className={styles.previewDescription}>{exp.description}</p>}
            {exp.tasks.length > 0 && (
              <ul className={styles.previewTasks}>
                {exp.tasks.map((t, k) => (
                  <li key={k}>{t}</li>
                ))}
              </ul>
            )}
            {exp.skills.length > 0 && (
              <div className={styles.previewSkills}>
                {exp.skills.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
