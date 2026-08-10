/**
 * TypeScript model for canonical LinkedIn-aligned experience data.
 *
 * Mirrors scripts/linkedin/schema.xsd. Kept as a browser-side TS module rather
 * than importing scripts/linkedin/model.mjs directly because the project's
 * tsconfig does not enable `allowJs` — see scripts/linkedin/README.md for the
 * shared-logic tradeoff this implies.
 */

export interface PeriodModel {
  startYearMonth: string | null
  endYearMonth: string | null
  endCurrent: boolean
  durationYears: number | null
  durationMonths: number | null
  durationRaw: string | null
  raw: string | null
}

export interface GroupedExperienceModel {
  id: string
  tagline: string
  period: PeriodModel
  description: string | null
  tasks: string[]
  skills: string[]
  skillsTruncatedSummary: string | null
}

export interface ExperienceModel {
  kind: 'experience'
  id: string
  linkedinComponentKey: string | null
  tagline: string
  company: string
  employmentType: string | null
  period: PeriodModel
  location: string | null
  workMode: string | null
  description: string | null
  tasks: string[]
  skills: string[]
  skillsTruncatedSummary: string | null
}

export interface ExperienceGroupModel {
  kind: 'experienceGroup'
  linkedinComponentKey: string | null
  company: string
  groupSummary: { employmentType: string | null; totalDurationText: string | null } | null
  location: string | null
  experiences: GroupedExperienceModel[]
}

export type ExperiencesItem = ExperienceModel | ExperienceGroupModel

export interface MetaModel {
  sourceUrl: string | null
  scrapedAt: string | null
  locale: string | null
}

export interface ExperiencesDocumentModel {
  meta: MetaModel | null
  items: ExperiencesItem[]
}

export function emptyPeriod(): PeriodModel {
  return {
    startYearMonth: null,
    endYearMonth: null,
    endCurrent: false,
    durationYears: null,
    durationMonths: null,
    durationRaw: null,
    raw: null,
  }
}

export function newExperience(id: string): ExperienceModel {
  return {
    kind: 'experience',
    id,
    linkedinComponentKey: null,
    tagline: '',
    company: '',
    employmentType: null,
    period: emptyPeriod(),
    location: null,
    workMode: null,
    description: null,
    tasks: [],
    skills: [],
    skillsTruncatedSummary: null,
  }
}

export function newExperienceGroup(company: string): ExperienceGroupModel {
  return {
    kind: 'experienceGroup',
    linkedinComponentKey: null,
    company,
    groupSummary: null,
    location: null,
    experiences: [],
  }
}

export function newGroupedExperience(id: string): GroupedExperienceModel {
  return {
    id,
    tagline: '',
    period: emptyPeriod(),
    description: null,
    tasks: [],
    skills: [],
    skillsTruncatedSummary: null,
  }
}
