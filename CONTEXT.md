# Domain context — pkuppens.github.io

Vocabulary for architecture reviews and implementation. Use these terms consistently.

## Core concepts

**Profile**
Pieter's professional identity: work preferences, experience timeline, and technology stack. Canonical data lives in `src/domain/profile/`. The Profile page and Opportunity Evaluator both read from this module.

**Opportunity**
A potential assignment described by the visitor (title, domain, rate, commute, hybrid days, duration, technologies). Represented as `OpportunityInput`.

**Evaluation**
The scored result of comparing one Opportunity against Profile preferences: total score, per-criterion breakdown, fit level, and recommendation text.

**Criterion**
One weighted dimension of an Evaluation (domain fit, hourly rate, hours per week, commute, hybrid arrangement, contract duration, technology fit). Each criterion is a pure `evaluate` function in `criteria.ts`. Commute logic lives in `commuteScore.ts` and weights degradation by √(onsite days per week).

**Evaluator session**
Browser-local state for the evaluator tool: saved opportunity input, optionally adjusted preferences, and the last Evaluation result. Orchestrated by `evaluatorSession.ts` / `useEvaluatorSession`.

**Score band**
A labelled range for a 0–100 score (excellent / good / fair / poor) with shared thresholds for overall results and per-criterion bars. Defined in `scoreBands.ts`.

## Persistence

**Storage keys**
All `localStorage` access uses the `pkuppens_` prefix via `src/infrastructure/storage.ts`. Keys are listed in `storageKeys.ts` (evaluator input, evaluator preferences, theme).

**Visitor preference overrides**
Visitors may edit scoring preferences in the UI; those overrides are stored per browser. The versioned **Profile** in the repo remains the default when storage is empty. See ADR 003.

## Out of scope (parked)

**LinkedIn experience mirror**
`data/linkedin/` and `scripts/linkedin/` are a future export path. Experience content is maintained in the Profile module until XML export is automated.
