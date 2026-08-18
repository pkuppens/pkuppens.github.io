# Training courses: exam-day cheat sheet

Each course under `public/trainings/<course-id>/` (az-900, dp-900, ai-901, ...) follows the same
static-HTML pattern: `index.html` landing page, `lessons/*.html`, `reference/exam-blueprint.html`,
`reference/glossary.html`, and `data/*.js` quiz banks. When a user asks for a **recap / cheat
sheet** for one of these courses — especially framed as "exam is today" — build
`reference/cheat-sheet.html` following this workflow instead of improvising a one-off format.

## Workflow

1. **Read the course's existing material** to establish scope and house style:
   - `reference/exam-blueprint.html` — the domain/weighting structure, and the official study
     guide URL cited in its `.source` block.
   - `reference/glossary.html` — the `dl.gloss` definition-list format to mirror.
   - Every `lessons/000N-*.html` (skip mock exams and `weak-areas.html`) — the full set of terms
     and services actually taught.
   - `data/000N.js` quiz banks — `grep -ohiE "Azure [A-Z][A-Za-z ]{2,40}"` (or the domain's
     equivalent service-name pattern) across them to catch services used only as quiz
     answers/distractors, not written up in prose in a lesson.

2. **Verify completeness against the official study guide.** Fetch the "Primary source" URL cited
   in `exam-blueprint.html` (a `learn.microsoft.com/.../study-guides/<course-id>` page) and ask for
   the full "Skills measured" outline verbatim — every domain, sub-heading, and bullet. Cross-check
   that every bullet has a corresponding cheat-sheet entry; add any missing ones (even if the
   lessons only implied them). Note the outline's "as of" date — cite it in the cheat sheet's
   source block, matching the citation style already used in `exam-blueprint.html`.

3. **Write `reference/cheat-sheet.html`**, matching every other reference page's boilerplate head
   (`site-nav.js`, `trainings.css`, favicon) and structure:
   - One `<h2>` per domain (mirror the exam-blueprint's domain names and weighting badges).
   - One `dl.gloss` per domain section — `<dt>Term</dt><dd>One or two sentence definition.</dd>`.
     Style: name the term/service first, then state what it does in plain language — no filler,
     define **every** term short enough that skimming 60+ of them still takes under 10 minutes.
     Bold the term itself if it's referenced inline in a `<dd>` elsewhere.
   - A closing `<div class="callout warn">` collecting the 4-8 "classic pairing" traps the course's
     lesson callouts already flag (tool A vs. tool B distinctions) — these are consistently the
     highest-value exam-day reminders.
   - A `.source` block citing the official study guide URL + "as of" date.
   - `<div class="lesson-nav no-print">` footer linking to `glossary.html` and
     `exam-blueprint.html`.

4. **Link it in on the first page**, `index.html`:
   - Add a `<div class="callout tip">` near the top ("Exam today? Skip straight to the Cheat
     Sheet...") — this is the part users ask for explicitly.
   - Add it as the first card in the "Start here" grid.
   - Add it as the first card in the "Reference" grid, alongside Exam Blueprint and Glossary.

5. **Cross-link from the other two reference pages** — add `<a href="./cheat-sheet.html">→ Cheat
   Sheet</a>` as the first link in `glossary.html`'s and `exam-blueprint.html`'s
   `lesson-nav` footers.

6. **No build step needed.** Everything under `public/trainings/` is served as static files
   directly — a new/edited `.html` file there needs no `npm run build`, just `npm run lint` /
   `npm run typecheck` / `npm test` to confirm nothing else broke (these courses aren't part of the
   TS/React build).

## Reference implementation

`public/trainings/az-900/reference/cheat-sheet.html` (added 2026-08-18, issue-driven request,
verified against the AZ-900 study guide dated 2026-07-20) is the worked example — copy its
structure when building the next course's cheat sheet rather than designing from scratch.

`public/trainings/dp-900/reference/cheat-sheet.html` (added 2026-08-18, verified against the
DP-900 study guide dated 2026-07-21) is the second worked example — a smaller, four-domain course
where a single `dl.gloss` per domain was enough (no need for AZ-900's domain sub-splits).
