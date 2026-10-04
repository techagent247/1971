CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (char_length(phone) <= 40),
  event_type text CHECK (char_length(event_type) <= 80),
  preferred_date text CHECK (char_length(preferred_date) <= 40),
  guests text CHECK (char_length(guests) <= 20),
  subject text CHECK (char_length(subject) <= 160),
  message text CHECK (char_length(message) <= 3000),
  source text NOT NULL DEFAULT 'contact' CHECK (source IN ('contact','chatbot')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.unanswered_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL CHECK (char_length(question) BETWEEN 1 AND 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.unanswered_questions TO anon, authenticated;
GRANT ALL ON public.unanswered_questions TO service_role;
ALTER TABLE public.unanswered_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log an unanswered question" ON public.unanswered_questions FOR INSERT TO anon, authenticated WITH CHECK (true);