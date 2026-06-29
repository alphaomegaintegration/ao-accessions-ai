#!/usr/bin/env bash
# One-command clean AIE accessions demo: reset -> seed -> run agents -> report.
# Requires: pip install simple-salesforce anthropic ; env SF_USERNAME/SF_PASSWORD/SF_TOKEN [SF_DOMAIN] ANTHROPIC_API_KEY
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"

echo "==> Value meter BEFORE:"
python3 "$HERE/demo_runner.py" --report || true

echo "==> Running clean demo (reset + seed + agents)…"
python3 "$HERE/demo_runner.py" --reset --seed --run

echo "==> Value meter AFTER:"
python3 "$HERE/demo_runner.py" --report

echo
echo "Demo is loaded and clean. Open the 'AI-Generated Documents' list view to present."
echo "Tear down after: python3 $HERE/demo_runner.py --reset"
