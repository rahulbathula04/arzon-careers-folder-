
-- =========================
-- 1. Admin invites
-- =========================
CREATE TABLE public.admin_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  role public.app_role NOT NULL,
  token text NOT NULL UNIQUE,
  invited_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '14 days'),
  used_at timestamptz,
  used_by uuid
);
CREATE INDEX idx_admin_invites_email ON public.admin_invites(lower(email));
CREATE INDEX idx_admin_invites_token ON public.admin_invites(token);

ALTER TABLE public.admin_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage invites - select"
  ON public.admin_invites FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage invites - insert"
  ON public.admin_invites FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage invites - update"
  ON public.admin_invites FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage invites - delete"
  ON public.admin_invites FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Server-side RPC to validate a token (used by signup page)
CREATE OR REPLACE FUNCTION public.lookup_admin_invite(p_token text)
RETURNS TABLE(email text, role app_role, expires_at timestamptz, used boolean)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT email, role, expires_at, (used_at IS NOT NULL) AS used
    FROM public.admin_invites
   WHERE token = p_token
   LIMIT 1;
$$;
REVOKE EXECUTE ON FUNCTION public.lookup_admin_invite(text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.lookup_admin_invite(text) TO anon, authenticated;

-- Consume an invite (must be called by the authenticated user it was meant for)
CREATE OR REPLACE FUNCTION public.accept_admin_invite(p_token text)
RETURNS public.app_role
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_invite public.admin_invites%ROWTYPE;
  v_user_email text;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;

  SELECT * INTO v_invite FROM public.admin_invites WHERE token = p_token LIMIT 1;
  IF NOT FOUND                       THEN RAISE EXCEPTION 'invalid invite';     END IF;
  IF v_invite.used_at IS NOT NULL    THEN RAISE EXCEPTION 'invite already used'; END IF;
  IF v_invite.expires_at < now()     THEN RAISE EXCEPTION 'invite expired';     END IF;

  SELECT lower(email) INTO v_user_email FROM auth.users WHERE id = auth.uid();
  IF v_user_email IS NULL OR v_user_email <> lower(v_invite.email) THEN
    RAISE EXCEPTION 'invite is for a different email';
  END IF;

  INSERT INTO public.user_roles(user_id, role)
  VALUES (auth.uid(), v_invite.role)
  ON CONFLICT (user_id, role) DO NOTHING;

  UPDATE public.admin_invites
     SET used_at = now(), used_by = auth.uid()
   WHERE id = v_invite.id;

  RETURN v_invite.role;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.accept_admin_invite(text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.accept_admin_invite(text) TO authenticated;

-- =========================
-- 2. Payments (Razorpay)
-- =========================
CREATE TYPE public.payment_status AS ENUM ('created','authorized','captured','failed','refunded');

CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.applications(id) ON DELETE SET NULL,
  provider text NOT NULL DEFAULT 'razorpay',
  order_id text NOT NULL,
  payment_id text,
  signature text,
  amount_paise integer NOT NULL,
  currency text NOT NULL DEFAULT 'INR',
  status public.payment_status NOT NULL DEFAULT 'created',
  notes jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX uq_payments_order_id ON public.payments(order_id);
CREATE INDEX idx_payments_application ON public.payments(application_id);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view payments"
  ON public.payments FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','reviewer','support']::app_role[]));
-- No direct INSERT/UPDATE: server uses service role + signature verification.

CREATE TRIGGER trg_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.touch_applications_updated_at();

-- =========================
-- 3. Public media bucket (videos / large brand assets)
-- =========================
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can read media"   ON storage.objects;
DROP POLICY IF EXISTS "Admins can write media"  ON storage.objects;
DROP POLICY IF EXISTS "Admins can update media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete media" ON storage.objects;

CREATE POLICY "Public can read media"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'media');

CREATE POLICY "Admins can write media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::app_role));
