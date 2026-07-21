
-- Certificates table: each row = one certificate listed in the showcase
CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  description text,
  image_url text,
  pdf_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published certificates"
ON public.certificates FOR SELECT
TO anon, authenticated
USING (is_published = true);

CREATE POLICY "Admins can view all certificates"
ON public.certificates FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert certificates"
ON public.certificates FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update certificates"
ON public.certificates FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete certificates"
ON public.certificates FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.touch_certificates_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER certificates_touch_updated_at
BEFORE UPDATE ON public.certificates
FOR EACH ROW EXECUTE FUNCTION public.touch_certificates_updated_at();

-- Storage bucket for certificate PDFs and sample images (public-readable)
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read certificate files"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'certificates');

CREATE POLICY "Admins can upload certificate files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update certificate files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete certificate files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'::app_role));
