/**
 * Browser-side parse/validate/serialize for canonical LinkedIn-aligned
 * experience XML. Mirrors the parsing rules in scripts/linkedin/export-json.mjs
 * and the validation rules in scripts/linkedin/model.mjs — see that file's
 * header comment for why this isn't a direct import. Keep the two in sync by
 * hand; `npm run linkedin:validate` remains the authoritative check.
 */
import {
  type ExperienceGroupModel,
  type ExperienceModel,
  type ExperiencesDocumentModel,
  type ExperiencesItem,
  type GroupedExperienceModel,
  type MetaModel,
  type PeriodModel,
  emptyPeriod,
} from './types'

export const NS = 'https://pkuppens.github.io/ns/linkedin-experience'

export class LinkedInXmlError extends Error {}

function textContent(el: Element | null): string {
  return (el?.textContent ?? '').trim()
}

function child(el: Element, localName: string): Element | null {
  return el.getElementsByTagNameNS(NS, localName)[0] ?? null
}

function optionalText(el: Element, localName: string): string | null {
  return textContent(child(el, localName)) || null
}

function parsePeriod(periodEl: Element | null): PeriodModel {
  if (!periodEl) return emptyPeriod()
  const start = child(periodEl, 'startDate')
  const end = child(periodEl, 'endDate')
  const dur = child(periodEl, 'duration')
  const raw = child(periodEl, 'raw')
  return {
    startYearMonth: start?.getAttribute('yearMonth') ?? null,
    endYearMonth: end?.getAttribute('yearMonth') ?? null,
    endCurrent: (end?.getAttribute('current') ?? '').toLowerCase() === 'true',
    durationYears: dur?.getAttribute('years') ? Number(dur.getAttribute('years')) : null,
    durationMonths: dur?.getAttribute('months') ? Number(dur.getAttribute('months')) : null,
    durationRaw: dur?.getAttribute('raw') ?? null,
    raw: textContent(raw) || null,
  }
}

function parseList(parentEl: Element, listName: string, itemName: string): string[] {
  const listEl = child(parentEl, listName)
  if (!listEl) return []
  return [...listEl.getElementsByTagNameNS(NS, itemName)].map((x) => textContent(x)).filter(Boolean)
}

function parseExperience(expEl: Element): ExperienceModel {
  return {
    kind: 'experience',
    id: expEl.getAttribute('id') ?? '',
    linkedinComponentKey: expEl.getAttribute('linkedinComponentKey') ?? null,
    tagline: textContent(child(expEl, 'tagline')),
    company: textContent(child(expEl, 'company')),
    employmentType: optionalText(expEl, 'employmentType'),
    period: parsePeriod(child(expEl, 'period')),
    location: optionalText(expEl, 'location'),
    workMode: optionalText(expEl, 'workMode'),
    description: optionalText(expEl, 'description'),
    tasks: parseList(expEl, 'tasks', 'task'),
    skills: parseList(expEl, 'skills', 'skill'),
    skillsTruncatedSummary: optionalText(expEl, 'skillsTruncatedSummary'),
  }
}

function parseGroupedExperience(expEl: Element): GroupedExperienceModel {
  return {
    id: expEl.getAttribute('id') ?? '',
    tagline: textContent(child(expEl, 'tagline')),
    period: parsePeriod(child(expEl, 'period')),
    description: optionalText(expEl, 'description'),
    tasks: parseList(expEl, 'tasks', 'task'),
    skills: parseList(expEl, 'skills', 'skill'),
    skillsTruncatedSummary: optionalText(expEl, 'skillsTruncatedSummary'),
  }
}

function parseExperienceGroup(groupEl: Element): ExperienceGroupModel {
  const groupSummaryEl = child(groupEl, 'groupSummary')
  return {
    kind: 'experienceGroup',
    linkedinComponentKey: groupEl.getAttribute('linkedinComponentKey') ?? null,
    company: textContent(child(groupEl, 'company')),
    groupSummary: groupSummaryEl
      ? {
          employmentType: optionalText(groupSummaryEl, 'employmentType'),
          totalDurationText: optionalText(groupSummaryEl, 'totalDurationText'),
        }
      : null,
    location: optionalText(groupEl, 'location'),
    experiences: [...groupEl.getElementsByTagNameNS(NS, 'experience')]
      .filter((e) => e.parentNode === groupEl)
      .map(parseGroupedExperience),
  }
}

