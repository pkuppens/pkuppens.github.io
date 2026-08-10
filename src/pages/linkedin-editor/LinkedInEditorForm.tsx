import type { ExperiencesItem } from '../../lib/linkedin/types'
import ExperienceEditorCard from './ExperienceEditorCard'
import ExperienceGroupEditorCard from './ExperienceGroupEditorCard'
import styles from './LinkedInEditorPage.module.css'

interface LinkedInEditorFormProps {
  items: ExperiencesItem[]
  onUpdateItem: (index: number, updated: ExperiencesItem) => void
  onRemoveItem: (index: number) => void
  onAddExperience: () => void
  onAddExperienceGroup: () => void
}

export default function LinkedInEditorForm({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddExperience,
  onAddExperienceGroup,
}: LinkedInEditorFormProps) {
  return (
    <div className={styles.formList}>
      {items.map((item, i) =>
        item.kind === 'experience' ? (
          <ExperienceEditorCard
            key={i}
            experience={item}
            onChange={(updated) => onUpdateItem(i, updated)}
            onRemove={() => onRemoveItem(i)}
          />
        ) : (
          <ExperienceGroupEditorCard
            key={i}
            group={item}
            onChange={(updated) => onUpdateItem(i, updated)}
            onRemove={() => onRemoveItem(i)}
          />
        ),
      )}

      <div className={styles.addRow}>
        <button type="button" onClick={onAddExperience}>
          + Add experience
        </button>
        <button type="button" onClick={onAddExperienceGroup}>
          + Add experience group
        </button>
      </div>
    </div>
  )
}
