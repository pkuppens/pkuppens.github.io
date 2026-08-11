# LinkedIn — local structured experience data

This folder holds the XML schema (`schema.xsd`) and helper scripts for maintaining **canonical local experience data** aligned with LinkedIn-style fields. The goal is to store a **local mirror** of your public CV data that stays close to what LinkedIn shows, without relying on fragile automation against linkedin.com.

## Status (pivot away from scraping)

Reliable **live scraping** of the LinkedIn Experience section (selectors, logged-in DOM, CDP attach) proved **too brittle**: LinkedIn’s UI and protections change often; authentication and profile locks caused incomplete or inconsistent output. Issue **#41** is closed as *not planned* for that scrape-first goal.

**Primary direction:** maintain canonical files under `data/linkedin/<vanitySlug>.xml` (plus JSON/CSV exports when implemented), populated through a **web or assistant-assisted editor** and manual verification — not headless scraping. Tracking: **[#42](https://github.com/pkuppens/pkuppens.github.io/issues/42)** (same repository).

## Layout and schema

| File | Role |
|------|------|
| `schema.xsd` | XSD for `<lx:experiences>` — local data aligned with LinkedIn-style experience (including groups and roles). |
| `validate.mjs` | Validates canonical XML under `data/linkedin/` (and can be extended with stricter checks over time). |
| `export-json.mjs` | Exports canonical XML to JSON (derived artifact). |
| `export-csv.mjs` | Exports canonical XML to CSV (derived artifact). |

Target committed data: **`data/linkedin/pieterkuppens.xml`** for [linkedin.com/in/pieterkuppens](https://www.linkedin.com/in/pieterkuppens/), with the same slug pattern for other profiles.

## npm scripts (from repo root)

- `npm run linkedin:validate -- --in data/linkedin/pieterkuppens.xml` — validate canonical XML
- `npm run linkedin:export:json -- --in data/linkedin/pieterkuppens.xml` — export derived JSON
- `npm run linkedin:export:csv -- --in data/linkedin/pieterkuppens.xml` — export derived CSV

## Editor (unlinked, ships in production)

Open **`/linkedin-editor`** — locally via `npm run dev`, or on the deployed site (it's not linked
from the site nav — it's a maintenance tool, not a public page). It renders a form for the
Experience section defined by `schema.xsd` (top-level `experience` items and grouped
`experienceGroup`/roles), with a LinkedIn-style read-only preview panel that updates as you type.

- **Load data/linkedin/&lt;slug&gt;.xml** / **Save to data/linkedin/&lt;slug&gt;.xml** —
  **dev-only**, only shown when running `npm run dev`. Reads/writes the file on disk via a
  dev-server-only API (`vite.config.ts`'s `linkedinEditorApi` plugin; it does not exist in the
  production build). This is a filesystem write on your own machine, not a deploy: you still
  review, `npm run linkedin:validate`, and commit the result via git like any other local change.
- **Load from browser session** / **Save to browser session** — works everywhere, including the
  deployed production site. Persists the current XML in `sessionStorage`, keyed by slug, so edits
  survive a page reload within the same browser tab/session. Nothing leaves the browser and
  nothing is written to disk; refresh in a new tab/session and it's gone.
- **Load from file…** — parses a locally chosen `.xml` file instead, for editing outside this repo's checkout.
- **Download .xml** / **Copy .xml to clipboard** — exports the current form state as XML text; the
  usual path is to overwrite `data/linkedin/<slug>.xml` and review the diff yourself.

This remains a **manual/assisted workflow** — it does not scrape linkedin.com, and no action here
writes to the deployed site. After editing, re-run `npm run linkedin:validate -- --in
data/linkedin/<slug>.xml` before committing.

## Related GitHub tracking

- **[#42](https://github.com/pkuppens/pkuppens.github.io/issues/42)** — web/AI-assisted editor and `data/linkedin/<slug>` mirror workflow (data model, seed file, and CLI tooling scope)
- **[#90](https://github.com/pkuppens/pkuppens.github.io/issues/90)** — the local editor UI itself (split from #42)
- **[#97](https://github.com/pkuppens/pkuppens.github.io/issues/97)** — production access + browser-session load/save (follow-up to #90)
