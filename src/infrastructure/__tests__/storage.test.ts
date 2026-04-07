import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadFromStorage, saveToStorage, removeFromStorage } from '../storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('saveToStorage and loadFromStorage', () => {
    it('saves and loads a value', () => {
      saveToStorage('key1', { foo: 'bar' })
      expect(loadFromStorage('key1', null)).toEqual({ foo: 'bar' })
    })

    it('returns the default value when key does not exist', () => {
      expect(loadFromStorage('nonexistent', 42)).toBe(42)
    })

    it('returns the default value when stored JSON is malformed', () => {
      localStorage.setItem('pkuppens_bad', '{invalid json')
      expect(loadFromStorage('bad', 'default')).toBe('default')
    })

    it('handles string values', () => {
      saveToStorage('str', 'hello')
      expect(loadFromStorage('str', '')).toBe('hello')
    })

    it('handles array values', () => {
      saveToStorage('arr', [1, 2, 3])
      expect(loadFromStorage('arr', [])).toEqual([1, 2, 3])
    })

    it('uses the pkuppens_ prefix', () => {
      saveToStorage('mykey', 'value')
      expect(localStorage.getItem('pkuppens_mykey')).toBe('"value"')
    })
  })

  describe('removeFromStorage', () => {
    it('removes a stored value', () => {
      saveToStorage('toRemove', 'data')
      removeFromStorage('toRemove')
      expect(loadFromStorage('toRemove', 'default')).toBe('default')
    })

    it('does not throw when key does not exist', () => {
      expect(() => removeFromStorage('nonexistent')).not.toThrow()
    })
  })

  describe('error handling', () => {
    it('does not throw when localStorage.setItem fails', () => {
      vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError')
      })
      expect(() => saveToStorage('key', 'value')).not.toThrow()
      vi.restoreAllMocks()
    })

    it('does not throw when localStorage.getItem fails', () => {
      vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
        throw new Error('SecurityError')
      })
      expect(loadFromStorage('key', 'fallback')).toBe('fallback')
      vi.restoreAllMocks()
    })
  })
})
