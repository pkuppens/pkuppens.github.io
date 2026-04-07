# ADR 001: Use React + TypeScript + Vite

## Status
Accepted

## Context
Need to choose a frontend technology stack for a professional static site.

## Decision
Use React 18, TypeScript 5, and Vite 5.

## Rationale
- React is widely adopted and aligns with Peter's existing expertise
- TypeScript enables type-safe domain modelling for the scoring engine
- Vite provides fast HMR during development and optimised production builds
- This stack is well-supported by GitHub Copilot and modern tooling

## Consequences
- Requires Node.js for development
- Bundle size is larger than pure HTML (acceptable for a demo site)
