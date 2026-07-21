#!/usr/bin/env bash
# One-click history purge for large binaries that block GitHub sync.
#
# Usage:  ./scripts/purge-history-blob.sh <path> [<path>...]
# Example: ./scripts/purge-history-blob.sh \
#            public/videos/task-inauguration.mp4 \
#            public/videos/task-inauguration-720p.mp4 \
#            public/intro.mp4
#
# What it does:
#   1. Verifies the working tree is clean (aborts otherwise).
#   2. Runs `git filter-repo --invert-paths --path <p> --path <p>` to strip
#      every listed path from every commit in every branch and tag.
#   3. Runs aggressive gc so the packfiles actually shrink.
#   4. Force-pushes every branch and tag to `origin` (needs write access).
#
# Requirements:
#   - git-filter-repo installed  (brew install git-filter-repo  |  pipx install git-filter-repo)
#   - clean working tree, no in-progress rebase/merge
#   - a recent local backup (this rewrites history — irreversible)
#
# Do NOT run this inside the Lovable sandbox — the agent cannot execute
# stateful git commands. Run it on your own machine after cloning the
# repo, then let Lovable re-sync from the rewritten history.

set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "usage: $0 <path> [<path>...]" >&2
  exit 2
fi

if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "✗ git-filter-repo is not installed." >&2
  echo "  Install with:  brew install git-filter-repo   (or) pipx install git-filter-repo" >&2
  exit 3
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "✗ working tree not clean — commit or stash first." >&2
  exit 4
fi

echo ""
echo "About to rewrite history and PERMANENTLY remove:"
for p in "$@"; do echo "  - $p"; done
echo ""
echo "This will force-push to origin and cannot be undone."
read -r -p "Type PURGE to continue: " CONFIRM
if [ "$CONFIRM" != "PURGE" ]; then
  echo "aborted."
  exit 5
fi

ARGS=()
for p in "$@"; do ARGS+=(--path "$p"); done

echo "→ running git-filter-repo…"
git filter-repo --invert-paths --force "${ARGS[@]}"

echo "→ repacking…"
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "→ force-pushing all branches and tags…"
git push origin --force --all
git push origin --force --tags

echo ""
echo "✓ done. Ask any collaborators to re-clone; their old clones will diverge."