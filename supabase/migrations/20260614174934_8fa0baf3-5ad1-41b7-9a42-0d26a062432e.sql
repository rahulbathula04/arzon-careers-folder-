ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'viewer';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'analyst';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'exporter';

CREATE INDEX IF NOT EXISTS audit_log_actor_occurred_idx ON public.audit_log(actor_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS audit_log_action_occurred_idx ON public.audit_log(action, occurred_at DESC);
CREATE INDEX IF NOT EXISTS audit_log_occurred_idx ON public.audit_log(occurred_at DESC);

CREATE OR REPLACE FUNCTION public.log_admin_action(
  _action text,
  _resource text,
  _record_id text,
  _diff jsonb
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $fn$
DECLARE
  v_uid uuid := auth.uid();
  v_filter_hash text;
  v_id uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  IF NOT public.has_any_role(v_uid, ARRAY['admin','reviewer','support','viewer','analyst','exporter']::app_role[]) THEN
    RAISE EXCEPTION 'not authorized';
  END IF;
  IF _action IS NULL OR length(_action) = 0 OR length(_action) > 64 THEN
    RAISE EXCEPTION 'invalid action';
  END IF;

  IF _action LIKE '%_view' THEN
    v_filter_hash := md5(coalesce(_diff->>'filter_hash',''));
    IF EXISTS (
      SELECT 1 FROM public.audit_log
      WHERE actor_id = v_uid
        AND action = _action
        AND occurred_at > now() - interval '60 seconds'
        AND md5(coalesce(diff->>'filter_hash','')) = v_filter_hash
    ) THEN
      RETURN NULL;
    END IF;
  END IF;

  INSERT INTO public.audit_log(actor_id, table_name, record_id, action, diff)
  VALUES (v_uid, coalesce(_resource,'admin'), coalesce(_record_id,''), _action, coalesce(_diff,'{}'::jsonb))
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.log_admin_action(text, text, text, jsonb) TO authenticated;

CREATE OR REPLACE FUNCTION public.list_admin_activity(
  _action text DEFAULT NULL,
  _actor_id uuid DEFAULT NULL,
  _resource text DEFAULT NULL,
  _since timestamptz DEFAULT NULL,
  _limit int DEFAULT 500
) RETURNS TABLE(
  id uuid,
  occurred_at timestamptz,
  actor_id uuid,
  action text,
  table_name text,
  record_id text,
  diff jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $fn$
DECLARE v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  IF NOT public.has_role(v_uid, 'admin'::app_role) THEN RAISE EXCEPTION 'not authorized'; END IF;
  RETURN QUERY
    SELECT a.id, a.occurred_at, a.actor_id, a.action, a.table_name, a.record_id, a.diff
      FROM public.audit_log a
     WHERE (_action    IS NULL OR a.action = _action)
       AND (_actor_id  IS NULL OR a.actor_id = _actor_id)
       AND (_resource  IS NULL OR a.table_name = _resource)
       AND (_since     IS NULL OR a.occurred_at >= _since)
     ORDER BY a.occurred_at DESC
     LIMIT GREATEST(1, LEAST(coalesce(_limit, 500), 2000));
END;
$fn$;

GRANT EXECUTE ON FUNCTION public.list_admin_activity(text, uuid, text, timestamptz, int) TO authenticated;