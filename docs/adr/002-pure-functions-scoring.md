# ADR 002: Pure Functions for Scoring Logic

## Status
Accepted

## Context
The Opportunity Evaluator requires testable, predictable scoring logic.

## Decision
All scoring functions are pure functions in `src/domain/evaluator/`.

## Rationale
- Pure functions are trivially unit-testable
- No side effects make the logic easy to reason about
- Business logic is completely decoupled from React components
- Criteria can be added/modified independently

## Consequences
- Scoring logic cannot access React state directly
- Preferences must be passed explicitly as parameters
