/** Registry of localStorage keys (prefix applied in storage.ts). */
export const STORAGE_KEYS = {
  theme: 'theme',
  evaluatorPreferences: 'evaluator_preferences',
  evaluatorLastInput: 'evaluator_last_input',
  homeAddress: 'home_address',
  hereApiKey: 'here_api_key',
} as const

/** Legacy theme key before pkuppens_ prefix migration. */
export const LEGACY_THEME_KEY = 'theme'
