
-- Shared updated_at helper (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Enums
DO $$ BEGIN CREATE TYPE public.demand_track_status AS ENUM ('voting','building','live');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.demand_milestone_status AS ENUM ('pending','in_progress','done');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.demand_partner_type AS ENUM ('mentor','internship');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE public.demand_reservation_status AS ENUM ('pending','paid','refunded','waived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Tables
CREATE TABLE IF NOT EXISTS public.demand_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  pitch TEXT,
  status public.demand_track_status NOT NULL DEFAULT 'voting',
  votes_count INTEGER NOT NULL DEFAULT 0,
  vote_threshold INTEGER NOT NULL DEFAULT 25,
  founding_cap INTEGER NOT NULL DEFAULT 25,
  founding_filled INTEGER NOT NULL DEFAULT 0,
  eta_days INTEGER NOT NULL DEFAULT 30,
  build_started_at TIMESTAMPTZ,
  launch_eta DATE,
  live_course_slug TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.demand_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES public.demand_tracks(id) ON DELETE CASCADE,
  user_id UUID,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  experience_level TEXT,
  why TEXT,
  verified_at TIMESTAMPTZ,
  reservation_status public.demand_reservation_status NOT NULL DEFAULT 'pending',
  amount_inr INTEGER NOT NULL DEFAULT 499,
  is_founding BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (track_id, phone)
);

CREATE TABLE IF NOT EXISTS public.demand_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES public.demand_tracks(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  status public.demand_milestone_status NOT NULL DEFAULT 'pending',
  order_index INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.demand_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES public.demand_tracks(id) ON DELETE CASCADE,
  type public.demand_partner_type NOT NULL,
  name TEXT NOT NULL,
  logo_url TEXT,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_demand_votes_track ON public.demand_votes(track_id);
CREATE INDEX IF NOT EXISTS idx_demand_milestones_track ON public.demand_milestones(track_id, order_index);
CREATE INDEX IF NOT EXISTS idx_demand_partners_track ON public.demand_partners(track_id);

CREATE OR REPLACE VIEW public.demand_vote_counts AS
SELECT track_id, COUNT(*)::INTEGER AS verified_count
FROM public.demand_votes
WHERE verified_at IS NOT NULL
GROUP BY track_id;

ALTER TABLE public.demand_tracks     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demand_votes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demand_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demand_partners   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read demand tracks" ON public.demand_tracks
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage demand tracks" ON public.demand_tracks
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Anyone can read milestones" ON public.demand_milestones
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage milestones" ON public.demand_milestones
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Anyone can read partners" ON public.demand_partners
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage partners" ON public.demand_partners
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Anyone can submit a vote" ON public.demand_votes
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Users can read their own vote" ON public.demand_votes
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Staff can read all votes" ON public.demand_votes
  FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin'::public.app_role, 'reviewer'::public.app_role]));
CREATE POLICY "Admins update votes" ON public.demand_votes
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins delete votes" ON public.demand_votes
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.demand_recount_and_promote()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_count INTEGER;
  v_track public.demand_tracks%ROWTYPE;
BEGIN
  SELECT * INTO v_track FROM public.demand_tracks WHERE id = COALESCE(NEW.track_id, OLD.track_id);
  IF v_track IS NULL THEN RETURN NEW; END IF;

  SELECT COUNT(*) INTO v_count FROM public.demand_votes
    WHERE track_id = v_track.id AND verified_at IS NOT NULL;

  UPDATE public.demand_tracks SET votes_count = v_count, updated_at = now() WHERE id = v_track.id;

  IF v_track.status = 'voting' AND v_count >= v_track.vote_threshold THEN
    UPDATE public.demand_tracks
      SET status = 'building',
          build_started_at = COALESCE(build_started_at, now()),
          launch_eta = COALESCE(launch_eta, (now() + (eta_days || ' days')::interval)::date),
          updated_at = now()
      WHERE id = v_track.id AND status = 'voting';

    IF NOT EXISTS (SELECT 1 FROM public.demand_milestones WHERE track_id = v_track.id) THEN
      INSERT INTO public.demand_milestones (track_id, label, status, order_index) VALUES
        (v_track.id, 'Curriculum architecture',  'in_progress', 1),
        (v_track.id, 'Mentor acquisition',       'pending',     2),
        (v_track.id, 'Assessment engine',        'pending',     3),
        (v_track.id, 'Internship workflow',      'pending',     4),
        (v_track.id, 'Verification system',      'pending',     5);
    END IF;
  END IF;

  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_demand_votes_recount ON public.demand_votes;
CREATE TRIGGER trg_demand_votes_recount
AFTER INSERT OR UPDATE OR DELETE ON public.demand_votes
FOR EACH ROW EXECUTE FUNCTION public.demand_recount_and_promote();

DROP TRIGGER IF EXISTS trg_demand_tracks_updated ON public.demand_tracks;
CREATE TRIGGER trg_demand_tracks_updated
BEFORE UPDATE ON public.demand_tracks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_demand_milestones_updated ON public.demand_milestones;
CREATE TRIGGER trg_demand_milestones_updated
BEFORE UPDATE ON public.demand_milestones
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
