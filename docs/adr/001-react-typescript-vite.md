# ADR 001: Use React 18 + TypeScript 5 + Vite 5 as Frontend Technology Stack

*Date: December 2025*

## Status
Accepted

## Context
A static professional portfolio site needs a modern, maintainable frontend stack that:
- Can be deployed on GitHub Pages (static hosting, no server)
- Supports strong typing for the scoring domain model
- Has a good developer experience and broad ecosystem support
- Aligns with Pieter Kuppens' existing expertise and tooling

## Decision
Use the following stack (versions current as of December 2025):

| Tool | Version | Role |
|------|---------|------|
| **React** | 18.3 | Declarative UI library for building component-based, reactive web interfaces |
| **TypeScript** | 5.5 | Typed superset of JavaScript enabling safe domain modelling, IDE autocompletion, and compile-time error detection |
| **Vite** | 5.4 | Build tool that serves source files as native ES modules in development, providing instant HMR (Hot Module Replacement — live update of changed modules without a full page reload) and optimised, tree-shaken production bundles |
| **React Router** | 6.26 | Client-side routing library for multi-page navigation without server round-trips |
| **Vitest** | 2.0 | Unit test runner sharing Vite's module graph and configuration, enabling fast, consistent test execution |

All versions are mutually compatible and receive active community and security support.

## Rationale
- React 18 is the most widely adopted UI library and aligns with Pieter's existing expertise
- TypeScript catches type errors at compile time, which is critical for the scoring domain model where field renames (e.g. `dailyRate` → `hourlyRate`) must propagate safely across the codebase
- Vite's dev server starts in milliseconds; HMR ensures near-instant feedback during development
- All tools are well-supported by GitHub Copilot and the broader NL freelance ecosystem

## Consequences
- Requires Node.js 24 LTS for development and CI
- Bundle size is larger than plain HTML (196 kB JS / 15 kB CSS — acceptable for a demo site)
- Changing to a different component library later would require rework of the UI layer only; the domain logic (`src/domain/`) is fully isolated
