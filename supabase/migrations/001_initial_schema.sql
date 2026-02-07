-- ============================================================================
-- BE SEEN.PH - FULLSTACK DATABASE SCHEMA
-- Phase 1: Database Foundation
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================================================
-- PROFILES TABLE (extends auth.users)
-- ============================================================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Basic Info
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    
    -- Role: 'public' (consumer) or 'business' (owner)
    role TEXT DEFAULT 'public' CHECK (role IN ('public', 'business', 'admin')),
    
    -- For businesses: reference to their business profile
    business_id UUID,
    
    -- Preferences
    preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'tl', 'ceb')),
    notifications_enabled BOOLEAN DEFAULT true
);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', 'public')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- BUSINESS PROFILES TABLE
-- ============================================================================
CREATE TABLE business_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Basic Info
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    
    -- Category
    category TEXT NOT NULL,
    subcategories TEXT[],
    
    -- Location
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    province TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'Philippines',
    
    -- Geolocation (PostGIS)
    location GEOGRAPHY(POINT, 4326),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Contact
    phone TEXT,
    email TEXT,
    website TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    
    -- Business Hours (JSON for flexibility)
    hours JSONB DEFAULT '{}',
    
    -- Amenities & Services
    amenities TEXT[] DEFAULT '{}',
    services TEXT[] DEFAULT '{}',
    
    -- Branding
    logo_url TEXT,
    banner_url TEXT,
    photos TEXT[] DEFAULT '{}',
    
    -- Brand Colors (hex)
    primary_color TEXT DEFAULT '#d946ef',
    secondary_color TEXT DEFAULT '#06b6d4',
    
    -- AI Voice Settings
    voice_personality TEXT DEFAULT 'friendly' CHECK (voice_personality IN ('friendly', 'professional', 'witty', 'casual')),
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'suspended')),
    verification_status TEXT DEFAULT 'unclaimed' CHECK (verification_status IN ('unclaimed', 'pending', 'verified', 'rejected')),
    
    -- Claim Info
    claimed_by UUID REFERENCES profiles(id),
    claimed_at TIMESTAMPTZ,
    
    -- Subscription/Tier
    tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'basic', 'premium')),
    
    -- Tokens (gamification)
    gold_tokens INTEGER DEFAULT 0,
    
    -- Analytics (cached)
    total_views INTEGER DEFAULT 0,
    total_calls INTEGER DEFAULT 0,
    total_directions INTEGER DEFAULT 0,
    average_rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    
    -- Content Generation
    last_content_generated_at TIMESTAMPTZ,
    content_generation_count INTEGER DEFAULT 0,
    
    -- "Use It or Lose It" tracking
    last_activity_at TIMESTAMPTZ DEFAULT NOW(),
    inactivity_warning_sent BOOLEAN DEFAULT false,
    
    -- SEO
    meta_description TEXT,
    keywords TEXT[]
);

-- Indexes for business_profiles
CREATE INDEX idx_business_city ON business_profiles(city);
CREATE INDEX idx_business_category ON business_profiles(category);
CREATE INDEX idx_business_status ON business_profiles(status);
CREATE INDEX idx_business_location ON business_profiles USING GIST(location);
CREATE INDEX idx_business_slug ON business_profiles(slug);
CREATE INDEX idx_business_claimed_by ON business_profiles(claimed_by);

-- Full-text search
CREATE INDEX idx_business_search ON business_profiles 
    USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Trigger for updated_at
CREATE TRIGGER update_business_profiles_updated_at
    BEFORE UPDATE ON business_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- CLAIM REQUESTS TABLE
-- ============================================================================
CREATE TABLE claim_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    claimed_by UUID NOT NULL REFERENCES profiles(id),
    
    -- Verification Info
    verification_email TEXT,
    verification_phone TEXT,
    business_registration_doc TEXT, -- URL to stored document
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewed_by UUID REFERENCES profiles(id),
    reviewed_at TIMESTAMPTZ,
    rejection_reason TEXT,
    
    -- Reward tracking
    tokens_awarded BOOLEAN DEFAULT false,
    tokens_awarded_at TIMESTAMPTZ
);

CREATE INDEX idx_claim_requests_business ON claim_requests(business_id);
CREATE INDEX idx_claim_requests_status ON claim_requests(status);

