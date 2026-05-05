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

## Related GitHub tracking

- **[#42](https://github.com/pkuppens/pkuppens.github.io/issues/42)** — web/AI-assisted editor and `data/linkedin/<slug>` mirror workflow
