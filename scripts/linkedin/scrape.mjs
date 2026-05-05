/**
 * Status: Live LinkedIn scraping is legacy / best-effort (DOM and auth breakage). Prefer a local
 * mirror edited via the web-assisted workflow tracked in scripts/linkedin/README.md. This script may
 * still be useful with saved HTML fixtures and npm run linkedin:xml.
 *
 * Capture LinkedIn experience details HTML (logged-in view) and optionally fetch
 * full skill lists per position via overlay URLs.
 *
 * Three ways to get past login:
 *
 * 1) Recommended — attach to your normal Chrome (cookies / password manager already there):
 *    - Close every Chrome window (otherwise the profile is locked and debug start fails).
 *    - Either let this script start Chrome in debug mode:
 *        scripts/linkedin/linkedin-experience-from-chrome.cmd   (double-click or run from repo)
 *        npm run linkedin:scrape:win
 *        npm run linkedin:scrape:cdp:start
 *        npm run linkedin:scrape -- --start-chrome-cdp
 *        npm run linkedin:scrape -- --start-chrome-cdp --cdp-port 9223
 *      Uses your real profile: %LOCALAPPDATA%\\Google\\Chrome\\User Data + profile Default
 *      (override with LINKEDIN_USER_DATA_DIR / LINKEDIN_CHROME_PROFILE_DIR).
 *    - Or start Chrome yourself, then run:
 *        npm run linkedin:scrape:cdp
 *        npm run linkedin:scrape -- --cdp http://127.0.0.1:9222
 *        set LINKEDIN_CDP_URL=http://127.0.0.1:9222 && npm run linkedin:scrape
 *    - Log in to LinkedIn in that window if needed.
 *    This uses Playwright’s chromium.connectOverCDP() — the same Chrome DevTools Protocol
 *    a debugger uses. It is not the same as the VS Code / Cursor “Connect to Playwright”
 *    action, which attaches the test runner to @playwright/test; this script is plain Node.
 *    Playwright only disconnects at the end; it does not close your Chrome.
 *
 * 2) Use your real Chrome profile folder with Playwright (Chrome must be fully closed):
 *        set LINKEDIN_USER_DATA_DIR=%LOCALAPPDATA%\Google\Chrome\User Data
 *        set LINKEDIN_CHROME_PROFILE_DIR=Default
 *        npm run linkedin:scrape
 *    Prefer a dedicated test profile if you want to avoid profile lock issues.
 *
 * 3) Isolated profile under tmp/.linkedin-profile (log in manually once; no env vars).
 *
 * Usage:
 *   npm run linkedin:scrape
 *   npm run linkedin:scrape -- --start-chrome-cdp
 *   npm run linkedin:scrape -- --cdp http://127.0.0.1:9222
 *   npm run linkedin:scrape -- --headless
 *   npm run linkedin:scrape -- --headed
 *   npm run linkedin:scrape -- --no-skills
 *
 * Default is headed when launching a new browser. --headed forces a window even if you passed --headless.
 * With --cdp or LINKEDIN_CDP_URL, headless is ignored (you already started Chrome with a window).
 *
 * Env:
 *   LINKEDIN_CDP_URL — e.g. http://127.0.0.1:9222 (same as --cdp; CLI wins if both are set).
 *   LINKEDIN_CDP_PORT — default 9222 when using --start-chrome-cdp without --cdp URL.
 *   LINKEDIN_USER_DATA_DIR — Chrome user data dir (default: OS Chrome profile path when using --start-chrome-cdp).
 *   LINKEDIN_CHROME_PROFILE_DIR — e.g. Default or Profile 1 (with --start-chrome-cdp or persistent launch).
 *   LINKEDIN_CHROME_EXECUTABLE — full path to chrome.exe if not found automatically.
 *   LINKEDIN_EXPERIENCE_URL — defaults to pieterkuppens experience details page.
 *   PLAYWRIGHT_USE_BUNDLED_CHROMIUM=1 — use Playwright’s Chromium instead of installed Google Chrome.
 *   CHROME_CHANNEL — optional Playwright channel override (e.g. msedge); default is chrome when not bundled.
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..', '..')
const tmpDir = join(repoRoot, 'tmp')
const defaultUserDataDir = join(tmpDir, '.linkedin-profile')
const outHtml = join(tmpDir, 'linkedin.html')
const outSkills = join(tmpDir, 'linkedin.skills.json')

const EXPERIENCE_URL =
  process.env.LINKEDIN_EXPERIENCE_URL ??
  'https://www.linkedin.com/in/pieterkuppens/details/experience/'

function parseArgs(argv) {
  const raw = argv.slice(2)
  const args = new Set(raw)
  const headed = args.has('--headed')
  const headlessFlag = args.has('--headless')
  const startChromeCdp = args.has('--start-chrome-cdp')
  let cdpPort = parseInt(process.env.LINKEDIN_CDP_PORT ?? '9222', 10)
  if (Number.isNaN(cdpPort) || cdpPort < 1 || cdpPort > 65535) cdpPort = 9222

  let cdpUrl = (process.env.LINKEDIN_CDP_URL ?? '').trim()
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '--cdp') {
      const v = raw[i + 1]
      if (v && !v.startsWith('--')) {
        cdpUrl = v.trim()
        i++
      }
    }
    if (raw[i] === '--cdp-port') {
      const v = raw[i + 1]
      if (v && /^\d+$/.test(v)) {
        cdpPort = parseInt(v, 10)
        i++
      }
    }
  }

  if (startChromeCdp && !cdpUrl) {
    cdpUrl = `http://127.0.0.1:${cdpPort}`
  }

  return {
    /** Headed wins: visible browser for login and debugging. */
    headless: headlessFlag && !headed,
    noSkills: args.has('--no-skills'),
    startChromeCdp,
    cdpPort,
    cdpUrl,
  }
}

