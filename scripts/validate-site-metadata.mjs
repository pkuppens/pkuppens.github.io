/**
 * Validate built site metadata and static assets in dist/ after `npm run build`.
 *
 * Usage:
 *   npm run validate:site-metadata
 *
 * Exit codes:
 *   0: valid
 *   1: invalid
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const CANONICAL_URL = 'https://pkuppens.github.io/'

const here = dirname(fileURLToPath(import.meta.url))
const distDir = join(here, '..', 'dist')
const indexPath = join(distDir, 'index.html')

function fail(message) {
  console.error('validate-site-metadata:', message)
  process.exit(1)
}

function requireNonEmpty(value, label) {
  if (!value?.trim()) {
    fail(`Missing or empty ${label}`)
  }
  return value.trim()
}

function metaContent(doc, selector) {
  const el = doc.querySelector(selector)
  return (el?.getAttribute('content') ?? '').trim()
}

function resolveDistPath(href) {
  if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('data:')) {
    return null
  }
  const normalized = href.replace(/^\//, '')
  return join(distDir, normalized)
}

function assertAssetExists(href, label) {
  const path = resolveDistPath(href)
  if (!path) {
    fail(`${label}: unsupported href "${href}"`)
  }
  if (!existsSync(path)) {
    fail(`${label}: file not found at dist/${href.replace(/^\//, '')}`)
  }
}

function validate() {
  if (!existsSync(indexPath)) {
    fail('dist/index.html missing; run npm run build first')
  }

  const html = readFileSync(indexPath, 'utf8')
  const doc = new JSDOM(html).window.document

  const title = requireNonEmpty(doc.querySelector('title')?.textContent, '<title>')
  const description = requireNonEmpty(metaContent(doc, 'meta[name="description"]'), 'meta[name=description]')
  const ogTitle = requireNonEmpty(metaContent(doc, 'meta[property="og:title"]'), 'og:title')
  const ogDescription = requireNonEmpty(metaContent(doc, 'meta[property="og:description"]'), 'og:description')
  const ogUrl = requireNonEmpty(metaContent(doc, 'meta[property="og:url"]'), 'og:url')
  const ogType = requireNonEmpty(metaContent(doc, 'meta[property="og:type"]'), 'og:type')
  const twitterCard = requireNonEmpty(metaContent(doc, 'meta[name="twitter:card"]'), 'twitter:card')
  const twitterTitle = requireNonEmpty(metaContent(doc, 'meta[name="twitter:title"]'), 'twitter:title')
  const twitterDescription = requireNonEmpty(
    metaContent(doc, 'meta[name="twitter:description"]'),
    'twitter:description',
  )

  if (ogUrl !== CANONICAL_URL) {
    fail(`og:url must be ${CANONICAL_URL}, got "${ogUrl}"`)
  }

  if (ogTitle !== title) {
    fail('og:title must match <title>')
  }
  if (twitterTitle !== title) {
    fail('twitter:title must match <title>')
  }
  if (ogDescription !== description) {
    fail('og:description must match meta[name=description]')
  }
  if (twitterDescription !== description) {
    fail('twitter:description must match meta[name=description]')
  }

  const faviconLink = doc.querySelector('link[rel="icon"]')
  const faviconHref = requireNonEmpty(faviconLink?.getAttribute('href'), 'link[rel=icon] href')
  assertAssetExists(faviconHref, 'favicon')

  const ogImage = metaContent(doc, 'meta[property="og:image"]')
  if (ogImage) {
    assertAssetExists(ogImage, 'og:image')
  }

  console.log('validate-site-metadata: OK', indexPath)
}

try {
  validate()
} catch (err) {
  fail(err instanceof Error ? err.message : String(err))
}
