import styles from './LinkedInEditorPage.module.css'

interface StringListEditorProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
}

export default function StringListEditor({ label, items, onChange }: StringListEditorProps) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {items.map((item, i) => (
        <div key={i} className={styles.listRow}>
          <input
            type="text"
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
