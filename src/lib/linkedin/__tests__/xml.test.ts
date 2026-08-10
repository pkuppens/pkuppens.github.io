import { describe, expect, it } from 'vitest'
import { parseExperiencesXml, serializeExperiencesXml, validateExperiencesModel } from '../xml'
import { newExperience } from '../types'

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<experiences xmlns="https://pkuppens.github.io/ns/linkedin-experience"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="https://pkuppens.github.io/ns/linkedin-experience ../../scripts/linkedin/schema.xsd">
  <meta sourceUrl="https://www.linkedin.com/in/pieterkuppens/details/experience/" locale="nl" scrapedAt="2026-07-11T08:53:40Z"/>

  <experience id="bright-cubes-2026">
    <tagline>Senior Consultant (Software, Data, and AI)</tagline>
    <company>Bright Cubes</company>
    <employmentType>Fulltime</employmentType>
    <period>
      <startDate yearMonth="2026-05"/>
      <endDate current="true"/>
      <raw>2026 – Present</raw>
    </period>
    <location>'s-Hertogenbosch, Noord-Brabant, Nederland</location>
    <workMode>Hybrid</workMode>
    <description>Consulting on software, data, and AI assignments.</description>
    <tasks>
      <task>Advise on architecture</task>
    </tasks>
    <skills>
      <skill>Software Engineering</skill>
      <skill>AI</skill>
    </skills>
  </experience>

  <experienceGroup>
    <company>Acme Corp</company>
    <groupSummary>
      <employmentType>Fulltime</employmentType>
      <totalDurationText>3 yrs</totalDurationText>
    </groupSummary>
    <location>Remote</location>
    <experience id="acme-lead-2020">
      <tagline>Lead Engineer</tagline>
      <period>
        <startDate yearMonth="2020-01"/>
        <endDate yearMonth="2022-01"/>
      </period>
      <skills>
        <skill>Leadership</skill>
      </skills>
    </experience>
  </experienceGroup>
</experiences>
`

describe('parseExperiencesXml', () => {
  it('parses meta, a top-level experience, and a grouped experience', () => {
    const model = parseExperiencesXml(SAMPLE_XML)

    expect(model.meta).toEqual({
      sourceUrl: 'https://www.linkedin.com/in/pieterkuppens/details/experience/',
      scrapedAt: '2026-07-11T08:53:40Z',
      locale: 'nl',
    })
    expect(model.items).toHaveLength(2)

    const exp = model.items[0]
    if (exp.kind !== 'experience') throw new Error('expected experience')
    expect(exp.id).toBe('bright-cubes-2026')
    expect(exp.company).toBe('Bright Cubes')
    expect(exp.period.startYearMonth).toBe('2026-05')
    expect(exp.period.endCurrent).toBe(true)
    expect(exp.tasks).toEqual(['Advise on architecture'])
    expect(exp.skills).toEqual(['Software Engineering', 'AI'])

    const group = model.items[1]
    if (group.kind !== 'experienceGroup') throw new Error('expected experienceGroup')
    expect(group.company).toBe('Acme Corp')
    expect(group.experiences).toHaveLength(1)
    expect(group.experiences[0].id).toBe('acme-lead-2020')
    expect(group.experiences[0].period.endYearMonth).toBe('2022-01')
  })

  it('throws LinkedInXmlError on malformed XML', () => {
    expect(() => parseExperiencesXml('<not-xml')).toThrow()
  })
})

describe('serializeExperiencesXml + round trip', () => {
  it('round-trips parsed model back through serialize/parse unchanged in meaning', () => {
    const model = parseExperiencesXml(SAMPLE_XML)
    const xml = serializeExperiencesXml(model)
    const reparsed = parseExperiencesXml(xml)
    expect(reparsed).toEqual(model)
  })
})

describe('validateExperiencesModel', () => {
  it('flags a missing id and empty tagline', () => {
    const exp = newExperience('')
    const errors = validateExperiencesModel({ meta: null, items: [exp] })
    expect(errors.some((e) => e.includes('Missing required id'))).toBe(true)
    expect(errors.some((e) => e.includes('Missing <tagline>'))).toBe(true)
  })

  it('returns no errors for a valid parsed document', () => {
    const model = parseExperiencesXml(SAMPLE_XML)
    expect(validateExperiencesModel(model)).toEqual([])
  })
})
