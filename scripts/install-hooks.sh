#!/bin/sh
# Installs the pre-commit secret-scan hook into this repo's .git/hooks.
# Run from the repo root:  sh scripts/install-hooks.sh
set -e
cp scripts/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
echo "Pre-commit secret-scan hook installed."
