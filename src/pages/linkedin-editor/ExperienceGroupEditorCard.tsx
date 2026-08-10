import type { ExperienceGroupModel } from '../../lib/linkedin/types'
import { newGroupedExperience } from '../../lib/linkedin/types'
import GroupedExperienceEditorRow from './GroupedExperienceEditorRow'
import styles from './LinkedInEditorPage.module.css'

interface ExperienceGroupEditorCardProps {
  group: ExperienceGroupModel
  onChange: (group: ExperienceGroupModel) => void
  onRemove: () => void
}

export default function ExperienceGroupEditorCard({ group, onChange, onRemove }: ExperienceGroupEditorCardProps) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.cardHeader}>
        <span className={styles.cardHeaderTitle}>Experience group: {group.company || '(untitled)'}</span>
        <button type="button" onClick={onRemove}>
          Remove group
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Company</label>
        <input type="text" value={group.company} onChange={(e) => onChange({ ...group, company: e.target.value })} />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>Location</label>
        <input
          type="text"
          value={group.location ?? ''}
          onChange={(e) => onChange({ ...group, location: e.target.value || null })}
        />
      </div>

      <div className={styles.periodGrid}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Group employment type</label>
          <input
            type="text"
            value={group.groupSummary?.employmentType ?? ''}
            onChange={(e) =>
              onChange({
                ...group,
                groupSummary: {
                  employmentType: e.target.value || null,
                  totalDurationText: group.groupSummary?.totalDurationText ?? null,
                },
              })
            }
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Total duration text</label>
          <input
            type="text"
            placeholder="3 yrs 2 mos"
            value={group.groupSummary?.totalDurationText ?? ''}
            onChange={(e) =>
              onChange({
                ...group,
                groupSummary: {
                  employmentType: group.groupSummary?.employmentType ?? null,
                  totalDurationText: e.target.value || null,
                },
              })
            }
          />
        </div>
      </div>

      <div className={styles.nestedList}>
        {group.experiences.map((exp, i) => (
          <GroupedExperienceEditorRow
            key={i}
            experience={exp}
            onChange={(updated) =>
              onChange({ ...group, experiences: group.experiences.map((e, j) => (j === i ? updated : e)) })
            }
            onRemove={() => onChange({ ...group, experiences: group.experiences.filter((_, j) => j !== i) })}
          />
        ))}
        <button
          type="button"
          onClick={() =>
            onChange({
              ...group,
              experiences: [...group.experiences, newGroupedExperience(`${group.company || 'role'}-${group.experiences.length + 1}`)],
            })
          }
        >
          + Add role to this group
        </button>
      </div>
    </div>
  )
}
