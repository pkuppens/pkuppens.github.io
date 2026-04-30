import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

function applyInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    document.documentElement.dataset.theme = stored
    return
  }

  document.documentElement.dataset.theme = 'dark'
}

applyInitialTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
