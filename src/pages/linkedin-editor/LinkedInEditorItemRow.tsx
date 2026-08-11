import type { ExperiencesItem } from '../../lib/linkedin/types'
import ExperienceEditorCard from './ExperienceEditorCard'
import ExperienceGroupEditorCard from './ExperienceGroupEditorCard'
import LinkedInEditorPreviewCard from './LinkedInEditorPreview'

interface LinkedInEditorItemRowProps {
  item: ExperiencesItem
  onChange: (updated: ExperiencesItem) => void
  onRemove: () => void
}

export default function LinkedInEditorItemRow({ item, onChange, onRemove }: LinkedInEditorItemRowProps) {
  return (
    <>
      {item.kind === 'experience' ? (
        <ExperienceEditorCard experience={item} onChange={onChange} onRemove={onRemove} />
      ) : (
        <ExperienceGroupEditorCard group={item} onChange={onChange} onRemove={onRemove} />
      )}
      <LinkedInEditorPreviewCard item={item} />
    </>
  )
}
