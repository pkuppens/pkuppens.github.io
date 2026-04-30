import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

const SKILLS = [
  { name: 'Python', level: 90 },
  { name: 'C / C++', level: 90 },
  { name: 'C# / .NET', level: 85 },
  { name: 'SQL & Data Engineering', level: 85 },
  { name: 'Applied AI (LLM + non-LLM)', level: 90 },
  { name: 'Azure / AWS / Cloud', level: 85 },
  { name: 'CI / CD / GitHub', level: 90 },
  { name: 'Docker / Containers', level: 85 },
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
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>Available for assignments</div>
            <h1 className={styles.heroTitle}>
              Pieter Kuppens
              <span className={styles.heroSub}>Software, Data, and AI Engineer</span>
            </h1>
            <p className={styles.heroLead}>
              30+ years building production systems in high-tech, healthcare, and finance. I deliver practical
              solutions across Python, C#/.NET, C/C++, SQL, cloud, and AI.
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
              <Link to="/profile" className={`btn btn-outline ${styles.heroOutlineBtn}`}>
                View Profile
              </Link>
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

      {/* Skills */}
      <section className={`section ${styles.skillsSection}`}>
        <div className="container">
          <h2 className={`text-center mb-4 ${styles.sectionTitle}`}>Core Skills</h2>
          <div className={styles.skillsGrid}>
            {SKILLS.map(skill => (
              <div key={skill.name} className={styles.skillItem}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillPct}>{skill.level}%</span>
                </div>
                <div className={styles.skillBar}>
                  <div
                    className={styles.skillFill}
                    style={{ width: `${skill.level}%` }}
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency`}
                  />
                </div>
              </div>
            ))}
          </div>
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