function defaultChromeUserDataDir() {
  const fromEnv = (process.env.LINKEDIN_USER_DATA_DIR ?? '').trim()
  if (fromEnv) return fromEnv
  if (process.platform === 'win32') {
    const la = process.env.LOCALAPPDATA
    if (la) return join(la, 'Google', 'Chrome', 'User Data')
  }
  if (process.platform === 'darwin') {
    return join(homedir(), 'Library', 'Application Support', 'Google', 'Chrome')
  }
  return join(homedir(), '.config', 'google-chrome')
}

function resolveChromeExecutable() {
  const fromEnv = (process.env.LINKEDIN_CHROME_EXECUTABLE ?? '').trim()
  if (fromEnv && existsSync(fromEnv)) return fromEnv
  if (fromEnv) return fromEnv

  if (process.platform === 'win32') {
    const pf = process.env.PROGRAMFILES ?? 'C:\\Program Files'
    const pfx86 = process.env['PROGRAMFILES(X86)'] ?? 'C:\\Program Files (x86)'
    for (const p of [
      join(pf, 'Google', 'Chrome', 'Application', 'chrome.exe'),
      join(pfx86, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    ]) {
      if (existsSync(p)) return p
    }
  }
  if (process.platform === 'darwin') {
    const p = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    if (existsSync(p)) return p
  }
  return 'google-chrome'
}

function cdpHostPort(cdpUrl) {
  const normalized = cdpUrl.includes('://') ? cdpUrl : `http://${cdpUrl}`
  const u = new URL(normalized)
  const port = u.port ? parseInt(u.port, 10) : 9222
  return { host: u.hostname || '127.0.0.1', port, origin: u.origin }
}

async function cdpResponds(cdpUrl) {
  const { host, port } = cdpHostPort(cdpUrl)
  const base = `http://${host}:${port}`
  try {
    const r = await fetch(`${base}/json/version`, { signal: AbortSignal.timeout(2500) })
    return r.ok
  } catch {
    return false
  }
}

async function waitForCdp(cdpUrl, { timeoutMs = 60_000 } = {}) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (await cdpResponds(cdpUrl)) return
    await new Promise((r) => setTimeout(r, 400))
  }
  throw new Error(
    `Chrome CDP did not respond at ${cdpUrl} within ${timeoutMs}ms. Close all Chrome windows and retry, or pick a free --cdp-port.`,
  )
}

/**
 * Start Google Chrome with remote debugging; detached so it keeps running after this script exits.
 */
function spawnChromeDebug({ executable, userDataDir, profileDir, port }) {
  const args = [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    `--profile-directory=${profileDir}`,
    '--no-first-run',
    '--no-default-browser-check',
  ]
  const child = spawn(executable, args, {
    detached: true,
    stdio: 'ignore',
    windowsHide: false,
  })
  child.unref()
  if (child.pid) {
    console.log('linkedin/scrape: started Chrome pid', child.pid, 'port', port)
  }
}

