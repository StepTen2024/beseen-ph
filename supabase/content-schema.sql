-- ============================================================================
-- BE SEEN.PH - Content Site & Directory Schema
-- Phase 3 & 4: Content Site + Directory Engine
-- ============================================================================

-- ============================================================================
-- ARTICLES TABLE
-- ============================================================================

CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- SEO Fields
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    meta_description TEXT,
    keywords TEXT[],
    
    -- Content
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    
    -- Categorization
    category TEXT NOT NULL CHECK (category IN ('food', 'travel', 'lifestyle', 'business', 'ofw', 'korean', 'health', 'tech', 'news')),
    subcategory TEXT,
    tags TEXT[],
    
    -- Location (for local SEO)
    city TEXT,
    province TEXT,
    is_local_content BOOLEAN DEFAULT FALSE,
    
    -- AI Generation
    ai_generated BOOLEAN DEFAULT FALSE,
    ai_model TEXT DEFAULT 'gpt-4o',
    ai_prompt TEXT,
    human_edited BOOLEAN DEFAULT FALSE,
    
    -- Publishing
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    author TEXT,
    
    -- Engagement
    view_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    
    -- Monetization
    has_affiliate_links BOOLEAN DEFAULT FALSE,
    affiliate_links JSONB
);

-- Indexes for articles
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_city ON articles(city);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_local ON articles(is_local_content, city);

-- Full text search index
CREATE INDEX idx_articles_search ON articles USING gin(to_tsvector('english', title || ' ' || COALESCE(content, '')));

-- Trigger for updated_at
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- DIRECTORY LISTINGS TABLE
-- ============================================================================

CREATE TABLE directory_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Business Info
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    
    -- Contact
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    province TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    website TEXT,
    
    -- Social
    facebook_url TEXT,
    instagram_url TEXT,
    
    -- Category
    category TEXT NOT NULL CHECK (category IN ('restaurant', 'cafe', 'salon', 'spa', 'clinic', 'dental', 'gym', 'pet-store', 'hotel', 'resort', 'school', 'tutorial', 'real-estate', 'car-dealer', 'hardware', 'wedding', 'events', 'retail', 'service')),
    subcategories TEXT[],
    
    -- Details
    hours JSONB,
    price_range INTEGER CHECK (price_range BETWEEN 1 AND 4),
    amenities TEXT[],
    services TEXT[],
    
    -- Media
    photos TEXT[],
    logo TEXT,
    
    -- Location
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Status
    is_claimed BOOLEAN DEFAULT FALSE,
    claimed_by UUID REFERENCES clients(id),
    is_featured BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'suspended', 'expired')),
    
    -- SEO
    meta_description TEXT,
    keywords TEXT[],
    
    -- Engagement
    view_count INTEGER DEFAULT 0,
    click_to_call_count INTEGER DEFAULT 0,
    click_to_map_count INTEGER DEFAULT 0,
    
    -- Reviews
    average_rating DECIMAL(2, 1) DEFAULT 0 CHECK (average_rating BETWEEN 0 AND 5),
    review_count INTEGER DEFAULT 0,
    
    -- Plan
    listing_tier TEXT DEFAULT 'free' CHECK (listing_tier IN ('free', 'basic', 'premium')),
    listing_expires_at TIMESTAMPTZ,
    
    -- Unique constraint for slug per city
    UNIQUE(slug, city)
);

