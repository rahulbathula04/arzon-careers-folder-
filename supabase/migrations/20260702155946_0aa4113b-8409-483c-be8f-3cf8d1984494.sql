REVOKE EXECUTE ON FUNCTION public.provision_enrolment_from_intent(UUID, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.link_enrolments_on_signup() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.provision_enrolment_from_intent(UUID, TEXT) TO service_role;