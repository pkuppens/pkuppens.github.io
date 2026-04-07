# ADR 003: Use localStorage for UI Persistence

*Date: December 2025*

## Status
Accepted

## Context
Two categories of data should persist across page reloads:

1. **Evaluator input state** — the last opportunity a visitor entered (title, domain, hourly rate, etc.) so they can pick up where they left off between sessions.
2. **UI preferences** — small interface settings such as light/dark theme or preferred display options that should survive a page reload.

Pieter's *candidate preferences* (preferred domains, target hourly rate, maximum commute, preferred technologies, scoring weights, etc.) represent Pieter's professional profile and are best managed as versioned configuration in the repository (`src/domain/evaluator/defaultPreferences.ts`), not stored in the browser.

The site is statically hosted on GitHub Pages; no backend is available.

## Decision
Use `localStorage` via a thin infrastructure abstraction (`src/infrastructure/storage.ts`) to persist evaluator input state and UI preferences client-side.

## Rationale
- No backend required — fits the static hosting constraint perfectly
- Simple to implement and test (the `Storage` interface is trivially mocked in unit tests)
- Sufficient for the intended per-browser use case

## Consequences
- **Single-user per browser profile**: `localStorage` is scoped to the browser origin per browser profile. Each visitor — whether a recruiter evaluating a specific role, or Pieter himself — has their own isolated storage. A recruiter on their own PC starts with a clean state, independently of any other user on any other device. This is intentional.
- Data is device-local and not synced across devices or browser profiles
- Not suitable for shared or multi-user storage scenarios
- Storage may be unavailable in private/incognito browsing; the abstraction handles this gracefully by falling back to the provided default value
