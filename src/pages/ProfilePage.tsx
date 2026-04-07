import styles from './ProfilePage.module.css'

const EXPERIENCE = [
  {
    period: '2020 – Present',
    role: 'Senior Software Engineer / Tech Lead',
    company: 'Various Clients (Freelance)',
    desc: 'AI integration, data engineering and full-stack development for clients in finance, logistics and healthcare sectors.',
    tags: ['Python', 'Azure', 'LLMs', 'React', 'FastAPI'],
  },
  {
    period: '2015 – 2020',
    role: 'Software Engineer',
    company: 'Enterprise Projects',
    desc: 'Backend services, data pipelines and cloud migrations. Led small teams and drove technical direction.',
    tags: ['Python', 'Java', 'SQL', 'Docker', 'CI/CD'],
  },
  {
    period: '2009 – 2015',
    role: 'Developer',
    company: 'Various',
    desc: 'Full-stack web development, system integrations and tooling.',
    tags: ['Java', 'JavaScript', 'SQL', 'Spring'],
  },
]

const PREFERENCES = [
  { label: 'Location', value: 'Netherlands (flexible hybrid/remote)' },
  { label: 'Preferred domains', value: 'Finance, Healthcare, Logistics, Technology' },
  { label: 'Rate range', value: '€850–€1100/day' },
  { label: 'Contract duration', value: '3–12 months preferred' },
  { label: 'Min. hours/week', value: '32 hours minimum' },
  { label: 'Travel', value: 'Max 1 hour commute, or remote' },
]

const TECH = {
  'Languages': ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java'],
  'Frontend': ['React', 'Vite', 'CSS Modules', 'Testing Library'],
  'Backend': ['FastAPI', 'Django', 'Node.js', 'REST', 'GraphQL'],
  'Data & AI': ['LangChain', 'OpenAI', 'HuggingFace', 'Pandas', 'dbt'],
  'Cloud & Infra': ['Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
  'Databases': ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
}

export default function ProfilePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Peter Kuppens</h1>
          <p className={styles.subtitle}>Senior Software Engineer · AI Integration Specialist</p>
          <p className={styles.bio}>
            I have 15+ years of experience building production-grade software across diverse industries.
            I specialise in Python backend engineering, AI/LLM integration, and full-stack TypeScript development.
            I value clean architecture, pragmatic delivery, and working with teams that care about quality.
          </p>
        </div>
      </section>

      {/* Preferences */}
      <section className="section">
        <div className="container">
          <h2 className="mb-4">Work Preferences</h2>
          <div className={styles.prefGrid}>
            {PREFERENCES.map(p => (
              <div key={p.label} className={`card ${styles.prefCard}`}>
                <div className={styles.prefLabel}>{p.label}</div>
                <div className={styles.prefValue}>{p.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className={`section ${styles.expSection}`}>
        <div className="container">
          <h2 className="mb-4">Experience</h2>
          <div className={styles.timeline}>
            {EXPERIENCE.map(e => (
              <div key={e.role} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelinePeriod}>{e.period}</div>
                  <h3 className={styles.timelineRole}>{e.role}</h3>
                  <div className={styles.timelineCompany}>{e.company}</div>
                  <p className="text-muted mt-1">{e.desc}</p>
                  <div className={`flex flex-wrap gap-1 mt-2`}>
                    {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section">
        <div className="container">
          <h2 className="mb-4">Technology Stack</h2>
          <div className={styles.techGrid}>
            {Object.entries(TECH).map(([cat, items]) => (
              <div key={cat} className="card">
                <h3 className={styles.techCat}>{cat}</h3>
                <div className={`flex flex-wrap gap-1 mt-2`}>
                  {items.map(i => <span key={i} className="tag">{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