-- ============================================================================
-- CONTENT ARTICLES TABLE
-- ============================================================================
CREATE TABLE content_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    
    -- Content
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    
    -- AI Generation
    ai_generated BOOLEAN DEFAULT true,
    ai_prompt TEXT,
    gemini_model TEXT,
    
    -- Media
    featured_image_url TEXT,
    banner_image_url TEXT,
    
    -- Status
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    scheduled_for TIMESTAMPTZ,
    
    -- SEO
    meta_description TEXT,
    keywords TEXT[],
    
    -- Engagement (cached)
    view_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    
    -- Unique constraint per business per slug
    UNIQUE(business_id, slug)
);

CREATE INDEX idx_articles_business ON content_articles(business_id);
CREATE INDEX idx_articles_status ON content_articles(status);
CREATE INDEX idx_articles_published ON content_articles(published_at DESC);

-- ============================================================================
-- SOCIAL FEED TABLE
-- ============================================================================
CREATE TABLE social_feed (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id),
    
    -- Content
    content TEXT NOT NULL,
    
    -- Voice-to-Text
    voice_url TEXT, -- URL to stored audio file
    voice_transcript TEXT,
    voice_duration INTEGER, -- seconds
    
    -- Media
    images TEXT[] DEFAULT '{}',
    
    -- Type
    post_type TEXT DEFAULT 'update' CHECK (post_type IN ('update', 'promo', 'event', 'milestone')),
    
    -- Engagement
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    
    -- Status
    is_pinned BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false
);

CREATE INDEX idx_feed_business ON social_feed(business_id);
CREATE INDEX idx_feed_created ON social_feed(created_at DESC);
CREATE INDEX idx_feed_pinned ON social_feed(is_pinned) WHERE is_pinned = true;

-- ============================================================================
-- REVIEWS TABLE
-- ============================================================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id), -- null for anonymous
    
    -- Content
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title TEXT,
    content TEXT NOT NULL,
    
    -- Media
    photos TEXT[] DEFAULT '{}',
    
    -- Engagement
    helpful_count INTEGER DEFAULT 0,
    
    -- Response from business
    response TEXT,
    responded_at TIMESTAMPTZ,
    responded_by UUID REFERENCES profiles(id),
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    is_verified BOOLEAN DEFAULT false, -- verified purchase/visit
    
    -- For "Use It or Lose It"
    triggered_activity BOOLEAN DEFAULT true -- counts as business activity
);

CREATE INDEX idx_reviews_business ON reviews(business_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);

-- Trigger to update business average rating
CREATE OR REPLACE FUNCTION update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE business_profiles
    SET 
        average_rating = (
            SELECT COALESCE(AVG(rating), 0) 
            FROM reviews 
            WHERE business_id = NEW.business_id 
            AND status = 'approved'
        ),
        review_count = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE business_id = NEW.business_id 
            AND status = 'approved'
        )
    WHERE id = NEW.business_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_review_change
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_business_rating();

-- ============================================================================
-- ANALYTICS EVENTS TABLE
-- ============================================================================
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    
    -- Event Type
    event_type TEXT NOT NULL CHECK (event_type IN (
        'page_view',
        'pin_click',
        'phone_reveal',
        'direction_click',
        'website_click',
        'share',
        'save',
        'review_view',
        'photo_view'
    )),
    
    -- Context
    session_id TEXT,
    ip_hash TEXT, -- hashed IP for privacy
    user_agent TEXT,
    referrer TEXT,
    
    -- Location
    city TEXT,
    country TEXT,
    
    -- Metadata (flexible JSON)
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_analytics_business ON analytics_events(business_id);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);

-- Materialized view for analytics (updated daily)
CREATE MATERIALIZED VIEW business_analytics_daily AS
SELECT 
    business_id,
    DATE(created_at) as date,
    event_type,
    COUNT(*) as count
FROM analytics_events
GROUP BY business_id, DATE(created_at), event_type;

CREATE INDEX idx_analytics_daily ON business_analytics_daily(business_id, date);

-- ============================================================================
-- TOKENS TRANSACTIONS TABLE (gamification)
-- ============================================================================
CREATE TABLE token_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    business_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    
    -- Transaction
    amount INTEGER NOT NULL, -- positive for earn, negative for spend
    balance_after INTEGER NOT NULL,
    
    -- Type
    transaction_type TEXT NOT NULL CHECK (transaction_type IN (
        'claim_reward',
        'profile_completion',
        'content_generation',
        'featured_listing',
        'ad_boost',
        'referral',
        'purchase',
        'expired'
    )),
    
    -- Description
    description TEXT,
    related_id UUID -- could reference claim_requests, content_articles, etc.
);

CREATE INDEX idx_tokens_business ON token_transactions(business_id);
CREATE INDEX idx_tokens_type ON token_transactions(transaction_type);

-- Trigger to update business gold_tokens cache
CREATE OR REPLACE FUNCTION update_business_tokens()
RETURNS TRIGGER AS $$
DECLARE
    new_balance INTEGER;
