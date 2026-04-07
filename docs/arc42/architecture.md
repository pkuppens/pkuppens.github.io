# Architecture Documentation (arc42-lite)

## 1. Introduction and Goals

### Purpose
A professional GitHub Pages website for Peter Kuppens with an interactive Opportunity Evaluator.

### Quality Goals
| Priority | Goal | Measure |
|----------|------|---------|
| 1 | Correctness | All scoring logic is unit-tested with pure functions |
| 2 | Maintainability | Modular architecture, UI separated from domain logic |
| 3 | Performance | Static site, no server-side logic |
| 4 | Accessibility | Semantic HTML, ARIA attributes |

## 2. Architecture Constraints
- Static hosting only (GitHub Pages)
- No backend / authentication
- Must be deployable via GitHub Actions

## 3. System Scope
Single-page application built with React + TypeScript + Vite.

## 4. Solution Strategy
- **React** for component-based UI
- **TypeScript** for type safety and developer experience
- **Vite** for fast development and optimised builds
- **Pure functions** for all scoring logic (testable, predictable)
- **localStorage** for local persistence (no backend needed)
- **React Router** for client-side routing

## 5. Building Block View

```
src/
├── components/layout/   – Header, Footer, Layout (shell)
├── pages/               – Route-level page components
│   └── evaluator/       – Opportunity Evaluator UI
├── domain/evaluator/    – Pure scoring logic (no React)
│   ├── types.ts         – Domain types
│   ├── criteria.ts      – Criterion definitions + evaluation functions
│   ├── scoring.ts       – Score aggregation engine
│   └── defaultPreferences.ts
└── infrastructure/      – Storage abstraction (localStorage)
```

## 6. Runtime View

### Opportunity Evaluation Flow
1. User fills in opportunity details (`EvaluatorForm`)
2. Form submits `OpportunityInput` to `EvaluatorPage`
3. `EvaluatorPage` calls `evaluateOpportunity(input, prefs, criteria)`
4. Pure function returns `EvaluationResult`
5. `EvaluatorResults` renders the result

## 7. Deployment View
- GitHub Actions builds and tests on every push
- On merge to `main`, deploys to GitHub Pages
- No server infrastructure required

## 8. Crosscutting Concepts

### Testing Strategy
- Unit tests: pure scoring functions (Vitest)
- Component tests: React Testing Library
- E2E tests: Playwright (future)

### State Management
- Local component state (useState) for UI
- localStorage for persistence
- No global state manager needed at this scale
