-- =========================================================================
-- Employer Console - Phase 1
-- Links employers to auth users, adds jobs + shortlists, and an
-- employer-facing RPC that appends evidence to the Verified Placement Ledger.
-- =========================================================================

-- ---------- Extend employers ----------
ALTER TABLE public.employers
  ADD COLUMN IF NOT EXISTS owner_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS employers_owner_user_id_idx ON public.employers (owner_user_id);

-- ---------- employer_members: link auth users → employer ----------
CREATE TABLE IF NOT EXISTS public.employer_members (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id  uuid NOT NULL REFERENCES public.employers(id) ON DELETE CASCADE,
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  member_role  text NOT NULL DEFAULT 'recruiter'
    CHECK (member_role IN ('owner','recruiter')),
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (employer_id, user_id)
);

CREATE INDEX IF NOT EXISTS employer_members_user_idx ON public.employer_members (user_id);
CREATE INDEX IF NOT EXISTS employer_members_employer_idx ON public.employer_members (employer_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.employer_members TO authenticated;
GRANT ALL ON public.employer_members TO service_role;

ALTER TABLE public.employer_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members read own links"
  ON public.employer_members FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage members"
  ON public.employer_members FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- ---------- Access helper: verified employer members only ----------
CREATE OR REPLACE FUNCTION public.has_employer_access(_user_id uuid, _employer_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  SELECT EXISTS (
    SELECT 1
      FROM public.employer_members m
      JOIN public.employers e ON e.id = m.employer_id
     WHERE m.user_id     = _user_id
       AND m.employer_id = _employer_id
       AND e.verified_at IS NOT NULL
  );
$fn$;

REVOKE ALL ON FUNCTION public.has_employer_access(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_employer_access(uuid, uuid) TO authenticated, service_role;

-- Returns the verified employers a user can act on. Used by the console loader.
CREATE OR REPLACE FUNCTION public.list_my_employers()
RETURNS TABLE (
  employer_id uuid,
  slug        text,
  name        text,
  logo_url    text,
  member_role text,
  verified_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  SELECT e.id, e.slug, e.name, e.logo_url, m.member_role, e.verified_at
    FROM public.employer_members m
    JOIN public.employers e ON e.id = m.employer_id
   WHERE m.user_id = auth.uid()
     AND e.verified_at IS NOT NULL
   ORDER BY e.name ASC;
$fn$;

REVOKE ALL ON FUNCTION public.list_my_employers() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_my_employers() TO authenticated, service_role;

-- ---------- employer_jobs ----------
CREATE TABLE IF NOT EXISTS public.employer_jobs (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id        uuid NOT NULL REFERENCES public.employers(id) ON DELETE CASCADE,
  program_slug       text NOT NULL,
  title              text NOT NULL,
  location           text NOT NULL,
  employment_type    text NOT NULL DEFAULT 'full_time'
    CHECK (employment_type IN ('full_time','contract','internship')),
  experience_min_yrs numeric(4,1) NOT NULL DEFAULT 0
    CHECK (experience_min_yrs >= 0 AND experience_min_yrs <= 40),
  experience_max_yrs numeric(4,1)
    CHECK (experience_max_yrs IS NULL OR (experience_max_yrs >= 0 AND experience_max_yrs <= 40)),
  salary_min_inr     integer
    CHECK (salary_min_inr IS NULL OR (salary_min_inr >= 0 AND salary_min_inr <= 100000000)),
  salary_max_inr     integer
    CHECK (salary_max_inr IS NULL OR (salary_max_inr >= 0 AND salary_max_inr <= 100000000)),
  description        text NOT NULL,
  skills             text[] NOT NULL DEFAULT ARRAY[]::text[],
  status             text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','open','closed','filled')),
  opens_at           timestamptz,
  closes_at          timestamptz,
  created_by         uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT employer_jobs_program_len CHECK (length(program_slug) BETWEEN 2 AND 80),
  CONSTRAINT employer_jobs_title_len   CHECK (length(title) BETWEEN 3 AND 160),
  CONSTRAINT employer_jobs_loc_len     CHECK (length(location) BETWEEN 2 AND 120),
  CONSTRAINT employer_jobs_desc_len    CHECK (length(description) BETWEEN 20 AND 8000),
  CONSTRAINT employer_jobs_skills_max  CHECK (array_length(skills, 1) IS NULL OR array_length(skills, 1) <= 30),
  CONSTRAINT employer_jobs_exp_order   CHECK (experience_max_yrs IS NULL OR experience_max_yrs >= experience_min_yrs),
  CONSTRAINT employer_jobs_sal_order   CHECK (salary_max_inr IS NULL OR salary_min_inr IS NULL OR salary_max_inr >= salary_min_inr),
  CONSTRAINT employer_jobs_window      CHECK (closes_at IS NULL OR opens_at IS NULL OR closes_at >= opens_at)
);

CREATE INDEX IF NOT EXISTS employer_jobs_employer_idx ON public.employer_jobs (employer_id);
CREATE INDEX IF NOT EXISTS employer_jobs_status_idx   ON public.employer_jobs (status);
CREATE INDEX IF NOT EXISTS employer_jobs_program_idx  ON public.employer_jobs (program_slug);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.employer_jobs TO authenticated;
GRANT ALL ON public.employer_jobs TO service_role;

ALTER TABLE public.employer_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employer members read own jobs"
  ON public.employer_jobs FOR SELECT TO authenticated
  USING (public.has_employer_access(auth.uid(), employer_id)
      OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Employer members write own jobs"
  ON public.employer_jobs FOR INSERT TO authenticated
  WITH CHECK (public.has_employer_access(auth.uid(), employer_id));

CREATE POLICY "Employer members update own jobs"
  ON public.employer_jobs FOR UPDATE TO authenticated
  USING (public.has_employer_access(auth.uid(), employer_id))
  WITH CHECK (public.has_employer_access(auth.uid(), employer_id));

CREATE POLICY "Employer members delete own drafts"
  ON public.employer_jobs FOR DELETE TO authenticated
  USING (public.has_employer_access(auth.uid(), employer_id) AND status = 'draft');

CREATE POLICY "Admins manage jobs"
  ON public.employer_jobs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.touch_employer_jobs_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $fn$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$fn$;

CREATE TRIGGER trg_employer_jobs_touch
BEFORE UPDATE ON public.employer_jobs
FOR EACH ROW EXECUTE FUNCTION public.touch_employer_jobs_updated_at();

-- ---------- job_shortlists ----------
CREATE TABLE IF NOT EXISTS public.job_shortlists (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id               uuid NOT NULL REFERENCES public.employer_jobs(id) ON DELETE CASCADE,
  employer_id          uuid NOT NULL REFERENCES public.employers(id) ON DELETE CASCADE,
  candidate_name       text NOT NULL,
  candidate_email      text,
  candidate_phone      text,
  candidate_ref        text,
  candidate_notes      text,
  status               text NOT NULL DEFAULT 'shortlisted'
    CHECK (status IN ('shortlisted','contacted','interviewing','offer_extended','hired','rejected')),
  status_changed_at    timestamptz NOT NULL DEFAULT now(),
  hired_at             timestamptz,
  placement_id         uuid REFERENCES public.placements(id) ON DELETE SET NULL,
  created_by           uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT shortlists_name_len  CHECK (length(candidate_name) BETWEEN 2 AND 120),
  CONSTRAINT shortlists_email_len CHECK (candidate_email IS NULL OR length(candidate_email) <= 160),
  CONSTRAINT shortlists_phone_len CHECK (candidate_phone IS NULL OR length(candidate_phone) <= 20),
  CONSTRAINT shortlists_ref_len   CHECK (candidate_ref IS NULL OR length(candidate_ref) BETWEEN 2 AND 80),
  CONSTRAINT shortlists_notes_len CHECK (candidate_notes IS NULL OR length(candidate_notes) <= 2000)
);

CREATE INDEX IF NOT EXISTS job_shortlists_job_idx      ON public.job_shortlists (job_id);
CREATE INDEX IF NOT EXISTS job_shortlists_employer_idx ON public.job_shortlists (employer_id);
CREATE INDEX IF NOT EXISTS job_shortlists_status_idx   ON public.job_shortlists (status);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_shortlists TO authenticated;
GRANT ALL ON public.job_shortlists TO service_role;

ALTER TABLE public.job_shortlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employer members read own shortlists"
  ON public.job_shortlists FOR SELECT TO authenticated
  USING (public.has_employer_access(auth.uid(), employer_id)
      OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Employer members insert own shortlists"
  ON public.job_shortlists FOR INSERT TO authenticated
  WITH CHECK (public.has_employer_access(auth.uid(), employer_id));

CREATE POLICY "Employer members update own shortlists"
  ON public.job_shortlists FOR UPDATE TO authenticated
  USING (public.has_employer_access(auth.uid(), employer_id))
  WITH CHECK (public.has_employer_access(auth.uid(), employer_id));

CREATE POLICY "Employer members delete own shortlists"
  ON public.job_shortlists FOR DELETE TO authenticated
  USING (public.has_employer_access(auth.uid(), employer_id));

CREATE POLICY "Admins manage shortlists"
  ON public.job_shortlists FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.touch_job_shortlists_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $fn$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.status_changed_at = now();
    IF NEW.status = 'hired' AND NEW.hired_at IS NULL THEN
      NEW.hired_at = now();
    END IF;
  END IF;
  NEW.updated_at = now();
  RETURN NEW;
END;
$fn$;

CREATE TRIGGER trg_job_shortlists_touch
BEFORE UPDATE ON public.job_shortlists
FOR EACH ROW EXECUTE FUNCTION public.touch_job_shortlists_updated_at();

-- ---------- Employer-submitted placement evidence ----------
-- Called by the console when a candidate is hired AND evidence has been
-- collected. Appends to the Verified Placement Ledger (unpublished, awaiting
-- admin verification via /admin/placements), links the shortlist row, and
-- flips shortlist status to 'hired'.
CREATE OR REPLACE FUNCTION public.employer_submit_placement_evidence(
  p_shortlist_id      uuid,
  p_evidence_source   text,
  p_evidence_ref      text,
  p_evidence_notes    text,
  p_role_title        text,
  p_city              text,
  p_month_start       date,
  p_salary_band_inr   text,
  p_candidate_ref     text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_uid          uuid := auth.uid();
  v_shortlist    public.job_shortlists%ROWTYPE;
  v_placement_id uuid;
  v_ref          text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;

  SELECT * INTO v_shortlist FROM public.job_shortlists WHERE id = p_shortlist_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'shortlist not found'; END IF;

  IF NOT public.has_employer_access(v_uid, v_shortlist.employer_id) THEN
    RAISE EXCEPTION 'not authorized for this employer';
  END IF;

  IF v_shortlist.placement_id IS NOT NULL THEN
    RAISE EXCEPTION 'evidence already submitted for this shortlist row';
  END IF;

  IF p_evidence_source NOT IN (
    'signed_offer_letter','employer_hr_email','payslip','joining_letter','linkedin_confirmation'
  ) THEN
    RAISE EXCEPTION 'invalid evidence_source';
  END IF;
  IF p_evidence_ref IS NULL OR length(trim(p_evidence_ref)) < 2 THEN
    RAISE EXCEPTION 'evidence_ref required';
  END IF;
  IF p_month_start IS NULL THEN RAISE EXCEPTION 'month_start required'; END IF;
  IF p_role_title IS NULL OR length(trim(p_role_title)) < 2 THEN
    RAISE EXCEPTION 'role_title required';
  END IF;
  IF p_city IS NULL OR length(trim(p_city)) < 2 THEN
    RAISE EXCEPTION 'city required';
  END IF;

  v_ref := COALESCE(nullif(trim(p_candidate_ref), ''), v_shortlist.candidate_ref, v_shortlist.candidate_name);

  INSERT INTO public.placements (
    employer_id, candidate_ref, role_title, city, month_start,
    salary_band_inr, evidence_source, evidence_ref, evidence_notes,
    verified_by, published
  ) VALUES (
    v_shortlist.employer_id,
    v_ref,
    trim(p_role_title),
    trim(p_city),
    date_trunc('month', p_month_start)::date,
    nullif(trim(coalesce(p_salary_band_inr, '')), ''),
    p_evidence_source::public.placement_evidence,
    trim(p_evidence_ref),
    nullif(trim(coalesce(p_evidence_notes, '')), ''),
    NULL,       -- verified_by set when admin approves
    false       -- pending admin verification
  )
  RETURNING id INTO v_placement_id;

  UPDATE public.job_shortlists
     SET placement_id = v_placement_id,
         status = 'hired',
         hired_at = COALESCE(hired_at, now()),
         status_changed_at = now(),
         updated_at = now()
   WHERE id = p_shortlist_id;

  RETURN v_placement_id;
END;
$fn$;

REVOKE ALL ON FUNCTION public.employer_submit_placement_evidence(uuid,text,text,text,text,text,date,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.employer_submit_placement_evidence(uuid,text,text,text,text,text,date,text,text) TO authenticated, service_role;
