/**
 * Turn tmp/linkedin.html (+ optional tmp/linkedin.skills.json) into tmp/linkedin.xml
 * and copy scripts/linkedin/schema.xsd to tmp/linkedin.xsd for local validation.
 *
 * Usage:
 *   node scripts/linkedin/to-xml.mjs
 *   node scripts/linkedin/to-xml.mjs --html path/to/save.html
 */
import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..', '..')
const tmpDir = join(repoRoot, 'tmp')
const defaultHtml = join(tmpDir, 'linkedin.html')
const defaultSkills = join(tmpDir, 'linkedin.skills.json')
const outXml = join(tmpDir, 'linkedin.xml')
const outXsd = join(tmpDir, 'linkedin.xsd')
const masterXsd = join(__dirname, 'schema.xsd')

const NS = 'https://pkuppens.github.io/ns/linkedin-experience'
const PERIOD_RE =
  /^\s*([a-zäöüë]{3,4}\.?)\s+(\d{4})\s+-\s+(heden|present|[a-zäöüë]{3,4}\.?\s+\d{4})\s+·\s+(.+)$/i

const MONTH_MAP = {
  jan: 1,
  feb: 2,
  mrt: 3,
  mar: 3,
  apr: 4,
  mei: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  okt: 10,
  nov: 11,
  dec: 12,
}

function parseArgs(argv) {
  const args = argv.slice(2)
  let htmlPath = defaultHtml
  let skillsPath = defaultSkills
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--html' && args[i + 1]) {
      htmlPath = args[++i]
    }
    if (args[i] === '--skills' && args[i + 1]) {
      skillsPath = args[++i]
    }
  }
  return { htmlPath, skillsPath }
}

function toYearMonth(monthToken, yearStr) {
  const key = monthToken.toLowerCase().replaceAll('.', '')
  const m = MONTH_MAP[key]
  if (!m) return null
  const y = parseInt(yearStr, 10)
  if (Number.isNaN(y)) return null
  return `${y}-${String(m).padStart(2, '0')}`
}

function parsePeriodLine(line) {
  const m = line.match(PERIOD_RE)
  if (!m) return null
  const start = toYearMonth(m[1], m[2])
  const endRaw = m[3].trim()
  const endLower = endRaw.toLowerCase()
  const endCurrent = endLower === 'heden' || endLower === 'present'
  let end = null
  if (!endCurrent) {
    const p = endRaw.match(/^([a-zäöüë]{3,4}\.?)\s+(\d{4})$/i)
    end = p ? toYearMonth(p[1], p[2]) : null
  }
  const durRaw = m[4].trim()
  return { start, end, endCurrent, durationRaw: durRaw, raw: line.trim() }
}

function parseDuration(durRaw) {
  let years = 0
  let months = 0
  const jr = durRaw.match(/(\d+)\s+jr\b/i)
  const mnd = durRaw.match(/(\d+)\s+mnd\b/i)
  const maanden = durRaw.match(/(\d+)\s+maanden\b/i)
  if (jr) years += parseInt(jr[1], 10)
  if (mnd) months += parseInt(mnd[1], 10)
  if (maanden) months += parseInt(maanden[1], 10)
  return { years, months, raw: durRaw }
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/]]>/g, ']]]]><![CDATA[')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function cdata(s) {
  if (!s) return ''
  return `<![CDATA[${s.replace(/]]>/g, ']]]]><![CDATA[')}]]>`
}

function splitTasksAndDescription(body) {
  const lines = body.split(/\r?\n/)
  const tasks = []
  const prose = []
  for (const line of lines) {
    const t = line.trim()
    if (/^[\*•]\s+/.test(t) || /^\d+\.\s+/.test(t)) {
      tasks.push(t.replace(/^[\*•]\s+/, '').replace(/^\d+\.\s+/, '').trim())
    } else if (t.length > 0) {
      prose.push(line)
    }
  }
  const description = prose.join('\n').trim()
  return { description, tasks }
}

function loadSkills(skillsPath) {
  if (!existsSync(skillsPath)) return {}
  try {
    const j = JSON.parse(readFileSync(skillsPath, 'utf8'))
    const map = {}
    for (const [id, v] of Object.entries(j.positions ?? {})) {
      if (v?.skills && Array.isArray(v.skills)) map[id] = v.skills
    }
    return map
  } catch {
    return {}
  }
}

