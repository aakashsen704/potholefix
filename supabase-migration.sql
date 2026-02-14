-- PotholeFix Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create pothole_reports table
CREATE TABLE IF NOT EXISTS pothole_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  severity TEXT CHECK (severity IN ('minor', 'moderate', 'severe')) NOT NULL,
  status TEXT CHECK (status IN ('reported', 'in_progress', 'resolved')) DEFAULT 'reported',
  description TEXT,
  reporter_name TEXT,
  reporter_email TEXT,
  image_urls TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Create indexes for better query performance
CREATE INDEX idx_pothole_location ON pothole_reports (latitude, longitude);
CREATE INDEX idx_pothole_status ON pothole_reports (status);
CREATE INDEX idx_pothole_severity ON pothole_reports (severity);
CREATE INDEX idx_pothole_created_at ON pothole_reports (created_at DESC);

-- Create admin_users table for dashboard access
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a default admin user (change email as needed)
INSERT INTO admin_users (email) VALUES ('admin@potholefix.com')
ON CONFLICT (email) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE pothole_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read pothole reports
CREATE POLICY "Public read access on pothole_reports"
ON pothole_reports FOR SELECT
TO public
USING (true);

-- Policy: Anyone can insert pothole reports (for public submission)
CREATE POLICY "Public insert access on pothole_reports"
ON pothole_reports FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Only authenticated admin users can update reports
CREATE POLICY "Admin update access on pothole_reports"
ON pothole_reports FOR UPDATE
TO authenticated
USING (
  auth.email() IN (SELECT email FROM admin_users)
);

-- Policy: Only authenticated admin users can delete reports
CREATE POLICY "Admin delete access on pothole_reports"
ON pothole_reports FOR DELETE
TO authenticated
USING (
  auth.email() IN (SELECT email FROM admin_users)
);

-- Policy: Only authenticated users can read admin_users
CREATE POLICY "Authenticated read access on admin_users"
ON admin_users FOR SELECT
TO authenticated
USING (auth.email() IN (SELECT email FROM admin_users));

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_pothole_reports_updated_at
BEFORE UPDATE ON pothole_reports
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a view for analytics (optional but useful)
CREATE OR REPLACE VIEW pothole_stats AS
SELECT
  COUNT(*) as total_reports,
  COUNT(*) FILTER (WHERE status = 'reported') as pending_reports,
  COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_reports,
  COUNT(*) FILTER (WHERE status = 'resolved') as resolved_reports,
  COUNT(*) FILTER (WHERE severity = 'severe') as severe_reports,
  COUNT(*) FILTER (WHERE severity = 'moderate') as moderate_reports,
  COUNT(*) FILTER (WHERE severity = 'minor') as minor_reports,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as reports_last_week,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as reports_last_month
FROM pothole_reports;

-- Grant access to the view
GRANT SELECT ON pothole_stats TO public;

-- Storage bucket setup instructions (run these in Supabase Storage UI)
-- 1. Create a new bucket named 'pothole-images'
-- 2. Set it as public
-- 3. Configure policies:

-- Policy for public upload
INSERT INTO storage.policies (bucket_id, name, definition)
VALUES (
  'pothole-images',
  'Public upload access',
  'bucket_id = ''pothole-images'''::jsonb
);

-- Policy for public read
INSERT INTO storage.policies (bucket_id, name, definition)
VALUES (
  'pothole-images',
  'Public read access',
  'bucket_id = ''pothole-images'''::jsonb
);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'PotholeFix database schema created successfully!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Create storage bucket named pothole-images and set it as public';
  RAISE NOTICE '2. Update admin email in admin_users table if needed';
  RAISE NOTICE '3. Set up Edge Function for email notifications (optional)';
END $$;
