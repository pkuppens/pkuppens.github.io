# Domain context — pkuppens.github.io

Vocabulary for architecture reviews and implementation. Use these terms consistently.

For the architecture map (module layout, file paths, deployment) see [docs/arc42/architecture.md](docs/arc42/architecture.md).

## Language

**Profile**
Pieter's professional identity: work preferences, experience timeline, and technology stack. The Profile page and Opportunity Evaluator both read from it.

**Opportunity**
A potential assignment described by the visitor: title, domain, rate, commute, hybrid days, duration, technologies.

**Evaluation**
The scored result of comparing one Opportunity against Profile preferences: total score, per-criterion breakdown, fit level, and recommendation text.

**Criterion**
One weighted dimension of an Evaluation (domain fit, hourly rate, hours per week, commute, hybrid arrangement, contract duration, technology fit). Commute weighting degrades by √(onsite days per week).

**Evaluator session**
Browser-local state for the evaluator tool: saved opportunity input, optionally adjusted preferences, and the last Evaluation result.

**Score band**
A labelled range for a 0–100 score (excellent / good / fair / poor), with shared thresholds for overall results and per-criterion bars.

**Visitor preference override**
A visitor's per-browser edit to scoring preferences in the evaluator UI. The versioned Profile in the repo is the default when no override is stored. See ADR 003.
_Avoid_: user setting, custom preferences.

**Commute Calculator**
Tool within the evaluator that resolves a car/public-transport commute time from an origin and destination address, so visitors don't have to guess `commuteMinutes`. See ADR 005.
_Avoid_: route planner, trip calculator.

**LinkedIn mirror**
A canonical local copy of a LinkedIn-style experience profile, stored per-person as `data/linkedin/<vanitySlug>.xml` and validated against a shared schema. Maintained through a dedicated editor UI (forms + live preview), with JSON/CSV exports derived from the same source — never by scraping linkedin.com. See #42 and #90.
_Avoid_: LinkedIn scrape, profile importer.
