-- Remove the legacy one-argument cohort seat claim API now that
-- payment-idempotent claims are canonical.
begin;
drop function if exists public.cohort_claim_seat(text);
commit;
