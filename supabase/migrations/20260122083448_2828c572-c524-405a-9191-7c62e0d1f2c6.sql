-- Create training_programs table
CREATE TABLE public.training_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  duration TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view training programs"
  ON public.training_programs
  FOR SELECT
  USING (true);

-- Public write access (for admin - will secure later with auth)
CREATE POLICY "Allow all operations on training programs"
  ON public.training_programs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Add timestamp trigger
CREATE TRIGGER update_training_programs_updated_at
  BEFORE UPDATE ON public.training_programs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default training programs
INSERT INTO public.training_programs (title, price, duration, features, sort_order) VALUES
  ('Beginner Track', 'R2,999', '4 Weeks', ARRAY['Arduino Basics', 'Sensor Integration', 'Simple Projects', 'Certificate Included'], 1),
  ('Advanced IoT', 'R4,999', '6 Weeks', ARRAY['Cloud Integration', 'Mobile App Control', 'AI Camera Systems', 'Project Mentorship'], 2),
  ('Corporate Training', 'Custom', 'Flexible', ARRAY['Team Workshops', 'Custom Curriculum', 'On-site Training', 'Ongoing Support'], 3);