/**
 * BE SEEN.PH - Database Types
 * Phase 2: The Delivery Engine ("Pinky")
 * 
 * Supabase PostgreSQL Schema Definitions
 */

// ============================================================================
// CLIENTS TABLE
// ============================================================================

export type SubscriptionTier = 'starter' | 'growth' | 'premium' | 'inactive';

export interface Client {
  id: string;                          // UUID
  created_at: string;                  // timestamptz
  updated_at: string;                  // timestamptz
  
  // Business Info
  business_name: string;
  niche: string;                       // e.g., "restaurant", "salon", "clinic"
  description?: string;                // Business description for AI context
  
  // Contact & Access
  contact_name?: string;
  email?: string;
  phone?: string;
  password_hash?: string;              // For client dashboard access
  
  // Subscription
  subscription_tier: SubscriptionTier;
  subscription_start_date?: string;
  subscription_end_date?: string;
  monthly_fee: number;                 // In PHP (e.g., 2000, 5000, 10000)
  gcash_reference?: string;            // Payment tracking
  
  // Facebook Integration
  facebook_page_id?: string;
  facebook_access_token?: string;      // Encrypted
  facebook_page_name?: string;
  facebook_connected: boolean;
  
  // Brand Voice Settings (for AI)
  brand_voice?: 'professional' | 'casual' | 'witty' | 'friendly' | 'luxury';
  target_audience?: string;
  special_offers?: string;             // Current promos to highlight
  
  // Content Preferences
  preferred_language: 'taglish' | 'english' | 'tagalog';
  posting_timezone: string;            // Default: 'Asia/Manila'
  optimal_posting_time?: string;       // e.g., "18:00" (6 PM)
  
  // Status
  status: 'active' | 'paused' | 'cancelled' | 'trial';
  onboarding_completed: boolean;
  
  // Metadata
  lead_source?: string;                // e.g., "facebook_ad", "referral", "organic"
  notes?: string;                      // Julie's internal notes
}

// ============================================================================
// POSTS TABLE - Content Calendar
// ============================================================================

export type PostStatus = 
  | 'draft' 
  | 'pending_approval' 
  | 'approved' 
  | 'scheduled' 
  | 'published' 
  | 'failed' 
  | 'rejected';

export type PostType = 
  | 'engagement'      // Questions, polls, memes
  | 'product'         // Product/service showcase
  | 'social_proof'    // Testimonials, reviews
  | 'educational'     // Tips, how-tos
  | 'promotional'     // Sales, discounts
  | 'behind_scenes'   // Team, process
  | 'holiday'         // Seasonal greetings
  | 'viral';          // Trending content

export interface Post {
  id: string;                          // UUID
  created_at: string;                  // timestamptz
  updated_at: string;                  // timestamptz
  
  // Relations
  client_id: string;                   // Foreign key to clients
  
  // Content
  content: string;                     // Post caption/text
  type: PostType;
  
  // AI Generation Metadata
  ai_prompt?: string;                  // The prompt used to generate
  ai_model?: string;                   // e.g., "gpt-4o"
  
  // Media
  image_url?: string;
  image_prompt?: string;               // AI image generation prompt
  
  // Scheduling
  scheduled_date: string;              // Date to post (YYYY-MM-DD)
  scheduled_time?: string;             // Time to post (HH:MM)
  scheduled_for?: string;              // Full ISO timestamp
  
  // Status & Publishing
  status: PostStatus;
  published_at?: string;
  published_post_id?: string;          // Facebook post ID after publishing
  published_url?: string;              // URL to published post
  
  // Engagement Metrics (updated via webhook/cron)
  likes_count?: number;
  comments_count?: number;
  shares_count?: number;
  reach_count?: number;
  
  // Client Feedback
  client_feedback?: string;
  requires_revision: boolean;
  revision_notes?: string;
  
  // Error Tracking
  error_message?: string;
  retry_count: number;
}

// ============================================================================
// CONTENT CALENDAR TABLE
// ============================================================================

export interface ContentCalendar {
  id: string;
  created_at: string;
  
  client_id: string;
  date: string;                        // YYYY-MM-DD
  
  // Planning
  posts_planned: number;
  posts_generated: number;
  posts_approved: number;
  
