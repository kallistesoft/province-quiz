#!/bin/sh
# Pre-push check (run by the global pre-push hook, or by hand).
# 1. The quiz weights: every province can win, none wins too often.
# 2. The generated pages are up to date: build_pages.mjs must not change any file (it stamps ?v=<hash> on css/js links).
set -e
cd "$(dirname "$0")/.."
state() { git status --porcelain; git diff HEAD | shasum; }
node tools/check_scoring.mjs
before="$(state)"
node tools/build_pages.mjs >/dev/null
after="$(state)"
if [ "$before" != "$after" ]; then
  echo "FAIL generated pages were stale: build_pages.mjs changed files; review and commit them:"
  git status --short
  exit 1
fi
echo "check: all passed"
