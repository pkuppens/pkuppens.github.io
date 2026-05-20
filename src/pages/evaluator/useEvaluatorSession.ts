import { useState, useCallback } from 'react'
import type { EvaluationResult, OpportunityInput, ProfilePreferences } from '../../domain/evaluator/types'
import {
  createDefaultOpportunityInput,
  loadEvaluatorInput,
  loadEvaluatorPreferences,
  persistEvaluatorInput,
  persistEvaluatorPreferences,
  runEvaluation,
} from '../../domain/evaluator/evaluatorSession'

export type EvaluatorTab = 'evaluate' | 'preferences'

export function useEvaluatorSession() {
  const [prefs, setPrefs] = useState<ProfilePreferences>(loadEvaluatorPreferences)
  const [input, setInput] = useState<OpportunityInput>(() => loadEvaluatorInput())
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [activeTab, setActiveTab] = useState<EvaluatorTab>('evaluate')

  const handleEvaluate = useCallback((opportunityInput: OpportunityInput) => {
    persistEvaluatorInput(opportunityInput)
    setInput(opportunityInput)
    setResult(runEvaluation(opportunityInput, prefs))
  }, [prefs])

  const handlePrefsChange = useCallback((newPrefs: ProfilePreferences) => {
    persistEvaluatorPreferences(newPrefs)
    setPrefs(newPrefs)
    setResult(null)
  }, [])

  const handleReset = useCallback(() => {
    const defaults = createDefaultOpportunityInput(prefs)
    setInput(defaults)
    setResult(null)
  }, [prefs])

  return {
    activeTab,
    setActiveTab,
    prefs,
    input,
    result,
    handleEvaluate,
    handlePrefsChange,
    handleReset,
  }
}
