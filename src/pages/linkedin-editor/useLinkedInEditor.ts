import { useCallback, useState } from 'react'
import {
  parseExperiencesXml,
  serializeExperiencesXml,
  validateExperiencesModel,
  LinkedInXmlError,
} from '../../lib/linkedin/xml'
import {
  newExperience,
  newExperienceGroup,
  type ExperiencesDocumentModel,
  type ExperiencesItem,
} from '../../lib/linkedin/types'

const DEFAULT_SLUG = 'pieterkuppens'

function sessionKey(slug: string): string {
  return `linkedin-editor:${slug}`
}

function emptyModel(): ExperiencesDocumentModel {
  return { meta: null, items: [] }
}

function nextId(prefix: string, existing: ExperiencesDocumentModel): string {
  let i = existing.items.length + 1
  const usedIds = new Set(
    existing.items.flatMap((item) => (item.kind === 'experience' ? [item.id] : item.experiences.map((e) => e.id))),
  )
  let candidate = `${prefix}-${i}`
  while (usedIds.has(candidate)) {
    i += 1
    candidate = `${prefix}-${i}`
  }
  return candidate
}

export function useLinkedInEditor() {
  const [slug, setSlug] = useState(DEFAULT_SLUG)
  const [model, setModel] = useState<ExperiencesDocumentModel>(emptyModel)
  const [status, setStatus] = useState<string | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)

  const loadFromXmlText = useCallback((xmlText: string) => {
    try {
      const parsed = parseExperiencesXml(xmlText)
      setModel(parsed)
      setParseError(null)
      setStatus('Loaded.')
    } catch (e) {
      const message = e instanceof LinkedInXmlError ? e.message : String(e)
      setParseError(message)
    }
  }, [])

  const loadFromDevServer = useCallback(async () => {
    setStatus('Loading…')
    try {
      const res = await fetch(`/api/linkedin/experiences/${slug}`)
      if (!res.ok) {
        setStatus(`Load failed: ${res.status} ${res.statusText}`)
        return
      }
      loadFromXmlText(await res.text())
    } catch (e) {
      setStatus(`Load failed: ${String(e)}`)
    }
  }, [slug, loadFromXmlText])

  const saveToDevServer = useCallback(async () => {
    setStatus('Saving…')
    try {
      const xml = serializeExperiencesXml(model)
      const res = await fetch(`/api/linkedin/experiences/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/xml' },
        body: xml,
      })
      setStatus(res.ok ? `Saved to data/linkedin/${slug}.xml` : `Save failed: ${res.status} ${res.statusText}`)
    } catch (e) {
      setStatus(`Save failed: ${String(e)}`)
    }
  }, [model, slug])

  const saveToSession = useCallback(() => {
    try {
      sessionStorage.setItem(sessionKey(slug), serializeExperiencesXml(model))
      setStatus(`Saved to browser session storage (${slug}).`)
    } catch (e) {
      setStatus(`Save failed: ${String(e)}`)
    }
  }, [model, slug])

  const loadFromSession = useCallback(() => {
    const xml = sessionStorage.getItem(sessionKey(slug))
    if (xml === null) {
      setStatus(`No session data saved for "${slug}".`)
      return
    }
    loadFromXmlText(xml)
  }, [slug, loadFromXmlText])

  const addExperience = useCallback(() => {
    setModel((m) => ({ ...m, items: [...m.items, newExperience(nextId('experience', m))] }))
  }, [])

  const addExperienceGroup = useCallback(() => {
    setModel((m) => ({ ...m, items: [...m.items, newExperienceGroup('')] }))
  }, [])

  const updateItem = useCallback((index: number, updated: ExperiencesItem) => {
    setModel((m) => ({ ...m, items: m.items.map((it, i) => (i === index ? updated : it)) }))
  }, [])

  const removeItem = useCallback((index: number) => {
    setModel((m) => ({ ...m, items: m.items.filter((_, i) => i !== index) }))
  }, [])

  const exportXml = useCallback(() => serializeExperiencesXml(model), [model])

  const errors = validateExperiencesModel(model)

  return {
    slug,
    setSlug,
    model,
    status,
    parseError,
    errors,
    loadFromXmlText,
    loadFromDevServer,
    saveToDevServer,
    loadFromSession,
    saveToSession,
    addExperience,
    addExperienceGroup,
    updateItem,
    removeItem,
    exportXml,
  }
}