export function parseExperiencesXml(xmlText: string): ExperiencesDocumentModel {
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml')
  const parserErrors = doc.getElementsByTagName('parsererror')
  if (parserErrors.length > 0) {
    throw new LinkedInXmlError((parserErrors[0].textContent ?? '').trim() || 'XML parse error')
  }
  const root = doc.documentElement
  if (!root || root.localName !== 'experiences' || root.namespaceURI !== NS) {
    throw new LinkedInXmlError(`Root element must be <experiences> in namespace ${NS}`)
  }

  const metaEl = child(root, 'meta')
  const meta: MetaModel | null = metaEl
    ? {
        sourceUrl: metaEl.getAttribute('sourceUrl'),
        scrapedAt: metaEl.getAttribute('scrapedAt'),
        locale: metaEl.getAttribute('locale'),
      }
    : null

  const items: ExperiencesItem[] = []
  for (const node of [...root.childNodes]) {
    if (node.nodeType !== 1) continue
    const el = node as Element
    if (el.namespaceURI !== NS) continue
    if (el.localName === 'experience') items.push(parseExperience(el))
    if (el.localName === 'experienceGroup') items.push(parseExperienceGroup(el))
  }

  return { meta, items }
}

/** Mirrors scripts/linkedin/model.mjs `validateDocument` — see file header. */
export function validateExperiencesModel(model: ExperiencesDocumentModel): string[] {
  const errors: string[] = []

  model.items.forEach((item, i) => {
    if (item.kind === 'experience') {
      const ctx = `/experiences/experience[${i + 1}]`
      if (!item.id.trim()) errors.push(`Missing required id on ${ctx}`)
      if (!item.tagline.trim()) errors.push(`Missing <tagline> in ${ctx}`)
      if (!item.company.trim()) errors.push(`Missing <company> in ${ctx}`)
      item.tasks.forEach((t) => {
        if (!t.trim()) errors.push(`Empty task in ${ctx}`)
      })
    } else {
      const ctx = `/experiences/experienceGroup[${i + 1}]`
      if (!item.company.trim()) errors.push(`Missing <company> in ${ctx}`)
      if (item.experiences.length === 0) errors.push(`Missing <experience> items in ${ctx}`)
      item.experiences.forEach((e, j) => {
        const ectx = `${ctx}/experience[${j + 1}]`
        if (!e.id.trim()) errors.push(`Missing required id on ${ectx}`)
        if (!e.tagline.trim()) errors.push(`Missing <tagline> in ${ectx}`)
      })
    }
  })

  return errors
}

