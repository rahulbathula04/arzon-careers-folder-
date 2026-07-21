-- Cohorts table
CREATE TABLE public.cohorts (
  id text PRIMARY KEY,
  display_label text NOT NULL,
  starts_at timestamptz NOT NULL,
  lock_at timestamptz NOT NULL,
  seats_cap int NOT NULL CHECK (seats_cap > 0),
  seats_taken int NOT NULL DEFAULT 0 CHECK (seats_taken >= 0),
  is_locked boolean NOT NULL DEFAULT false,
  lock_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.cohorts TO anon, authenticated;
GRANT ALL ON public.cohorts TO service_role;

ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cohorts_public_read" ON public.cohorts
  FOR SELECT TO anon, authenticated USING (true);

CREATE TRIGGER cohorts_touch_updated_at
  BEFORE UPDATE ON public.cohorts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Audit log
CREATE TABLE public.cohort_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id text NOT NULL REFERENCES public.cohorts(id) ON DELETE CASCADE,
  actor_id uuid,
  action text NOT NULL CHECK (action IN ('capacity_change','lock','unlock','seat_claim','seat_release','reason_change')),
  before jsonb,
  after jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.cohort_audit_log TO authenticated;
GRANT ALL ON public.cohort_audit_log TO service_role;

ALTER TABLE public.cohort_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cohort_audit_admin_read" ON public.cohort_audit_log
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX cohort_audit_log_cohort_id_idx ON public.cohort_audit_log (cohort_id, occurred_at DESC);

-- Read RPC (public)
CREATE OR REPLACE FUNCTION public.get_cohort_status(p_id text)
RETURNS TABLE (
  id text,
  display_label text,
  starts_at timestamptz,
  lock_at timestamptz,
  seats_cap int,
  seats_taken int,
  seats_left int,
  is_locked boolean,
  lock_reason text,
  effective_locked boolean,
  server_now timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.id, c.display_label, c.starts_at, c.lock_at,
    c.seats_cap, c.seats_taken,
    GREATEST(0, c.seats_cap - c.seats_taken) AS seats_left,
    c.is_locked, c.lock_reason,
    (c.is_locked OR c.seats_taken >= c.seats_cap OR now() >= c.lock_at) AS effective_locked,
    now() AS server_now
  FROM public.cohorts c
  WHERE c.id = p_id;
$$;

GRANT EXECUTE ON FUNCTION public.get_cohort_status(text) TO anon, authenticated;

-- Atomic seat claim
CREATE OR REPLACE FUNCTION public.cohort_claim_seat(p_id text)
RETURNS int
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_new_taken int;
BEGIN
  UPDATE public.cohorts
     SET seats_taken = seats_taken + 1
   WHERE id = p_id
     AND is_locked = false
     AND seats_taken < seats_cap
     AND now() < lock_at
   RETURNING seats_taken INTO v_new_taken;

  IF v_new_taken IS NULL THEN
    RAISE EXCEPTION 'cohort_locked';
  END IF;

  INSERT INTO public.cohort_audit_log(cohort_id, actor_id, action, after)
  VALUES (p_id, auth.uid(), 'seat_claim', jsonb_build_object('seats_taken', v_new_taken));

  RETURN v_new_taken;
END;
$$;

GRANT EXECUTE ON FUNCTION public.cohort_claim_seat(text) TO service_role;

-- Release (refund)
CREATE OR REPLACE FUNCTION public.cohort_release_seat(p_id text)
RETURNS int
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_new_taken int;
BEGIN
  UPDATE public.cohorts
     SET seats_taken = GREATEST(0, seats_taken - 1)
   WHERE id = p_id
   RETURNING seats_taken INTO v_new_taken;

  IF v_new_taken IS NULL THEN
    RAISE EXCEPTION 'cohort not found';
  END IF;

  INSERT INTO public.cohort_audit_log(cohort_id, actor_id, action, after)
  VALUES (p_id, auth.uid(), 'seat_release', jsonb_build_object('seats_taken', v_new_taken));

  RETURN v_new_taken;
END;
$$;

GRANT EXECUTE ON FUNCTION public.cohort_release_seat(text) TO service_role;

-- Admin: set capacity
CREATE OR REPLACE FUNCTION public.admin_set_cohort_capacity(p_id text, p_cap int)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_before record;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  IF NOT public.has_role(v_uid, 'admin'::app_role) THEN RAISE EXCEPTION 'not authorized'; END IF;
  IF p_cap IS NULL OR p_cap < 1 OR p_cap > 10000 THEN RAISE EXCEPTION 'invalid capacity'; END IF;

  SELECT seats_cap, seats_taken INTO v_before FROM public.cohorts WHERE id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'cohort not found'; END IF;
  IF p_cap < v_before.seats_taken THEN
    RAISE EXCEPTION 'capacity cannot be less than seats already taken (%)', v_before.seats_taken;
  END IF;

  UPDATE public.cohorts SET seats_cap = p_cap WHERE id = p_id;

  INSERT INTO public.cohort_audit_log(cohort_id, actor_id, action, before, after)
  VALUES (p_id, v_uid, 'capacity_change',
    jsonb_build_object('seats_cap', v_before.seats_cap),
    jsonb_build_object('seats_cap', p_cap));
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_set_cohort_capacity(text, int) TO authenticated;

-- Admin: set lock
CREATE OR REPLACE FUNCTION public.admin_set_cohort_lock(p_id text, p_locked boolean, p_reason text DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_before record;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  IF NOT public.has_role(v_uid, 'admin'::app_role) THEN RAISE EXCEPTION 'not authorized'; END IF;

  SELECT is_locked, lock_reason INTO v_before FROM public.cohorts WHERE id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'cohort not found'; END IF;

  UPDATE public.cohorts
     SET is_locked = COALESCE(p_locked, is_locked),
         lock_reason = nullif(left(coalesce(p_reason, ''), 240), '')
   WHERE id = p_id;

  INSERT INTO public.cohort_audit_log(cohort_id, actor_id, action, before, after)
  VALUES (p_id, v_uid,
    CASE WHEN p_locked THEN 'lock' ELSE 'unlock' END,
    jsonb_build_object('is_locked', v_before.is_locked, 'lock_reason', v_before.lock_reason),
    jsonb_build_object('is_locked', p_locked, 'lock_reason', p_reason));
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_set_cohort_lock(text, boolean, text) TO authenticated;

-- Admin: list cohorts (full row)
CREATE OR REPLACE FUNCTION public.admin_list_cohorts()
RETURNS SETOF public.cohorts
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN RAISE EXCEPTION 'not authorized'; END IF;
  RETURN QUERY SELECT * FROM public.cohorts ORDER BY starts_at ASC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_list_cohorts() TO authenticated;

-- Admin: audit log fetch
CREATE OR REPLACE FUNCTION public.admin_cohort_audit(p_id text DEFAULT NULL, p_limit int DEFAULT 100)
RETURNS SETOF public.cohort_audit_log
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN RAISE EXCEPTION 'not authorized'; END IF;
  RETURN QUERY
    SELECT *
      FROM public.cohort_audit_log
     WHERE (p_id IS NULL OR cohort_id = p_id)
     ORDER BY occurred_at DESC
     LIMIT GREATEST(1, LEAST(coalesce(p_limit, 100), 500));
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_cohort_audit(text, int) TO authenticated;

-- Seed active cohort
INSERT INTO public.cohorts (id, display_label, starts_at, lock_at, seats_cap, seats_taken)
VALUES ('aug-2026', '30 July 2026', '2026-07-30T14:00:00+00:00', '2026-07-30T02:00:00+00:00', 60, 57)
ON CONFLICT (id) DO NOTHING;