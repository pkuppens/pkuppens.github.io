import type { ExperienceModel } from '../../lib/linkedin/types'
import PeriodEditor from './PeriodEditor'
import StringListEditor from './StringListEditor'
import styles from './LinkedInEditorPage.module.css'

interface ExperienceEditorCardProps {
  experience: ExperienceModel
  onChange: (experience: ExperienceModel) => void
  onRemove: () => void
}

export default function ExperienceEditorCard({ experience, onChange, onRemove }: ExperienceEditorCardProps) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.cardHeader}>
        <span className={styles.cardHeaderTitle}>Experience: {experience.company || '(untitled)'}</span>
        <button type="button" onClick={onRemove}>
          Remove
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Id</label>
        <input type="text" value={experience.id} onChange={(e) => onChange({ ...experience, id: e.target.value })} />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Tagline / role title</label>
        <input
          type="text"
          value={experience.tagline}
          onChange={(e) => onChange({ ...experience, tagline: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Company</label>
        <input type="text" value={experience.company} onChange={(e) => onChange({ ...experience, company: e.target.value })} />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Employment type</label>
        <input
          type="text"
          placeholder="Fulltime, Freelance, …"
          value={experience.employmentType ?? ''}
          onChange={(e) => onChange({ ...experience, employmentType: e.target.value || null })}
        />
      </div>

      <PeriodEditor period={experience.period} onChange={(period) => onChange({ ...experience, period })} />

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Location</label>
        <input
          type="text"
          value={experience.location ?? ''}
          onChange={(e) => onChange({ ...experience, location: e.target.value || null })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Work mode</label>
        <input
          type="text"
          placeholder="Hybrid, Remote, On-site"
          value={experience.workMode ?? ''}
          onChange={(e) => onChange({ ...experience, workMode: e.target.value || null })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Description</label>
        <textarea
          value={experience.description ?? ''}
          onChange={(e) => onChange({ ...experience, description: e.target.value || null })}
        />
      </div>

      <StringListEditor label="Tasks" items={experience.tasks} onChange={(tasks) => onChange({ ...experience, tasks })} />
      <StringListEditor label="Skills" items={experience.skills} onChange={(skills) => onChange({ ...experience, skills })} />
    </div>
  )
}
