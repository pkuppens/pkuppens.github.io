/**
 * GitHub Pages has no filesystem route for SPA paths like /profile. It serves index.html only for /.
 * Copying the built shell to 404.html makes unknown paths serve the same bundle; the client router
 * then resolves the pathname. See: GitHub Docs — custom 404 for Project Pages user sites.
 */
import { copyFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const dist = join(here, '..', 'dist')
const indexHtml = join(dist, 'index.html')
const notFound = join(dist, '404.html')

if (!existsSync(indexHtml)) {
  console.error('copy-github-pages-spa-fallback: dist/index.html missing; run vite build first.')
  process.exit(1)
}

copyFileSync(indexHtml, notFound)
console.log('copy-github-pages-spa-fallback: wrote dist/404.html from dist/index.html')
