-- Enterprise hardening: privileged SECURITY DEFINER functions must not be
-- directly executable by browser roles. Trusted server-side workflows use
-- service_role and retain the required capability.

REVOKE EXECUTE ON FUNCTION public.grant_admin_to_owner() FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.record_payment_event(uuid,text,text,text,text,integer,text,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_payment_event(uuid,text,text,text,text,integer,text,jsonb) TO service_role;

REVOKE EXECUTE ON FUNCTION public.mark_readiness_paid_by_lead(uuid,integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mark_readiness_paid_by_lead(uuid,integer) TO service_role;

REVOKE EXECUTE ON FUNCTION public.check_rls_incidents(integer,integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rls_incidents(integer,integer) TO service_role;

REVOKE EXECUTE ON FUNCTION public.claim_due_retention_checkins(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_due_retention_checkins(integer) TO service_role;

REVOKE EXECUTE ON FUNCTION public.enqueue_retention_checkins() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_retention_checkins() TO service_role;

REVOKE EXECUTE ON FUNCTION public.fn_audit_row() FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.admin_cohort_audit(text,integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.admin_list_cohorts() FROM anon;
REVOKE EXECUTE ON FUNCTION public.admin_rate_hit(text,integer,integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.admin_set_cohort_capacity(text,integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.admin_set_cohort_lock(text,boolean,text) FROM anon;

REVOKE EXECUTE ON FUNCTION public.list_admin_activity(text,uuid,text,timestamptz,integer) FROM anon;
REVOKE EXECUTE ON FUNCTION public.log_admin_action(text,text,text,jsonb) FROM anon;
REVOKE EXECUTE ON FUNCTION public.record_admin_export(text,integer,jsonb) FROM anon;

REVOKE EXECUTE ON FUNCTION public.employer_submit_placement_evidence(uuid,text,text,text,text,text,date,text,text) FROM anon;
