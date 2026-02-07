-- ============================================================================
-- BE SEEN.PH - EXTENSIONS & UTILITIES
-- Must run before other migrations
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for geolocation
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Enable pg_cron for scheduled jobs (if available)
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to auto-update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(name TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'), '^-|-$', '', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Function to check if a slug is available
CREATE OR REPLACE FUNCTION is_slug_available(proposed_slug TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    exists_check BOOLEAN;
BEGIN
    SELECT NOT EXISTS(
        SELECT 1 FROM business_profiles WHERE slug = proposed_slug
    ) INTO exists_check;
    RETURN exists_check;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Get nearby businesses using PostGIS
CREATE OR REPLACE FUNCTION get_nearby_businesses(
    lat DECIMAL,
    lng DECIMAL,
    radius_km DECIMAL DEFAULT 10
)
RETURNS TABLE(
    id UUID,
    name TEXT,
    slug TEXT,
    category TEXT,
    city TEXT,
    distance_km DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        bp.id,
        bp.name,
        bp.slug,
        bp.category,
        bp.city,
        (ST_Distance(bp.location::geography, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography) / 1000)::DECIMAL as distance_km
    FROM business_profiles bp
    WHERE bp.status = 'active'
        AND bp.location IS NOT NULL
        AND ST_DWithin(bp.location::geography, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography, radius_km * 1000)
    ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- Search businesses with full-text
CREATE OR REPLACE FUNCTION search_businesses(search_query TEXT)
RETURNS TABLE(
    id UUID,
    name TEXT,
    slug TEXT,
    description TEXT,
    category TEXT,
    city TEXT,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        bp.id,
        bp.name,
        bp.slug,
        bp.description,
        bp.category,
        bp.city,
        ts_rank(
            to_tsvector('english', bp.name || ' ' || COALESCE(bp.description, '')),
            plainto_tsquery('english', search_query)
        ) as rank
    FROM business_profiles bp
    WHERE bp.status = 'active'
        AND (
            bp.name ILIKE '%' || search_query || '%'
            OR bp.description ILIKE '%' || search_query || '%'
            OR to_tsvector('english', bp.name || ' ' || COALESCE(bp.description, '')) 
               @@ plainto_tsquery('english', search_query)
        )
    ORDER BY rank DESC, bp.name;
END;
$$ LANGUAGE plpgsql;
