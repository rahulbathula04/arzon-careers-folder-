REVOKE ALL ON FUNCTION public.expire_enrolment_coupon(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.expire_enrolment_coupon(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.expire_enrolment_coupon(uuid) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.expire_enrolment_coupon(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.expire_enrolment_coupon(uuid) TO postgres;