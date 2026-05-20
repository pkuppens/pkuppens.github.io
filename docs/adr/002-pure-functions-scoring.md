# ADR 002: Pure Functions for Scoring Logic

*Date: December 2025*

## Status
Accepted

## Context
The Opportunity Evaluator scores assignments across multiple criteria (domain fit, hourly rate, hours per week, commute, hybrid days on-site, contract duration, technology fit). The scoring logic must be:
- Independently testable — no React or browser dependencies
- Easy to extend with new criteria or adjusted weights
- Deterministic and transparent so scores can be explained to users

**Example — commute scoring (`commuteScore.ts`):**
Uses **one-way** `commuteMinutes` and `hybridDaysOnsite` (onsite days per week):
- **0 onsite days** (fully remote) → 100%, commute ignored
- **≥ 1 onsite day**: degradation from 100, then `score = 100 - degradation × sqrt(onsite days)` (clamped to -100)
  - ≤ 10 min/day → no degradation
  - 10–60 min → linear degradation 0→100%
  - 60–90 min → +0→60 penalty on top (max degradation 160 before weighting)
- Example: 60 min, 1 onsite day → 0%; 60 min, 4 onsite days → -100%

**Example — hybrid scoring:**
Onsite days per week (`hybridDaysOnsite`) are compared to `maxOnsiteDaysPerWeek`; excess days reduce the score.

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