BEGIN
    SELECT COALESCE(SUM(amount), 0) INTO new_balance
    FROM token_transactions
    WHERE business_id = NEW.business_id;
    
    UPDATE business_profiles
    SET gold_tokens = new_balance
    WHERE id = NEW.business_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_token_transaction
    AFTER INSERT ON token_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_business_tokens();

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, update own
CREATE POLICY "Profiles are viewable by everyone"
    ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE USING (auth.uid() = id);

-- Business Profiles: Public read, owner write
CREATE POLICY "Business profiles are viewable by everyone"
    ON business_profiles FOR SELECT USING (true);

CREATE POLICY "Business owners can update their business"
    ON business_profiles FOR UPDATE USING (claimed_by = auth.uid());

CREATE POLICY "Admins can manage all businesses"
    ON business_profiles FOR ALL USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Claim Requests: Owner and admin only
CREATE POLICY "Users can view own claims"
    ON claim_requests FOR SELECT USING (claimed_by = auth.uid());

CREATE POLICY "Admins can view all claims"
    ON claim_requests FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Users can create claims"
    ON claim_requests FOR INSERT WITH CHECK (claimed_by = auth.uid());

-- Content Articles: Public read, owner write
CREATE POLICY "Articles are viewable by everyone"
    ON content_articles FOR SELECT USING (status = 'published');

CREATE POLICY "Business owners can manage their articles"
    ON content_articles FOR ALL USING (
        EXISTS (
            SELECT 1 FROM business_profiles 
            WHERE id = business_id AND claimed_by = auth.uid()
        )
    );

-- Social Feed: Public read, owner write
CREATE POLICY "Feed posts are viewable by everyone"
    ON social_feed FOR SELECT USING (true);

CREATE POLICY "Business owners can manage their feed"
    ON social_feed FOR ALL USING (
        EXISTS (
            SELECT 1 FROM business_profiles 
            WHERE id = business_id AND claimed_by = auth.uid()
        )
    );

-- Reviews: Public read, author write
CREATE POLICY "Reviews are viewable by everyone"
    ON reviews FOR SELECT USING (status = 'approved');

CREATE POLICY "Authenticated users can create reviews"
    ON reviews FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Business owners can respond to reviews"
    ON reviews FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM business_profiles 
            WHERE id = business_id AND claimed_by = auth.uid()
        )
    );

-- Analytics: Owner and admin only
CREATE POLICY "Business owners can view their analytics"
    ON analytics_events FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM business_profiles 
            WHERE id = business_id AND claimed_by = auth.uid()
        )
    );

CREATE POLICY "Service role can insert analytics"
    ON analytics_events FOR INSERT WITH CHECK (true);

-- Token Transactions: Owner read only
CREATE POLICY "Business owners can view their transactions"
    ON token_transactions FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM business_profiles 
            WHERE id = business_id AND claimed_by = auth.uid()
        )
    );

-- ============================================================================
-- FUNCTIONS FOR CRON JOBS
-- ============================================================================

-- Function to deactivate inactive businesses
CREATE OR REPLACE FUNCTION deactivate_inactive_businesses()
RETURNS INTEGER AS $$
DECLARE
    deactivated_count INTEGER := 0;
BEGIN
    -- Mark businesses inactive after 30 days of no activity
    UPDATE business_profiles
    SET 
        status = 'inactive',
        updated_at = NOW()
    WHERE 
        status = 'active'
        AND last_activity_at < NOW() - INTERVAL '30 days'
        AND inactivity_warning_sent = true;
    
    GET DIAGNOSTICS deactivated_count = ROW_COUNT;
    
    -- Send warnings after 23 days (7 days before deactivation)
    UPDATE business_profiles
    SET inactivity_warning_sent = true
    WHERE 
        status = 'active'
        AND last_activity_at < NOW() - INTERVAL '23 days'
        AND inactivity_warning_sent = false;
    
    RETURN deactivated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update last_activity_at
CREATE OR REPLACE FUNCTION update_business_activity(business_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE business_profiles
    SET 
        last_activity_at = NOW(),
        inactivity_warning_sent = false
    WHERE id = business_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STORAGE BUCKETS SETUP (run in Supabase Dashboard)
-- ============================================================================
/*
-- Create these buckets in Supabase Storage UI:
-- 1. business-logos
-- 2. business-photos  
-- 3. feed-images
-- 4. business-docs
-- 5. voice-messages

-- Set public access for: business-logos, business-photos, feed-images
-- Set private access for: business-docs, voice-messages
*/
