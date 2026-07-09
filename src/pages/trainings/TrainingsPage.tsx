import styles from './TrainingsPage.module.css'

type Training = {
  id: string
  title: string
  status: 'Live' | 'Planned'
  desc: string
  tags: string[]
  /** Static course path under public/trainings/. Present only when Live. */
  href?: string
}

const TRAININGS: Training[] = [
  {
    id: 'ai-901',
    title: 'AI-901 — Azure AI Fundamentals',
    status: 'Live',
    desc: 'A focused, self-checking course for Microsoft Exam AI-901. Short lessons, auto-graded quizzes, and exam-weighted mock exams with per-domain readiness scoring. Pass mark: 700/1000.',
    tags: ['Azure', 'AI Fundamentals', 'Quizzes', 'Mock Exams'],
    href: '/trainings/ai-901/',
  },
  {
    id: 'dp-900',
    title: 'DP-900 — Azure Data Fundamentals',
    status: 'Planned',
    desc: 'Core data concepts and how they map to Azure data services — relational, non-relational, and analytics workloads. Same lesson-then-quiz format as AI-901.',
    tags: ['Azure', 'Data Fundamentals'],
  },
  {
    id: 'ckad',
    title: 'CKAD — Certified Kubernetes Application Developer',
    status: 'Planned',
    desc: 'Designing, building, and deploying cloud-native applications on Kubernetes. Hands-on, exam-oriented drills.',
    tags: ['Kubernetes', 'Cloud Native'],
  },
]

export default function TrainingsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-badge-wrap">
            <div className="page-hero-badge">Trainings</div>
          </div>
          <h1 className="page-hero-title">
            Pieter Kuppens
            <span className="page-hero-subtitle">Certification study courses</span>
          </h1>
          <p className="page-hero-lead">
            Self-checking, exam-oriented courses I build while preparing for certifications. Each is a set of
            short lessons ending in auto-graded quizzes, plus exam-weighted mock exams. Shareable — every page
            stands alone.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.trainingsGrid}>
            {TRAININGS.map(training => (
              <div key={training.id} className={`card ${styles.trainingCard}`}>
                <div className={styles.trainingHeader}>
                  <span className={`badge ${training.status === 'Live' ? '' : 'badge-secondary'}`}>
                    {training.status}
                  </span>
                </div>
                <h2 className={styles.trainingTitle}>{training.title}</h2>
                <p className={`text-muted mt-1 mb-3 ${styles.trainingDesc}`}>{training.desc}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {training.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                {training.href ? (
                  // Static course lives outside the SPA (public/trainings/...), so use a
                  // plain anchor for a full-page navigation, not react-router <Link>.
                  <a href={training.href} className="btn btn-primary">
                    Open Course
                  </a>
                ) : (
                  <span className={`btn btn-outline ${styles.disabledBtn}`} aria-disabled="true">
                    Coming soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
