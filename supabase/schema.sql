-- ============================================================================
-- BE SEEN.PH - Supabase Database Schema
-- Phase 2: The Delivery Engine ("Pinky")
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CLIENTS TABLE
-- ============================================================================

CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Business Info
    business_name TEXT NOT NULL,
    niche TEXT NOT NULL,
    description TEXT,
    
    -- Contact & Access
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    password_hash TEXT,
    
    -- Subscription
    subscription_tier TEXT NOT NULL DEFAULT 'starter' CHECK (subscription_tier IN ('starter', 'growth', 'premium', 'inactive')),
    subscription_start_date DATE,
    subscription_end_date DATE,
    monthly_fee INTEGER NOT NULL DEFAULT 2000,
    gcash_reference TEXT,
    
    -- Facebook Integration
    facebook_page_id TEXT,
    facebook_access_token TEXT,
    facebook_page_name TEXT,
    facebook_connected BOOLEAN DEFAULT FALSE,
    
    -- Brand Voice Settings
    brand_voice TEXT CHECK (brand_voice IN ('professional', 'casual', 'witty', 'friendly', 'luxury')),
    target_audience TEXT,
    special_offers TEXT,
    
    -- Content Preferences
    preferred_language TEXT DEFAULT 'taglish' CHECK (preferred_language IN ('taglish', 'english', 'tagalog')),
    posting_timezone TEXT DEFAULT 'Asia/Manila',
    optimal_posting_time TEXT,
    
    -- Status
    status TEXT DEFAULT 'trial' CHECK (status IN ('active', 'paused', 'cancelled', 'trial')),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    lead_source TEXT,
    notes TEXT
);

-- Indexes for clients
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_facebook_connected ON clients(facebook_connected);
CREATE INDEX idx_clients_subscription_tier ON clients(subscription_tier);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- POSTS TABLE - Content Calendar
-- ============================================================================

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Relations
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    
    -- Content
    content TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('engagement', 'product', 'social_proof', 'educational', 'promotional', 'behind_scenes', 'holiday', 'viral')),
    
    -- AI Generation Metadata
    ai_prompt TEXT,
    ai_model TEXT DEFAULT 'gpt-4o',
    
    -- Media
    image_url TEXT,
    image_prompt TEXT,
    
    -- Scheduling
    scheduled_date DATE NOT NULL,
    scheduled_time TEXT,
    scheduled_for TIMESTAMPTZ,
    
    -- Status & Publishing
    status TEXT DEFAULT 'pending_approval' CHECK (status IN ('draft', 'pending_approval', 'approved', 'scheduled', 'published', 'failed', 'rejected')),
    published_at TIMESTAMPTZ,
    published_post_id TEXT,
    published_url TEXT,
    
    -- Engagement Metrics
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    reach_count INTEGER DEFAULT 0,
    
    -- Client Feedback
    client_feedback TEXT,
    requires_revision BOOLEAN DEFAULT FALSE,
    revision_notes TEXT,
    
    -- Error Tracking
    error_message TEXT,
    retry_count INTEGER DEFAULT 0
);

-- Indexes for posts
CREATE INDEX idx_posts_client_id ON posts(client_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_scheduled_date ON posts(scheduled_date);
CREATE INDEX idx_posts_scheduled_for ON posts(scheduled_for);
CREATE INDEX idx_posts_client_status ON posts(client_id, status);

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- CONTENT CALENDAR TABLE
-- ============================================================================

CREATE TABLE content_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    
    -- Planning
    posts_planned INTEGER DEFAULT 0,
    posts_generated INTEGER DEFAULT 0,
    posts_approved INTEGER DEFAULT 0,
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'ready', 'posted', 'failed')),
    
    -- Generation tracking
    generated_at TIMESTAMPTZ,
    generation_started_at TIMESTAMPTZ,
    
    -- Unique constraint - one entry per client per date
    UNIQUE(client_id, date)
);

CREATE INDEX idx_content_calendar_client_date ON content_calendar(client_id, date);
CREATE INDEX idx_content_calendar_status ON content_calendar(status);

-- ============================================================================
-- ANALYTICS TABLE
-- ============================================================================

