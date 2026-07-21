#!/usr/bin/env bash
# Automated check: confirm the `anon` role can evaluate RLS policies on
# every public table without hitting
# `permission denied for function public.has_role` (or `has_any_role`).
#
# Talks to the Data API (PostgREST) with the publishable/anon key so the
# request runs as the real `anon` role — the exact path the browser
# client uses. Catches regressions like revoking EXECUTE on the has_role
# helper from anon.
#
# Required env:
#   SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY   (VITE_ equivalents also OK)
#   PGHOST + friends                          (used only to enumerate
#                                              which tables have has_role
#                                              in their policies)
#
# Usage:  bash scripts/test-anon-rls.sh
# Exit:   0 = all checks passed, 1 = at least one failure.

set -uo pipefail

SUPABASE_URL="${SUPABASE_URL:-${VITE_SUPABASE_URL:-}}"
ANON_KEY="${SUPABASE_PUBLISHABLE_KEY:-${VITE_SUPABASE_PUBLISHABLE_KEY:-${VITE_SUPABASE_ANON_KEY:-}}}"

if [[ -z "${SUPABASE_URL}" || -z "${ANON_KEY}" ]]; then
  echo "✗ SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY are not set." >&2
  exit 2
fi
if [[ -z "${PGHOST:-}" ]]; then
  echo "✗ PGHOST is not set — needed to enumerate tables." >&2
  exit 2
fi

fail=0
pass=0
skipped=0
failures=()

fetch_as_anon() {
  local path="$1"
  curl -sS -o - \
    -H "apikey: ${ANON_KEY}" \
    -H "Authorization: Bearer ${ANON_KEY}" \
    "${SUPABASE_URL%/}/${path}"
}

call_rpc_as_anon() {
  local fn="$1" body="$2"
  curl -sS -o - \
    -H "apikey: ${ANON_KEY}" \
    -H "Authorization: Bearer ${ANON_KEY}" \
    -H "Content-Type: application/json" \
    -X POST -d "${body}" \
    "${SUPABASE_URL%/}/rest/v1/rpc/${fn}"
}

is_role_helper_error() {
  grep -qiE 'permission denied for function [a-z_.]*has_(any_)?role' <<<"$1"
}

echo "── 1. has_role / has_any_role reachable by anon"
out=$(call_rpc_as_anon has_role \
  '{"_user_id":"00000000-0000-0000-0000-000000000000","_role":"admin"}')
if is_role_helper_error "${out}"; then
  fail=$((fail + 1)); failures+=("has_role RPC blocked for anon")
  printf '  ✗ has_role RPC blocked for anon\n'
  printf '      %s\n' "$(head -n 1 <<<"${out}")"
else
  pass=$((pass + 1)); printf '  ✓ has_role RPC reachable as anon\n'
fi

out=$(call_rpc_as_anon has_any_role \
  '{"_user_id":"00000000-0000-0000-0000-000000000000","_roles":["admin"]}')
if is_role_helper_error "${out}"; then
  fail=$((fail + 1)); failures+=("has_any_role RPC blocked for anon")
  printf '  ✗ has_any_role RPC blocked for anon\n'
  printf '      %s\n' "$(head -n 1 <<<"${out}")"
else
  pass=$((pass + 1)); printf '  ✓ has_any_role RPC reachable as anon\n'
fi

echo
echo "── 2. GET as anon on every public table whose RLS references has_role/has_any_role"
mapfile -t tables < <(psql -tAc "
  SELECT DISTINCT tablename
    FROM pg_policies
   WHERE schemaname = 'public'
     AND (qual        ILIKE '%has_role%' OR qual        ILIKE '%has_any_role%'
       OR with_check  ILIKE '%has_role%' OR with_check  ILIKE '%has_any_role%')
   ORDER BY 1;
")

if [[ ${#tables[@]} -eq 0 ]]; then
  echo "  (no tables reference has_role in their policies — nothing to check)"
else
  for tbl in "${tables[@]}"; do
    out=$(fetch_as_anon "rest/v1/${tbl}?select=*&limit=1")
    if is_role_helper_error "${out}"; then
      fail=$((fail + 1)); failures+=("${tbl} (RLS helper unreachable)")
      printf '  ✗ %-45s %s\n' "${tbl}" "$(head -n 1 <<<"${out}")"
    elif grep -qiE '"code":"42501"|permission denied' <<<"${out}"; then
      skipped=$((skipped + 1))
    else
      pass=$((pass + 1))
    fi
  done
fi

echo
echo "── Summary"
printf '  passed  : %d\n' "${pass}"
printf '  skipped : %d (no anon SELECT grant / row-invisible — expected)\n' "${skipped}"
printf '  failed  : %d\n' "${fail}"

if [[ ${fail} -gt 0 ]]; then
  echo
  echo "Failed checks:"
  for f in "${failures[@]}"; do printf '  - %s\n' "${f}"; done
  exit 1
fi

echo
echo "✓ anon can evaluate RLS policies on every public table without helper errors."