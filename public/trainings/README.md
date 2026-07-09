# Trainings catalog

Self-checking, exam-oriented study courses for Microsoft certifications. Each course is a set of
short lessons that end in auto-graded quizzes, plus exam-weighted mock exams with per-domain
readiness scoring. Every page is standalone static HTML — shareable with a colleague as a single link,
no build step and no framework at runtime.

This folder is served from the portfolio site's `public/` directory, so each course lives at
`/trainings/<course-id>/` (for example <https://pkuppens.github.io/trainings/dp-900/>). The catalog
card grid on `/trainings` is a React page in the site's `src/` (see [Wiring a course into the site](#wiring-a-course-into-the-site)).

## What's in the catalog

| Course | Certification | Status | Path |
| --- | --- | --- | --- |
| **AI-901** | Azure AI Fundamentals | Live | [`ai-901/`](./ai-901/index.html) |
| **DP-900** | Azure Data Fundamentals | Live | [`dp-900/`](./dp-900/index.html) |
| CKAD | Certified Kubernetes Application Developer | Planned | — |

Each live course provides: a diagnostic, one lesson per exam domain, three exam-weighted mock exams,
and two printable reference docs (an exam blueprint and a glossary).

## How it is built

Each course is generated with the **`teach` skill** (a stateful teaching workflow) and then adapted
into this repo's static-HTML catalog format. The two are not the same layout: the `teach` skill's own
workspace (`MISSION.md`, `learning-records/`, `lessons/*.html`, …) is a *learning* workspace, whereas
this catalog ships only the finished, self-contained course pages. The recipe below is how AI-901 was
built and how DP-900 mirrored it.

### Prerequisite: install the `teach` skill

The courses are authored with the `teach` skill from [mattpocock/skills](https://skills.sh/mattpocock/skills).
Install it once (globally) with the [`skills`](https://skills.sh/) CLI:

```bash
npx skills add mattpocock/skills/teach -g -y
```

> [!NOTE]
> Confirm the exact package path on <https://skills.sh/> — search "teach", then copy the install
> command it shows. The `-g` flag installs at user level; `-y` skips the confirmation prompt.

You drive it from Claude Code with `/teach <certification>` (for example `/teach dp-900`).

### The recipe (AI-901 → DP-900)

1. **Source the objectives from Microsoft Learn — do not invent them.** Use the Playwright MCP to open
   the certification's study guide and extract the domains, weightings, and sub-objectives verbatim:

   ```text
   https://aka.ms/dp900-StudyGuide   → the authoritative "Skills measured" outline
   https://learn.microsoft.com/…/certifications/azure-data-fundamentals/   → domains + exam facts
   ```

   Record a "Skills as of `<date>`" line so the course can be re-checked when Microsoft updates the exam.

2. **Create the course folder** under `public/trainings/<course-id>/`, mirroring an existing course:

   ```text
   <course-id>/
   ├── index.html                 course landing page (lesson list, mock links, reference links)
   ├── data/
   │   ├── 0001.js … 0005.js      diagnostic + one dataset per domain
   │   └── 0006.js … 0008.js      three mock-exam datasets (30 Q each)
   ├── lessons/
   │   ├── 0001-*.html … 0005-*.html   teaching pages, each ending in a quiz
   │   └── 0006-*.html … 0008-*.html   mock-exam pages
   └── reference/
       ├── exam-blueprint.html    domains, weightings, assumed skills
       └── glossary.html          canonical vocabulary + trap pairs
   ```

3. **Reuse the shared assets** in [`shared/`](./shared/) unchanged — do not copy them per course. Link
   them with relative paths (`../shared/…` from `index.html`; `../../shared/…` from `lessons/` and
   `reference/`).

4. **Write the datasets and lesson pages** following the [conventions](#conventions) below.

5. **Register the course** in the React catalog (see [Wiring a course into the site](#wiring-a-course-into-the-site)).

6. **Author or update this README** with the [`readme-authoring`](https://skills.sh/) skill and preview
   locally before opening a PR.

## Conventions

### Page structure

Every page is **bodyless-`<head>` HTML**: it starts directly with `<meta>` tags and content — no
`<html>`, `<head>`, or `<body>` wrappers — because the browser supplies them. Start each file with this
exact head (adjust `../` depth by folder level):

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="../../shared/theme-toggle.js"></script>   <!-- must be first: syncs data-theme before paint -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="../../shared/trainings.css">
<title>…</title>
```

A lesson body then follows the order: `.eyebrow` → `<h1>` → `.subtitle` → `<h2>` content sections
(`.table-wrap > table`, `.callout`, `<pre><code>`) → a quiz mount `<div class="quiz" id="…">` →
`.source` (primary Microsoft Learn link) → `.ask` → `.lesson-nav`. See any file under
[`ai-901/lessons/`](./ai-901/lessons/) or [`dp-900/lessons/`](./dp-900/lessons/) as a template.

### Styling

All styling comes from [`shared/trainings.css`](./shared/trainings.css) — a Tufte-inspired,
print-friendly stylesheet themed to the portfolio palette via `[data-theme]` on `<html>` (set by
[`shared/theme-toggle.js`](./shared/theme-toggle.js), which reads the site's `pkuppens_theme` key so the
theme persists between the SPA and the course pages). Domain badges use `.badge.d1`…`.badge.d4`; add
more `.badge.dN` rules there if a certification has more than four domains. Do not change the shared
`:root` color tokens — that would recolor every course.

### Quizzing

Quizzes are driven by [`shared/quiz.js`](./shared/quiz.js), a single course-agnostic engine exposed as
`Quiz.render(elementId, config)`. Wire it at the bottom of each lesson with three lines:

```html
<script src="../../shared/quiz.js"></script>
<script src="../data/0002.js"></script>
<script>Quiz.render('q-core', window.TRAINING_DATA['0002']);</script>
```

Each dataset file assigns `window.TRAINING_DATA['NNNN'] = { passMark: 0.7, questions: [ … ] }`.
Mock-exam datasets add `mode: "exam"` at the top level. The engine supports four question types and two
modes:

| `type` | Shape | Scoring |
| --- | --- | --- |
| `single` (default) | `options`, `answer: <index>` | exact |
| `multi` | `options`, `answers: [<indices>]` | all-or-nothing |
| `match` | `items`, `categories`, `answer: [<catIndexPerItem>]` | all-or-nothing |
| `order` | `items` (in the correct order) | all-or-nothing |

Every question carries `q` (prompt), `why` (explanation shown after answering, HTML allowed), and a
`tag` of the domain code (`"D1"`…`"D4"`) so the engine can report a **per-domain** readiness breakdown.
`mode: "practice"` (lessons) reveals feedback per question; `mode: "exam"` (mocks) grades all questions
on submit and shows a scaled score (~/1000, pass 700) with a pass/fail verdict.

## Wiring a course into the site

The `/trainings` card grid is not generated from this folder — it is a hand-maintained array in
[`src/pages/trainings/TrainingsPage.tsx`](../../src/pages/trainings/TrainingsPage.tsx). To publish a
course, set its entry to `status: 'Live'` and add an `href`:

```ts
{
  id: 'dp-900',
  title: 'DP-900 — Azure Data Fundamentals',
  status: 'Live',
  desc: '…',
  tags: ['Azure', 'Data Fundamentals', 'Quizzes', 'Mock Exams'],
  href: '/trainings/dp-900/',   // plain anchor — full-page nav out of the SPA into the static course
}
```

## Local preview

The courses ship inside the portfolio SPA, so preview them from the **repository root**, not this
folder. See the [repo README](../../README.md) for full setup; the short path:

```bash
# from the repository root
npm install
npm run dev
```

Then open the dev server (Vite prints the URL, typically <http://localhost:5173>) and browse to
`/trainings` → **Open Course**, or go straight to `/trainings/dp-900/`. Because the pages are plain
static files, you can also open any `index.html` directly in a browser, though in-repo absolute links
(such as the favicon) resolve only when served.

To check a production build:

```bash
npm run build && npm run preview
```

## Contributing

- Report issues or request a new course via the repo's
  [GitHub issues](https://github.com/pkuppens/pkuppens.github.io/issues).
- Keep new courses consistent with the [conventions](#conventions) above and reuse the shared assets.
- This content is part of the portfolio site repository; see the [repo README](../../README.md) for
  ownership and reuse terms.
