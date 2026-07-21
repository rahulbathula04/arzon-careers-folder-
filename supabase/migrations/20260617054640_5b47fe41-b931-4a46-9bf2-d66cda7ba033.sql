-- Arzon Moments: photo-stories of Arzon Global history.
-- Two tables: moments (story metadata) and moment_images (up to 10 per moment).

CREATE TABLE public.moments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  subtitle text,
  body text NOT NULL DEFAULT '',
  event_date date NOT NULL,
  location text,
  category text NOT NULL DEFAULT 'other',
  cover_image_id uuid,
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT moments_status_chk CHECK (status IN ('draft','published')),
  CONSTRAINT moments_category_chk CHECK (category IN ('launch','media','partnership','campus','team','other'))
);

GRANT SELECT ON public.moments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.moments TO authenticated;
GRANT ALL ON public.moments TO service_role;

ALTER TABLE public.moments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published moments are readable by anyone"
  ON public.moments FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins read all moments"
  ON public.moments FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins insert moments"
  ON public.moments FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update moments"
  ON public.moments FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete moments"
  ON public.moments FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER moments_set_updated_at
  BEFORE UPDATE ON public.moments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX moments_published_idx ON public.moments (status, event_date DESC);

-- moment_images

CREATE TABLE public.moment_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  moment_id uuid NOT NULL REFERENCES public.moments(id) ON DELETE CASCADE,
  storage_path text NOT NULL,
  alt text NOT NULL DEFAULT '',
  caption text,
  width int,
  height int,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.moment_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.moment_images TO authenticated;
GRANT ALL ON public.moment_images TO service_role;

ALTER TABLE public.moment_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Images of published moments are readable by anyone"
  ON public.moment_images FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.moments m
     WHERE m.id = moment_id AND m.status = 'published'
  ));

CREATE POLICY "Admins read all moment images"
  ON public.moment_images FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins insert moment images"
  ON public.moment_images FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update moment images"
  ON public.moment_images FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete moment images"
  ON public.moment_images FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX moment_images_moment_idx ON public.moment_images (moment_id, position);

-- Cap at 10 images per moment via trigger (avoids time-sensitive CHECK).
CREATE OR REPLACE FUNCTION public.enforce_moment_image_cap()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE v_count int;
BEGIN
  SELECT count(*) INTO v_count FROM public.moment_images WHERE moment_id = NEW.moment_id;
  IF v_count >= 10 THEN
    RAISE EXCEPTION 'A moment can have at most 10 images';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER moment_images_cap
  BEFORE INSERT ON public.moment_images
  FOR EACH ROW EXECUTE FUNCTION public.enforce_moment_image_cap();

-- FK from moments.cover_image_id (added now that moment_images exists).
ALTER TABLE public.moments
  ADD CONSTRAINT moments_cover_image_fk
  FOREIGN KEY (cover_image_id) REFERENCES public.moment_images(id) ON DELETE SET NULL;

-- Storage RLS for the arzon-moments bucket (bucket itself created via tool).
-- Public read; admin-only write.
CREATE POLICY "Public can read arzon-moments objects"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'arzon-moments');

CREATE POLICY "Admins can upload arzon-moments objects"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'arzon-moments' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update arzon-moments objects"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'arzon-moments' AND public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (bucket_id = 'arzon-moments' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete arzon-moments objects"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'arzon-moments' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Seed a single placeholder moment for the launch event (image added later from admin).
INSERT INTO public.moments (slug, title, subtitle, body, event_date, location, category, status, published_at)
VALUES (
  'launch-hyderabad-2025',
  'Arzon Global Launch · Hyderabad',
  'Inaugurated by Dr Srikanth Sinha (CEO, TASK) with Pradeep sir',
  'On 30 July 2025 we opened our Hyderabad office. Dr Srikanth Sinha, CEO of TASK (Telangana Academy for Skill and Knowledge), inaugurated the office alongside Pradeep sir as chief guest. Photos from the ceremony will be added here.',
  '2025-07-30',
  'Hyderabad, Telangana',
  'launch',
  'published',
  now()
);