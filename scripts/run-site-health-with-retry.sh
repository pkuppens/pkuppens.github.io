#!/usr/bin/env bash
# Post-deploy live site health: retry Playwright with incremental backoff.
# Env: SITE_HEALTH_MAX_ATTEMPTS (default 5), SITE_HEALTH_DELAYS_SEC (default 0,120,300,600,900)

set -euo pipefail

MAX_ATTEMPTS="${SITE_HEALTH_MAX_ATTEMPTS:-5}"
DELAYS_CSV="${SITE_HEALTH_DELAYS_SEC:-0,120,300,600,900}"

IFS=',' read -r -a DELAYS <<< "$DELAYS_CSV"

if ((${#DELAYS[@]} < MAX_ATTEMPTS)); then
  echo "SITE_HEALTH_DELAYS_SEC must have at least $MAX_ATTEMPTS values (got ${#DELAYS[@]})" >&2
  exit 1
fi

for ((attempt = 1; attempt <= MAX_ATTEMPTS; attempt++)); do
  echo "Site health attempt $attempt/$MAX_ATTEMPTS"
  if npm run test:site-health; then
    echo "Site health passed on attempt $attempt"
    exit 0
  fi

  if ((attempt == MAX_ATTEMPTS)); then
    echo "Site health failed after $MAX_ATTEMPTS attempts" >&2
    exit 1
  fi

  wait_sec="${DELAYS[$attempt]}"
  echo "Attempt $attempt/$MAX_ATTEMPTS failed; waiting ${wait_sec}s before retry"
  sleep "$wait_sec"
done

exit 1
