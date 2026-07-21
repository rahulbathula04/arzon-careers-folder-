
CREATE TABLE public.counsellor_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact text NOT NULL,
  contact_type text NOT NULL CHECK (contact_type IN ('email','phone')),
  source text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  contacted_at timestamptz,
  contacted_by uuid
);

ALTER TABLE public.counsellor_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a counsellor lead"
ON public.counsellor_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 120
  AND length(contact) BETWEEN 3 AND 200
);

CREATE POLICY "Staff can view counsellor leads"
ON public.counsellor_leads
FOR SELECT
TO authenticated
USING (has_any_role(auth.uid(), ARRAY['admin'::app_role, 'reviewer'::app_role, 'support'::app_role]));

CREATE POLICY "Staff can update counsellor leads"
ON public.counsellor_leads
FOR UPDATE
TO authenticated
USING (has_any_role(auth.uid(), ARRAY['admin'::app_role, 'reviewer'::app_role, 'support'::app_role]))
WITH CHECK (has_any_role(auth.uid(), ARRAY['admin'::app_role, 'reviewer'::app_role, 'support'::app_role]));

CREATE INDEX idx_counsellor_leads_created_at ON public.counsellor_leads (created_at DESC);
