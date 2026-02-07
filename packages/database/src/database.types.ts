/**
 * BE SEEN.PH - Database TypeScript Definitions
 * Generated from Supabase schema
 */

// ============================================================================
// ENUM TYPES
// ============================================================================

export type UserRole = 'public' | 'business' | 'admin';
export type BusinessStatus = 'pending' | 'active' | 'inactive' | 'suspended';
export type VerificationStatus = 'unclaimed' | 'pending' | 'verified' | 'rejected';
export type Tier = 'free' | 'basic' | 'premium';
export type VoicePersonality = 'friendly' | 'professional' | 'witty' | 'casual';
export type ClaimStatus = 'pending' | 'approved' | 'rejected';
export type ArticleStatus = 'draft' | 'scheduled' | 'published' | 'archived';
export type PostType = 'update' | 'promo' | 'event' | 'milestone';
export type ReviewStatus = 'pending' | 'approved' | 'rejected';
export type AnalyticsEventType = 
  | 'page_view'
  | 'pin_click'
  | 'phone_reveal'
  | 'direction_click'
  | 'website_click'
  | 'share'
  | 'save'
  | 'review_view'
  | 'photo_view';
export type TokenTransactionType = 
  | 'claim_reward'
  | 'profile_completion'
  | 'content_generation'
  | 'featured_listing'
  | 'ad_boost'
  | 'referral'
  | 'purchase'
  | 'expired';

// ============================================================================
// CORE TABLES
// ============================================================================

export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
  business_id: string | null;
  preferred_language: string;
  notifications_enabled: boolean;
}

export interface BusinessProfile {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  subcategories: string[] | null;
  address: string;
  city: string;
  province: string | null;
  postal_code: string | null;
  country: string;
  location: unknown | null; // PostGIS geography
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  hours: Record<string, { open: string; close: string; closed?: boolean }> | null;
  amenities: string[];
  services: string[];
  logo_url: string | null;
  banner_url: string | null;
  photos: string[];
  primary_color: string;
  secondary_color: string;
  voice_personality: VoicePersonality;
  status: BusinessStatus;
  verification_status: VerificationStatus;
  claimed_by: string | null;
  claimed_at: string | null;
  tier: Tier;
  gold_tokens: number;
  total_views: number;
  total_calls: number;
  total_directions: number;
  average_rating: number;
  review_count: number;
  last_content_generated_at: string | null;
  content_generation_count: number;
  last_activity_at: string;
  inactivity_warning_sent: boolean;
  meta_description: string | null;
  keywords: string[] | null;
}

export interface ClaimRequest {
  id: string;
  created_at: string;
  updated_at: string;
  business_id: string;
  claimed_by: string;
  verification_email: string | null;
  verification_phone: string | null;
  business_registration_doc: string | null;
  status: ClaimStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  tokens_awarded: boolean;
  tokens_awarded_at: string | null;
}

export interface ContentArticle {
  id: string;
  created_at: string;
  updated_at: string;
  business_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  ai_generated: boolean;
  ai_prompt: string | null;
  gemini_model: string | null;
  featured_image_url: string | null;
  banner_image_url: string | null;
  status: ArticleStatus;
  published_at: string | null;
  scheduled_for: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  view_count: number;
  share_count: number;
}

export interface SocialFeedPost {
  id: string;
  created_at: string;
  updated_at: string;
  business_id: string;
  author_id: string;
  content: string;
  voice_url: string | null;
  voice_transcript: string | null;
  voice_duration: number | null;
  images: string[];
  post_type: PostType;
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  is_featured: boolean;
}

export interface Review {
  id: string;
  created_at: string;
  updated_at: string;
  business_id: string;
  author_id: string | null;
  rating: number;
  title: string | null;
  content: string;
  photos: string[];
  helpful_count: number;
  response: string | null;
  responded_at: string | null;
  responded_by: string | null;
  status: ReviewStatus;
  is_verified: boolean;
  triggered_activity: boolean;
}

export interface AnalyticsEvent {
  id: string;
  created_at: string;
  business_id: string | null;
  event_type: AnalyticsEventType;
  session_id: string | null;
  ip_hash: string | null;
  user_agent: string | null;
  referrer: string | null;
  city: string | null;
  country: string | null;
  metadata: Record<string, unknown>;
}

export interface TokenTransaction {
  id: string;
  created_at: string;
  business_id: string;
  amount: number;
  balance_after: number;
  transaction_type: TokenTransactionType;
  description: string | null;
  related_id: string | null;
}

// ============================================================================
// VIEWS
// ============================================================================

export interface BusinessAnalyticsDaily {
  business_id: string;
  date: string;
  event_type: AnalyticsEventType;
  count: number;
}

// ============================================================================
// JOINED TYPES (for API responses)
// ============================================================================

export interface BusinessWithProfile extends BusinessProfile {
  profile?: Profile;
  articles?: ContentArticle[];
  posts?: SocialFeedPost[];
  reviews?: Review[];
}

// ============================================================================
// API INPUT TYPES
// ============================================================================

export interface CreateBusinessInput {
  name: string;
  slug?: string;
  description?: string;
  category: string;
  subcategories?: string[];
  address: string;
  city: string;
  province?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  facebook_url?: string;
  instagram_url?: string;
  hours?: Record<string, { open: string; close: string; closed?: boolean }>;
  amenities?: string[];
  services?: string[];
  logo_url?: string;
  banner_url?: string;
  photos?: string[];
  primary_color?: string;
  secondary_color?: string;
  voice_personality?: VoicePersonality;
  meta_description?: string;
  keywords?: string[];
}

export interface UpdateBusinessInput extends Partial<CreateBusinessInput> {
  status?: BusinessStatus;
  verification_status?: VerificationStatus;
}

export interface CreateClaimInput {
  business_id: string;
  verification_email?: string;
  verification_phone?: string;
}

export interface CreateArticleInput {
  title: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  banner_image_url?: string;
  status?: ArticleStatus;
  scheduled_for?: string;
  meta_description?: string;
  keywords?: string[];
}

export interface CreateFeedPostInput {
  content: string;
  voice_url?: string;
  voice_transcript?: string;
  voice_duration?: number;
  images?: string[];
  post_type?: PostType;
}

export interface CreateReviewInput {
  business_id: string;
  rating: number;
  title?: string;
  content: string;
  photos?: string[];
}

export interface CreateAnalyticsEventInput {
  business_id?: string;
  event_type: AnalyticsEventType;
  session_id?: string;
  metadata?: Record<string, unknown>;
}
