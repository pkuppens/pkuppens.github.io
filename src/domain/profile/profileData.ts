import type { ProfilePreferences } from '../evaluator/types'
import type { DisplayPreference, ExperienceEntry, TechStack } from './types'

/** Scoring preferences derived from the same facts shown on the Profile page. */
export const PROFILE_EVALUATOR_PREFERENCES: ProfilePreferences = {
  preferredDomains: ['Healthcare', 'Finance', 'High-Tech', 'Data', 'AI'],
  minHoursPerWeek: 32,
  maxHoursPerWeek: 40,
  minHourlyRate: 100,
  targetHourlyRate: 140,
  maxCommuteMinutes: 60,
  maxOnsiteDaysPerWeek: 3,
  minDurationMonths: 3,
  maxDurationMonths: 18,
  preferredTechnologies: [
    'Python', 'TypeScript', 'React', 'FastAPI', 'Azure',
    'LangChain', 'OpenAI', 'Docker', 'SQL', 'AWS',
  ],
}

function formatRateRange(prefs: ProfilePreferences): string {
  return `€${prefs.minHourlyRate}–€${prefs.targetHourlyRate}/hour`
}

function formatDurationRange(prefs: ProfilePreferences): string {
  return `${prefs.minDurationMonths}–${prefs.maxDurationMonths} months preferred`
}

/** Human-readable preference cards for the Profile page (generated from evaluator prefs). */
export const DISPLAY_PREFERENCES: DisplayPreference[] = [
  { label: 'Location', value: 'Netherlands (Den Bosch-Eindhoven), hybrid/remote' },
  {
    label: 'Preferred domains',
    value: 'Healthcare, Finance, High-Tech, Data and AI',
  },
  { label: 'Rate range', value: formatRateRange(PROFILE_EVALUATOR_PREFERENCES) },
  { label: 'Contract duration', value: formatDurationRange(PROFILE_EVALUATOR_PREFERENCES) },
  {
    label: 'Min. hours/week',
    value: `${PROFILE_EVALUATOR_PREFERENCES.minHoursPerWeek} hours minimum`,
  },
  {
    label: 'Travel',
    value: 'Max 3-4 hour commute weekly, rest remote',
  },
]

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: '2026 – Present',
    role: 'Senior Consultant (Software, Data, and AI)',
    company: 'Bright Cubes',
    desc: 'Consulting on software, data, and AI assignments with focus on practical delivery and business value.',
    tags: ['Software Engineering', 'Data', 'AI', 'Consulting'],
  },
  {
    period: '2025',
    role: 'Software-Data-AI Professional',
    company: 'Angiogenesis Analytics',
    desc: 'Software and data work in a medical equipment context, with focus on healthcare-oriented AI solutions.',
    tags: ['Healthcare', 'AI', 'Python', 'Data'],
  },
  {
    period: '2022 – 2025',
    role: 'AI Transaction Monitoring Workflow Optimization',
    company: 'Rent a Pin',
    desc: 'Built and improved AI-supported transaction monitoring workflows in a financial services context.',
    tags: ['AI', 'Finance', 'Workflow', 'Optimization'],
  },
  {
    period: '2020 – 2021',
    role: 'Software and Data Professional (Deep Learning)',
    company: 'CART-Tech',
    desc: 'Developed deep learning segmentation for medical imaging and supported migration to cloud scalability.',
    tags: ['Deep Learning', 'Medical Imaging', 'Python', 'AWS'],
  },
  {
    period: '2018 – 2020',
    role: 'Software Architect and Coach',
    company: 'Nemo Healthcare',
    desc: 'Supported regulated software workflows and built Python solutions in healthcare environments.',
    tags: ['ISO 13485', 'IEC 62304', 'Python', 'Coaching'],
  },
  {
    period: 'Feb 2018 – Oct 2018',
    role: 'Software en Data Professional',
    company: 'Isatis Health',
    desc: 'Short assignment in a healthcare context with a focus on practical software delivery and data-oriented work.',
    tags: ['Healthcare', 'Software Engineering', 'Data'],
  },
  {
    period: 'May 2013 – Jul 2018',
    role: 'Senior Software Engineer (part-time)',
    company: 'Ratho BV',
    desc: 'Part-time side job focused on C/C++ and SQL-heavy engineering, mentoring, and delivery support.',
    tags: ['C#', 'SQL', 'Mentoring', 'Part-time (5-10%)'],
  },
  {
    period: 'Apr 2013 – Present',
    role: 'Software en Data Professional (self-employed)',
    company: 'pieterkuppens.net',
    desc: 'Independent practice delivering software and data projects across healthcare, finance, and high-tech.',
    tags: ['Freelance', 'Python', 'C#/.NET', 'C/C++', 'SQL'],
  },
  {
    period: 'Dec 2012 – Apr 2013',
    role: 'Technical Engineer',
    company: 'Blueriq',
    desc: 'Short assignment focusing on frontend-oriented engineering in a professional software environment.',
    tags: ['Frontend', 'WPF', 'HTML/CSS'],
  },
  {
    period: 'Jul 2012 – Nov 2012',
    role: 'Technical Engineer',
    company: 'ABN AMRO Bank',
    desc: 'Engineering work in a banking environment with focus on secure enterprise delivery.',
    tags: ['Security', 'Enterprise', 'C#/.NET', 'MSSQL'],
  },
  {
    period: 'Apr 2012 – Jun 2012',
    role: 'Security Specialist',
    company: 'ABN AMRO Lease',
    desc: 'Security-focused work including SMS 2FA and password policy improvements.',
    tags: ['Security', '2FA', 'Policies'],
  },
  {
    period: 'Apr 2012 – Apr 2013',
    role: 'Technical Engineer',
    company: 'Everest BV',
    desc: 'Technical engineering role across a one-year period (overlapping with short assignments).',
    tags: ['Engineering', 'Consulting'],
  },
  {
    period: '2011 – 2012',
    role: 'Software Designer',
    company: 'Philips Healthcare',
    desc: 'Contributed to medical software with 3D visualization support for ablation treatment use cases.',
    tags: ['Healthcare', 'Scientific Software', 'C/C++', 'Visualization'],
  },
  {
    period: '2010',
    role: 'Software Engineer',
    company: 'BOSOR',
    desc: 'Contributed to frontend to planning software',
    tags: ['Delphi', 'JavaScript'],
  },
  {
    period: '1997 – 2009',
    role: 'Software Designer',
    company: 'ASML',
    desc: 'Long-tenure high-tech engineering on complex software projects in large-scale semiconductor systems.',
    tags: ['High-Tech', 'C/C++', 'Engineering', 'Long-term'],
  },
]

export const TECH_STACK: TechStack = {
  'Core Languages': ['Python', 'C#/.NET', 'C/C++', 'SQL', 'JavaScript'],
  'Data and AI': [
    'GenAI', 'LLM', 'RAG', 'AI-assisted development', 'Deep Learning', 'NLP Support',
    'Transaction Monitoring AI', 'Data Pipelines',
  ],
  'Cloud and DevOps': ['Azure', 'AWS', 'CI/CD', 'Docker', 'Jira/Confluence/Bitbucket'],
  'Security and Compliance': ['SMS 2FA', 'Password Policies', 'ISO 13485 Context', 'IEC 62304 Context'],
  'Databases and Storage': ['MSSQL', 'SQLite', 'MySQL', 'PostgreSQL'],
}
