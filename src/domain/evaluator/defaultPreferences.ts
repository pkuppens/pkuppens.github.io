import type { ProfilePreferences } from './types'

export const DEFAULT_PREFERENCES: ProfilePreferences = {
  preferredDomains: ['Finance', 'Healthcare', 'Logistics', 'Technology', 'AI', 'Data'],
  minHoursPerWeek: 32,
  maxHoursPerWeek: 40,
  minDailyRate: 850,
  targetDailyRate: 1000,
  maxCommuteMinutes: 60,
  maxOnsiteDaysPerWeek: 3,
  minDurationMonths: 3,
  maxDurationMonths: 12,
  preferredTechnologies: [
    'Python', 'TypeScript', 'React', 'FastAPI', 'Azure',
    'LangChain', 'OpenAI', 'Docker', 'PostgreSQL', 'dbt',
  ],
}
