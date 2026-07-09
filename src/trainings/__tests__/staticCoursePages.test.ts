import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createServer, type ViteDevServer } from 'vite'

// Regression guard for the Trainings static course pages.
//
// The site is a React SPA (src/), but each Trainings course is standalone static HTML under
// public/trainings/<id>/, published at a directory URL (/trainings/<id>/). GitHub Pages serves
// <id>/index.html for that directory automatically; the Vite dev server does NOT — without the
// `staticDirectoryIndex` middleware in vite.config.ts it falls through to the SPA shell and the
// course page renders blank ("No routes matched"). This boots the real dev server (which loads
// vite.config.ts, middleware included) and asserts the directory URLs serve the static pages.
describe('Trainings static course pages (dev server)', () => {
  let server: ViteDevServer
  let baseUrl: string

  beforeAll(async () => {
    server = await createServer({
      root: process.cwd(),
      logLevel: 'silent',
      server: { port: 0 },
    })
    await server.listen()
    baseUrl = server.resolvedUrls!.local[0]
  })

  afterAll(async () => {
    await server?.close()
  })

  it.each([
    ['dp-900', 'DP-900 Study Course'],
    ['ai-901', 'AI-901 Study Course'],
  ])('serves the static %s page at its directory URL', async (id, title) => {
    const res = await fetch(new URL(`trainings/${id}/`, baseUrl))
    expect(res.ok, `Expected 2xx for /trainings/${id}/`).toBe(true)
    const html = await res.text()
    // The static course page — not the SPA shell (which titles every route the same).
    expect(html, `Expected the static ${id} course page, got the SPA fallback`).toContain(
      `<title>${title}</title>`,
    )
  })

  it('still serves the React SPA shell at the site root', async () => {
    const res = await fetch(new URL('', baseUrl))
    expect(res.ok).toBe(true)
    const html = await res.text()
    expect(html).toContain('id="root"')
  })
})
