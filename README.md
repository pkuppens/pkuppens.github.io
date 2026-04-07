# pkuppens.github.io

Personal professional website for Peter Kuppens, built with React + TypeScript + Vite.

**Live site:** https://pkuppens.github.io

## Features
- Professional profile and CV presentation
- **Opportunity Evaluator** – interactive tool to score assignment fit
- Responsive, accessible design
- Automated deployment to GitHub Pages

## Tech Stack
- React 18 + TypeScript 5
- Vite 5
- React Router 6
- Vitest + Testing Library

## Getting Started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm test          # run unit tests
npm run build     # production build
```

## Architecture
See [docs/arc42/architecture.md](docs/arc42/architecture.md) for full documentation.

## ADRs
- [ADR 001: React + TypeScript + Vite](docs/adr/001-react-typescript-vite.md)
- [ADR 002: Pure Functions for Scoring](docs/adr/002-pure-functions-scoring.md)
- [ADR 003: localStorage Persistence](docs/adr/003-localstorage-persistence.md)