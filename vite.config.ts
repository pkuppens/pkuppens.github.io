import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = dirname(fileURLToPath(import.meta.url))
const publicDir = join(rootDir, 'public')
const linkedinDataDir = join(rootDir, 'data', 'linkedin')

// Only allow simple filename-safe slugs (letters, digits, hyphens) — this
// path segment is used to build a filesystem path, so reject anything else
// to rule out path traversal (e.g. `..`, `/`) before it reaches fs calls.
const SLUG_RE = /^[a-zA-Z0-9-]+$/

// Dev-only: serve static `index.html` for directory URLs (e.g. /trainings/dp-900/),
// matching GitHub Pages behavior. Without this, Vite's SPA fallback returns the
// React shell for these directories and the standalone course pages render empty.
function staticDirectoryIndex(): Plugin {
  return {
    name: 'static-directory-index',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url
        if (url && url.endsWith('/') && existsSync(join(publicDir, url, 'index.html'))) {
          req.url = url + 'index.html'
        }
        next()
      })
    },
  }
}

// Dev-only: load/save canonical data/linkedin/<slug>.xml from the local
// filesystem so the LinkedIn editor route (#90) can round-trip the seed data
// without a real backend. This never runs in the production build (`apply:
// 'serve'`) — it's a dev-server convenience so edits made in the browser can
// be written straight to the repo file, which the user then reviews and
// commits via git like any other local change.
function linkedinEditorApi(): Plugin {
  return {
    name: 'linkedin-editor-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/linkedin/experiences/', (req, res, next) => {
        const slug = (req.url ?? '').replace(/^\//, '').split('?')[0]
        if (!SLUG_RE.test(slug)) {
          res.statusCode = 400
          res.end('Invalid slug')
          return
        }
        const filePath = join(linkedinDataDir, `${slug}.xml`)

        if (req.method === 'GET') {
          if (!existsSync(filePath)) {
            res.statusCode = 404
            res.end('Not found')
            return
          }
          res.setHeader('Content-Type', 'application/xml; charset=utf-8')
          res.end(readFileSync(filePath, 'utf8'))
          return
        }

        if (req.method === 'POST') {
          const chunks: Buffer[] = []
          req.on('data', (chunk: Buffer) => chunks.push(chunk))
          req.on('end', () => {
            const xml = Buffer.concat(chunks).toString('utf8')
            writeFileSync(filePath, xml, 'utf8')
            res.statusCode = 200
            res.end('OK')
          })
          return
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), staticDirectoryIndex(), linkedinEditorApi()],
  base: '/',
  build: {
    outDir: 'dist',
  },
})
