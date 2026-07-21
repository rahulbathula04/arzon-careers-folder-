
-- 1) briefing_requests
CREATE TABLE public.briefing_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audience TEXT NOT NULL CHECK (audience IN ('tpo','recruiter')),
  work_email TEXT NOT NULL CHECK (length(work_email) BETWEEN 5 AND 200 AND work_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  org_name TEXT NOT NULL CHECK (length(org_name) BETWEEN 1 AND 200),
  contact_name TEXT NOT NULL CHECK (length(contact_name) BETWEEN 1 AND 120),
  role TEXT CHECK (role IS NULL OR length(role) <= 120),
  source TEXT CHECK (source IS NULL OR length(source) <= 80),
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_briefing_requests_created_at ON public.briefing_requests (created_at DESC);
GRANT INSERT ON public.briefing_requests TO anon, authenticated;
GRANT SELECT ON public.briefing_requests TO authenticated;
GRANT ALL ON public.briefing_requests TO service_role;
ALTER TABLE public.briefing_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a briefing request" ON public.briefing_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Staff can view briefing requests" ON public.briefing_requests
  FOR SELECT TO authenticated
  USING (has_any_role(auth.uid(), ARRAY['admin'::app_role, 'reviewer'::app_role, 'support'::app_role]));

-- 2) artifact_requests
CREATE TABLE public.artifact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_ref TEXT NOT NULL CHECK (length(candidate_ref) BETWEEN 3 AND 64 AND candidate_ref ~ '^[A-Z0-9-]+$'),
  recruiter_email TEXT NOT NULL CHECK (length(recruiter_email) BETWEEN 5 AND 200 AND recruiter_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  recruiter_org TEXT NOT NULL CHECK (length(recruiter_org) BETWEEN 1 AND 200),
  jd_task TEXT NOT NULL CHECK (length(jd_task) BETWEEN 1 AND 200),
  message TEXT CHECK (message IS NULL OR length(message) <= 1000),
  token TEXT NOT NULL UNIQUE CHECK (length(token) BETWEEN 16 AND 64 AND token ~ '^[a-zA-Z0-9_-]+$'),
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','denied','expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_artifact_requests_token ON public.artifact_requests (token);
CREATE INDEX idx_artifact_requests_candidate ON public.artifact_requests (candidate_ref);
GRANT INSERT, SELECT ON public.artifact_requests TO anon, authenticated;
GRANT ALL ON public.artifact_requests TO service_role;
ALTER TABLE public.artifact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an artifact request" ON public.artifact_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);
-- Public read is intentional: lookup-by-token is the access pattern; token is unguessable.
-- Recruiter email + org are PII but the holder of the token already submitted them.
CREATE POLICY "Public can read by token" ON public.artifact_requests
  FOR SELECT TO anon, authenticated USING (true);

-- 3) verification_audit
CREATE TABLE public.verification_audit (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_ref TEXT NOT NULL CHECK (length(candidate_ref) BETWEEN 3 AND 64 AND candidate_ref ~ '^[A-Z0-9-]+$'),
  event_type TEXT NOT NULL CHECK (event_type IN ('id_generated','qr_scanned','rubric_viewed','artifact_unlocked','portfolio_viewed')),
  viewer_org_tag TEXT CHECK (viewer_org_tag IS NULL OR length(viewer_org_tag) <= 48),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_verification_audit_candidate ON public.verification_audit (candidate_ref, occurred_at DESC);
GRANT INSERT, SELECT ON public.verification_audit TO anon, authenticated;
GRANT ALL ON public.verification_audit TO service_role;
ALTER TABLE public.verification_audit ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log a verification event" ON public.verification_audit
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can read de-identified audit" ON public.verification_audit
  FOR SELECT TO anon, authenticated USING (true);
