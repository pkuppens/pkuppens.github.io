import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { applyThemeToDocument, loadTheme } from './infrastructure/themeStorage'
import './index.css'

applyThemeToDocument(loadTheme())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
