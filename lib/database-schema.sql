-- Basmati Web Database Schema for Supabase
-- Run these commands in your Supabase SQL editor to set up the database

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    unit TEXT,
    description TEXT,
    image_url TEXT,
    in_stock BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sales flyers table
CREATE TABLE IF NOT EXISTS public.sales_flyers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_url TEXT NOT NULL,
    upload_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_flyers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for products table
CREATE POLICY "Anyone can view products" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON public.products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for sales_flyers table
CREATE POLICY "Anyone can view sales flyers" ON public.sales_flyers
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage sales flyers" ON public.sales_flyers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
    ('product-images', 'product-images', true),
    ('flyer-images', 'flyer-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view product images" ON storage.objects
    FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'product-images' AND 
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Anyone can view flyer images" ON storage.objects
    FOR SELECT USING (bucket_id = 'flyer-images');

CREATE POLICY "Admins can upload flyer images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'flyer-images' AND 
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_sales_flyers_updated_at
    BEFORE UPDATE ON public.sales_flyers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample data
INSERT INTO public.products (name, category, price, unit, description, image_url, featured) VALUES
    ('Basmati Rice Premium', 'rice', 12.99, 'kg', 'Premium quality aged basmati rice from India', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', true),
    ('Turmeric Powder', 'spices', 4.99, '100g', 'Pure turmeric powder with anti-inflammatory properties', 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80', true),
    ('Red Lentils (Masoor Dal)', 'lentils', 6.99, 'kg', 'High protein red lentils, perfect for dal and curries', 'https://images.unsplash.com/photo-1596040033229-a0b34b36b1ec?w=400&q=80', true),
    ('Samosa (Frozen)', 'frozen', 8.99, 'pack', 'Authentic frozen samosas, ready to fry', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80', false),
    ('Mango Lassi', 'beverages', 3.99, 'bottle', 'Refreshing mango yogurt drink', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80', false),
    ('Garam Masala', 'spices', 5.99, '50g', 'Aromatic blend of ground spices', 'https://images.unsplash.com/photo-1596040033229-a0b34b36b1ec?w=400&q=80', true)
ON CONFLICT DO NOTHING;