/** Extract skill names from LinkedIn overlay HTML (best-effort; markup changes often). */
function parseSkillsFromOverlayHtml(html) {
  const dom = new JSDOM(html)
  const doc = dom.window.document
  const found = new Set()

  const push = (t) => {
    const s = t.replace(/\s+/g, ' ').trim()
    if (s && s.length > 0 && s.length < 120) found.add(s)
  }

  doc.querySelectorAll('[class*="skill"]').forEach((el) => push(el.textContent ?? ''))
  doc.querySelectorAll('a[href*="/skills/"]').forEach((a) => push(a.textContent ?? ''))
  doc.querySelectorAll('span[class*="white-space"]').forEach((el) => push(el.textContent ?? ''))

  doc.querySelectorAll('li').forEach((li) => {
    const t = li.textContent ?? ''
    if (t.length > 2 && t.length < 100) push(t)
  })

  return [...found].sort((a, b) => a.localeCompare(b))
}

async function scrollUntilStable(page, selectorItems, { maxRounds = 30, stableNeed = 3 } = {}) {
  let prev = 0
  let stable = 0
  for (let i = 0; i < maxRounds; i++) {
    const count = await page.locator(selectorItems).count()
    if (count === prev) stable++
    else {
      stable = 0
      prev = count
    }
    if (stable >= stableNeed && count > 0) break

    await page.evaluate(() => {
      window.scrollBy(0, Math.floor(window.innerHeight * 1.25))
    })
    await new Promise((r) => setTimeout(r, 700))
  }
  return prev
}

/**
 * Pick a tab to drive: prefer an existing LinkedIn tab, else the first tab, else a new page.
 */
async function obtainPage(context) {
  const pages = context.pages()
  const linkedIn = pages.find((p) => {
    try {
      return (p.url() ?? '').includes('linkedin.com')
    } catch {
      return false
    }
  })
  if (linkedIn) {
    await linkedIn.bringToFront().catch(() => {})
    return linkedIn
  }
  if (pages.length > 0) {
    await pages[0].bringToFront().catch(() => {})
    return pages[0]
  }
  return context.newPage()
}

