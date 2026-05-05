# pkuppens.github.io

Personal professional website for Pieter Kuppens, built with React + TypeScript + Vite.

**Live site:** https://pkuppens.github.io

## Features
- Professional profile and CV presentation
- **Opportunity Evaluator** – interactive tool to score assignment fit
- Responsive, accessible design
- Automated deployment to GitHub Pages

## Tech Stack
- React 18 + TypeScript 5
- Vite 8
- React Router 6
- Vitest + Testing Library

## Getting Started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm test          # run unit tests
npm run build     # production build
```

## Local Quality Checks
The same checks that run in CI (typecheck, tests, build) can be run locally before committing:

```bash
npm run typecheck && npm test && npm run build
```

To enforce this automatically on every commit, add a pre-commit hook (e.g. using [Husky](https://typicode.github.io/husky/)):
```bash
npx husky init
echo "npm run typecheck && npm test" > .husky/pre-commit
```

## Architecture
See [docs/arc42/architecture.md](docs/arc42/architecture.md) for full documentation.

LinkedIn local mirror tooling (experience XSD, optional legacy scrape helpers): [`scripts/linkedin/README.md`](scripts/linkedin/README.md).

## ADRs
- [ADR 001: React + TypeScript + Vite](docs/adr/001-react-typescript-vite.md)
- [ADR 002: Pure Functions for Scoring](docs/adr/002-pure-functions-scoring.md)
- [ADR 003: localStorage Persistence](docs/adr/003-localstorage-persistence.md)
- [ADR 004: Commit package-lock.json](docs/adr/004-commit-package-lock.md)

## Security and dependencies
- **`package-lock.json` is committed** so `npm ci` in CI matches installs; see ADR 004.
- **Dependabot** (`.github/dependabot.yml`) opens weekly version-update PRs (Saturday 06:00, `Europe/Amsterdam`).

  In the GitHub repo: enable **Dependabot alerts** and **Dependabot security updates** if your org allows (Settings → Code security and analysis). Org defaults may override.
- **Weekly `npm audit`** runs via [`.github/workflows/security-audit.yml`](.github/workflows/security-audit.yml) with `--audit-level=moderate`. Scheduled runs use UTC; `workflow_dispatch` is available for manual runs. See workflow comments for local-time notes.