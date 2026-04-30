import { Link } from 'react-router-dom'
import styles from './ProjectsPage.module.css'

const PROJECTS = [
  {
    slug: 'on-prem-rag',
    title: 'On-Prem RAG for Healthcare',
    status: 'Active',
    desc: 'Problem: healthcare teams need private AI search over internal knowledge. Approach: on-prem RAG pipeline with grounded answers and citations. Outcome: practical GenAI proof in a privacy-sensitive domain.',
    tags: ['Python', 'RAG', 'Healthcare', 'On-Prem'],
    link: 'https://github.com/pkuppens/on_prem_rag',
    isInternal: false,
  },
  {
    slug: 'transaction-monitoring',
    title: 'Transaction Monitoring ML/AI',
    status: 'Active',
    desc: 'Problem: detect risky transaction patterns and improve monitoring workflows. Approach: MLFlow-based experimentation and operational workflow support. Outcome: stronger evidence for non-LLM AI in finance.',
    tags: ['MLFlow', 'Fraud Detection', 'Finance', 'Python'],
    link: 'https://github.com/pkuppens/mlflow_transaction_monitoring',
    isInternal: false,
  },
  {
    slug: 'medical-imaging',
    title: 'Medical Imaging Deep Learning',
    status: 'Case Study',
    desc: 'Problem: support cardiac intervention planning with better image understanding. Approach: deep-learning segmentation on DICOM MRI and cloud migration support. Outcome: production-oriented non-LLM AI in medtech.',
    tags: ['Deep Learning', 'DICOM', 'MRI', 'AWS'],
    link: '/profile',
    isInternal: true,
  },
  {
    slug: 'evaluator',
    title: 'Opportunity Evaluator',
    status: 'Live',
    desc: 'An interactive tool that scores assignment fit based on configurable criteria: domain, rate, commute, technology, and more. Built with React and TypeScript with pure-function scoring logic.',
    tags: ['React', 'TypeScript', 'Scoring Engine', 'localStorage'],
    link: '/evaluator',
    isInternal: true,
  },
  {
    slug: 'healthcare-ai-agent',
    title: 'Healthcare AI Agent PoC',
    status: 'Active',
    desc: 'Problem: explore AI-agent support in healthcare context. Approach: proof-of-concept agent architecture and domain workflows. Outcome: practical baseline for future healthcare AI solutions.',
    tags: ['Healthcare', 'AI Agent', 'PoC', 'Python'],
    link: 'https://github.com/pkuppens/healthcare-aigent',
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
            Selected work showing software, data, and AI delivery across healthcare, finance, and high-tech.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.projectsGrid}>
            {PROJECTS.map(project => (
              <div key={project.slug} className={`card ${styles.projectCard}`}>
                <div className={styles.projectHeader}>
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
                    Open Demo
                  </Link>
                ) : (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    View on GitHub
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
