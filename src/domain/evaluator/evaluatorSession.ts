import { DEFAULT_PREFERENCES } from './defaultPreferences'
import { CRITERIA } from './criteria'
import { evaluateOpportunity } from './scoring'
import type { EvaluationResult, OpportunityInput, ProfilePreferences } from './types'
import { STORAGE_KEYS } from '../../infrastructure/storageKeys'
import { loadFromStorage, saveToStorage } from '../../infrastructure/storage'

export { STORAGE_KEYS as EVALUATOR_STORAGE_KEYS }

export function createDefaultOpportunityInput(
  prefs: ProfilePreferences = DEFAULT_PREFERENCES,
): OpportunityInput {
  return {
    title: '',
    domain: '',
    hoursPerWeek: 40,
    hourlyRate: prefs.targetHourlyRate,
    commuteMinutes: 30,
    hybridDaysOnsite: 2,
    durationMonths: 6,
    technologies: [],
    notes: '',
  }
}

export function loadEvaluatorPreferences(): ProfilePreferences {
  return loadFromStorage(STORAGE_KEYS.evaluatorPreferences, DEFAULT_PREFERENCES)
}

export function loadEvaluatorInput(prefs?: ProfilePreferences): OpportunityInput {
  return loadFromStorage(
    STORAGE_KEYS.evaluatorLastInput,
    createDefaultOpportunityInput(prefs ?? DEFAULT_PREFERENCES),
  )
}

export function runEvaluation(
  input: OpportunityInput,
  prefs: ProfilePreferences,
): EvaluationResult {
  return evaluateOpportunity(input, prefs, CRITERIA)
}

export function persistEvaluatorInput(input: OpportunityInput): void {
  saveToStorage(STORAGE_KEYS.evaluatorLastInput, input)
}

export function persistEvaluatorPreferences(prefs: ProfilePreferences): void {
  saveToStorage(STORAGE_KEYS.evaluatorPreferences, prefs)
}
