import { Link } from 'react-router-dom'
import styles from './ProjectsPage.module.css'

const PROJECTS = [
  {
    slug: 'evaluator',
    title: 'Opportunity Evaluator',
    icon: '🎯',
    status: 'Live',
    desc: 'An interactive tool that scores assignment fit based on configurable criteria: domain, rate, commute, technology, and more. Built with React and TypeScript with pure-function scoring logic.',
    tags: ['React', 'TypeScript', 'Scoring Engine', 'localStorage'],
    link: '/evaluator',
    isInternal: true,
  },
  {
    slug: 'github',
    title: 'Open Source Contributions',
    icon: '📦',
    status: 'Active',
    desc: 'Collection of open-source projects and contributions on GitHub, including utilities, data tools, and AI experiments.',
    tags: ['Python', 'Various', 'Open Source'],
    link: 'https://github.com/pkuppens',
    isInternal: false,
  },
]

export default function ProjectsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Projects & Demos</h1>
          <p className={styles.subtitle}>
            Selected work demonstrating technical skills and problem-solving approach.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.projectsGrid}>
            {PROJECTS.map(project => (
              <div key={project.slug} className={`card ${styles.projectCard}`}>
                <div className={styles.projectHeader}>
                  <span className={styles.projectIcon}>{project.icon}</span>
                  <span className={`badge ${project.status === 'Live' ? '' : 'badge-secondary'}`}>
                    {project.status}
                  </span>
                </div>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={`text-muted mt-1 mb-3 ${styles.projectDesc}`}>{project.desc}</p>
                <div className={`flex flex-wrap gap-1 mb-3`}>
                  {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                {project.isInternal ? (
                  <Link to={project.link} className="btn btn-primary">
                    Open Demo →
                  </Link>
                ) : (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    View on GitHub ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
