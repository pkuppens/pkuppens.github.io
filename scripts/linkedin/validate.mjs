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
import { validateDocument } from './model.mjs'

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
