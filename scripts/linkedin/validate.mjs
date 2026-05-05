/**
 * Validate a canonical LinkedIn-aligned experience XML file.
 *
 * This script validates that an input XML file is well-formed and matches the
 * expected structure used by scripts/linkedin/schema.xsd. It is intentionally
 * offline and does not scrape linkedin.com.
 *
 * Usage:
 *   npm run linkedin:validate -- --in data/linkedin/pieterkuppens.xml
 *
 * Exit codes:
 *   0: valid
 *   1: invalid
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { JSDOM } from 'jsdom'

const NS = 'https://pkuppens.github.io/ns/linkedin-experience'

function parseArgs(argv) {
  const args = argv.slice(2)
  let inPath = ''
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--in' && args[i + 1]) inPath = args[++i]
  }
  if (!inPath) {
    throw new Error('Missing --in <path-to-xml>')
  }
  return { inPath }
}

function parseXml(xmlText) {
  const { window } = new JSDOM('')
  const doc = new window.DOMParser().parseFromString(xmlText, 'application/xml')
  const errors = [...doc.getElementsByTagName('parsererror')]
  if (errors.length > 0) {
    const msg = (errors[0].textContent ?? '').trim() || 'XML parse error'
    throw new Error(msg)
  }
  return doc
}

function textContent(el) {
  return (el?.textContent ?? '').trim()
}

function requireChild(parent, ns, localName, ctx) {
  const el = parent.getElementsByTagNameNS(ns, localName)[0] ?? null
  if (!el) throw new Error(`Missing <${localName}> in ${ctx}`)
  return el
}

function validateExperience(expEl, ctx) {
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

function validateExperienceGroup(groupEl, ctx) {
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

function validateDocument(doc) {
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

function main() {
  const { inPath } = parseArgs(process.argv)
  const abs = resolve(inPath)
  if (!existsSync(abs)) {
    console.error('linkedin/validate: file not found:', abs)
    process.exit(1)
  }
  try {
    const xml = readFileSync(abs, 'utf8')
    const doc = parseXml(xml)
    validateDocument(doc)
    console.log('linkedin/validate: OK', inPath)
  } catch (e) {
    console.error('linkedin/validate: INVALID', inPath)
    console.error(String(e?.message ?? e))
    process.exit(1)
  }
}

main()

