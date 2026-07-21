
CREATE TABLE public.gsc_settings (
  id smallint PRIMARY KEY DEFAULT 1,
  site_url text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid,
  CONSTRAINT gsc_settings_singleton CHECK (id = 1)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.gsc_settings TO authenticated;
GRANT ALL ON public.gsc_settings TO service_role;

ALTER TABLE public.gsc_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read gsc_settings"
  ON public.gsc_settings FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upsert gsc_settings"
  ON public.gsc_settings FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.gsc_settings (id, site_url) VALUES (1, 'https://arzoncareers.in/')
ON CONFLICT (id) DO NOTHING;
