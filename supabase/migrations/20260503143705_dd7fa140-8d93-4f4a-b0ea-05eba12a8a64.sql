
-- 1.1: Lock down lead PII - drop the open SELECT policy on career_engine_leads.
-- Reads now only happen via the SECURITY DEFINER ce_get_result(p_lead_id) RPC.
DROP POLICY IF EXISTS "Anyone can read their own lead by id" ON public.career_engine_leads;

-- 1.2: Stop role self-grant + invite token harvesting.
DROP POLICY IF EXISTS "Authenticated can self-claim invited role" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated can read invites by token" ON public.admin_invites;
DROP POLICY IF EXISTS "Authenticated can mark invite used" ON public.admin_invites;

-- 1.3: Scope answer/session writes - drop the open UPDATE policies.
-- Writes now only happen via SECURITY DEFINER ce_record_answer / ce_finalize_lead.
DROP POLICY IF EXISTS "Anyone can update their answers" ON public.career_engine_answers;
DROP POLICY IF EXISTS "Anyone can complete their session" ON public.career_engine_sessions;

-- Also tighten direct INSERT to anon - keep it allowed only because the
-- start flow inserts a session row before invoking ce_create_lead_early.
-- (No change required; the existing INSERT policies are scoped by simple
-- shape checks and do not leak data.)

-- 1.6: Restrict internal email queue RPCs to service_role only.
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;

-- Set fixed search_path on email queue functions (mutable search_path warnings).
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