CREATE TABLE monthly_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    month TEXT NOT NULL, -- YYYY-MM format
    
    -- Content Metrics
    posts_published INTEGER DEFAULT 0,
    total_likes INTEGER DEFAULT 0,
    total_comments INTEGER DEFAULT 0,
    total_shares INTEGER DEFAULT 0,
    total_reach INTEGER DEFAULT 0,
    
    -- Best Performing Post
    top_post_id UUID REFERENCES posts(id),
    top_post_engagement INTEGER DEFAULT 0,
    
    -- Growth
    page_followers_start INTEGER,
    page_followers_end INTEGER,
    follower_growth INTEGER DEFAULT 0,
    
    -- Client Report
    report_generated BOOLEAN DEFAULT FALSE,
    report_sent_at TIMESTAMPTZ,
    report_url TEXT,
    
    -- Unique constraint - one entry per client per month
    UNIQUE(client_id, month)
);

CREATE INDEX idx_monthly_analytics_client ON monthly_analytics(client_id);
CREATE INDEX idx_monthly_analytics_month ON monthly_analytics(month);

-- ============================================================================
-- CRON JOB LOGS
-- ============================================================================

CREATE TABLE cron_job_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    job_type TEXT NOT NULL CHECK (job_type IN ('content_generation', 'auto_posting', 'analytics_sync', 'report_generation')),
    started_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    
    status TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
    
    -- Details
    clients_processed INTEGER,
    posts_generated INTEGER,
    posts_published INTEGER,
    errors TEXT[],
    
    -- Error tracking
    error_message TEXT
);

CREATE INDEX idx_cron_job_logs_type ON cron_job_logs(job_type);
CREATE INDEX idx_cron_job_logs_status ON cron_job_logs(status);
CREATE INDEX idx_cron_job_logs_created ON cron_job_logs(created_at);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cron_job_logs ENABLE ROW LEVEL SECURITY;

-- Clients table policies
CREATE POLICY "Allow anon read clients" ON clients
    FOR SELECT TO anon USING (true);
    
CREATE POLICY "Allow service role all clients" ON clients
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Posts table policies
CREATE POLICY "Allow anon read posts" ON posts
    FOR SELECT TO anon USING (true);
    
CREATE POLICY "Allow service role all posts" ON posts
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Other tables - service role only for now
CREATE POLICY "Allow service role all content_calendar" ON content_calendar
    FOR ALL TO service_role USING (true) WITH CHECK (true);
    
CREATE POLICY "Allow service role all monthly_analytics" ON monthly_analytics
    FOR ALL TO service_role USING (true) WITH CHECK (true);
    
CREATE POLICY "Allow service role all cron_job_logs" ON cron_job_logs
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Uncomment to insert sample client
/*
INSERT INTO clients (
    business_name, 
    niche, 
    description,
    subscription_tier, 
    monthly_fee, 
    status,
    preferred_language,
    brand_voice
) VALUES (
    'Mang Inasal Sample',
    'restaurant',
    'Filipino BBQ restaurant serving delicious chicken inasal and local favorites',
    'starter',
    2000,
    'trial',
    'taglish',
    'friendly'
);
*/

-- ============================================================================
-- VIEWS FOR REPORTING
-- ============================================================================

-- Daily posting summary
CREATE VIEW daily_posting_summary AS
SELECT 
    scheduled_date,
    COUNT(*) as total_posts,
    COUNT(*) FILTER (WHERE status = 'published') as published_posts,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_posts,
    COUNT(*) FILTER (WHERE status = 'pending_approval') as pending_posts
FROM posts
GROUP BY scheduled_date
ORDER BY scheduled_date DESC;

-- Client activity summary
CREATE VIEW client_activity_summary AS
SELECT 
    c.id,
    c.business_name,
    c.status,
    c.subscription_tier,
    COUNT(p.id) as total_posts,
    COUNT(p.id) FILTER (WHERE p.status = 'published') as published_posts,
    COUNT(p.id) FILTER (WHERE p.status = 'pending_approval') as pending_posts,
    MAX(p.published_at) as last_post_date
FROM clients c
LEFT JOIN posts p ON c.id = p.client_id
GROUP BY c.id, c.business_name, c.status, c.subscription_tier;
