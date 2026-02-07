/**
 * BE SEEN.PH - Admin Database Types
 * Local types for admin app
 */

// Legacy Client type for admin dashboard
export type Client = {
  id: string;
  created_at: string;
  updated_at: string;
  business_name: string;
  niche: string;
  description?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  status: 'active' | 'paused' | 'cancelled' | 'trial';
  subscription_tier: 'starter' | 'growth' | 'premium' | 'inactive';
  monthly_fee: number;
  facebook_connected: boolean;
  facebook_page_name?: string;
  onboarding_completed: boolean;
  notes?: string;
};

// Post type for content calendar
export type PostStatus = 
  | 'draft' 
  | 'pending_approval' 
  | 'approved' 
  | 'scheduled' 
  | 'published' 
  | 'failed' 
  | 'rejected';

export type PostType = 
  | 'engagement'
  | 'product'
  | 'social_proof'
  | 'educational'
  | 'promotional'
  | 'behind_scenes'
  | 'holiday'
  | 'viral';

export type Post = {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  content: string;
  type: PostType;
  ai_prompt?: string;
  ai_model?: string;
  image_url?: string;
  image_prompt?: string;
  scheduled_date: string;
  scheduled_time?: string;
  scheduled_for?: string;
  status: PostStatus;
  published_at?: string;
  published_post_id?: string;
  published_url?: string;
  likes_count?: number;
  comments_count?: number;
  shares_count?: number;
  reach_count?: number;
  client_feedback?: string;
  requires_revision: boolean;
  revision_notes?: string;
  error_message?: string;
  retry_count: number;
};

// User roles
export type UserRole = 'public' | 'business' | 'admin';
