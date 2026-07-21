-- 1) Allow the existing analytics_alerts feed to carry RLS-permission-denied alerts.
ALTER TABLE public.analytics_alerts DROP CONSTRAINT IF EXISTS analytics_alerts_alert_type_check;
ALTER TABLE public.analytics_alerts
  ADD CONSTRAINT analytics_alerts_alert_type_check
  CHECK (alert_type = ANY (ARRAY['volume_drop','shape_drift','rls_permission_denied']));

-- 2) Incident capture table populated by the app when it observes
--    "permission denied for function ..." Postgres errors at runtime.
CREATE TABLE IF NOT EXISTS public.rls_incidents (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  observed_at    timestamptz NOT NULL DEFAULT now(),
  function_name  text NOT NULL,
  message        text NOT NULL,
  path           text,
  db_role        text,
  user_id        uuid,
  context        jsonb NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT rls_incidents_message_len CHECK (char_length(message) <= 2000),
  CONSTRAINT rls_incidents_function_len CHECK (char_length(function_name) BETWEEN 1 AND 200),
  CONSTRAINT rls_incidents_path_len CHECK (path IS NULL OR char_length(path) <= 500)
);

CREATE INDEX IF NOT EXISTS idx_rls_incidents_observed ON public.rls_incidents (observed_at DESC);
CREATE INDEX IF NOT EXISTS idx_rls_incidents_function ON public.rls_incidents (function_name, observed_at DESC);

-- Grants: any browser session (signed-in or not) can log an incident so we
-- capture the anon-role failures too. Reads are staff-only via RLS.
GRANT INSERT ON public.rls_incidents TO anon, authenticated;
GRANT SELECT ON public.rls_incidents TO authenticated;
GRANT ALL ON public.rls_incidents TO service_role;

ALTER TABLE public.rls_incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can report an RLS incident"
  ON public.rls_incidents
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Staff can read RLS incidents"
  ON public.rls_incidents
  FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'reviewer'::app_role)
    OR public.has_role(auth.uid(), 'support'::app_role)
  );

CREATE POLICY "Service role manages RLS incidents"
  ON public.rls_incidents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 3) Scanner: aggregates recent incidents per function_name and, when a
--    threshold is crossed, opens one alert per (alert_type,event_name)
--    pair. The unique partial index on analytics_alerts already prevents
--    duplicates while an alert is unresolved.
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
    ON CONFLICT ON CONSTRAINT idx_analytics_alerts_open_unique DO NOTHING
    RETURNING 1
  )
  SELECT count(*)::int INTO inserted FROM ins;

  RETURN inserted;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rls_incidents(int, int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_rls_incidents(int, int) TO service_role;