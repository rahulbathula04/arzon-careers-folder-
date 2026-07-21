
ALTER TABLE public.briefing_requests
  ADD COLUMN IF NOT EXISTS year text,
  ADD COLUMN IF NOT EXISTS domain text,
  ADD COLUMN IF NOT EXISTS consent_given boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_at timestamptz;

ALTER TABLE public.briefing_requests
  DROP CONSTRAINT IF EXISTS briefing_requests_year_check;
ALTER TABLE public.briefing_requests
  ADD CONSTRAINT briefing_requests_year_check
  CHECK (year IS NULL OR length(year) <= 32);

ALTER TABLE public.briefing_requests
  DROP CONSTRAINT IF EXISTS briefing_requests_domain_check;
ALTER TABLE public.briefing_requests
  ADD CONSTRAINT briefing_requests_domain_check
  CHECK (domain IS NULL OR length(domain) <= 80);

DROP POLICY IF EXISTS "Public can submit a briefing request" ON public.briefing_requests;
CREATE POLICY "Public can submit a briefing request"
  ON public.briefing_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    work_email IS NOT NULL
    AND audience = ANY (ARRAY['tpo'::text, 'recruiter'::text])
    AND length(org_name) > 0
    AND length(contact_name) > 0
    AND consent_given = true
  );
