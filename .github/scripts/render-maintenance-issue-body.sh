#!/usr/bin/env bash
# Emit issue body copied from tracked template (.github/templates/maintenance-issue-body.md).

set -euo pipefail
ROOT="$(dirname "$0")/../.."
TEMPLATE="${ROOT}/.github/templates/maintenance-issue-body.md"
if [[ ! -f "${TEMPLATE}" ]]; then
  echo "missing ${TEMPLATE}"
  exit 1
fi
cat "${TEMPLATE}"
