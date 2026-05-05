/**
 * Export canonical LinkedIn-aligned experience XML to CSV.
 *
 * This script reads a canonical file under data/linkedin/<slug>.xml and writes a
 * derived CSV suitable for spreadsheets. It is intentionally offline and does
 * not scrape linkedin.com.
 *
 * Usage:
 *   npm run linkedin:export:csv -- --in data/linkedin/pieterkuppens.xml
 *   npm run linkedin:export:csv -- --in data/linkedin/pieterkuppens.xml --out tmp/pieterkuppens.csv
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve, join, basename } from 'node:path'
import { JSDOM } from 'jsdom'

const NS = 'https://pkuppens.github.io/ns/linkedin-experience'

function parseArgs(argv) {
  const args = argv.slice(2)
  let inPath = ''
  let outPath = ''
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--in' && args[i + 1]) inPath = args[++i]
    if (args[i] === '--out' && args[i + 1]) outPath = args[++i]
  }
  if (!inPath) throw new Error('Missing --in <path-to-xml>')
  return { inPath, outPath }
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

function t(el) {
  return (el?.textContent ?? '').trim()
}

function csvEscape(value) {
  const s = value == null ? '' : String(value)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function periodFields(periodEl) {
  const start = periodEl.getElementsByTagNameNS(NS, 'startDate')[0] ?? null
  const end = periodEl.getElementsByTagNameNS(NS, 'endDate')[0] ?? null
  const dur = periodEl.getElementsByTagNameNS(NS, 'duration')[0] ?? null
  const raw = periodEl.getElementsByTagNameNS(NS, 'raw')[0] ?? null
  return {
    startYearMonth: start?.getAttribute('yearMonth') ?? '',
    endYearMonth: end?.getAttribute('yearMonth') ?? '',
    endCurrent: (end?.getAttribute('current') ?? '').toLowerCase() === 'true' ? 'true' : '',
    durationYears: dur?.getAttribute('years') ?? '',
    durationMonths: dur?.getAttribute('months') ?? '',
    durationRaw: dur?.getAttribute('raw') ?? '',
    periodRaw: t(raw) ?? '',
  }
}

function listText(parentEl, listName, itemName) {
  const listEl = parentEl.getElementsByTagNameNS(NS, listName)[0] ?? null
  if (!listEl) return ''
  const items = [...listEl.getElementsByTagNameNS(NS, itemName)].map((x) => t(x)).filter(Boolean)
  return items.join(' | ')
}

function exportRows(doc) {
  const root = doc.documentElement
  const rows = []

  for (const node of [...root.childNodes]) {
    if (node.nodeType !== 1) continue
    if (node.namespaceURI !== NS) continue

    if (node.localName === 'experience') {
      const periodEl = node.getElementsByTagNameNS(NS, 'period')[0] ?? null
      const p = periodEl ? periodFields(periodEl) : {}
      rows.push({
        kind: 'experience',
        groupCompany: '',
        id: node.getAttribute('id') ?? '',
        company: t(node.getElementsByTagNameNS(NS, 'company')[0]) || '',
        tagline: t(node.getElementsByTagNameNS(NS, 'tagline')[0]) || '',
        employmentType: t(node.getElementsByTagNameNS(NS, 'employmentType')[0]) || '',
        location: t(node.getElementsByTagNameNS(NS, 'location')[0]) || '',
        workMode: t(node.getElementsByTagNameNS(NS, 'workMode')[0]) || '',
        description: t(node.getElementsByTagNameNS(NS, 'description')[0]) || '',
        tasks: listText(node, 'tasks', 'task'),
        skills: listText(node, 'skills', 'skill'),
        skillsTruncatedSummary: t(node.getElementsByTagNameNS(NS, 'skillsTruncatedSummary')[0]) || '',
        ...p,
      })
    }

    if (node.localName === 'experienceGroup') {
      const groupCompany = t(node.getElementsByTagNameNS(NS, 'company')[0]) || ''
      const groupLocation = t(node.getElementsByTagNameNS(NS, 'location')[0]) || ''

      const exps = [...node.getElementsByTagNameNS(NS, 'experience')].filter((e) => e.parentNode === node)
      for (const e of exps) {
        const periodEl = e.getElementsByTagNameNS(NS, 'period')[0] ?? null
        const p = periodEl ? periodFields(periodEl) : {}
        rows.push({
          kind: 'experienceGroupItem',
          groupCompany,
          id: e.getAttribute('id') ?? '',
          company: groupCompany,
          tagline: t(e.getElementsByTagNameNS(NS, 'tagline')[0]) || '',
          employmentType: '',
          location: groupLocation,
          workMode: '',
          description: t(e.getElementsByTagNameNS(NS, 'description')[0]) || '',
          tasks: listText(e, 'tasks', 'task'),
          skills: listText(e, 'skills', 'skill'),
          skillsTruncatedSummary: t(e.getElementsByTagNameNS(NS, 'skillsTruncatedSummary')[0]) || '',
          ...p,
        })
      }
    }
  }

  return rows
}

function main() {
  const { inPath, outPath } = parseArgs(process.argv)
  const absIn = resolve(inPath)
  if (!existsSync(absIn)) {
    console.error('linkedin/export-csv: file not found:', absIn)
    process.exit(1)
  }

  let doc
  try {
    doc = parseXml(readFileSync(absIn, 'utf8'))
  } catch (e) {
    console.error('linkedin/export-csv: invalid XML:', String(e?.message ?? e))
    process.exit(1)
  }

  const rows = exportRows(doc)
  const headers = [
    'kind',
    'groupCompany',
    'id',
    'company',
    'tagline',
    'employmentType',
    'location',
    'workMode',
    'startYearMonth',
    'endYearMonth',
    'endCurrent',
    'durationYears',
    'durationMonths',
    'durationRaw',
    'periodRaw',
    'description',
    'tasks',
    'skills',
    'skillsTruncatedSummary',
  ]

  const lines = [headers.map(csvEscape).join(',')]
  for (const r of rows) {
    lines.push(headers.map((h) => csvEscape(r[h] ?? '')).join(','))
  }

  const defaultOut = join(process.cwd(), 'tmp', `${basename(inPath, '.xml')}.csv`)
  const absOut = resolve(outPath || defaultOut)
  mkdirSync(dirname(absOut), { recursive: true })
  writeFileSync(absOut, lines.join('\n') + '\n', 'utf8')
  console.log('linkedin/export-csv: wrote', absOut)
}

main()

