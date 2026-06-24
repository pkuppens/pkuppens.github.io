# ADR 004: HERE Routing API Integration for Commute Calculator

## Status

Accepted

## Context

The Opportunity Evaluator needs a commute distance/time calculator so users can enter Dutch addresses and get commute times for car and public transport without guessing commute minutes.

The site is statically hosted on GitHub Pages with no backend. The HERE Routing API v8 and Geocoding & Search API v7 provide these capabilities via REST endpoints with CORS support, making them usable from a client-side-only deployment.

Existing commute scoring logic (`commuteScore.ts`) uses a single `commuteMinutes` field on `OpportunityInput`. The HERE integration must populate this field.

## Decision

We will integrate HERE APIs as a client-side integration:

- **Geocoding:** `geocode.search.hereapi.com/v1/geocode` — resolve Dutch addresses to coordinates
- **Routing:** `router.hereapi.com/v8/routes` — calculate routes for car and public transport
- **Transport:** native `fetch`, no additional SDK or dependency

### API Key Strategy

Two-tier resolution:

1. **User-provided key (preferred):** Entered in the Preferences panel, stored in `localStorage` under `pkuppens_here_api_key`
2. **Build-time key (fallback):** `VITE_HERE_API_KEY` environment variable compiled into the bundle

Users without a key see a disabled commute calculator with a link to get a free key at `platform.here.com`. This avoids hard-coding secrets that would be visible in the client bundle unless the developer explicitly chooses to embed one.

### API Key Security

- A key stored in `localStorage` is visible only to the user's browser session
- A VITE-compiled key is visible in the client bundle — mitigate via HERE portal domain restriction + rate limits
- Never log or display the API key in error messages or diagnostics
- No addresses are persisted in `localStorage` by default

### Address Persistence

- Addresses are **not** stored in `localStorage` by default
- Users may opt in to save their origin address via a "Remember origin" checkbox
- Opt-in persistence uses `pkuppens_home_address` key in `localStorage`

## Consequences

### Positive

- No backend infrastructure needed
- Fully client-side, deployable on GitHub Pages
- Users can get commute times without guessing
- All existing scoring logic unchanged — `commuteMinutes` is the only integration point
- Graceful degradation: no key = no crash, just disabled UI

### Negative

- Public transport routing may require a specific HERE plan — handled via graceful degradation (shows "not available")
- No offline capability — HERE API requires internet
- Two API calls per mode (geocode origin + geocode dest + route calls), which is slower than a batched endpoint

### Risks

- HERE API changes could break the integration (mitigated by using stable v7/v8 endpoints with versioned URLs)
- Rate limits could impact heavy users (mitigated by user-facing error messages and the `rate_limited` error category)
- API key abuse is possible on a static site — mitigated by HERE portal referrer restrictions + rate limits

## Alternatives Considered

1. **OpenStreetMap + OSRM** — free but less reliable for Dutch addresses and PT
2. **Google Maps API** — similar approach but different billing model
3. **Server-side proxy** — not feasible for GitHub Pages static hosting
4. **Manual entry only** — existing behavior, but the issue specifically requested automated calculation
