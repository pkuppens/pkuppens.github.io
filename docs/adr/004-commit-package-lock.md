# ADR 004: Commit `package-lock.json` and Keep It Out of `.gitignore`

*Date: April 2026*

## Status
Accepted

## Context
This repository is a deployable static web application (not a published npm library). The GitHub Actions workflow installs dependencies with **`npm ci`**, which requires a committed lockfile. Some teams ignore lockfiles for libraries; that pattern does not apply here.

Separately, [ADR 003](003-localstorage-persistence.md) documents **client-side persistence** of evaluator input and UI preferences in `localStorage`. That data can include professional or personally identifiable information (PII) from a visitor’s perspective. The site has no backend, but **JavaScript that runs in the browser** still forms a supply-chain surface: a compromised or malicious dependency could affect code executed at this origin. Regular dependency updates and audits do not replace secure design, but they reduce known-vulnerability exposure in third-party code.

## Decision
- **Commit and version-control `package-lock.json`.**
- **Do not** add `package-lock.json` to `.gitignore` (see comments in that file).
- Rely on **Dependabot** (version update PRs on a weekly schedule) and a **scheduled `npm audit` workflow** as described in this ADR’s consequences.

## Rationale
- **CI reproducibility**: `npm ci` in the deploy workflow installs the exact dependency graph recorded in the lockfile, so CI matches a clean install from the same commit.
- **Deterministic tree**: Avoids drift from semver ranges in `package.json` alone (“works on my machine” vs CI).
- **Review surface**: Lockfile diffs make transitive dependency changes visible in pull requests.
- **npm practice**: For application projects, the lockfile is the install source of truth; committing it is standard.

## Consequences
- Lockfile changes are **explicit** commits or PRs; reviewers see full dependency moves.
- **Merge conflicts** on `package-lock.json` are resolved by checking out the target branch, running `npm install` (or the minimal change needed), and committing the regenerated lockfile—not by hand-editing JSON.
- **Repository settings (manual):** Enable [Dependabot alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts) and [Dependabot security updates](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates) for this repo if your organisation allows it (org defaults may apply). Version updates are configured in `.github/dependabot.yml`; alerts depend on GitHub’s dependency graph and your plan.
- The scheduled **`npm audit`** workflow uses `--audit-level=high` so weekly runs do not fail on moderate dev-toolchain noise; run `npm audit` locally to review moderate/low findings.

## Related
- [ADR 003: localStorage persistence](003-localstorage-persistence.md) — why client-side data and supply-chain hygiene matter together.
