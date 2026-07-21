-- 1) Replace overly-permissive INSERT policies with real validation

DROP POLICY IF EXISTS "Anyone can join the prime60 waitlist" ON public.arzonprime60_waitlist;
CREATE POLICY "Anyone can join the prime60 waitlist"
  ON public.arzonprime60_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND length(email) BETWEEN 5 AND 120
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (name  IS NULL OR length(name)  BETWEEN 1 AND 80)
    AND (phone IS NULL OR length(regexp_replace(phone, '\D', '', 'g')) BETWEEN 10 AND 15)
    AND (tier  IS NULL OR tier IN ('essential','career','elite'))
    AND reason IN ('reminder','sold_out','waitlist','other')
  );

DROP POLICY IF EXISTS "Anyone can submit a vote" ON public.demand_votes;
CREATE POLICY "Anyone can submit a vote"
  ON public.demand_votes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    track_id IS NOT NULL
    AND name  IS NOT NULL AND length(name)  BETWEEN 2 AND 80
    AND phone IS NOT NULL AND length(regexp_replace(phone, '\D', '', 'g')) BETWEEN 10 AND 15
    AND (email IS NULL OR email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')
  );

-- 2) Revoke EXECUTE on SECURITY DEFINER functions that should never be
--    called over PostgREST by anon/authenticated. These are trigger
--    functions, internal helpers, cron jobs, server-only webhook handlers,
--    and RLS helper predicates.

DO $$
DECLARE
  fn text;
  internal_fns text[] := ARRAY[
    -- trigger functions
    'update_updated_at_column()',
    'touch_enrolment_intents_updated_at()',
    'touch_thumbnail_override()',
    'touch_applications_updated_at()',
    'touch_certificates_updated_at()',
    'log_application_status_change()',
    'demand_recount_and_promote()',
    -- cron / scheduled
    'check_analytics_anomalies()',
    -- pgmq email queue helpers (server-only)
    'enqueue_email(text, jsonb)',
    'read_email_batch(text, integer, integer)',
    'delete_email(text, bigint)',
    'move_to_dlq(text, text, bigint, jsonb)',
    -- career-engine internal helpers
    'ce_log_server_event(text, uuid, uuid, jsonb)',
    'ce_assert_session_owner(uuid, text)',
    'ce_rate_hit(text, integer, integer)',
    -- Razorpay webhook / server-only payment finalisers
    'mark_enrolment_paid(uuid)',
    'mark_enrolment_paid_with_payment(uuid, text, text)',
    'mark_enrolment_failed(uuid, text, text, text)',
    'attach_razorpay_order(uuid, text)',
    -- RLS predicates (called from policies, not from client)
    'has_role(uuid, app_role)',
    'has_any_role(uuid, app_role[])'
  ];
BEGIN
  FOREACH fn IN ARRAY internal_fns LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION public.%s FROM PUBLIC, anon, authenticated', fn);
  END LOOP;
END $$;
