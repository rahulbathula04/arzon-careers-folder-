-- Fix critical RLS leak: artifact_requests was readable in full by anon (recruiter PII + bearer tokens).
-- Replace the open SELECT policy with a SECURITY DEFINER RPC that returns only the row matching the token.

DROP POLICY IF EXISTS "Public can read by token" ON public.artifact_requests;

-- Admin SELECT still allowed via existing has_role-based policies if any; (re-)add an admin SELECT explicitly.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='artifact_requests' AND policyname='Admins can read all artifact requests'
  ) THEN
    EXECUTE 'CREATE POLICY "Admins can read all artifact requests" ON public.artifact_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), ''admin''::app_role))';
  END IF;
END$$;

CREATE OR REPLACE FUNCTION public.get_artifact_request_by_token(p_token text)
RETURNS TABLE (
  id uuid,
  candidate_ref text,
  recruiter_email text,
  recruiter_org text,
  jd_task text,
  status text,
  expires_at timestamptz,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT a.id, a.candidate_ref, a.recruiter_email, a.recruiter_org, a.jd_task, a.status, a.expires_at, a.created_at
    FROM public.artifact_requests a
   WHERE a.token = p_token
     AND p_token IS NOT NULL
     AND length(p_token) >= 16
   LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_artifact_request_by_token(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_artifact_request_by_token(text) TO anon, authenticated;