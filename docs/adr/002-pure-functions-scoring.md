# ADR 002: Pure Functions for Scoring Logic

*Date: December 2025*

## Status
Accepted

## Context
The Opportunity Evaluator scores assignments across multiple criteria (domain fit, hourly rate, hours per week, commute, hybrid days on-site, contract duration, technology fit). The scoring logic must be:
- Independently testable — no React or browser dependencies
- Easy to extend with new criteria or adjusted weights
- Deterministic and transparent so scores can be explained to users

**Example — commute scoring:**
The total effective commute is calculated as `commuteMinutes × (onsiteDaysPerWeek + 1)` (round trip × frequency). This combined score is then evaluated as:
- 0 minutes on-site → 100% (fully remote is the best case)
- ≤ configured max commute minutes → interpolated linearly from 100% down to ~50%
- Exceeding max commute → score drops steeply toward 0%

Each criterion returns a raw score (0–100) that is multiplied by its configured weight, then normalised against the sum of all weights to produce a weighted contribution to the final 0–100 score.

## Decision
All scoring functions in `src/domain/evaluator/` are **pure functions** — they accept explicit inputs (`OpportunityInput`, `ProfilePreferences`) and return deterministic outputs (`EvaluationResult`) with no side effects.

## Rationale
- Pure functions are trivially unit-testable with no mocking or setup overhead
- No side effects make the logic easy to reason about and audit
- Business logic is completely decoupled from React components — the same scoring engine can run in Node, a test harness, or a future CLI
- Criteria can be added, modified, or re-weighted independently by changing `src/domain/evaluator/criteria.ts`

## Consequences
- Scoring logic cannot access React state directly; preferences must be passed explicitly as parameters
- Any future scoring rule changes are isolated to `src/domain/evaluator/criteria.ts` with no UI changes required
