DELETE FROM public.rls_incidents WHERE function_name='has_role' AND message='permission denied for function has_role';
DELETE FROM public.analytics_alerts WHERE alert_type='rls_permission_denied';