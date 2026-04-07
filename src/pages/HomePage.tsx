import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

const SKILLS = [
  { name: 'Python', level: 95 },
  { name: 'TypeScript', level: 85 },
  { name: 'React', level: 80 },
  { name: 'AI/ML Integration', level: 90 },
  { name: 'Azure / Cloud', level: 80 },
  { name: 'Data Engineering', level: 85 },
]

const HIGHLIGHTS = [
  {
    icon: '🤖',
    title: 'AI Integration',
    desc: 'LLM-backed solutions, prompt engineering, RAG pipelines and AI-assisted development workflows.',
  },
  {
    icon: '⚙️',
    title: 'Backend Engineering',
    desc: 'Scalable Python services, REST & event-driven APIs, robust data pipelines.',
  },
  {
    icon: '🌐',
    title: 'Frontend Craft',
    desc: 'React + TypeScript SPAs, accessible design, performance-focused UI engineering.',
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    desc: 'Azure-native architecture, CI/CD automation, IaC, containerisation.',
  },
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
              Peter Kuppens
              <span className={styles.heroSub}>Senior Software Engineer</span>
            </h1>
            <p className={styles.heroLead}>
              15+ years building production software — Python, TypeScript, React and AI integration.
              I combine strong engineering fundamentals with pragmatic delivery.
            </p>
            <div className={`flex flex-wrap gap-2 ${styles.heroCtas}`}>
              <Link to="/evaluator" className="btn btn-primary">
                🎯 Evaluate Your Opportunity
              </Link>
              <Link to="/profile" className="btn btn-outline">
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
                <div className={styles.highlightIcon}>{h.icon}</div>
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
            Open Opportunity Evaluator →
          </Link>
        </div>
      </section>
    </>
  )
}