-- Indexes for directory
CREATE INDEX idx_directory_slug ON directory_listings(slug);
CREATE INDEX idx_directory_city ON directory_listings(city);
CREATE INDEX idx_directory_category ON directory_listings(category);
CREATE INDEX idx_directory_status ON directory_listings(status);
CREATE INDEX idx_directory_city_category ON directory_listings(city, category);
CREATE INDEX idx_directory_featured ON directory_listings(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_directory_claimed ON directory_listings(is_claimed) WHERE is_claimed = TRUE;
CREATE INDEX idx_directory_rating ON directory_listings(average_rating DESC);
CREATE INDEX idx_directory_geo ON directory_listings(latitude, longitude);

-- Full text search index
CREATE INDEX idx_directory_search ON directory_listings USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Trigger for updated_at
CREATE TRIGGER update_directory_updated_at
    BEFORE UPDATE ON directory_listings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- DIRECTORY REVIEWS TABLE
-- ============================================================================

CREATE TABLE directory_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    listing_id UUID NOT NULL REFERENCES directory_listings(id) ON DELETE CASCADE,
    
    -- Reviewer
    reviewer_name TEXT NOT NULL,
    reviewer_email TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Content
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title TEXT,
    content TEXT NOT NULL,
    photos TEXT[],
    
    -- Engagement
    helpful_count INTEGER DEFAULT 0,
    
    -- Response
    owner_response TEXT,
    owner_responded_at TIMESTAMPTZ,
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Indexes for reviews
CREATE INDEX idx_reviews_listing ON directory_reviews(listing_id);
CREATE INDEX idx_reviews_rating ON directory_reviews(rating);
CREATE INDEX idx_reviews_status ON directory_reviews(status);

-- Trigger to update listing average rating
CREATE OR REPLACE FUNCTION update_listing_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE directory_listings
    SET 
        average_rating = (
            SELECT COALESCE(AVG(rating), 0) 
            FROM directory_reviews 
            WHERE listing_id = NEW.listing_id AND status = 'approved'
        ),
        review_count = (
            SELECT COUNT(*) 
            FROM directory_reviews 
            WHERE listing_id = NEW.listing_id AND status = 'approved'
        )
    WHERE id = NEW.listing_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_listing_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON directory_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_listing_rating();

-- ============================================================================
-- VIEWS FOR ANALYTICS
-- ============================================================================

-- Article performance view
CREATE VIEW article_analytics AS
SELECT 
    a.id,
    a.title,
    a.category,
    a.city,
    a.view_count,
    a.share_count,
    a.published_at,
    CASE 
        WHEN a.published_at IS NOT NULL THEN 
            EXTRACT(DAY FROM NOW() - a.published_at)
        ELSE NULL 
    END as days_since_published,
    CASE 
        WHEN a.published_at IS NOT NULL THEN 
            ROUND(a.view_count::numeric / NULLIF(EXTRACT(DAY FROM NOW() - a.published_at), 0), 2)
        ELSE 0 
    END as avg_daily_views
FROM articles a
WHERE a.status = 'published';

-- Directory listing performance view
CREATE VIEW directory_analytics AS
SELECT 
    dl.id,
    dl.name,
    dl.city,
    dl.category,
    dl.view_count,
    dl.click_to_call_count,
    dl.click_to_map_count,
    dl.average_rating,
    dl.review_count,
    dl.listing_tier,
    (dl.click_to_call_count + dl.click_to_map_count) as total_engagement
FROM directory_listings dl
WHERE dl.status = 'active';

-- City category counts view (for SEO pages)
CREATE VIEW city_category_counts AS
SELECT 
    city,
    category,
    COUNT(*) as listing_count,
    ROUND(AVG(average_rating), 1) as avg_rating,
    COUNT(CASE WHEN is_featured THEN 1 END) as featured_count
FROM directory_listings
WHERE status = 'active'
GROUP BY city, category;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_reviews ENABLE ROW LEVEL SECURITY;

-- Articles policies
CREATE POLICY "Allow public read published articles" ON articles
    FOR SELECT TO anon 
    USING (status = 'published');
    
CREATE POLICY "Allow service role all articles" ON articles
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Directory policies
CREATE POLICY "Allow public read active listings" ON directory_listings
    FOR SELECT TO anon 
    USING (status = 'active');
    
CREATE POLICY "Allow service role all directory" ON directory_listings
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Reviews policies
CREATE POLICY "Allow public read approved reviews" ON directory_reviews
    FOR SELECT TO anon 
    USING (status = 'approved');
    
CREATE POLICY "Allow service role all reviews" ON directory_reviews
    FOR ALL TO service_role USING (true) WITH CHECK (true);
