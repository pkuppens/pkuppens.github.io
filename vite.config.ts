import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const publicDir = join(dirname(fileURLToPath(import.meta.url)), 'public')

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

export default defineConfig({
  plugins: [react(), staticDirectoryIndex()],
  base: '/',
  build: {
    outDir: 'dist',
  },
})
