-- 1. Lock down internal RPCs: revoke EXECUTE from anon + authenticated.
--    These are only called from trusted server code via supabaseAdmin (service_role).
DO $$
DECLARE
  fn text;
  internal_fns text[] := ARRAY[
    'mark_enrolment_paid(uuid)',
    'mark_enrolment_paid_with_payment(uuid, text, text)',
    'mark_enrolment_failed(uuid, text, text, text)',
    'ce_session_trace(uuid)',
    'enqueue_email(text, jsonb)',
    'read_email_batch(text, integer, integer)',
    'delete_email(text, bigint)',
    'move_to_dlq(text, text, bigint, jsonb)',
    'check_analytics_anomalies()',
    'log_application_status_change()',
    'touch_applications_updated_at()',
    'touch_certificates_updated_at()',
    'touch_enrolment_intents_updated_at()',
    'touch_thumbnail_override()'
  ];
BEGIN
  FOREACH fn IN ARRAY internal_fns LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION public.%s FROM PUBLIC', fn);
    EXECUTE format('REVOKE EXECUTE ON FUNCTION public.%s FROM anon, authenticated', fn);
    EXECUTE format('GRANT EXECUTE ON FUNCTION public.%s TO service_role', fn);
  END LOOP;
END $$;

-- 2. ce_rate_buckets has RLS enabled but no policies. It is only touched by the
--    SECURITY DEFINER fn ce_rate_hit (which bypasses RLS), so the empty policy
--    set is intentional. Add an explicit deny policy so the linter stops flagging
--    rule 0008_rls_enabled_no_policy and the intent is documented in-schema.
DROP POLICY IF EXISTS "No direct access to rate buckets" ON public.ce_rate_buckets;
CREATE POLICY "No direct access to rate buckets"
  ON public.ce_rate_buckets
  FOR SELECT
  TO anon, authenticated
  USING (false);