import { useState } from 'react'
import type { ProfilePreferences } from '../../domain/evaluator/types'
import { DEFAULT_PREFERENCES } from '../../domain/evaluator/defaultPreferences'
import styles from './PreferencesPanel.module.css'

interface Props {
  prefs: ProfilePreferences
  onChange: (prefs: ProfilePreferences) => void
}

export default function PreferencesPanel({ prefs, onChange }: Props) {
  const [domainInput, setDomainInput] = useState('')
  const [techInput, setTechInput] = useState('')

  function update<K extends keyof ProfilePreferences>(key: K, value: ProfilePreferences[K]) {
    onChange({ ...prefs, [key]: value })
  }

  function addDomain() {
    const d = domainInput.trim()
    if (d && !prefs.preferredDomains.includes(d)) {
      update('preferredDomains', [...prefs.preferredDomains, d])
    }
    setDomainInput('')
  }

  function removeDomain(d: string) {
    update('preferredDomains', prefs.preferredDomains.filter(x => x !== d))
  }

  function addTech() {
    const t = techInput.trim()
    if (t && !prefs.preferredTechnologies.includes(t)) {
      update('preferredTechnologies', [...prefs.preferredTechnologies, t])
    }
    setTechInput('')
  }

  function removeTech(t: string) {
    update('preferredTechnologies', prefs.preferredTechnologies.filter(x => x !== t))
  }

  function handleReset() {
    onChange(DEFAULT_PREFERENCES)
  }

  return (
    <div className={styles.panel} aria-label="Profile preferences">
      <h2 className={styles.title}>My Profile Preferences</h2>
      <p className={styles.desc}>
        These preferences configure the scoring criteria. They are saved locally in your browser.
      </p>

      <div className={styles.grid}>
        {/* Rate */}
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Rate</h3>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pref-min-rate">Min Hourly Rate (€)</label>
              <input
                id="pref-min-rate"
                type="number"
                className={styles.input}
                value={prefs.minHourlyRate}
                min={0}
                step={5}
                onChange={e => update('minHourlyRate', Number(e.target.value))}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pref-target-rate">Target Hourly Rate (€)</label>
              <input
                id="pref-target-rate"
                type="number"
                className={styles.input}
                value={prefs.targetHourlyRate}
                min={0}
                step={5}
                onChange={e => update('targetHourlyRate', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Working Hours</h3>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pref-min-hours">Min Hours / Week</label>
              <input
                id="pref-min-hours"
                type="number"
                className={styles.input}
                value={prefs.minHoursPerWeek}
                min={0}
                max={60}
                onChange={e => update('minHoursPerWeek', Number(e.target.value))}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pref-max-hours">Max Hours / Week</label>
              <input
                id="pref-max-hours"
                type="number"
                className={styles.input}
                value={prefs.maxHoursPerWeek}
                min={0}
                max={60}
                onChange={e => update('maxHoursPerWeek', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Travel */}
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Travel & Location</h3>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pref-commute">Max Commute (min)</label>
              <input
                id="pref-commute"
                type="number"
                className={styles.input}
                value={prefs.maxCommuteMinutes}
                min={0}
                max={300}
                step={5}
                onChange={e => update('maxCommuteMinutes', Number(e.target.value))}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pref-onsite">Max Onsite Days / Week</label>
              <input
                id="pref-onsite"
                type="number"
                className={styles.input}
                value={prefs.maxOnsiteDaysPerWeek}
                min={0}
                max={5}
                onChange={e => update('maxOnsiteDaysPerWeek', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Contract Duration</h3>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pref-min-dur">Min Duration (months)</label>
              <input
                id="pref-min-dur"
                type="number"
                className={styles.input}
                value={prefs.minDurationMonths}
                min={1}
                onChange={e => update('minDurationMonths', Number(e.target.value))}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pref-max-dur">Max Duration (months)</label>
              <input
                id="pref-max-dur"
                type="number"
                className={styles.input}
                value={prefs.maxDurationMonths}
                min={1}
                onChange={e => update('maxDurationMonths', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Domains */}
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Preferred Domains</h3>
          <div className={styles.addRow}>
            <input
              type="text"
              className={styles.input}
              placeholder="Add domain..."
              value={domainInput}
              onChange={e => setDomainInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addDomain())}
            />
            <button type="button" className="btn btn-outline" onClick={addDomain}>Add</button>
          </div>
          <div className={`flex flex-wrap gap-1 mt-2`}>
            {prefs.preferredDomains.map(d => (
              <span key={d} className={styles.chip}>
                {d}
                <button type="button" className={styles.chipRemove} onClick={() => removeDomain(d)} aria-label={`Remove ${d}`}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Preferred Technologies</h3>
          <div className={styles.addRow}>
            <input
              type="text"
              className={styles.input}
              placeholder="Add technology..."
              value={techInput}
              onChange={e => setTechInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
            />
            <button type="button" className="btn btn-outline" onClick={addTech}>Add</button>
          </div>
          <div className={`flex flex-wrap gap-1 mt-2`}>
            {prefs.preferredTechnologies.map(t => (
              <span key={t} className={styles.chip}>
                {t}
                <button type="button" className={styles.chipRemove} onClick={() => removeTech(t)} aria-label={`Remove ${t}`}>×</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          Reset to Defaults
        </button>
        <span className={styles.saved}>✓ Changes are saved automatically</span>
      </div>
    </div>
  )
}
