import { useState, useEffect } from 'react'
import type { OpportunityInput } from '../../domain/evaluator/types'
import styles from './EvaluatorForm.module.css'

interface Props {
  initialInput: OpportunityInput
  onEvaluate: (input: OpportunityInput) => void
  onReset: () => void
}

export default function EvaluatorForm({ initialInput, onEvaluate, onReset }: Props) {
  const [form, setForm] = useState<OpportunityInput>(initialInput)
  const [techInput, setTechInput] = useState('')

  useEffect(() => {
    setForm(initialInput)
  }, [initialInput])

  function handleChange(field: keyof OpportunityInput, value: string | number | string[]) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function addTechnology() {
    const tech = techInput.trim()
    if (tech && !form.technologies.includes(tech)) {
      handleChange('technologies', [...form.technologies, tech])
    }
    setTechInput('')
  }

  function removeTechnology(tech: string) {
    handleChange('technologies', form.technologies.filter(t => t !== tech))
  }

  function handleTechKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTechnology()
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onEvaluate(form)
  }

  function handleReset() {
    onReset()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} aria-label="Opportunity details form">
      <h2 className={styles.formTitle}>Opportunity Details</h2>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="opp-title">Title / Role</label>
        <input
          id="opp-title"
          type="text"
          className={styles.input}
          placeholder="e.g. Senior Python Developer"
          value={form.title}
          onChange={e => handleChange('title', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="opp-domain">Domain / Industry</label>
        <input
          id="opp-domain"
          type="text"
          className={styles.input}
          placeholder="e.g. Finance, Healthcare, Logistics"
          value={form.domain}
          onChange={e => handleChange('domain', e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="opp-rate">Daily Rate (€)</label>
          <input
            id="opp-rate"
            type="number"
            className={styles.input}
            min={0}
            max={5000}
            step={50}
            value={form.dailyRate}
            onChange={e => handleChange('dailyRate', Number(e.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="opp-hours">Hours / Week</label>
          <input
            id="opp-hours"
            type="number"
            className={styles.input}
            min={8}
            max={60}
            value={form.hoursPerWeek}
            onChange={e => handleChange('hoursPerWeek', Number(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="opp-commute">
            Commute (minutes one-way)
          </label>
          <input
            id="opp-commute"
            type="number"
            className={styles.input}
            min={0}
            max={300}
            step={5}
            value={form.commuteMinutes}
            onChange={e => handleChange('commuteMinutes', Number(e.target.value))}
          />
          <input
            type="range"
            className={styles.slider}
            min={0}
            max={180}
            step={5}
            value={form.commuteMinutes}
            onChange={e => handleChange('commuteMinutes', Number(e.target.value))}
            aria-label="Commute slider"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="opp-onsite">
            Onsite Days / Week
          </label>
          <input
            id="opp-onsite"
            type="number"
            className={styles.input}
            min={0}
            max={5}
            value={form.hybridDaysOnsite}
            onChange={e => handleChange('hybridDaysOnsite', Number(e.target.value))}
          />
          <input
            type="range"
            className={styles.slider}
            min={0}
            max={5}
            value={form.hybridDaysOnsite}
            onChange={e => handleChange('hybridDaysOnsite', Number(e.target.value))}
            aria-label="Onsite days slider"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="opp-duration">Duration (months)</label>
        <input
          id="opp-duration"
          type="number"
          className={styles.input}
          min={1}
          max={36}
          value={form.durationMonths}
          onChange={e => handleChange('durationMonths', Number(e.target.value))}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Technologies Required</label>
        <div className={styles.techInputRow}>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g. Python, React, Azure"
            value={techInput}
            onChange={e => setTechInput(e.target.value)}
            onKeyDown={handleTechKeyDown}
            aria-label="Add technology"
          />
          <button type="button" className="btn btn-outline" onClick={addTechnology}>
            Add
          </button>
        </div>
        {form.technologies.length > 0 && (
          <div className={`flex flex-wrap gap-1 mt-2`}>
            {form.technologies.map(t => (
              <span key={t} className={styles.techTag}>
                {t}
                <button
                  type="button"
                  className={styles.techRemove}
                  onClick={() => removeTechnology(t)}
                  aria-label={`Remove ${t}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="opp-notes">Notes</label>
        <textarea
          id="opp-notes"
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Any additional context..."
          value={form.notes}
          onChange={e => handleChange('notes', e.target.value)}
          rows={3}
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className="btn btn-primary">
          🎯 Evaluate
        </button>
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  )
}
