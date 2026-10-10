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
    period: 'May 2026 – Sep 2026',
    role: 'Senior Consultant (Software, Data, and AI)',
    company: 'Bright Cubes',
    desc: 'Built the internal CV-matching tool: Python parsing of PDF/DOCX CVs, on-premises LLM/agent-assisted conversion to internal data formats, Word export, AI-agent CV tuning (translation, length variants), and a cover-letter generator for assignments.',
    tags: ['Python', 'LLM', 'AI Agents', 'Document Processing'],
  },
  {
    period: 'Jul 2025 – Dec 2025',
    role: 'Software-Data-AI Professional',
    company: 'Angiogenesis Analytics',
    desc: 'Software and data work in a medical equipment context, with focus on healthcare-oriented AI solutions.',
    tags: ['Healthcare', 'AI', 'Python', 'Data'],
  },
  {
    period: 'Dec 2022 – Feb 2025',
    role: 'AI Transaction Monitoring & Workflow Optimization / Shipment Document Generation',
    company: 'Rent a Pin',
    desc: 'Transaction monitoring and workflow optimization, including shipment document generation. Requirements engineering and a proof of concept for migrating an MS Access/VBA/SQL website and application to Python/Django.',
    tags: ['AI', 'Finance', 'Python/Django', 'SQL', 'Requirements'],
  },
  {
    period: 'Dec 2021 – Apr 2022',
    role: 'Python Developer (Natural Language Processing)',
    company: 'Underlined',
    desc: 'Topic detection and sentiment analysis in online communication; support, bug fixes, and migration of the NLP platform to Azure.',
    tags: ['NLP', 'Python', 'Azure', 'Linux'],
  },
  {
    period: 'Aug 2021 – Jun 2022',
    role: 'Software Developer',
    company: 'Change Data',
    desc: 'Maintained and extended a data platform combining salon appointments, sales, and staffing data with machine learning for churn prediction: Azure triggers scraping external APIs, validating and upserting into MSSQL.',
    tags: ['C#/.NET', 'Azure', 'MSSQL', 'Data Engineering'],
  },
  {
    period: 'Sep 2020 – Nov 2021',
    role: 'Software and Data Professional (Deep Learning)',
    company: 'CART-Tech',
    desc: 'Built deep-learning segmentation for cardiac MRI (DICOM CINE/LGE), cutting manual segmentation time per case from 30-60 minutes to a ~5-minute review step, and supported migration to AWS cloud scalability.',
    tags: ['Deep Learning', 'Medical Imaging', 'Python', 'AWS'],
  },
  {
    period: 'Nov 2018 – Aug 2020',
    role: 'Software Architect and Coach',
    company: 'Nemo Healthcare',
    desc: 'Led regulated software workflows under ISO 13485/IEC 62304, managed Jira/Confluence/Bitbucket governance, and built a Python app for Raspberry Pi-based data collection.',
    tags: ['ISO 13485', 'IEC 62304', 'Python', 'Coaching'],
  },
  {
    period: 'Feb 2018 – Oct 2018',
    role: 'Software and Data Professional',
    company: 'Isatis Health',
    desc: 'Built a rules engine for pharmacy-domain data, with a focus on practical software delivery and data-oriented work.',
    tags: ['Healthcare', 'Software Engineering', 'Data'],
  },
  {
    period: 'Apr 2017 – Oct 2017',
    role: 'Software Engineer',
    company: 'K3 Retail',
    desc: 'Wrote, optimized, and debugged C# and SQL for a point-of-sale system with an MSSQL backend (transactions, purchasing, stock, logistics), built REST/Swagger interfaces for webshops, and improved the build system.',
    tags: ['C#/.NET', 'MSSQL', 'REST/API', 'Retail'],
  },
  {
    period: 'Jun 2016 – Dec 2016',
    role: 'Senior Software Engineer',
    company: 'Altran',
    desc: 'ASML metrology software projects: extracting, validating, and transforming machine job data, bug fixing, refactoring for maintainability, and syncing software between releases.',
    tags: ['C/C++', 'Python', 'High-Tech'],
  },
  {
    period: 'Oct 2014 – May 2016',
    role: 'Senior Software Designer',
    company: 'Mapscape',
    desc: 'Navigation Data Standard compiler development in a Scrum team: GIS data transformation, a city-name distribution algorithm, SQLite map-data pipelines from Excel/CSV, and a Jenkins CI server for map builds.',
    tags: ['C++', 'SQLite', 'Python', 'GIS', 'Data Engineering'],
  },
  {
    period: 'Jul 2013 – Aug 2014',
    role: 'Software Designer',
    company: 'ASML',
    desc: 'Outsourced ASML projects: reticle marker layouts for 100+ recipes, a controlled test-automated migration of a delayed software branch to the qualified baseline, and unblocking a stalled test phase.',
    tags: ['C++', 'Matlab', 'TDD', 'High-Tech'],
  },
  {
    period: 'May 2013 – Jul 2018',
    role: 'Senior Software Engineer (part-time)',
    company: 'Ratho BV',
    desc: 'Part-time (5-10%) role building a C#/SQL Active Directory management product, mentoring the lead engineer and supporting delivery.',
    tags: ['C#', 'SQL', 'Mentoring', 'Part-time (5-10%)'],
  },
  {
    period: 'Apr 2013 – Present',
    role: 'Software and Data Professional (self-employed)',
    company: 'pieterkuppens.net',
    desc: 'Independent practice delivering software and data projects across healthcare, finance, and high-tech.',
    tags: ['Freelance', 'Python', 'C#/.NET', 'C/C++', 'SQL'],
  },
  {
    period: 'Nov 2012 – Apr 2013',
    role: 'Technical Engineer',
    company: 'ABN AMRO Bank',
    desc: 'Built mortgage portal modules with secure data transport, using C#/WCF/MSSQL under TDD in a regulated banking environment.',
    tags: ['Security', 'Enterprise', 'C#/.NET', 'MSSQL'],
  },
  {
    period: 'Jun 2012 – Nov 2012',
    role: 'Technical Engineer',
    company: 'Blueriq',
    desc: 'Implemented branding and styling changes to the Aquima/Blueriq product using C#, WPF, HTML, and CSS.',
    tags: ['Frontend', 'WPF', 'HTML/CSS'],
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
    period: 'Jan 2011 – Apr 2012',
    role: 'Software Designer',
    company: 'Philips Healthcare',
    desc: 'XperCT team: built OpenGL 3D isotherm visualizations around ablation needle tips, helping surgeons judge treated tissue volume in cancer and cardiovascular treatment.',
    tags: ['Healthcare', 'Scientific Software', 'C/C++', 'Visualization'],
  },
  {
    period: 'Jan 2010 – Jan 2011',
    role: 'Software Developer',
    company: 'BOSOR',
    desc: 'Developed a web application for staff scheduling, converted the database from MySQL to MSSQL, and migrated the platform from Delphi RAD 2006 to Oxygene/Visual Studio 2010.',
    tags: ['Delphi', 'ASP.NET', 'SQL', 'JavaScript'],
  },
  {
    period: '1997 – 2009',
    role: 'Software Designer',
    company: 'ASML',
    desc: 'Data analysis and technical automation for lithography systems: analysed imaging data, used Matlab lens models to derive aberrations and calculate corrective machine settings, and built C/C++ software and data-collection interfaces.',
    tags: ['High-Tech', 'Data Analysis', 'Matlab', 'C/C++'],
  },
  {
    period: '1994 – 1996',
    role: 'AiO (Software Technology Designer Programme)',
    company: 'Eindhoven University of Technology (TU/e)',
    desc: 'Built a compiler for the Parallel Object-Oriented Specification Language (POOSL).',
    tags: ['Compilers', 'C', 'Lex/Yacc'],
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
