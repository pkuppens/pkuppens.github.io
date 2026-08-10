import styles from './LinkedInEditorPage.module.css'

interface StringListEditorProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
}

export default function StringListEditor({ label, items, onChange }: StringListEditorProps) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      {items.map((item, i) => (
        <div key={i} className={styles.listRow}>
          <input
            type="text"
            aria-label={`${label} item ${i + 1}`}
            value={item}
            onChange={(e) => onChange(items.map((v, j) => (j === i ? e.target.value : v)))}
          />
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label={`Remove ${label} item ${i + 1}`}>
            ✕
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ''])}>
        + Add {label.replace(/s$/, '')}
      </button>
    </div>
  )
}