async function main() {
  const { headless, noSkills, startChromeCdp, cdpUrl } = parseArgs(process.argv)
  mkdirSync(tmpDir, { recursive: true })

  const userDataDirResolved = (process.env.LINKEDIN_USER_DATA_DIR ?? defaultUserDataDir).trim()

  let effectiveCdpUrl = cdpUrl

  if (startChromeCdp) {
    const { port } = cdpHostPort(effectiveCdpUrl)
    const chromeUserData = defaultChromeUserDataDir()
    const profileDir = (process.env.LINKEDIN_CHROME_PROFILE_DIR ?? 'Default').trim()
    const executable = resolveChromeExecutable()

    if (!chromeUserData) {
      throw new Error(
        'Could not resolve Chrome User Data path. Set LINKEDIN_USER_DATA_DIR to your Chrome "User Data" folder.',
      )
    }
    if (!existsSync(chromeUserData)) {
      throw new Error(
        `Chrome user data folder not found: ${chromeUserData}\nSet LINKEDIN_USER_DATA_DIR to your Chrome "User Data" directory.`,
      )
    }

    if (await cdpResponds(effectiveCdpUrl)) {
      console.log('linkedin/scrape: CDP already listening at', effectiveCdpUrl, '(not starting a new Chrome)')
    } else {
      console.log('linkedin/scrape: starting Chrome with debug port', port)
      console.log('linkedin/scrape: user-data-dir:', chromeUserData)
      console.log('linkedin/scrape: profile-directory:', profileDir)
      spawnChromeDebug({ executable, userDataDir: chromeUserData, profileDir, port })
      await waitForCdp(effectiveCdpUrl)
    }
  }

  console.log('linkedin/scrape: tmp dir:', tmpDir)
  console.log(
    'linkedin/scrape: mode:',
    effectiveCdpUrl ? `CDP ${effectiveCdpUrl}` : `persistentContext ${userDataDirResolved}`,
  )
  console.log('linkedin/scrape: headless:', effectiveCdpUrl ? '(ignored; using your Chrome)' : headless)

  let browserFromCdp = null
  let context

  if (effectiveCdpUrl) {
    browserFromCdp = await chromium.connectOverCDP(effectiveCdpUrl)
    const contexts = browserFromCdp.contexts()
    if (contexts.length === 0) {
      throw new Error(
        'CDP: no browser contexts. Start Chrome with --remote-debugging-port=9222 and a normal profile, then retry.',
      )
    }
    context = contexts[0]
  } else {
    const launchOpts = {
      headless,
      viewport: { width: 1280, height: 900 },
    }
    if (process.env.PLAYWRIGHT_USE_BUNDLED_CHROMIUM === '1') {
      // Playwright-managed Chromium (no Google Chrome install required).
    } else {
      launchOpts.channel = process.env.CHROME_CHANNEL ?? 'chrome'
    }
    const extra = process.env.LINKEDIN_EXTRA_BROWSER_ARGS
    if (extra) {
      launchOpts.args = extra.split(',').map((s) => s.trim()).filter(Boolean)
    }
    if (process.env.LINKEDIN_CHROME_PROFILE_DIR) {
      launchOpts.args = launchOpts.args ?? []
      launchOpts.args.push(`--profile-directory=${process.env.LINKEDIN_CHROME_PROFILE_DIR}`)
    }
    context = await chromium.launchPersistentContext(userDataDirResolved, launchOpts)
  }

  const page = await obtainPage(context)

  await page.goto(EXPERIENCE_URL, { waitUntil: 'domcontentloaded', timeout: 120_000 })

  const loginLike =
    page.url().includes('/login') ||
    page.url().includes('/checkpoint') ||
    (await page.locator('input#username, input[name="session_key"]').count()) > 0

  if (loginLike) {
    console.warn(
      'linkedin/scrape: still on login or checkpoint. Complete login in the browser, then the script continues.',
    )
    if (!effectiveCdpUrl && !headless) {
      await page.pause()
    }
    await page.waitForURL(/\/details\/experience\/?/, { timeout: 600_000 }).catch(() => {})
    if (
      page.url().includes('/login') ||
      page.url().includes('/checkpoint') ||
      (await page.locator('input#username, input[name="session_key"]').count()) > 0
    ) {
      console.warn(
        'linkedin/scrape: hint: connect Playwright to your Chrome with --cdp http://127.0.0.1:9222 ' +
          '(Chrome started with --remote-debugging-port=9222 and your User Data profile). ' +
          'See script header comment.',
      )
    }
  }

  const section = page.locator('[data-testid^="profile_ExperienceDetailsSection"]')
  await section.waitFor({ state: 'visible', timeout: 120_000 })

  console.log('linkedin/scrape: scrolling to load lazy experience rows…')
  const itemSelector = '[componentkey^="entity-collection-item"]'
  const n = await scrollUntilStable(page, itemSelector)
  console.log('linkedin/scrape: entity-collection-item count (after scroll):', n)

  const fragment = await section.evaluate((el) => el.outerHTML)
  const wrapped = `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"/><title>LinkedIn experience (captured)</title></head>
<body>
${fragment}
</body>
</html>
`
  writeFileSync(outHtml, wrapped, 'utf8')
  console.log('linkedin/scrape: wrote', outHtml)

  const skillPayload = {
    generatedAt: new Date().toISOString(),
    sourceUrl: EXPERIENCE_URL,
    positions: {},
  }

  if (!noSkills) {
    const hrefs = await page.$$eval(
      'a[href*="/overlay/"][href*="/skill-associations-details/"]',
      (as) => [...new Set(as.map((a) => a.getAttribute('href')).filter(Boolean))],
    )

    const idRe = /\/overlay\/(\d+)\/skill-associations-details/
    const urls = hrefs
      .map((h) => {
        const abs = h.startsWith('http') ? h : new URL(h, 'https://www.linkedin.com').href
        const m = abs.match(idRe)
        return m ? { positionId: m[1], url: abs } : null
      })
      .filter(Boolean)

    console.log('linkedin/scrape: unique skill overlay URLs:', urls.length)

    for (const { positionId, url } of urls) {
      try {
        const res = await page.request.get(url)
        const status = res.status()
        const body = await res.text()
        const skills = parseSkillsFromOverlayHtml(body)
        skillPayload.positions[positionId] = {
          ok: status >= 200 && status < 400,
          httpStatus: status,
          sourceUrl: url,
          skills,
          skillCount: skills.length,
        }
        if (skills.length === 0) {
          skillPayload.positions[positionId].note =
            'No skills parsed from overlay HTML; LinkedIn markup may have changed. Inspect raw in browser.'
        }
      } catch (e) {
        skillPayload.positions[positionId] = {
          ok: false,
          sourceUrl: url,
          error: String(e?.message ?? e),
        }
      }
    }

    writeFileSync(outSkills, JSON.stringify(skillPayload, null, 2), 'utf8')
    console.log('linkedin/scrape: wrote', outSkills)
  } else {
    console.log('linkedin/scrape: skipped skill overlays (--no-skills)')
  }

  if (browserFromCdp) {
    await browserFromCdp.close()
    console.log('linkedin/scrape: disconnected from Chrome (your browser stays open).')
  } else {
    await context.close()
  }
  console.log('linkedin/scrape: done. Next: npm run linkedin:xml')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