  // Status for this day
  status: 'pending' | 'generating' | 'ready' | 'posted' | 'failed';
  
  // Generation tracking
  generated_at?: string;
  generation_started_at?: string;
}

// ============================================================================
// ANALYTICS TABLE
// ============================================================================

export interface MonthlyAnalytics {
  id: string;
  created_at: string;
  
  client_id: string;
  month: string;                       // YYYY-MM format
  
  // Content Metrics
  posts_published: number;
  total_likes: number;
  total_comments: number;
  total_shares: number;
  total_reach: number;
  
  // Best Performing Post
  top_post_id?: string;
  top_post_engagement?: number;
  
  // Growth
  page_followers_start?: number;
  page_followers_end?: number;
  follower_growth: number;
  
  // Client Report
  report_generated: boolean;
  report_sent_at?: string;
  report_url?: string;
}

// ============================================================================
// CRON JOB LOGS
// ============================================================================

export type CronJobType = 
  | 'content_generation' 
  | 'auto_posting' 
  | 'analytics_sync'
  | 'report_generation';

export interface CronJobLog {
  id: string;
  created_at: string;
  
  job_type: CronJobType;
  started_at: string;
  completed_at?: string;
  
  status: 'running' | 'completed' | 'failed';
  
  // Details
  clients_processed?: number;
  posts_generated?: number;
  posts_published?: number;
  errors?: string[];
  
  // Error tracking
  error_message?: string;
}

// ============================================================================
// FACEBOOK TOKENS (for token rotation/refresh)
// ============================================================================

export interface FacebookToken {
  id: string;
  created_at: string;
  updated_at: string;
  
  client_id: string;
  page_id: string;
  
  access_token: string;                // Encrypted
  token_expires_at?: string;
  
  // Permissions
  permissions: string[];
  
  // Refresh tracking
  last_refreshed?: string;
  refresh_failed: boolean;
}

// ============================================================================
// TEMPLATES TABLE (for reusable content patterns)
// ============================================================================

export interface ContentTemplate {
  id: string;
  created_at: string;
  
  name: string;
  description?: string;
  
  // Template Data
  post_type: PostType;
  content_pattern: string;             // Template with variables like {{business_name}}
  image_prompt_pattern?: string;
  
  // Usage
  usage_count: number;
  is_active: boolean;
  
  // AI Instructions
  system_instructions?: string;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface GenerateContentRequest {
  client_id: string;
  date: string;                        // Target date
  post_types?: PostType[];             // Specific types or auto-select
}

export interface GenerateContentResponse {
  success: boolean;
  posts_generated: number;
  posts: Post[];
  errors?: string[];
}

export interface PublishPostRequest {
  post_id: string;
  publish_now?: boolean;               // If false, just schedule
}

export interface PublishPostResponse {
  success: boolean;
  facebook_post_id?: string;
  published_url?: string;
  error?: string;
}

export interface ClientDashboardStats {
  client: Client;
  this_month: {
    posts_published: number;
    total_engagement: number;
    upcoming_posts: number;
  };
  recent_posts: Post[];
  pending_approval: Post[];
}

// ============================================================================
// SUBSCRIPTION TIER CONFIG
// ============================================================================

export interface SubscriptionConfig {
  tier: SubscriptionTier;
  name: string;
  monthly_price: number;
  posts_per_month: number;
  articles_per_month: number;
  includes_ads_management: boolean;
  includes_google_business: boolean;
  includes_phone_tracking: boolean;
}

export const SUBSCRIPTION_CONFIGS: SubscriptionConfig[] = [
  {
    tier: 'starter',
    name: 'Starter',
    monthly_price: 2000,
    posts_per_month: 8,
    articles_per_month: 2,
    includes_ads_management: false,
    includes_google_business: false,
    includes_phone_tracking: false,
  },
  {
    tier: 'growth',
    name: 'Growth',
    monthly_price: 5000,
    posts_per_month: 20,
    articles_per_month: 4,
    includes_ads_management: false,
    includes_google_business: false,
    includes_phone_tracking: false,
  },
  {
    tier: 'premium',
    name: 'Premium',
    monthly_price: 10000,
    posts_per_month: 30,              // Daily posting
    articles_per_month: 8,
    includes_ads_management: true,
    includes_google_business: true,
    includes_phone_tracking: true,
  },
];
