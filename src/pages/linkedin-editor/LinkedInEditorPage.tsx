import { useRef, useState } from 'react'
import { useLinkedInEditor } from './useLinkedInEditor'
import LinkedInEditorItemRow from './LinkedInEditorItemRow'
import styles from './LinkedInEditorPage.module.css'

export default function LinkedInEditorPage() {
  const {
    slug,
    setSlug,
    model,
    status,
    parseError,
    errors,
    loadFromXmlText,
    loadFromDevServer,
    saveToDevServer,
    loadFromSession,
    saveToSession,
    addExperience,
    addExperienceGroup,
    updateItem,
    removeItem,
    exportXml,
  } = useLinkedInEditor()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [copyStatus, setCopyStatus] = useState<string | null>(null)

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    file.text().then(loadFromXmlText)
    e.target.value = ''
  }

  function handleDownload() {
    const xml = exportXml()
    const blob = new Blob([xml], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${slug}.xml`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(exportXml())
      setCopyStatus('Copied to clipboard.')
    } catch {
      setCopyStatus('Copy failed — select and copy the downloaded file instead.')
    }
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>LinkedIn Experience Editor</h1>
          <p className={styles.subtitle}>
            Dev-only tool for editing <code>data/linkedin/&lt;slug&gt;.xml</code> through forms instead of hand-editing
            namespaced XML. See <code>scripts/linkedin/README.md</code> — this is a manual/assisted workflow, not
            scraping.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.toolbar}>
            <div className={styles.toolbarColumn}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>
                  Slug
                  <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
                </label>
              </div>

              <fieldset className={styles.toolbarGroup}>
                <legend className={styles.toolbarGroupLabel}>Import</legend>
                {import.meta.env.DEV && (
                  <button
                    type="button"
                    className={`btn btn-outline ${styles.toolbarSlugButton}`}
                    onClick={loadFromDevServer}
                  >
                    Load data/linkedin/{slug}.xml
                  </button>
                )}
                <button type="button" className="btn btn-outline" onClick={loadFromSession}>
                  Load from browser session
                </button>
                <button type="button" className="btn btn-outline" onClick={() => fileInputRef.current?.click()}>
                  Load from file…
                </button>
                <input ref={fileInputRef} type="file" accept=".xml" hidden onChange={handleFileUpload} />
              </fieldset>
            </div>

            <fieldset className={styles.toolbarGroup} disabled={model.items.length === 0}>
              <legend className={styles.toolbarGroupLabel}>Export</legend>
              {import.meta.env.DEV && (
                <button
                  type="button"
                  className={`btn btn-outline ${styles.toolbarSlugButton}`}
                  onClick={saveToDevServer}
                >
                  Save to data/linkedin/{slug}.xml
                </button>
              )}
              <button type="button" className="btn btn-outline" onClick={saveToSession}>
                Save to browser session
              </button>
              <button type="button" className="btn btn-outline" onClick={handleDownload}>
                Download .xml
              </button>
              <button type="button" className="btn btn-outline" onClick={handleCopy}>
                Copy .xml to clipboard
              </button>
            </fieldset>
          </div>

          {(status || copyStatus) && <p className={styles.status}>{[status, copyStatus].filter(Boolean).join(' ')}</p>}
          {parseError && <p className={styles.errorBanner}>Failed to load: {parseError}</p>}
          {errors.length > 0 && (
            <div className={styles.errorBanner}>
              <strong>{errors.length} validation issue(s):</strong>
              <ul>
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {model.items.length === 0 ? (
            <p className="text-muted">Nothing to edit yet — load or add an experience.</p>
          ) : (
            <div className={styles.layout}>
              <div className={`${styles.layoutHeader} mb-4`}>Edit</div>
              <div className={`${styles.layoutHeader} mb-4`}>Preview</div>
              {model.items.map((item, i) => (
                <LinkedInEditorItemRow
                  key={i}
                  item={item}
                  onChange={(updated) => updateItem(i, updated)}
                  onRemove={() => removeItem(i)}
                />
              ))}
            </div>
          )}

          <div className={styles.addRow}>
            <button type="button" onClick={addExperience}>
              + Add experience
            </button>
            <button type="button" onClick={addExperienceGroup}>
              + Add experience group
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
