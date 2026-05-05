# LinkedIn — local structured experience data

This folder holds tooling to turn **experience-shaped** content into validated XML aligned with LinkedIn-style fields (`schema.xsd` + `to-xml.mjs`). It exists so the repo can store a **local mirror** of your public CV data that stays close to what LinkedIn shows, without relying on fragile automation against linkedin.com.

## Status (pivot away from scraping)

Reliable **live scraping** of the LinkedIn Experience section (CDP-attached Chrome, selectors, logged-in DOM) proved **too brittle**: LinkedIn’s UI and protections change often; authentication and profile locks caused incomplete or inconsistent output. Issue **#41** is closed as *not planned* for that scrape-first goal.

**Primary direction:** maintain canonical files under `data/linkedin/<vanitySlug>.xml` (plus JSON/CSV exports when implemented), populated through a **web or assistant-assisted editor** and manual verification — not headless scraping. Tracking: **[#42](https://github.com/pkuppens/pkuppens.github.io/issues/42)** (same repository).

Legacy scrape scripts remain optional: they may still help if you save HTML to a fixture and run `linkedin:xml`, but they are **not** the supported path for day-to-day updates.

## Layout and schema

| File | Role |
|------|------|
| `schema.xsd` | XSD for `<lx:experiences>` — local data aligned with LinkedIn-style experience (including groups and roles). |
| `to-xml.mjs` | Builds `tmp/linkedin.xml` from captured HTML (see npm `linkedin:xml`). |
| `scrape.mjs` | Optional Playwright path; see header **Status** and limitations above. |
| `linkedin-experience-from-chrome.ps1` / `.cmd` | Windows helpers to drive CDP + scrape + xml (legacy). |

Target committed data (when the editor ships): **`data/linkedin/pieterkuppens.xml`** for [linkedin.com/in/pieterkuppens](https://www.linkedin.com/in/pieterkuppens/), with the same slug pattern for other profiles.

## npm scripts (from repo root)

- `npm run linkedin:scrape` — optional capture to `tmp/linkedin.html`
- `npm run linkedin:scrape:cdp` / `linkedin:scrape:cdp:start` — CDP variants
- `npm run linkedin:scrape:win` — PowerShell wrapper
- `npm run linkedin:xml` — HTML → XML using `schema.xsd`

Environment variables (`LINKEDIN_CDP_URL`, `LINKEDIN_USER_DATA_DIR`, etc.) are documented in the **`scrape.mjs`** file header.

## Related GitHub tracking

- **[#42](https://github.com/pkuppens/pkuppens.github.io/issues/42)** — web/AI-assisted editor and `data/linkedin/<slug>` mirror workflow
