import type { GroupedExperienceModel } from '../../lib/linkedin/types'
import PeriodEditor from './PeriodEditor'
import StringListEditor from './StringListEditor'
import styles from './LinkedInEditorPage.module.css'

interface GroupedExperienceEditorRowProps {
  experience: GroupedExperienceModel
  onChange: (experience: GroupedExperienceModel) => void
  onRemove: () => void
}

export default function GroupedExperienceEditorRow({ experience, onChange, onRemove }: GroupedExperienceEditorRowProps) {
  return (
    <div className={styles.nestedCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cardHeaderTitle}>Role: {experience.tagline || '(untitled)'}</span>
        <button type="button" onClick={onRemove}>
          Remove role
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>
          Id
          <input type="text" value={experience.id} onChange={(e) => onChange({ ...experience, id: e.target.value })} />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>
          Tagline / role title
          <input
            type="text"
            value={experience.tagline}
            onChange={(e) => onChange({ ...experience, tagline: e.target.value })}
          />
        </label>
      </div>

      <PeriodEditor period={experience.period} onChange={(period) => onChange({ ...experience, period })} />

      <div className={styles.field}>
        <label className={styles.fieldLabel}>
          Description
          <textarea
            value={experience.description ?? ''}
            onChange={(e) => onChange({ ...experience, description: e.target.value || null })}
          />
        </label>
      </div>

      <StringListEditor label="Tasks" items={experience.tasks} onChange={(tasks) => onChange({ ...experience, tasks })} />
      <StringListEditor label="Skills" items={experience.skills} onChange={(skills) => onChange({ ...experience, skills })} />
    </div>
  )
}
