-- ACRI privacy/readiness hardening
-- Public leaderboard participation is explicit opt-in.
ALTER TABLE public.acri_leaderboard_entries
  ALTER COLUMN consent_public SET DEFAULT false;

-- Candidate-facing ACRI readiness is score-based:
-- 80+ = Industry Ready. Critical gate analytics remain internal.
