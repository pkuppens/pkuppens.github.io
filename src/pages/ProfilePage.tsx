import {
  DISPLAY_PREFERENCES,
  EXPERIENCE,
  TECH_STACK,
} from '../domain/profile'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-badge-wrap">
            <div className="page-hero-badge">Professional profile</div>
          </div>
          <h1 className="page-hero-title">
            Pieter Kuppens
            <span className="page-hero-subtitle">
              Software, Data, and AI Professional · Healthcare, Finance, High-Tech
            </span>
          </h1>
          <p className="page-hero-lead">
            I am a software and data engineer with 30+ years of experience. I build production systems with Python,
            C#/.NET, C/C++, SQL, and cloud platforms. My recent work spans GenAI and non-LLM AI, including deep-learning
            medical imaging and transaction monitoring. I work best in teams that value quality and clear communication.
          </p>
        </div>
      </section>

      {/* Preferences */}
      <section className="section">
        <div className="container">
          <h2 className="mb-4">Work Preferences</h2>
          <div className={styles.prefGrid}>
            {DISPLAY_PREFERENCES.map(p => (
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
              <div key={`${e.company}-${e.period}`} className={styles.timelineItem}>
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
            {Object.entries(TECH_STACK).map(([cat, items]) => (
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
