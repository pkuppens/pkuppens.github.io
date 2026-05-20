import EvaluatorForm from './EvaluatorForm'
import EvaluatorResults from './EvaluatorResults'
import PreferencesPanel from './PreferencesPanel'
import { useEvaluatorSession } from './useEvaluatorSession'
import styles from './EvaluatorPage.module.css'

export default function EvaluatorPage() {
  const {
    activeTab,
    setActiveTab,
    prefs,
    input,
    result,
    handleEvaluate,
    handlePrefsChange,
    handleReset,
  } = useEvaluatorSession()

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
