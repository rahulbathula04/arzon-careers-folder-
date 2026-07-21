
DROP POLICY IF EXISTS "Anyone can submit a briefing request" ON public.briefing_requests;
CREATE POLICY "Public can submit a briefing request" ON public.briefing_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    work_email IS NOT NULL
    AND audience IN ('tpo','recruiter')
    AND length(org_name) > 0
    AND length(contact_name) > 0
  );

DROP POLICY IF EXISTS "Anyone can submit an artifact request" ON public.artifact_requests;
CREATE POLICY "Public can submit an artifact request" ON public.artifact_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    token IS NOT NULL
    AND expires_at > now()
    AND status = 'pending'
    AND length(candidate_ref) > 0
  );

DROP POLICY IF EXISTS "Anyone can log a verification event" ON public.verification_audit;
CREATE POLICY "Public can log a verification event" ON public.verification_audit
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    candidate_ref IS NOT NULL
    AND event_type IN ('id_generated','qr_scanned','rubric_viewed','artifact_unlocked','portfolio_viewed')
  );
