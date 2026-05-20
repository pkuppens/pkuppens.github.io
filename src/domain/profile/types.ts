export interface ExperienceEntry {
  period: string
  role: string
  company: string
  desc: string
  tags: string[]
}

export interface DisplayPreference {
  label: string
  value: string
}

export type TechStack = Record<string, string[]>
