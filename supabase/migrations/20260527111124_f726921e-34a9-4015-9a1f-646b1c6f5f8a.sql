
-- 1. Notification tracking
ALTER TABLE public.analytics_alerts ADD COLUMN IF NOT EXISTS notified_at timestamptz;
ALTER TABLE public.backup_runs       ADD COLUMN IF NOT EXISTS notified_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_analytics_alerts_unnotified
  ON public.analytics_alerts (fired_at)
  WHERE notified_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_backup_runs_failed_unnotified
  ON public.backup_runs (finished_at)
  WHERE status = 'failed' AND notified_at IS NULL;

-- 2. audit_log: allow bulk_export action
ALTER TABLE public.audit_log DROP CONSTRAINT IF EXISTS audit_log_action_check;
ALTER TABLE public.audit_log ADD CONSTRAINT audit_log_action_check
  CHECK (action = ANY (ARRAY['insert','update','archive','restore','hard_delete','bulk_export']));

-- 3. Generic admin rate limiter (reuses ce_rate_buckets)
CREATE OR REPLACE FUNCTION public.admin_rate_hit(_action text, _max int, _window_seconds int)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'auth required';
  END IF;
  IF NOT public.has_any_role(v_uid, ARRAY['admin'::app_role,'reviewer'::app_role,'support'::app_role]) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;
  IF _action IS NULL OR length(_action) = 0 OR length(_action) > 64 THEN
    RAISE EXCEPTION 'invalid action';
  END IF;
  RETURN public.ce_rate_hit('admin:' || v_uid::text || ':' || _action, _max, _window_seconds);
END;
$$;

-- 4. Admin export recorder: rate-limits + writes to audit_log
CREATE OR REPLACE FUNCTION public.record_admin_export(_resource text, _row_count int, _details jsonb DEFAULT '{}'::jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'auth required';
  END IF;
  IF NOT public.has_any_role(v_uid, ARRAY['admin'::app_role,'reviewer'::app_role,'support'::app_role]) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;
  IF _resource IS NULL OR length(_resource) = 0 OR length(_resource) > 64 THEN
    RAISE EXCEPTION 'invalid resource';
  END IF;
  -- 10 exports per 5 minutes per (admin, resource)
  IF public.ce_rate_hit('admin_export:' || v_uid::text || ':' || _resource, 10, 300) THEN
    RAISE EXCEPTION 'export rate limit exceeded - wait a few minutes';
  END IF;
  INSERT INTO public.audit_log(actor_id, table_name, record_id, action, diff)
  VALUES (
    v_uid,
    _resource,
    'export:' || extract(epoch from now())::bigint::text,
    'bulk_export',
    jsonb_build_object(
      'row_count', COALESCE(_row_count, 0),
      'details',  COALESCE(_details, '{}'::jsonb)
    )
  );
END;
$$;

-- 5. Alert dispatcher helpers
CREATE OR REPLACE FUNCTION public.pending_alert_payloads(_limit int DEFAULT 50)
RETURNS TABLE(kind text, id uuid, title text, body jsonb, fired_at timestamptz)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 'analytics'::text  AS kind,
         a.id,
         a.alert_type || ':' || a.event_name AS title,
         jsonb_build_object(
           'alert_type', a.alert_type,
           'event_name', a.event_name,
           'details',    a.details
         )                          AS body,
         a.fired_at
    FROM public.analytics_alerts a
   WHERE a.notified_at IS NULL
  UNION ALL
  SELECT 'backup_failed'::text     AS kind,
         b.id,
         'backup_failed'           AS title,
         jsonb_build_object(
           'error',       b.error,
           'destination', b.destination,
           'started_at',  b.started_at,
           'finished_at', b.finished_at,
           'details',     b.details
         )                          AS body,
         COALESCE(b.finished_at, b.started_at) AS fired_at
    FROM public.backup_runs b
   WHERE b.status = 'failed' AND b.notified_at IS NULL
   ORDER BY fired_at ASC
   LIMIT _limit;
$$;

CREATE OR REPLACE FUNCTION public.mark_alerts_notified(_ids uuid[])
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.analytics_alerts SET notified_at = now() WHERE id = ANY(_ids) AND notified_at IS NULL;
$$;

CREATE OR REPLACE FUNCTION public.mark_backup_alerts_notified(_ids uuid[])
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.backup_runs SET notified_at = now() WHERE id = ANY(_ids) AND notified_at IS NULL;
$$;

-- 6. Analytics events retention (90 days)
CREATE OR REPLACE FUNCTION public.prune_analytics_events(_days int DEFAULT 90)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted bigint;
BEGIN
  IF _days IS NULL OR _days < 7 THEN
    RAISE EXCEPTION 'retention must be >= 7 days';
  END IF;
  DELETE FROM public.analytics_events
   WHERE created_at < now() - make_interval(days => _days);
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$;

-- Daily cron at 19:00 UTC (00:30 IST) to prune stale analytics events.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    PERFORM cron.unschedule('arzon-prune-analytics-events')
      WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'arzon-prune-analytics-events');
    PERFORM cron.schedule(
      'arzon-prune-analytics-events',
      '0 19 * * *',
      $cron$ SELECT public.prune_analytics_events(90); $cron$
    );
  END IF;
END $$;
