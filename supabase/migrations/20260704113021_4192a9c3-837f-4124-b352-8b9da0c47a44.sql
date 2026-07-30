-- =========================================================================
-- Phase 1: Employer + Verified Placement Ledger
-- =========================================================================
-- Employers table: companies that have hired an Arzon candidate.
-- Placements table: append-only ledger of verified hires, each tied to
--   employer-signed evidence.
-- Public view: safe columns only, readable by anonymous visitors, powering
--   /placements. RLS on the base table blocks direct anon access to PII.
-- =========================================================================

-- ---------- employers ----------
CREATE TABLE public.employers (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text NOT NULL UNIQUE,
  name         text NOT NULL,
  website      text,
  logo_url     text,
  contact_email text,
  verified_at  timestamptz,
  notes        text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT employers_slug_len CHECK (length(slug) BETWEEN 2 AND 80),
  CONSTRAINT employers_name_len CHECK (length(name) BETWEEN 2 AND 160)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.employers TO authenticated;
GRANT ALL ON public.employers TO service_role;

ALTER TABLE public.employers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage employers"
  ON public.employers
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- ---------- placements (Verified Placement Ledger) ----------
-- Enum for evidence source - every entry MUST cite one.
CREATE TYPE public.placement_evidence AS ENUM (
  'signed_offer_letter',
  'employer_hr_email',
  'payslip',
  'joining_letter',
  'linkedin_confirmation'
);

CREATE TABLE public.placements (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id        uuid NOT NULL REFERENCES public.employers(id) ON DELETE RESTRICT,
  -- Anonymised candidate reference (e.g. initials + city) - we never expose
  -- full name on the public ledger without written consent.
  candidate_ref      text NOT NULL,
  candidate_user_id  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  role_title         text NOT NULL,
  city               text NOT NULL,
  -- month_start is the first-of-month the candidate joined. Publishing month
  -- (not exact date) protects candidate privacy while proving recency.
  month_start        date NOT NULL,
  salary_band_inr    text,
  evidence_source    public.placement_evidence NOT NULL,
  -- evidence_ref: internal pointer (storage path, HR name + email hash,
  -- LinkedIn URL). Never exposed publicly.
  evidence_ref       text NOT NULL,
  evidence_notes     text,
  verified_at        timestamptz NOT NULL DEFAULT now(),
  verified_by        uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  published          boolean NOT NULL DEFAULT true,
  retracted_at       timestamptz,
  retracted_reason   text,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT placements_candidate_ref_len CHECK (length(candidate_ref) BETWEEN 2 AND 80),
  CONSTRAINT placements_role_len CHECK (length(role_title) BETWEEN 2 AND 120),
  CONSTRAINT placements_city_len CHECK (length(city) BETWEEN 2 AND 80),
  CONSTRAINT placements_evidence_ref_len CHECK (length(evidence_ref) BETWEEN 2 AND 500)
);

CREATE INDEX placements_verified_at_idx ON public.placements (verified_at DESC);
CREATE INDEX placements_employer_id_idx ON public.placements (employer_id);
CREATE INDEX placements_published_idx ON public.placements (published) WHERE published = true;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.placements TO authenticated;
GRANT ALL ON public.placements TO service_role;

ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage placements"
  ON public.placements
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Candidates may read their own placement (for later "Passport" surface).
CREATE POLICY "Candidates read own placement"
  ON public.placements
  FOR SELECT
  TO authenticated
  USING (candidate_user_id = auth.uid());

-- updated_at triggers
CREATE OR REPLACE FUNCTION public.touch_employers_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $fn$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$fn$;

CREATE TRIGGER trg_employers_touch
BEFORE UPDATE ON public.employers
FOR EACH ROW EXECUTE FUNCTION public.touch_employers_updated_at();

CREATE OR REPLACE FUNCTION public.touch_placements_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $fn$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$fn$;

CREATE TRIGGER trg_placements_touch
BEFORE UPDATE ON public.placements
FOR EACH ROW EXECUTE FUNCTION public.touch_placements_updated_at();

-- ---------- Public view: safe columns only ----------
-- security_invoker = false (default): view runs with definer privileges, so
-- it bypasses the admin-only RLS on the base table but only exposes the
-- non-PII columns listed here. This is the source of truth for /placements.
CREATE VIEW public.verified_placements_public
WITH (security_invoker = false) AS
SELECT
  p.id,
  e.name        AS employer_name,
  e.slug        AS employer_slug,
  e.logo_url    AS employer_logo_url,
  p.candidate_ref,
  p.role_title,
  p.city,
  p.month_start,
  p.salary_band_inr,
  p.evidence_source,
  p.verified_at
FROM public.placements p
JOIN public.employers e ON e.id = p.employer_id
WHERE p.published = true
  AND p.retracted_at IS NULL
ORDER BY p.month_start DESC, p.verified_at DESC;

GRANT SELECT ON public.verified_placements_public TO anon, authenticated;
