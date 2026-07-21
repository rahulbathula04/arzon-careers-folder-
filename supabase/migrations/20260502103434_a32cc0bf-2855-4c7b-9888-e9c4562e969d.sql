-- Drop the auth trigger that depended on bootstrap_super_admin, then drop the function.
DROP TRIGGER IF EXISTS trg_bootstrap_super_admin ON auth.users;
DROP FUNCTION IF EXISTS public.bootstrap_super_admin();

-- P0: Revoke public EXECUTE on enrolment + payment SECURITY DEFINER functions.
REVOKE EXECUTE ON FUNCTION public.mark_enrolment_paid_with_payment(uuid, text, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.mark_enrolment_paid(uuid)                          FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.attach_razorpay_order(uuid, text)                  FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.get_enrolment_intent(uuid)                         FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.create_enrolment_intent(text, text, text, text, text, text, integer, uuid, text, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.apply_enrolment_coupon(uuid, text)                 FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.lookup_admin_invite(text)                          FROM anon, public;

-- P1: drop analytics_events from realtime publication.
ALTER PUBLICATION supabase_realtime DROP TABLE public.analytics_events;

-- P1: idempotency guard for Razorpay webhook retries.
CREATE UNIQUE INDEX IF NOT EXISTS uq_enrolment_intents_razorpay_payment
  ON public.enrolment_intents (razorpay_payment_id)
  WHERE razorpay_payment_id IS NOT NULL;

-- P2: partial index for analytics funnel queries.
CREATE INDEX IF NOT EXISTS idx_analytics_events_recent_event
  ON public.analytics_events (event_name, created_at DESC);
