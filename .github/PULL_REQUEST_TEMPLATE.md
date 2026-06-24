## Summary

<!-- Brief description of what this PR does and why. -->

## Pre-merge manual smoke test

- [ ] Home: first screen — role, how to contact, one proof path (Projects/link) in ~10s.
- [ ] Projects: open at least one external case study link.
- [ ] Profile: no placeholder employers for periods covered on LinkedIn.
- [ ] Evaluator: one evaluation completes.

## CI validation

- [ ] `npm run lint` — passes with 0 warnings
- [ ] `npm run typecheck` — passes
- [ ] `npm test` — all tests pass
- [ ] `npm run build` — production build succeeds

## Post-merge / deploy

- [ ] After merge to `main`, confirm [GitHub Actions deploy](https://github.com/pkuppens/pkuppens.github.io/actions) completes
- [ ] [https://pkuppens.github.io](https://pkuppens.github.io) loads and routes work on refresh (no 404 for SPA paths)
