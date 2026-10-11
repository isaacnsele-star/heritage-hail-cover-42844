CREATE SEQUENCE public.support_ref_seq START 1001;

CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_number text NOT NULL UNIQUE DEFAULT ('ZD-' || to_char(now(), 'YYMM') || '-' || nextval('public.support_ref_seq')::text),
  user_id uuid NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  category text NOT NULL,
  summary text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  escalated boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.support_tickets TO authenticated;
GRANT ALL ON public.support_tickets TO service_role;
GRANT USAGE ON SEQUENCE public.support_ref_seq TO authenticated, service_role;

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own tickets select" ON public.support_tickets FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own tickets insert" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own tickets update" ON public.support_tickets FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);