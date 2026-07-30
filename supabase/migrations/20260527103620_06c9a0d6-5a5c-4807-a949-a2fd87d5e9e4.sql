
-- ============================================================
-- Phase 1: Soft delete + audit log foundation
-- ============================================================

-- 1. Add deleted_at / deleted_by to high-value tables
DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'applications','career_engine_leads','enrolment_intents','counsellor_leads',
    'arzonprime60_waitlist','demand_votes','certificates','admin_invites',
    'user_roles','course_thumbnail_overrides'
  ]) LOOP
    EXECUTE format('ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS deleted_at timestamptz', t);
    EXECUTE format('ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS deleted_by uuid', t);
    EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON public.%I (deleted_at) WHERE deleted_at IS NULL',
                   'idx_' || t || '_not_deleted', t);
  END LOOP;
END $$;

-- 2. Rewrite SELECT policies so non-admin staff only see live rows.
--    Admins keep full visibility (so they can restore).

-- applications
DROP POLICY IF EXISTS "Staff can view applications" ON public.applications;
CREATE POLICY "Staff can view applications" ON public.applications FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR (has_any_role(auth.uid(), ARRAY['reviewer'::app_role,'support'::app_role]) AND deleted_at IS NULL)
  );

-- career_engine_leads
DROP POLICY IF EXISTS "Staff can view leads" ON public.career_engine_leads;
CREATE POLICY "Staff can view leads" ON public.career_engine_leads FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR (has_any_role(auth.uid(), ARRAY['reviewer'::app_role,'support'::app_role]) AND deleted_at IS NULL)
  );

-- enrolment_intents
DROP POLICY IF EXISTS "Staff can view enrolment intents" ON public.enrolment_intents;
CREATE POLICY "Staff can view enrolment intents" ON public.enrolment_intents FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR (has_any_role(auth.uid(), ARRAY['reviewer'::app_role,'support'::app_role]) AND deleted_at IS NULL)
  );

-- counsellor_leads
DROP POLICY IF EXISTS "Staff can view counsellor leads" ON public.counsellor_leads;
CREATE POLICY "Staff can view counsellor leads" ON public.counsellor_leads FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR (has_any_role(auth.uid(), ARRAY['reviewer'::app_role,'support'::app_role]) AND deleted_at IS NULL)
  );

-- arzonprime60_waitlist
DROP POLICY IF EXISTS "Staff can view prime60 waitlist" ON public.arzonprime60_waitlist;
CREATE POLICY "Staff can view prime60 waitlist" ON public.arzonprime60_waitlist FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR (has_any_role(auth.uid(), ARRAY['reviewer'::app_role,'support'::app_role]) AND deleted_at IS NULL)
  );

-- demand_votes (staff read)
DROP POLICY IF EXISTS "Staff can read all votes" ON public.demand_votes;
CREATE POLICY "Staff can read all votes" ON public.demand_votes FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR (has_role(auth.uid(), 'reviewer'::app_role) AND deleted_at IS NULL)
  );

-- certificates: public users see only published & not deleted
DROP POLICY IF EXISTS "Anyone can view published certificates" ON public.certificates;
CREATE POLICY "Anyone can view published certificates" ON public.certificates FOR SELECT TO anon, authenticated
  USING (is_published = true AND deleted_at IS NULL);

-- admin_invites, user_roles, course_thumbnail_overrides:
-- existing SELECT policies are admin-only or public/all-rows - admins should
-- continue to see deleted rows so they can restore. Leave SELECT alone.

-- 3. Replace DELETE policies with archive (UPDATE) discipline.
--    Hard-delete from the app is removed; service_role retains it for backups/migrations.

-- applications: drop the hard-delete admin policy
DROP POLICY IF EXISTS "Admin can delete applications" ON public.applications;

-- certificates
DROP POLICY IF EXISTS "Admins can delete certificates" ON public.certificates;

-- user_roles
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;

-- admin_invites
DROP POLICY IF EXISTS "Admins manage invites - delete" ON public.admin_invites;

-- demand_votes
DROP POLICY IF EXISTS "Admins delete votes" ON public.demand_votes;

-- course_thumbnail_overrides
DROP POLICY IF EXISTS "Admins can delete thumbnail overrides" ON public.course_thumbnail_overrides;

-- 4. Audit log
CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  actor_id uuid,
  table_name text NOT NULL,
  record_id text NOT NULL,
  action text NOT NULL CHECK (action IN ('insert','update','archive','restore','hard_delete')),
  diff jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON public.audit_log (table_name, record_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_occurred_at ON public.audit_log (occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_actor ON public.audit_log (actor_id, occurred_at DESC);

GRANT SELECT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read audit log" ON public.audit_log FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
-- No INSERT/UPDATE/DELETE policy → trigger-only writes via service_role / SECURITY DEFINER.

-- 5. Generic audit trigger function
CREATE OR REPLACE FUNCTION public.fn_audit_row()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $fn$
DECLARE
  v_action text;
  v_record_id text;
  v_diff jsonb;
  v_actor uuid := auth.uid();
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_action := 'insert';
    v_record_id := COALESCE(NEW.id::text, '');
    v_diff := jsonb_build_object('after', to_jsonb(NEW));
  ELSIF TG_OP = 'DELETE' THEN
    v_action := 'hard_delete';
    v_record_id := COALESCE(OLD.id::text, '');
    v_diff := jsonb_build_object('before', to_jsonb(OLD));
  ELSE -- UPDATE
    v_record_id := COALESCE(NEW.id::text, OLD.id::text, '');
    IF OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL THEN
      v_action := 'archive';
    ELSIF OLD.deleted_at IS NOT NULL AND NEW.deleted_at IS NULL THEN
      v_action := 'restore';
    ELSE
      v_action := 'update';
    END IF;
    v_diff := jsonb_build_object('before', to_jsonb(OLD), 'after', to_jsonb(NEW));
  END IF;

  INSERT INTO public.audit_log (actor_id, table_name, record_id, action, diff)
  VALUES (v_actor, TG_TABLE_NAME, v_record_id, v_action, v_diff);

  RETURN COALESCE(NEW, OLD);
EXCEPTION WHEN OTHERS THEN
  -- never let auditing break the underlying write
  RAISE LOG 'audit_log_failed | table=% op=% err=%', TG_TABLE_NAME, TG_OP, SQLERRM;
  RETURN COALESCE(NEW, OLD);
END;
$fn$;

-- 6. Attach trigger to the same 10 tables
DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'applications','career_engine_leads','enrolment_intents','counsellor_leads',
    'arzonprime60_waitlist','demand_votes','certificates','admin_invites',
    'user_roles','course_thumbnail_overrides'
  ]) LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_audit_%I ON public.%I', t, t);
    EXECUTE format(
      'CREATE TRIGGER trg_audit_%I AFTER INSERT OR UPDATE OR DELETE ON public.%I
         FOR EACH ROW EXECUTE FUNCTION public.fn_audit_row()',
      t, t
    );
  END LOOP;
END $$;
