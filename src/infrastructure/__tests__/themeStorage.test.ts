import { describe, it, expect, beforeEach } from 'vitest'
import { applyThemeToDocument, loadTheme, saveTheme } from '../themeStorage'
import { LEGACY_THEME_KEY, STORAGE_KEYS } from '../storageKeys'

describe('themeStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    delete document.documentElement.dataset.theme
  })

  it('defaults to dark when no theme is stored', () => {
    expect(loadTheme()).toBe('dark')
  })

  it('saves and loads theme via namespaced storage', () => {
    saveTheme('light')
    expect(loadTheme()).toBe('light')
    expect(localStorage.getItem(`pkuppens_${STORAGE_KEYS.theme}`)).toBe('"light"')
  })

  it('migrates legacy unprefixed theme key', () => {
    localStorage.setItem(LEGACY_THEME_KEY, 'light')
    expect(loadTheme()).toBe('light')
    expect(localStorage.getItem(LEGACY_THEME_KEY)).toBeNull()
    expect(localStorage.getItem(`pkuppens_${STORAGE_KEYS.theme}`)).toBe('"light"')
  })

  it('applyThemeToDocument sets dataset.theme', () => {
    applyThemeToDocument('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})
