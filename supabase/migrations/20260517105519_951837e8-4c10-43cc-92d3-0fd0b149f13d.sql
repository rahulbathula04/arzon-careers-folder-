CREATE TABLE public.arzonprime60_waitlist (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL,
  name text,
  phone text,
  tier text,
  intent_id uuid,
  lead_id uuid,
  session_id uuid,
  reason text NOT NULL DEFAULT 'reminder' CHECK (reason IN ('reminder','early_access')),
  source text,
  notified_at timestamptz,
  user_agent text
);

CREATE INDEX arzonprime60_waitlist_email_idx ON public.arzonprime60_waitlist (lower(email));
CREATE INDEX arzonprime60_waitlist_created_at_idx ON public.arzonprime60_waitlist (created_at DESC);

ALTER TABLE public.arzonprime60_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the prime60 waitlist"
  ON public.arzonprime60_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Staff can view prime60 waitlist"
  ON public.arzonprime60_waitlist
  FOR SELECT
  TO authenticated
  USING (has_any_role(auth.uid(), ARRAY['admin'::app_role, 'reviewer'::app_role, 'support'::app_role]));