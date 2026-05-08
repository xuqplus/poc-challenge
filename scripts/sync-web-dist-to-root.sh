#!/usr/bin/env bash
# Mirror jigsaw-web production output to repo-root dist/ for GitHub Pages and parity checks.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC="$ROOT/jigsaw-web/dist"
DST="$ROOT/dist"
if [[ ! -d "$SRC" ]]; then
  echo "sync-web-dist-to-root: missing $SRC — run: cd jigsaw-web && cnpm i && cnpm run build" >&2
  exit 1
fi
rm -rf "$DST"
mkdir -p "$DST"
cp -R "$SRC"/. "$DST"/
echo "sync-web-dist-to-root: copied $SRC -> $DST"