function escapeXmlText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeXmlAttr(value: string): string {
  return escapeXmlText(value).replace(/"/g, '&quot;')
}

function periodXml(period: PeriodModel, indent: string): string {
  const lines: string[] = []
  if (period.startYearMonth) {
    lines.push(`${indent}  <startDate yearMonth="${escapeXmlAttr(period.startYearMonth)}"/>`)
  }
  if (period.endCurrent) {
    lines.push(`${indent}  <endDate current="true"/>`)
  } else if (period.endYearMonth) {
    lines.push(`${indent}  <endDate yearMonth="${escapeXmlAttr(period.endYearMonth)}"/>`)
  }
  if (period.durationYears !== null || period.durationMonths !== null || period.durationRaw) {
    const attrs = [
      period.durationYears !== null ? `years="${period.durationYears}"` : null,
      period.durationMonths !== null ? `months="${period.durationMonths}"` : null,
      period.durationRaw ? `raw="${escapeXmlAttr(period.durationRaw)}"` : null,
    ].filter(Boolean)
    lines.push(`${indent}  <duration ${attrs.join(' ')}/>`)
  }
  if (period.raw) {
    lines.push(`${indent}  <raw>${escapeXmlText(period.raw)}</raw>`)
  }
  return `${indent}<period>\n${lines.join('\n')}\n${indent}</period>`
}

function listXml(items: string[], listName: string, itemName: string, indent: string): string | null {
  if (items.length === 0) return null
  const lines = items.map((i) => `${indent}  <${itemName}>${escapeXmlText(i)}</${itemName}>`)
  return `${indent}<${listName}>\n${lines.join('\n')}\n${indent}</${listName}>`
}

function optionalXml(value: string | null, tag: string, indent: string): string | null {
  if (!value) return null
  return `${indent}<${tag}>${escapeXmlText(value)}</${tag}>`
}

function experienceXml(exp: ExperienceModel, indent: string): string {
  const idAttr = ` id="${escapeXmlAttr(exp.id)}"`
  const keyAttr = exp.linkedinComponentKey ? ` linkedinComponentKey="${escapeXmlAttr(exp.linkedinComponentKey)}"` : ''
  const parts = [
    `${indent}  <tagline>${escapeXmlText(exp.tagline)}</tagline>`,
    `${indent}  <company>${escapeXmlText(exp.company)}</company>`,
    optionalXml(exp.employmentType, 'employmentType', indent + '  '),
    periodXml(exp.period, indent + '  '),
    optionalXml(exp.location, 'location', indent + '  '),
    optionalXml(exp.workMode, 'workMode', indent + '  '),
    optionalXml(exp.description, 'description', indent + '  '),
    listXml(exp.tasks, 'tasks', 'task', indent + '  '),
    listXml(exp.skills, 'skills', 'skill', indent + '  '),
    optionalXml(exp.skillsTruncatedSummary, 'skillsTruncatedSummary', indent + '  '),
  ].filter((x): x is string => x !== null)
  return `${indent}<experience${idAttr}${keyAttr}>\n${parts.join('\n')}\n${indent}</experience>`
}

function groupedExperienceXml(exp: GroupedExperienceModel, indent: string): string {
  const idAttr = ` id="${escapeXmlAttr(exp.id)}"`
  const parts = [
    `${indent}  <tagline>${escapeXmlText(exp.tagline)}</tagline>`,
    periodXml(exp.period, indent + '  '),
    optionalXml(exp.description, 'description', indent + '  '),
    listXml(exp.tasks, 'tasks', 'task', indent + '  '),
    listXml(exp.skills, 'skills', 'skill', indent + '  '),
    optionalXml(exp.skillsTruncatedSummary, 'skillsTruncatedSummary', indent + '  '),
  ].filter((x): x is string => x !== null)
  return `${indent}<experience${idAttr}>\n${parts.join('\n')}\n${indent}</experience>`
}

function experienceGroupXml(group: ExperienceGroupModel, indent: string): string {
  const keyAttr = group.linkedinComponentKey
    ? ` linkedinComponentKey="${escapeXmlAttr(group.linkedinComponentKey)}"`
    : ''
  const groupSummaryParts = group.groupSummary
    ? [
        optionalXml(group.groupSummary.employmentType, 'employmentType', indent + '    '),
        optionalXml(group.groupSummary.totalDurationText, 'totalDurationText', indent + '    '),
      ].filter((x): x is string => x !== null)
    : []
  const groupSummary =
    group.groupSummary && groupSummaryParts.length > 0
      ? `${indent}  <groupSummary>\n${groupSummaryParts.join('\n')}\n${indent}  </groupSummary>`
      : null

  const parts = [
    `${indent}  <company>${escapeXmlText(group.company)}</company>`,
    groupSummary,
    optionalXml(group.location, 'location', indent + '  '),
    ...group.experiences.map((e) => groupedExperienceXml(e, indent + '  ')),
  ].filter((x): x is string => x !== null)
  return `${indent}<experienceGroup${keyAttr}>\n${parts.join('\n')}\n${indent}</experienceGroup>`
}

export function serializeExperiencesXml(model: ExperiencesDocumentModel): string {
  const metaAttrs = model.meta
    ? [
        model.meta.sourceUrl ? `sourceUrl="${escapeXmlAttr(model.meta.sourceUrl)}"` : null,
        model.meta.locale ? `locale="${escapeXmlAttr(model.meta.locale)}"` : null,
        model.meta.scrapedAt ? `scrapedAt="${escapeXmlAttr(model.meta.scrapedAt)}"` : null,
      ].filter(Boolean)
    : []
  const metaLine = model.meta && metaAttrs.length > 0 ? `  <meta ${metaAttrs.join(' ')}/>\n\n` : ''

  const itemsXml = model.items
    .map((item) => (item.kind === 'experience' ? experienceXml(item, '  ') : experienceGroupXml(item, '  ')))
    .join('\n\n')

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<experiences xmlns="${NS}"\n` +
    `  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n` +
    `  xsi:schemaLocation="${NS} ../../scripts/linkedin/schema.xsd">\n` +
    metaLine +
    `${itemsXml}\n` +
    `</experiences>\n`
  )
}
