import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Header.module.css'

type Theme = 'light' | 'dark'

function getCurrentTheme(): Theme {
  const t = document.documentElement.dataset.theme
  return t === 'dark' ? 'dark' : 'light'
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem('theme', theme)
}

export default function Header() {
  const [theme, setThemeState] = useState<Theme>(() => getCurrentTheme())

  useEffect(() => {
    setThemeState(getCurrentTheme())
  }, [])

  function onToggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setThemeState(next)
  }

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
          <button
            type="button"
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </nav>
      </div>
    </header>
  )
}