function extractFormId(el) {
  const a = el.querySelector?.('a[href*="/details/experience/edit/forms/"]')
  if (!a) return null
  const href = a.getAttribute('href') ?? ''
  const m = href.match(/\/forms\/(\d+)\//)
  return m ? m[1] : null
}

function parseCompanyLine(text) {
  if (text.includes(' · ')) {
    const [a, b] = text.split(' · ').map((s) => s.trim())
    return { company: a, employmentType: b }
  }
  return { company: text.trim(), employmentType: '' }
}

function buildPeriodXml(period) {
  if (!period) {
    return '<period><raw>unparsed</raw></period>'
  }
  const { start, end, endCurrent, durationRaw, raw } = period
  const d = parseDuration(durationRaw)
  const parts = ['<period>']
  if (start) {
    parts.push(`<startDate yearMonth="${escapeAttr(start)}"/>`)
  }
  if (endCurrent) {
    parts.push('<endDate current="true"/>')
  } else if (end) {
    parts.push(`<endDate yearMonth="${escapeAttr(end)}"/>`)
  }
  const dy = d.years > 0 ? ` years="${d.years}"` : ''
  const dm = d.months > 0 ? ` months="${d.months}"` : ''
  const dr = d.raw ? ` raw="${escapeAttr(d.raw)}"` : ''
  if (dy || dm || dr) {
    parts.push(`<duration${dy}${dm}${dr}/>`)
  }
  if (raw) {
    parts.push(`<raw>${escapeXml(raw)}</raw>`)
  }
  parts.push('</period>')
  return parts.join('')
}

function skillsXml(id, skillsById, truncated) {
  const list = id ? skillsById[id] : null
  const parts = []
  if (list?.length) {
    parts.push('<skills>')
    for (const s of list) {
      parts.push(`<skill>${escapeXml(s)}</skill>`)
    }
    parts.push('</skills>')
  }
  if (truncated) {
    parts.push(`<skillsTruncatedSummary>${escapeXml(truncated)}</skillsTruncatedSummary>`)
  }
  return parts.join('')
}

function getExpandableText(el) {
  const box = el.querySelector?.('[data-testid="expandable-text-box"]')
  return (box?.textContent ?? '').trim()
}

function getTruncatedSkillsLine(block) {
  const a = block.querySelector('a[href*="/skill-associations-details/"]')
  if (!a) return ''
  return (a.textContent ?? '').replace(/\s+/g, ' ').trim()
}

function parseSingleBlock(block, skillsById, componentKey) {
  const id = extractFormId(block) ?? `noid-${componentKey.replace(/[^a-z0-9-]/gi, '')}`
  const title = (block.querySelector('p[class*="_33517241"]')?.textContent ?? '').trim()
  const ul = block.querySelector('ul')
  const smallPs = [...block.querySelectorAll('p[class*="_51112094"]')]
    .filter((p) => !ul || !ul.contains(p))
    .map((p) => (p.textContent ?? '').replace(/\s+/g, ' ').trim())
  let companyLine = ''
  let periodLine = ''
  let locLine = ''
  let pi = -1
  for (let i = 0; i < smallPs.length; i++) {
    if (PERIOD_RE.test(smallPs[i])) {
      pi = i
      periodLine = smallPs[i]
      companyLine = pi > 0 ? smallPs.slice(0, pi).join(' | ') : ''
      locLine = smallPs[pi + 1] ?? ''
      break
    }
  }
  if (!periodLine && smallPs.length >= 2) {
    companyLine = smallPs[0] ?? ''
    periodLine = smallPs[1] ?? ''
    locLine = smallPs[2] ?? ''
  }
  const { company, employmentType } = parseCompanyLine(companyLine)
  const period = periodLine ? parsePeriodLine(periodLine) : null
  let location = locLine
  let workMode = ''
  if (location.includes(' · ')) {
    const [a, b] = location.split(' · ').map((s) => s.trim())
    location = a
    workMode = b
  }
  const body = getExpandableText(block)
  const { description, tasks } = splitTasksAndDescription(body)
  const trunc = getTruncatedSkillsLine(block)

  const parts = [
    `<experience id="${escapeXml(id)}" linkedinComponentKey="${escapeXml(componentKey)}">`,
    `<tagline>${escapeXml(title)}</tagline>`,
    `<company>${escapeXml(company)}</company>`,
  ]
  if (employmentType) {
    parts.push(`<employmentType>${escapeXml(employmentType)}</employmentType>`)
  }
  parts.push(buildPeriodXml(period))
  if (location) {
    parts.push(`<location>${escapeXml(location)}</location>`)
  }
  if (workMode) {
    parts.push(`<workMode>${escapeXml(workMode)}</workMode>`)
  }
  if (description) {
    parts.push(`<description>${cdata(description)}</description>`)
  }
  if (tasks.length) {
    parts.push('<tasks>')
    for (const t of tasks) {
      parts.push(`<task>${escapeXml(t)}</task>`)
    }
    parts.push('</tasks>')
  }
  parts.push(skillsXml(id, skillsById, trunc))
  parts.push('</experience>')
  return parts.join('')
}

function parseGroupBlock(block, skillsById, componentKey) {
  const ul =
    block.querySelector('ul[class*="a8fd929c"]') ??
    [...block.querySelectorAll('ul')].find((u) => u.querySelector('li'))
  const lis = ul ? [...ul.querySelectorAll(':scope > li')] : []
  if (lis.length === 0) {
    return parseSingleBlock(block, skillsById, componentKey)
  }

  const titleCompany = (block.querySelector('p[class*="_33517241"]')?.textContent ?? '').trim()
  const smallPs = [...block.querySelectorAll('p[class*="_51112094"]')]
    .filter((p) => !ul || !ul.contains(p))
    .map((p) => (p.textContent ?? '').replace(/\s+/g, ' ').trim())

  const groupMeta = smallPs[0] ?? ''
  const location = smallPs[1] ?? ''

  let employmentType = ''
  let totalDurationText = ''
  if (groupMeta.includes(' · ')) {
    const bits = groupMeta.split(' · ').map((s) => s.trim())
    employmentType = bits[0] ?? ''
    totalDurationText = bits.slice(1).join(' · ')
  } else {
    employmentType = groupMeta
  }

  const parts = [
    `<experienceGroup linkedinComponentKey="${escapeXml(componentKey)}">`,
    `<company>${escapeXml(titleCompany)}</company>`,
    '<groupSummary>',
  ]
  if (employmentType) {
    parts.push(`<employmentType>${escapeXml(employmentType)}</employmentType>`)
  }
  if (totalDurationText) {
    parts.push(`<totalDurationText>${escapeXml(totalDurationText)}</totalDurationText>`)
  }
  parts.push('</groupSummary>')
  if (location && !PERIOD_RE.test(location)) {
    parts.push(`<location>${escapeXml(location)}</location>`)
  }

  for (const li of lis) {
    const id = extractFormId(li) ?? `noid-li-${componentKey}`
    const tagline = (li.querySelector('p[class*="_33517241"]')?.textContent ?? '').trim()
    const dateLine = (
      li.querySelector('p[class*="_51112094"][class*="a219e9ac"]') ??
      [...li.querySelectorAll('p[class*="_51112094"]')].find((p) => PERIOD_RE.test(p.textContent ?? ''))
    )?.textContent
    const period = dateLine ? parsePeriodLine(dateLine.replace(/\s+/g, ' ').trim()) : null
    const body = getExpandableText(li)
    const { description, tasks } = splitTasksAndDescription(body)
    const trunc = getTruncatedSkillsLine(li)

    parts.push(`<experience id="${escapeXml(id)}">`)
    parts.push(`<tagline>${escapeXml(tagline)}</tagline>`)
    parts.push(buildPeriodXml(period))
    if (description) {
      parts.push(`<description>${cdata(description)}</description>`)
    }
    if (tasks.length) {
      parts.push('<tasks>')
      for (const t of tasks) {
        parts.push(`<task>${escapeXml(t)}</task>`)
      }
      parts.push('</tasks>')
    }
    parts.push(skillsXml(id, skillsById, trunc))
    parts.push('</experience>')
  }
  parts.push('</experienceGroup>')
  return parts.join('')
}

function main() {
  const { htmlPath, skillsPath } = parseArgs(process.argv)
  mkdirSync(tmpDir, { recursive: true })

  if (!existsSync(htmlPath)) {
    console.error('linkedin/to-xml: HTML not found:', htmlPath)
    console.error('Run: npm run linkedin:scrape')
    process.exit(1)
  }
  if (!existsSync(masterXsd)) {
    console.error('linkedin/to-xml: schema missing:', masterXsd)
    process.exit(1)
  }

  copyFileSync(masterXsd, outXsd)

  const html = readFileSync(htmlPath, 'utf8')
  const dom = new JSDOM(html)
  const doc = dom.window.document
  const skillsById = loadSkills(skillsPath)

  const section =
    doc.querySelector('[data-testid^="profile_ExperienceDetailsSection"]') ?? doc.body
  const items = [...section.querySelectorAll('[componentkey^="entity-collection-item"]')]

  const metaParts = [
    '<meta',
    ` sourceUrl="https://www.linkedin.com/in/pieterkuppens/details/experience/"`,
    ` scrapedAt="${new Date().toISOString()}"`,
    ` locale="nl"`,
    '/>',
  ]

  const bodyParts = []
  for (const item of items) {
    const key = item.getAttribute('componentkey') ?? ''
    const ul =
      item.querySelector('ul[class*="a8fd929c"]') ??
      [...item.querySelectorAll(':scope ul')].find((u) => u.querySelector('li'))
    if (ul && ul.querySelectorAll(':scope > li').length > 0) {
      bodyParts.push(parseGroupBlock(item, skillsById, key))
    } else {
      bodyParts.push(parseSingleBlock(item, skillsById, key))
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<experiences xmlns="${NS}"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${NS} linkedin.xsd">
  ${metaParts.join('')}
  ${bodyParts.join('\n  ')}
</experiences>
`

  writeFileSync(outXml, xml, 'utf8')
  console.log('linkedin/to-xml: wrote', outXml)
  console.log('linkedin/to-xml: copied schema to', outXsd)
}

main()
