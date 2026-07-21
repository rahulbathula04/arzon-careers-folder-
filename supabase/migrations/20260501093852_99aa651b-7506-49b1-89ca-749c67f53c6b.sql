
-- =========================
-- 1. Applications table
-- =========================
CREATE TYPE public.application_status AS ENUM (
  'submitted','reviewing','shortlisted','rejected','accepted','enrolled','withdrawn'
);

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  -- applicant
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  whatsapp_optin boolean NOT NULL DEFAULT true,
  -- program
  program_slug text NOT NULL,
  program_name text,
  -- pipeline
  status public.application_status NOT NULL DEFAULT 'submitted',
  notes text,
  -- attribution
  lead_id uuid REFERENCES public.career_engine_leads(id) ON DELETE SET NULL,
  utm_source text,
  user_agent text,
  -- assigned reviewer
  assigned_to uuid
);

CREATE INDEX idx_applications_status     ON public.applications(status);
CREATE INDEX idx_applications_program    ON public.applications(program_slug);
CREATE INDEX idx_applications_created_at ON public.applications(created_at DESC);
CREATE INDEX idx_applications_email      ON public.applications(lower(email));

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view applications"
  ON public.applications FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','reviewer','support']::app_role[]));

CREATE POLICY "Admin and reviewer can update applications"
  ON public.applications FOR UPDATE TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','reviewer']::app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','reviewer']::app_role[]));

CREATE POLICY "Admin can delete applications"
  ON public.applications FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- No INSERT policy on purpose: inserts go through SECURITY DEFINER RPC.

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_applications_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER trg_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.touch_applications_updated_at();

-- =========================
-- 2. Application events (audit)
-- =========================
CREATE TABLE public.application_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  actor_id uuid,
  event_type text NOT NULL,
  from_status public.application_status,
  to_status public.application_status,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_app_events_app ON public.application_events(application_id, created_at DESC);

ALTER TABLE public.application_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view application events"
  ON public.application_events FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','reviewer','support']::app_role[]));

-- Trigger logs status changes
CREATE OR REPLACE FUNCTION public.log_application_status_change()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.application_events(application_id, actor_id, event_type, to_status)
    VALUES (NEW.id, NULL, 'created', NEW.status);
  ELSIF TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.application_events(application_id, actor_id, event_type, from_status, to_status)
    VALUES (NEW.id, auth.uid(), 'status_changed', OLD.status, NEW.status);
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_log_application_status
  AFTER INSERT OR UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.log_application_status_change();

REVOKE EXECUTE ON FUNCTION public.log_application_status_change() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.touch_applications_updated_at()  FROM PUBLIC;

-- =========================
-- 3. Submit application RPC (anonymous-safe, validated)
-- =========================
CREATE OR REPLACE FUNCTION public.submit_application(
  p_name text,
  p_email text,
  p_phone text,
  p_program_slug text,
  p_program_name text DEFAULT NULL,
  p_whatsapp_optin boolean DEFAULT true,
  p_lead_id uuid DEFAULT NULL,
  p_utm_source text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_id    uuid;
  v_name  text := trim(coalesce(p_name, ''));
  v_email text := lower(trim(coalesce(p_email, '')));
  v_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
  v_slug  text := lower(trim(coalesce(p_program_slug, '')));
BEGIN
  IF length(v_name)  < 2 OR length(v_name)  > 80  THEN RAISE EXCEPTION 'invalid name';  END IF;
  IF length(v_phone) < 10 OR length(v_phone) > 15 THEN RAISE EXCEPTION 'invalid phone'; END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(v_email) > 120 THEN
    RAISE EXCEPTION 'invalid email';
  END IF;
  IF length(v_slug) < 1 OR length(v_slug) > 80 THEN RAISE EXCEPTION 'invalid program'; END IF;

  INSERT INTO public.applications(
    name, email, phone, whatsapp_optin,
    program_slug, program_name, lead_id, utm_source, user_agent
  ) VALUES (
    v_name, v_email, v_phone, coalesce(p_whatsapp_optin, true),
    v_slug,
    nullif(left(coalesce(p_program_name, ''), 120), ''),
    p_lead_id,
    nullif(left(coalesce(p_utm_source, ''), 64), ''),
    nullif(left(coalesce(p_user_agent, ''), 256), '')
  ) RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.submit_application(text,text,text,text,text,boolean,uuid,text,text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.submit_application(text,text,text,text,text,boolean,uuid,text,text) TO anon, authenticated;

-- =========================
-- 4. Bootstrap super-admin on signup (rahulbathula04@gmail.com)
-- =========================
CREATE OR REPLACE FUNCTION public.bootstrap_super_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) = 'rahulbathula04@gmail.com' THEN
    INSERT INTO public.user_roles(user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_bootstrap_super_admin ON auth.users;
CREATE TRIGGER trg_bootstrap_super_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.bootstrap_super_admin();

-- If the super-admin already exists, grant immediately
INSERT INTO public.user_roles(user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE lower(email) = 'rahulbathula04@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
