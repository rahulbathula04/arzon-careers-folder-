-- Enterprise least-privilege hardening for SECURITY DEFINER functions.
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.oid::regprocedure AS fn
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid=p.pronamespace
    WHERE n.nspname='public'
      AND p.prosecdef=true
      AND p.proname = ANY (ARRAY[
        'admin_cohort_audit',
        'admin_list_cohorts',
        'admin_set_cohort_capacity',
        'admin_set_cohort_lock',
        'check_rls_incidents',
        'claim_due_retention_checkins',
        'cohort_release_seat',
        'enqueue_retention_checkins',
        'fn_audit_row',
        'grant_admin_to_owner',
        'has_any_role',
        'has_employer_access',
        'has_role',
        'list_admin_activity',
        'list_my_employers',
        'log_admin_action',
        'mark_readiness_paid_by_lead',
        'record_admin_export',
        'record_payment_event'
      ])
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM anon', r.fn);
  END LOOP;

  FOR r IN
    SELECT p.oid::regprocedure AS fn
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid=p.pronamespace
    WHERE n.nspname='public'
      AND p.prosecdef=true
      AND p.proname = ANY (ARRAY['grant_admin_to_owner','fn_audit_row'])
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM authenticated', r.fn);
  END LOOP;
END $$;

GRANT EXECUTE ON FUNCTION public.admin_cohort_audit(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_cohorts() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_cohort_capacity(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_cohort_lock(text, boolean, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_admin_activity(text, uuid, text, timestamptz, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_admin_action(text, text, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_admin_export(text, integer, jsonb) TO authenticated;
