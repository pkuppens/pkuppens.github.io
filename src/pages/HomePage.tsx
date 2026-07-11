import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

const SKILLS = [
  { name: 'Python', evidence: 'RAG pipelines, deep learning, transaction monitoring' },
  { name: 'C / C++', evidence: 'ASML, Philips Healthcare, CART-Tech systems software' },
  { name: 'C# / .NET', evidence: 'ABN AMRO, Ratho, secure enterprise systems' },
  { name: 'SQL & Data Engineering', evidence: 'MSSQL/SQLite pipelines across finance, retail, and healthcare' },
  { name: 'Applied AI (LLM + non-LLM)', evidence: 'GenAI/RAG, deep-learning segmentation, fraud/transaction ML' },
  { name: 'Azure / AWS / Cloud', evidence: 'Data triggers, cloud migrations, scaling support' },
  { name: 'CI / CD / GitHub', evidence: 'Pipeline design and delivery automation across teams' },
  { name: 'Docker / Containers', evidence: 'Containerized services for on-prem and cloud deployment' },
]

const HIGHLIGHTS = [
  {
    title: 'Applied AI (LLM + non-LLM)',
    desc: 'Built GenAI and RAG solutions, and non-LLM systems for deep learning, NLP support, and transaction monitoring.',
  },
  {
    title: 'Data and SQL Engineering',
    desc: 'Designed and optimized SQL-heavy backends, data pipelines, and integration workflows across enterprise and SME systems.',
  },
  {
    title: 'Scientific and Regulated Software',
    desc: 'Delivered medical and high-tech software with quality process awareness in ISO 13485 and IEC 62304 contexts.',
  },
  {
    title: 'Leadership and Delivery',
    desc: 'Hands-on engineer who mentors teammates, supports architecture decisions, and improves team workflows.',
  },
]

const PROOF_POINTS = [
  'Deep-learning medical imaging (CART-Tech)',
  'AI transaction monitoring (Rent a Pin)',
  'Regulated healthcare software (Nemo, Philips, CART-Tech, Isatis Health)',
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className={styles.heroContent}>
            <div className="page-hero-badge-wrap">
              <div className="page-hero-badge">Available for assignments</div>
            </div>
            <h1 className="page-hero-title">
              Pieter Kuppens
              <span className="page-hero-subtitle">Software, Data, and AI Engineer</span>
            </h1>
            <p className="page-hero-lead">
              30+ years building production systems in high-tech, healthcare, and finance. Based in the Netherlands
              (Den Bosch–Eindhoven region), available hybrid or remote. I deliver practical solutions across Python,
              C#/.NET, C/C++, SQL, cloud, and AI.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {PROOF_POINTS.map(point => (
                <span key={point} className="tag">{point}</span>
              ))}
            </div>
            <div className={`flex flex-wrap gap-2 ${styles.heroCtas}`}>
              <Link to="/evaluator" className="btn btn-primary">
                Evaluate Your Opportunity
              </Link>
              <Link to="/projects" className={`btn btn-outline ${styles.heroOutlineBtn}`}>
                View Projects
              </Link>
              <a
                href="https://www.linkedin.com/in/pieterkuppens/"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-outline ${styles.heroOutlineBtn}`}
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section">
        <div className="container">
          <h2 className={`text-center mb-4 ${styles.sectionTitle}`}>What I bring</h2>
          <div className="grid-2">
            {HIGHLIGHTS.map(h => (
              <div key={h.title} className={`card ${styles.highlightCard}`}>
                <h3 className={styles.highlightTitle}>{h.title}</h3>
                <p className="text-muted">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainings */}
      <section className="section text-center">
        <div className="container">
          <h2 className={`mb-2 ${styles.sectionTitle}`}>Trainings</h2>
          <p className={`text-muted mb-4 ${styles.ctaDesc}`}>
            Self-checking certification study courses I build while preparing for exams — short lessons,
            auto-graded quizzes, and exam-weighted mock exams. Starting with Azure AI Fundamentals (AI-901).
          </p>
          <Link to="/trainings" className="btn btn-primary">
            Browse Trainings
          </Link>
        </div>
      </section>

      {/* Skills */}
      <section className={`section ${styles.skillsSection}`}>
        <div className="container">
          <h2 className={`text-center mb-4 ${styles.sectionTitle}`}>Core Skills</h2>
          <div className={styles.skillsGrid}>
            {SKILLS.map(skill => (
              <div key={skill.name} className={styles.skillItem}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillEvidence}>{skill.evidence}</span>
              </div>
            ))}
          </div>
          <p className={`text-center text-muted mt-4`}>
            <Link to="/profile">See the full experience timeline on my Profile</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={`section text-center ${styles.ctaSection}`}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Looking for a fit?</h2>
          <p className={`text-muted mt-2 mb-4 ${styles.ctaDesc}`}>
            Use the interactive Opportunity Evaluator to see how well an assignment matches my profile.
          </p>
          <Link to="/evaluator" className="btn btn-primary">
            Open Opportunity Evaluator
          </Link>
        </div>
      </section>
    </>
  )
}
