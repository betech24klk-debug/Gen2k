-- Supabase Database Schema for Portfolio Gallery
-- Run this in Supabase SQL Editor to create tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(255) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    thumbnail TEXT,
    image_count INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Images Table
CREATE TABLE IF NOT EXISTS project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    caption TEXT,
    orientation VARCHAR(50) DEFAULT 'landscape',
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50) DEFAULT 'string',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_order ON project_images("order");
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories("order");
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on published projects" ON projects
    FOR SELECT USING (published = true);

CREATE POLICY "Allow public read access on project_images" ON project_images
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on settings" ON settings
    FOR SELECT USING (true);

-- Insert default categories
INSERT INTO categories (name, slug, "order") VALUES
    ('All Projects', 'all', 0),
    ('Residential', 'residential', 1),
    ('Commercial', 'commercial', 2),
    ('Interiors', 'interiors', 3),
    ('Renovations', 'renovations', 4),
    ('Urban Design', 'urban-design', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert default settings
INSERT INTO settings (key, value, type) VALUES
    ('logo', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=80&fit=crop', 'string'),
    ('siteName', 'Architect Studio', 'string'),
    ('tagline', 'Designing spaces that inspire and endure', 'string'),
    ('whatsappNumber', '+1234567890', 'string'),
    ('whatsappMessage', 'Hello! I am interested in your architectural services.', 'string'),
    ('footerDescription', 'Award-winning architectural firm specializing in sustainable and innovative design solutions.', 'string'),
    ('socialLinks', '{"instagram":"https://instagram.com/architectstudio","linkedin":"https://linkedin.com/company/architectstudio","behance":"https://behance.net/architectstudio","pinterest":"https://pinterest.com/architectstudio"}', 'json'),
    ('quickLinks', '[{"label":"About","url":"#about"},{"label":"Services","url":"#services"},{"label":"Contact","url":"#contact"}]', 'json')
ON CONFLICT (key) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, slug, description, category, tags, thumbnail, image_count, published) VALUES
    ('Modern Villa Residence', 'modern-villa-residence', 'A contemporary villa featuring clean lines, open spaces, and seamless indoor-outdoor integration.', 'residential', ARRAY['modern', 'villa', 'luxury', 'sustainable'], 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1200&fit=crop', 5, true),
    ('Corporate Headquarters', 'corporate-headquarters', 'Innovative office space designed to foster collaboration and creativity in a modern work environment.', 'commercial', ARRAY['office', 'corporate', 'glass', 'modern'], 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop', 6, true),
    ('Minimalist Apartment', 'minimalist-apartment', 'Refined interior design showcasing minimalist principles with natural materials and neutral tones.', 'interiors', ARRAY['minimalist', 'apartment', 'interior', 'scandinavian'], 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop', 4, true),
    ('Heritage Building Restoration', 'heritage-restoration', 'Sensitive restoration and adaptive reuse of a historic building, preserving character while adding modern functionality.', 'renovations', ARRAY['restoration', 'heritage', 'adaptive-reuse', 'historic'], 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=1200&fit=crop', 5, true),
    ('Urban Plaza Development', 'urban-plaza', 'Public space design creating a vibrant community gathering point with sustainable landscaping and seating areas.', 'urban-design', ARRAY['public-space', 'plaza', 'landscape', 'community'], 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop', 5, true),
    ('Boutique Hotel Design', 'boutique-hotel', 'Luxury boutique hotel combining elegance with comfort, featuring bespoke furnishings and curated art.', 'commercial', ARRAY['hotel', 'hospitality', 'luxury', 'boutique'], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop', 6, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample project images (you'll need to get the project IDs after inserting)
-- This is a template - replace project_id with actual UUIDs after projects are created
INSERT INTO project_images (project_id, url, caption, orientation, "order")
SELECT 
    p.id,
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1280&fit=crop',
    'Front facade with natural stone',
    'landscape',
    0
FROM projects p WHERE p.slug = 'modern-villa-residence'
ON CONFLICT DO NOTHING;

INSERT INTO project_images (project_id, url, caption, orientation, "order")
SELECT 
    p.id,
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1280&h=1920&fit=crop',
    'Interior living space',
    'portrait',
    1
FROM projects p WHERE p.slug = 'modern-villa-residence'
ON CONFLICT DO NOTHING;

-- Add more images similarly...
