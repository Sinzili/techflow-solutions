-- Create products table
CREATE TABLE public.products (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category TEXT,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio items table
CREATE TABLE public.portfolio_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service prices table
CREATE TABLE public.service_prices (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    service_key TEXT NOT NULL UNIQUE,
    service_name TEXT NOT NULL,
    price_display TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_prices ENABLE ROW LEVEL SECURITY;

-- Create public read policies (anyone can view)
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view portfolio items" 
ON public.portfolio_items 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view service prices" 
ON public.service_prices 
FOR SELECT 
USING (true);

-- For now, allow public insert/update/delete for admin (we'll secure this later with auth)
CREATE POLICY "Allow all operations on products" 
ON public.products 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on portfolio items" 
ON public.portfolio_items 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on service prices" 
ON public.service_prices 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- Create storage policies for public access
CREATE POLICY "Anyone can view images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'images');

CREATE POLICY "Anyone can upload images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can update images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'images');

CREATE POLICY "Anyone can delete images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'images');

-- Insert default service prices
INSERT INTO public.service_prices (service_key, service_name, price_display) VALUES
('repair', 'Repair & Electrical', 'R750-1,500/hour'),
('upgrade', 'Smart Upgrade', 'Starting at R15,000'),
('security', 'AI Security', 'Starting at R25,000'),
('training', 'Training Courses', 'R2,999-4,999/course'),
('custom', 'Custom Project', 'Contact for quote');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at
BEFORE UPDATE ON public.portfolio_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_prices_updated_at
BEFORE UPDATE ON public.service_prices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();