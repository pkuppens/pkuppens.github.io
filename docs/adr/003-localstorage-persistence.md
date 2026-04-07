# ADR 003: Use localStorage for Persistence

## Status
Accepted

## Context
User preferences and last-used opportunity input should persist across sessions.

## Decision
Use `localStorage` via a thin infrastructure abstraction (`src/infrastructure/storage.ts`).

## Rationale
- No backend required (fits static hosting constraint)
- Simple to implement and test
- Sufficient for single-user use case

## Consequences
- Data is device-local (not synced across devices)
- Not suitable for multi-user scenarios
- Storage may be unavailable in private browsing (handled gracefully)
