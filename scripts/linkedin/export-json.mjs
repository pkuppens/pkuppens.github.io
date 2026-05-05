/**
 * Export canonical LinkedIn-aligned experience XML to JSON.
 *
 * This script reads a canonical file under data/linkedin/<slug>.xml and writes a
 * derived JSON representation. It is intentionally offline and does not scrape
 * linkedin.com.
 *
 * Usage:
 *   npm run linkedin:export:json -- --in data/linkedin/pieterkuppens.xml
 *   npm run linkedin:export:json -- --in data/linkedin/pieterkuppens.xml --out tmp/pieterkuppens.json
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

function parsePeriod(periodEl) {
  const start = periodEl.getElementsByTagNameNS(NS, 'startDate')[0] ?? null
  const end = periodEl.getElementsByTagNameNS(NS, 'endDate')[0] ?? null
  const dur = periodEl.getElementsByTagNameNS(NS, 'duration')[0] ?? null
  const raw = periodEl.getElementsByTagNameNS(NS, 'raw')[0] ?? null
  return {
    startYearMonth: start?.getAttribute('yearMonth') ?? null,
    endYearMonth: end?.getAttribute('yearMonth') ?? null,
    endCurrent: (end?.getAttribute('current') ?? '').toLowerCase() === 'true' ? true : null,
    duration: dur
      ? {
          years: dur.getAttribute('years') ? Number(dur.getAttribute('years')) : null,
          months: dur.getAttribute('months') ? Number(dur.getAttribute('months')) : null,
          raw: dur.getAttribute('raw') ?? null,
        }
      : null,
    raw: t(raw) || null,
  }
}

function parseSkills(parentEl) {
  const skillsEl = parentEl.getElementsByTagNameNS(NS, 'skills')[0] ?? null
  if (!skillsEl) return []
  return [...skillsEl.getElementsByTagNameNS(NS, 'skill')].map((s) => t(s)).filter(Boolean)
}

function parseTasks(parentEl) {
  const tasksEl = parentEl.getElementsByTagNameNS(NS, 'tasks')[0] ?? null
  if (!tasksEl) return []
  return [...tasksEl.getElementsByTagNameNS(NS, 'task')].map((x) => t(x)).filter(Boolean)
}

function parseExperience(expEl) {
  return {
    kind: 'experience',
    id: expEl.getAttribute('id'),
    linkedinComponentKey: expEl.getAttribute('linkedinComponentKey') ?? null,
    tagline: t(expEl.getElementsByTagNameNS(NS, 'tagline')[0]),
    company: t(expEl.getElementsByTagNameNS(NS, 'company')[0]),
    employmentType: t(expEl.getElementsByTagNameNS(NS, 'employmentType')[0]) || null,
    period: parsePeriod(expEl.getElementsByTagNameNS(NS, 'period')[0]),
    location: t(expEl.getElementsByTagNameNS(NS, 'location')[0]) || null,
    workMode: t(expEl.getElementsByTagNameNS(NS, 'workMode')[0]) || null,
    description: t(expEl.getElementsByTagNameNS(NS, 'description')[0]) || null,
    tasks: parseTasks(expEl),
    skills: parseSkills(expEl),
    skillsTruncatedSummary: t(expEl.getElementsByTagNameNS(NS, 'skillsTruncatedSummary')[0]) || null,
  }
}

function parseGroupedExperience(expEl) {
  return {
    id: expEl.getAttribute('id'),
    tagline: t(expEl.getElementsByTagNameNS(NS, 'tagline')[0]),
    period: parsePeriod(expEl.getElementsByTagNameNS(NS, 'period')[0]),
    description: t(expEl.getElementsByTagNameNS(NS, 'description')[0]) || null,
    tasks: parseTasks(expEl),
    skills: parseSkills(expEl),
    skillsTruncatedSummary: t(expEl.getElementsByTagNameNS(NS, 'skillsTruncatedSummary')[0]) || null,
  }
}

function parseExperienceGroup(groupEl) {
  const groupSummary = groupEl.getElementsByTagNameNS(NS, 'groupSummary')[0] ?? null
  return {
    kind: 'experienceGroup',
    linkedinComponentKey: groupEl.getAttribute('linkedinComponentKey') ?? null,
    company: t(groupEl.getElementsByTagNameNS(NS, 'company')[0]),
    groupSummary: groupSummary
      ? {
          employmentType: t(groupSummary.getElementsByTagNameNS(NS, 'employmentType')[0]) || null,
          totalDurationText: t(groupSummary.getElementsByTagNameNS(NS, 'totalDurationText')[0]) || null,
        }
      : null,
    location: t(groupEl.getElementsByTagNameNS(NS, 'location')[0]) || null,
    experiences: [...groupEl.getElementsByTagNameNS(NS, 'experience')]
      .filter((e) => e.parentNode === groupEl)
      .map(parseGroupedExperience),
  }
}

function main() {
  const { inPath, outPath } = parseArgs(process.argv)
  const absIn = resolve(inPath)
  if (!existsSync(absIn)) {
    console.error('linkedin/export-json: file not found:', absIn)
    process.exit(1)
  }

  const xml = readFileSync(absIn, 'utf8')
  const doc = parseXml(xml)
  const root = doc.documentElement

  const metaEl = root.getElementsByTagNameNS(NS, 'meta')[0] ?? null
  const meta = metaEl
    ? {
        sourceUrl: metaEl.getAttribute('sourceUrl') ?? null,
        scrapedAt: metaEl.getAttribute('scrapedAt') ?? null,
        locale: metaEl.getAttribute('locale') ?? null,
      }
    : null

  const items = []
  for (const node of [...root.childNodes]) {
    if (node.nodeType !== 1) continue
    if (node.namespaceURI !== NS) continue
    if (node.localName === 'experience') items.push(parseExperience(node))
    if (node.localName === 'experienceGroup') items.push(parseExperienceGroup(node))
  }

  const payload = {
    schemaNamespace: NS,
    generatedAt: new Date().toISOString(),
    sourceXml: inPath,
    meta,
    items,
  }

  const defaultOut = join(process.cwd(), 'tmp', `${basename(inPath, '.xml')}.json`)
  const absOut = resolve(outPath || defaultOut)
  mkdirSync(dirname(absOut), { recursive: true })
  writeFileSync(absOut, JSON.stringify(payload, null, 2) + '\n', 'utf8')
  console.log('linkedin/export-json: wrote', absOut)
}

main()

