import { useState, useCallback } from 'react'
import type { EvaluationResult, OpportunityInput, ProfilePreferences } from '../../domain/evaluator/types'
import { DEFAULT_PREFERENCES } from '../../domain/evaluator/defaultPreferences'
import { CRITERIA } from '../../domain/evaluator/criteria'
import { evaluateOpportunity } from '../../domain/evaluator/scoring'
import { loadFromStorage, saveToStorage } from '../../infrastructure/storage'
import EvaluatorForm from './EvaluatorForm'
import EvaluatorResults from './EvaluatorResults'
import PreferencesPanel from './PreferencesPanel'
import styles from './EvaluatorPage.module.css'

const PREFS_KEY = 'evaluator_preferences'
const INPUT_KEY = 'evaluator_last_input'

const DEFAULT_INPUT: OpportunityInput = {
  title: '',
  domain: '',
  hoursPerWeek: 40,
  hourlyRate: 110,
  commuteMinutes: 30,
  hybridDaysOnsite: 2,
  durationMonths: 6,
  technologies: [],
  notes: '',
}

type Tab = 'evaluate' | 'preferences'

export default function EvaluatorPage() {
  const [activeTab, setActiveTab] = useState<Tab>('evaluate')
  const [prefs, setPrefs] = useState<ProfilePreferences>(() =>
    loadFromStorage(PREFS_KEY, DEFAULT_PREFERENCES)
  )
  const [input, setInput] = useState<OpportunityInput>(() =>
    loadFromStorage(INPUT_KEY, DEFAULT_INPUT)
  )
  const [result, setResult] = useState<EvaluationResult | null>(null)

  const handleEvaluate = useCallback((opportunityInput: OpportunityInput) => {
    saveToStorage(INPUT_KEY, opportunityInput)
    setInput(opportunityInput)
    const evaluation = evaluateOpportunity(opportunityInput, prefs, CRITERIA)
    setResult(evaluation)
  }, [prefs])

  const handlePrefsChange = useCallback((newPrefs: ProfilePreferences) => {
    saveToStorage(PREFS_KEY, newPrefs)
    setPrefs(newPrefs)
    setResult(null)
  }, [])

  const handleReset = useCallback(() => {
    setInput(DEFAULT_INPUT)
    setResult(null)
  }, [])

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Opportunity Evaluator</h1>
          <p className={styles.subtitle}>
            Score any assignment against your profile criteria — rate, domain, commute, hybrid arrangement, tech stack and more.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'evaluate' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('evaluate')}
              aria-selected={activeTab === 'evaluate'}
            >
              Evaluate Opportunity
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'preferences' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('preferences')}
              aria-selected={activeTab === 'preferences'}
            >
              My Preferences
            </button>
          </div>

          {activeTab === 'evaluate' && (
            <div className={styles.evaluateLayout}>
              <div className={styles.formCol}>
                <EvaluatorForm
                  initialInput={input}
                  onEvaluate={handleEvaluate}
                  onReset={handleReset}
                />
              </div>
              {result && (
                <div className={styles.resultsCol}>
                  <EvaluatorResults result={result} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'preferences' && (
            <PreferencesPanel prefs={prefs} onChange={handlePrefsChange} />
          )}
        </div>
      </section>
    </>
  )
}
