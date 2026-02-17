
-- Create services table for dynamic service management
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Wrench',
  items TEXT[] NOT NULL DEFAULT '{}'::text[],
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);

-- Allow all operations (admin - no auth yet)
CREATE POLICY "Allow all operations on services" ON public.services FOR ALL USING (true) WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with existing hardcoded data
INSERT INTO public.services (title, icon_name, items, sort_order) VALUES
  ('Repair & Electrical', 'Wrench', ARRAY['Appliance & TV Repair', 'Electrical Installations', 'Maintenance Services', 'Emergency Fixes', 'Warranty Support'], 0),
  ('Home Automation & IoT', 'Home', ARRAY['Smart Home/Business Setup', 'Smart Locks & Access Control', 'Smart Cameras & Monitoring', 'IoT Sensor Networks', 'Cloud Integration'], 1),
  ('AI Security & Cloud', 'Shield', ARRAY['CCTV & Biometric Systems', 'AI Human/Vehicle Detection', 'Smart Alarm Systems', 'Cloud Dashboards', 'Custom Monitoring Websites'], 2),
  ('Software & Web Development', 'LaptopMinimal', ARRAY['Custom Business Software', 'Website Design & Development', 'Mobile App Development', 'E-commerce Solutions', 'API & System Integration'], 3);
