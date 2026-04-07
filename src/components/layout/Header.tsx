import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.brandMono}>{'<'}</span>
          Pieter Kuppens
          <span className={styles.brandMono}>{'/>'}</span>
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
            Home
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
            Profile
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
            Projects
          </NavLink>
          <NavLink to="/evaluator" className={({ isActive }) => isActive ? `${styles.activeLink} ${styles.cta}` : `${styles.link} ${styles.cta}`}>
            Opportunity Evaluator
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
