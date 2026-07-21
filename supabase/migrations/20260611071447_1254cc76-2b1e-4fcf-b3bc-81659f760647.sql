-- 1) referral_codes: revoke partner PII from anon/authenticated so the public
--    SELECT policy cannot surface them, even via select=*.
REVOKE SELECT (referrer_phone, referrer_name) ON public.referral_codes FROM anon;
REVOKE SELECT (referrer_phone, referrer_name) ON public.referral_codes FROM authenticated;
REVOKE SELECT (referrer_phone, referrer_name) ON public.referral_codes FROM PUBLIC;
GRANT  SELECT (referrer_phone, referrer_name) ON public.referral_codes TO service_role;

-- 2) assessment_shares: hide the raw payload jsonb from public readers.
--    Named non-PII columns remain readable via the existing public SELECT policy.
REVOKE SELECT (payload) ON public.assessment_shares FROM anon;
REVOKE SELECT (payload) ON public.assessment_shares FROM authenticated;
REVOKE SELECT (payload) ON public.assessment_shares FROM PUBLIC;
GRANT  SELECT (payload) ON public.assessment_shares TO service_role;

-- 3) admin_invites: let admins delete used/expired invites so token rows can be pruned.
CREATE POLICY "Admins manage invites - delete"
  ON public.admin_invites
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
