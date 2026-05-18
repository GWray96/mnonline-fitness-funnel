#!/bin/bash
set -euo pipefail

# Only needed in Claude Code on the web (fresh container each session).
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Idempotent: npm install is a no-op when node_modules is already current,
# and the container caches state after the hook completes.
npm install --no-audit --no-fund
