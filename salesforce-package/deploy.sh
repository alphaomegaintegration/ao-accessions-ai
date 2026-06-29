#!/usr/bin/env bash
# Deploy the AIE Salesforce AI demo data model. Requires Salesforce CLI (sf).
set -euo pipefail
ALIAS="${1:-aieDemo}"

echo "==> Logging in (browser)…"
sf org login web --alias "$ALIAS"

echo "==> Validating (dry-run)…"
sf project deploy start --source-dir force-app --target-org "$ALIAS" --dry-run

echo "==> Deploying data model + automation…"
sf project deploy start --source-dir force-app --target-org "$ALIAS"

echo "Done. Next: build Einstein prompt templates and the Agentforce agent in the org"
echo "(see einstein-prompt-templates.md and agentforce-accessions-assistant.md)."
