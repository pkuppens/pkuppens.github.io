/**
 * Shared parsing/validation rules for canonical LinkedIn-aligned experience XML.
 *
 * Environment-agnostic: operates on a DOM `Document` produced by any DOMParser
 * (jsdom in Node scripts, the browser's native DOMParser in the editor UI).
 * Callers are responsible for producing the `Document` (see validate.mjs for
 * the jsdom-based Node parsing helper).
 */

export const NS = 'https://pkuppens.github.io/ns/linkedin-experience'

export function textContent(el) {
  return (el?.textContent ?? '').trim()
}

function requireChild(parent, ns, localName, ctx) {
  const el = parent.getElementsByTagNameNS(ns, localName)[0] ?? null
  if (!el) throw new Error(`Missing <${localName}> in ${ctx}`)
  return el
}

export function validateExperience(expEl, ctx) {
  const id = expEl.getAttribute('id')
  if (!id || !id.trim()) throw new Error(`Missing required @id on ${ctx}`)

  requireChild(expEl, NS, 'tagline', ctx)
  requireChild(expEl, NS, 'company', ctx)
  const periodEl = requireChild(expEl, NS, 'period', ctx)

  const startDate = periodEl.getElementsByTagNameNS(NS, 'startDate')[0] ?? null
  const endDate = periodEl.getElementsByTagNameNS(NS, 'endDate')[0] ?? null
  if (startDate) {
    const ym = startDate.getAttribute('yearMonth')
    if (!ym) throw new Error(`period/startDate missing @yearMonth in ${ctx}`)
  }
  if (endDate) {
    const ym = endDate.getAttribute('yearMonth')
    const cur = endDate.getAttribute('current')
    if (!ym && !cur) {
      throw new Error(`period/endDate must have @yearMonth or @current in ${ctx}`)
    }
  }

  const tasksEl = expEl.getElementsByTagNameNS(NS, 'tasks')[0] ?? null
  if (tasksEl) {
    for (const t of [...tasksEl.getElementsByTagNameNS(NS, 'task')]) {
      if (!textContent(t)) throw new Error(`Empty <task> in ${ctx}`)
    }
  }
}

export function validateExperienceGroup(groupEl, ctx) {
  requireChild(groupEl, NS, 'company', ctx)
  const experiences = [...groupEl.getElementsByTagNameNS(NS, 'experience')]
  if (experiences.length === 0) throw new Error(`Missing <experience> items in ${ctx}`)
  for (let i = 0; i < experiences.length; i++) {
    const e = experiences[i]
    const ectx = `${ctx}/experience[${i + 1}]`
    const id = e.getAttribute('id')
    if (!id || !id.trim()) throw new Error(`Missing required @id on ${ectx}`)
    requireChild(e, NS, 'tagline', ectx)
    requireChild(e, NS, 'period', ectx)
  }
}

export function validateDocument(doc) {
  const root = doc.documentElement
  if (!root || root.localName !== 'experiences') {
    throw new Error('Root element must be <experiences>')
  }
  if (root.namespaceURI !== NS) {
    throw new Error(`Root namespace must be ${NS}`)
  }

  const allowedTop = new Set(['meta', 'experience', 'experienceGroup'])
  for (const node of [...root.childNodes]) {
    if (node.nodeType !== 1) continue
    if (!allowedTop.has(node.localName)) {
      throw new Error(`Unexpected top-level element <${node.localName}>`)
    }
    if (node.namespaceURI !== NS) {
      throw new Error(`Unexpected namespace for <${node.localName}>`)
    }
  }

  const exps = [...root.getElementsByTagNameNS(NS, 'experience')].filter((e) => e.parentNode === root)
  const groups = [...root.getElementsByTagNameNS(NS, 'experienceGroup')].filter((g) => g.parentNode === root)

  for (let i = 0; i < exps.length; i++) {
    validateExperience(exps[i], `/experiences/experience[${i + 1}]`)
  }
  for (let i = 0; i < groups.length; i++) {
    validateExperienceGroup(groups[i], `/experiences/experienceGroup[${i + 1}]`)
  }
}
