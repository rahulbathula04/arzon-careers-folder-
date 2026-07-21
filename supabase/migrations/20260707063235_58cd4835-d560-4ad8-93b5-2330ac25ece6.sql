CREATE OR REPLACE FUNCTION public.check_rls_incidents(
  _window_minutes int DEFAULT 15,
  _min_count int DEFAULT 3
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  inserted int := 0;
BEGIN
  WITH agg AS (
    SELECT function_name,
           count(*)         AS incident_count,
           max(observed_at) AS last_seen,
           min(observed_at) AS first_seen,
           (array_agg(DISTINCT path)         FILTER (WHERE path IS NOT NULL))[1:10]      AS sample_paths,
           (array_agg(DISTINCT db_role)      FILTER (WHERE db_role IS NOT NULL))[1:5]    AS db_roles,
           (array_agg(DISTINCT message ORDER BY message))[1:3]                            AS sample_messages
      FROM public.rls_incidents
     WHERE observed_at >= now() - make_interval(mins => _window_minutes)
     GROUP BY function_name
    HAVING count(*) >= _min_count
  ), ins AS (
    INSERT INTO public.analytics_alerts
      (alert_type, event_name, details, fired_at)
    SELECT 'rls_permission_denied',
           a.function_name,
           jsonb_build_object(
             'incident_count',   a.incident_count,
             'window_minutes',   _window_minutes,
             'first_seen',       a.first_seen,
             'last_seen',        a.last_seen,
             'sample_paths',     a.sample_paths,
             'db_roles',         a.db_roles,
             'sample_messages',  a.sample_messages
           ),
           now()
      FROM agg a
    ON CONFLICT (alert_type, event_name) WHERE resolved_at IS NULL DO NOTHING
    RETURNING 1
  )
  SELECT count(*)::int INTO inserted FROM ins;

  RETURN inserted;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rls_incidents(int, int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_rls_incidents(int, int) TO service_role;