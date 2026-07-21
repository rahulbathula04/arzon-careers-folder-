
REVOKE ALL ON FUNCTION public.admin_rate_hit(text, int, int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_rate_hit(text, int, int) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.record_admin_export(text, int, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_admin_export(text, int, jsonb) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.pending_alert_payloads(int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.pending_alert_payloads(int) TO service_role;

REVOKE ALL ON FUNCTION public.mark_alerts_notified(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mark_alerts_notified(uuid[]) TO service_role;

REVOKE ALL ON FUNCTION public.mark_backup_alerts_notified(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mark_backup_alerts_notified(uuid[]) TO service_role;

REVOKE ALL ON FUNCTION public.prune_analytics_events(int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_analytics_events(int) TO service_role;
