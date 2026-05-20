import { LEGACY_THEME_KEY, STORAGE_KEYS } from './storageKeys'
import { loadFromStorage, saveToStorage } from './storage'

export type Theme = 'light' | 'dark'

const DEFAULT_THEME: Theme = 'dark'

function readLegacyTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(LEGACY_THEME_KEY)
    if (raw === 'light' || raw === 'dark') return raw
  } catch {
    // ignore
  }
  return null
}

/** Load theme from storage, migrating legacy unprefixed key when present. */
export function loadTheme(): Theme {
  const stored = loadFromStorage<Theme | null>(STORAGE_KEYS.theme, null)
  if (stored === 'light' || stored === 'dark') return stored

  const legacy = readLegacyTheme()
  if (legacy) {
    saveToStorage(STORAGE_KEYS.theme, legacy)
    try {
      localStorage.removeItem(LEGACY_THEME_KEY)
    } catch {
      // ignore
    }
    return legacy
  }

  return DEFAULT_THEME
}

export function saveTheme(theme: Theme): void {
  saveToStorage(STORAGE_KEYS.theme, theme)
}

export function applyThemeToDocument(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}
