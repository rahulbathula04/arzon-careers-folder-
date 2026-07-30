CREATE EXTENSION IF NOT EXISTS pg_net SCHEMA extensions;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    CREATE EXTENSION pg_cron;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.analytics_alert_config (
  event_name        TEXT PRIMARY KEY,
  enabled           BOOLEAN NOT NULL DEFAULT TRUE,
  window_hours      INTEGER NOT NULL DEFAULT 24 CHECK (window_hours BETWEEN 1 AND 168),
  min_count         INTEGER NOT NULL DEFAULT 1 CHECK (min_count >= 0),
  required_props    TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.analytics_alert_config ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.analytics_alerts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type   TEXT NOT NULL CHECK (alert_type IN ('volume_drop', 'shape_drift')),
  event_name   TEXT NOT NULL,
  details      JSONB NOT NULL DEFAULT '{}'::jsonb,
  fired_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at  TIMESTAMPTZ
);
ALTER TABLE public.analytics_alerts ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_analytics_alerts_fired
  ON public.analytics_alerts (fired_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_alerts_event
  ON public.analytics_alerts (event_name, fired_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_analytics_alerts_open_unique
  ON public.analytics_alerts (alert_type, event_name)
  WHERE resolved_at IS NULL;

DO $$ BEGIN
  CREATE POLICY "Staff can read alert config"
    ON public.analytics_alert_config FOR SELECT
    USING (
      auth.role() = 'service_role'
      OR public.has_role(auth.uid(), 'admin')
      OR public.has_role(auth.uid(), 'reviewer')
      OR public.has_role(auth.uid(), 'support')
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Service role manages alert config"
    ON public.analytics_alert_config FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Staff can read alerts"
    ON public.analytics_alerts FOR SELECT
    USING (
      auth.role() = 'service_role'
      OR public.has_role(auth.uid(), 'admin')
      OR public.has_role(auth.uid(), 'reviewer')
      OR public.has_role(auth.uid(), 'support')
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Service role manages alerts"
    ON public.analytics_alerts FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE OR REPLACE FUNCTION public.check_analytics_anomalies()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  cfg              public.analytics_alert_config%ROWTYPE;
  observed_count   INTEGER;
  drift_rows       JSONB;
  alerts_inserted  INTEGER := 0;
  required_key     TEXT;
  drift_count      INTEGER;
BEGIN
  FOR cfg IN SELECT * FROM public.analytics_alert_config WHERE enabled LOOP
    -- Volume check
    SELECT COUNT(*) INTO observed_count
    FROM public.analytics_events
    WHERE event_name = cfg.event_name
      AND created_at >= now() - (cfg.window_hours || ' hours')::interval;

    IF observed_count < cfg.min_count THEN
      INSERT INTO public.analytics_alerts (alert_type, event_name, details)
      VALUES (
        'volume_drop', cfg.event_name,
        jsonb_build_object(
          'window_hours', cfg.window_hours,
          'expected_min', cfg.min_count,
          'observed', observed_count,
          'checked_at', now()
        )
      )
      ON CONFLICT (alert_type, event_name) WHERE resolved_at IS NULL DO NOTHING;
      IF FOUND THEN alerts_inserted := alerts_inserted + 1; END IF;
    ELSE
      UPDATE public.analytics_alerts
        SET resolved_at = now()
        WHERE alert_type = 'volume_drop'
          AND event_name = cfg.event_name
          AND resolved_at IS NULL;
    END IF;

    -- Shape check
    IF cardinality(cfg.required_props) > 0 THEN
      drift_count := 0;
      FOREACH required_key IN ARRAY cfg.required_props LOOP
        WITH violators AS (
          SELECT id, props
          FROM public.analytics_events
          WHERE event_name = cfg.event_name
            AND created_at >= now() - (cfg.window_hours || ' hours')::interval
            AND (props IS NULL OR NOT (props ? required_key))
          LIMIT 5
        )
        SELECT COUNT(*)::INTEGER,
               COALESCE(jsonb_agg(jsonb_build_object('id', id, 'props', props)), '[]'::jsonb)
          INTO drift_count, drift_rows
          FROM violators;

        IF drift_count > 0 THEN
          INSERT INTO public.analytics_alerts (alert_type, event_name, details)
          VALUES (
            'shape_drift', cfg.event_name,
            jsonb_build_object(
              'window_hours', cfg.window_hours,
              'missing_prop', required_key,
              'sample_rows', drift_rows,
              'checked_at', now()
            )
          )
          ON CONFLICT (alert_type, event_name) WHERE resolved_at IS NULL DO NOTHING;
          IF FOUND THEN alerts_inserted := alerts_inserted + 1; END IF;
          EXIT;
        END IF;
      END LOOP;

      IF drift_count = 0 THEN
        UPDATE public.analytics_alerts
          SET resolved_at = now()
          WHERE alert_type = 'shape_drift'
            AND event_name = cfg.event_name
            AND resolved_at IS NULL;
      END IF;
    END IF;
  END LOOP;

  RETURN alerts_inserted;
END;
$$;

REVOKE ALL ON FUNCTION public.check_analytics_anomalies() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_analytics_anomalies() TO postgres;

INSERT INTO public.analytics_alert_config (event_name, window_hours, min_count, required_props, notes)
VALUES
  ('acri_pv_cta_clicked', 24, 1, ARRAY['band','overall'],
   'PV flagship CTA in the ACRI hero block - dedicated funnel event.'),
  ('acri_track_clicked', 24, 1, ARRAY['track_slug','track_tag','source'],
   'Recommended track card clicks (flagship + secondary) on /career-engine/result.')
ON CONFLICT (event_name) DO UPDATE SET
  required_props = EXCLUDED.required_props,
  window_hours = EXCLUDED.window_hours,
  min_count = EXCLUDED.min_count,
  notes = EXCLUDED.notes,
  updated_at = now();

DO $$
DECLARE jid INTEGER;
BEGIN
  SELECT jobid INTO jid FROM cron.job WHERE jobname = 'check-analytics-anomalies';
  IF jid IS NOT NULL THEN PERFORM cron.unschedule(jid); END IF;

  PERFORM cron.schedule(
    'check-analytics-anomalies',
    '7 * * * *',
    $cron$ SELECT public.check_analytics_anomalies(); $cron$
  );
END $$;