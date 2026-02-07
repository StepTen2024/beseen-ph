/**
 * BE SEEN.PH - Supabase Database Type Definitions
 * Full Database interface for type-safe queries
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
// DATABASE INTERFACE (for Supabase client)
// ============================================================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          role: UserRole
          business_id: string | null
          preferred_language: string
          notifications_enabled: boolean
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: UserRole
          business_id?: string | null
          preferred_language?: string
          notifications_enabled?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: UserRole
          business_id?: string | null
          preferred_language?: string
          notifications_enabled?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "profiles_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      business_profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          slug: string
          description: string | null
          category: string
          subcategories: string[] | null
          address: string
          city: string
          province: string | null
          postal_code: string | null
          country: string
          location: unknown | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          email: string | null
          website: string | null
          facebook_url: string | null
          instagram_url: string | null
          hours: Json | null
          amenities: string[]
          services: string[]
          logo_url: string | null
          banner_url: string | null
          photos: string[]
          primary_color: string
          secondary_color: string
          voice_personality: VoicePersonality
          status: BusinessStatus
          verification_status: VerificationStatus
          claimed_by: string | null
          claimed_at: string | null
          tier: Tier
          gold_tokens: number
          total_views: number
          total_calls: number
          total_directions: number
          average_rating: number
          review_count: number
          last_content_generated_at: string | null
          content_generation_count: number
          last_activity_at: string
          inactivity_warning_sent: boolean
          meta_description: string | null
          keywords: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          slug: string
          description?: string | null
          category: string
          subcategories?: string[] | null
          address: string
          city: string
          province?: string | null
          postal_code?: string | null
          country?: string
          location?: unknown | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          email?: string | null
          website?: string | null
          facebook_url?: string | null
          instagram_url?: string | null
          hours?: Json | null
          amenities?: string[]
          services?: string[]
          logo_url?: string | null
          banner_url?: string | null
          photos?: string[]
          primary_color?: string
          secondary_color?: string
          voice_personality?: VoicePersonality
          status?: BusinessStatus
          verification_status?: VerificationStatus
          claimed_by?: string | null
          claimed_at?: string | null
          tier?: Tier
          gold_tokens?: number
          total_views?: number
          total_calls?: number
          total_directions?: number
          average_rating?: number
          review_count?: number
          last_content_generated_at?: string | null
          content_generation_count?: number
          last_activity_at?: string
          inactivity_warning_sent?: boolean
          meta_description?: string | null
          keywords?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          slug?: string
          description?: string | null
          category?: string
          subcategories?: string[] | null
          address?: string
          city?: string
          province?: string | null
          postal_code?: string | null
          country?: string
          location?: unknown | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          email?: string | null
          website?: string | null
          facebook_url?: string | null
          instagram_url?: string | null
          hours?: Json | null
          amenities?: string[]
          services?: string[]
          logo_url?: string | null
          banner_url?: string | null
          photos?: string[]
          primary_color?: string
          secondary_color?: string
          voice_personality?: VoicePersonality
          status?: BusinessStatus
          verification_status?: VerificationStatus
          claimed_by?: string | null
          claimed_at?: string | null
          tier?: Tier
          gold_tokens?: number
          total_views?: number
          total_calls?: number
          total_directions?: number
          average_rating?: number
          review_count?: number
          last_content_generated_at?: string | null
          content_generation_count?: number
          last_activity_at?: string
          inactivity_warning_sent?: boolean
          meta_description?: string | null
          keywords?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "business_profiles_claimed_by_fkey"
            columns: ["claimed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      claim_requests: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          business_id: string
          claimed_by: string
          verification_email: string | null
          verification_phone: string | null
          business_registration_doc: string | null
          status: ClaimStatus
          reviewed_by: string | null
          reviewed_at: string | null
          rejection_reason: string | null
          tokens_awarded: boolean
          tokens_awarded_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          business_id: string
          claimed_by: string
          verification_email?: string | null
          verification_phone?: string | null
          business_registration_doc?: string | null
          status?: ClaimStatus
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          tokens_awarded?: boolean
          tokens_awarded_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          business_id?: string
          claimed_by?: string
          verification_email?: string | null
          verification_phone?: string | null
          business_registration_doc?: string | null
          status?: ClaimStatus
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          tokens_awarded?: boolean
          tokens_awarded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claim_requests_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claim_requests_claimed_by_fkey"
            columns: ["claimed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claim_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      content_articles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          business_id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          ai_generated: boolean
          ai_prompt: string | null
          gemini_model: string | null
          featured_image_url: string | null
          banner_image_url: string | null
          status: ArticleStatus
          published_at: string | null
          scheduled_for: string | null
          meta_description: string | null
          keywords: string[] | null
          view_count: number
          share_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          business_id: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          ai_generated?: boolean
          ai_prompt?: string | null
          gemini_model?: string | null
          featured_image_url?: string | null
          banner_image_url?: string | null
          status?: ArticleStatus
          published_at?: string | null
          scheduled_for?: string | null
          meta_description?: string | null
          keywords?: string[] | null
          view_count?: number
          share_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          business_id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          ai_generated?: boolean
          ai_prompt?: string | null
          gemini_model?: string | null
          featured_image_url?: string | null
          banner_image_url?: string | null
          status?: ArticleStatus
          published_at?: string | null
          scheduled_for?: string | null
          meta_description?: string | null
          keywords?: string[] | null
          view_count?: number
          share_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "content_articles_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      social_feed: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          business_id: string
          author_id: string
          content: string
          voice_url: string | null
          voice_transcript: string | null
          voice_duration: number | null
          images: string[]
          post_type: PostType
          likes_count: number
          comments_count: number
          is_pinned: boolean
          is_featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          business_id: string
          author_id: string
          content: string
          voice_url?: string | null
          voice_transcript?: string | null
          voice_duration?: number | null
          images?: string[]
          post_type?: PostType
          likes_count?: number
          comments_count?: number
          is_pinned?: boolean
          is_featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          business_id?: string
          author_id?: string
          content?: string
          voice_url?: string | null
          voice_transcript?: string | null
          voice_duration?: number | null
          images?: string[]
          post_type?: PostType
          likes_count?: number
          comments_count?: number
          is_pinned?: boolean
          is_featured?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "social_feed_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_feed_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          business_id: string
          author_id: string | null
          rating: number
          title: string | null
          content: string
          photos: string[]
          helpful_count: number
          response: string | null
          responded_at: string | null
          responded_by: string | null
          status: ReviewStatus
          is_verified: boolean
          triggered_activity: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          business_id: string
          author_id?: string | null
          rating: number
          title?: string | null
          content: string
          photos?: string[]
          helpful_count?: number
          response?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: ReviewStatus
          is_verified?: boolean
          triggered_activity?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          business_id?: string
          author_id?: string | null
          rating?: number
          title?: string | null
          content?: string
          photos?: string[]
          helpful_count?: number
          response?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: ReviewStatus
          is_verified?: boolean
          triggered_activity?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "reviews_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_responded_by_fkey"
            columns: ["responded_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      analytics_events: {
        Row: {
          id: string
          created_at: string
          business_id: string | null
          event_type: AnalyticsEventType
          session_id: string | null
          ip_hash: string | null
          user_agent: string | null
          referrer: string | null
          city: string | null
          country: string | null
          metadata: Json
        }
        Insert: {
          id?: string
          created_at?: string
          business_id?: string | null
          event_type: AnalyticsEventType
          session_id?: string | null
          ip_hash?: string | null
          user_agent?: string | null
          referrer?: string | null
          city?: string | null
          country?: string | null
          metadata?: Json
        }
        Update: {
          id?: string
          created_at?: string
          business_id?: string | null
          event_type?: AnalyticsEventType
          session_id?: string | null
          ip_hash?: string | null
          user_agent?: string | null
          referrer?: string | null
          city?: string | null
          country?: string | null
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      token_transactions: {
        Row: {
          id: string
          created_at: string
          business_id: string
          amount: number
          balance_after: number
          transaction_type: TokenTransactionType
          description: string | null
          related_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          business_id: string
          amount: number
          balance_after: number
          transaction_type: TokenTransactionType
          description?: string | null
          related_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          business_id?: string
          amount?: number
          balance_after?: number
          transaction_type?: TokenTransactionType
          description?: string | null
          related_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      business_analytics_daily: {
        Row: {
          business_id: string | null
          date: string | null
          event_type: AnalyticsEventType | null
          count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      deactivate_inactive_businesses: {
        Args: Record<string, never>
        Returns: number
      }
      update_business_activity: {
        Args: {
          business_uuid: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// ============================================================================
// CONVENIENCE TYPE ALIASES
// ============================================================================

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type BusinessProfile = Database['public']['Tables']['business_profiles']['Row'];
export type BusinessProfileInsert = Database['public']['Tables']['business_profiles']['Insert'];
export type BusinessProfileUpdate = Database['public']['Tables']['business_profiles']['Update'];

export type ClaimRequest = Database['public']['Tables']['claim_requests']['Row'];
export type ClaimRequestInsert = Database['public']['Tables']['claim_requests']['Insert'];
export type ClaimRequestUpdate = Database['public']['Tables']['claim_requests']['Update'];

export type ContentArticle = Database['public']['Tables']['content_articles']['Row'];
export type ContentArticleInsert = Database['public']['Tables']['content_articles']['Insert'];
export type ContentArticleUpdate = Database['public']['Tables']['content_articles']['Update'];

export type SocialFeedPost = Database['public']['Tables']['social_feed']['Row'];
export type SocialFeedPostInsert = Database['public']['Tables']['social_feed']['Insert'];
export type SocialFeedPostUpdate = Database['public']['Tables']['social_feed']['Update'];

export type Review = Database['public']['Tables']['reviews']['Row'];
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update'];

export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row'];
export type AnalyticsEventInsert = Database['public']['Tables']['analytics_events']['Insert'];
export type AnalyticsEventUpdate = Database['public']['Tables']['analytics_events']['Update'];

export type TokenTransaction = Database['public']['Tables']['token_transactions']['Row'];
export type TokenTransactionInsert = Database['public']['Tables']['token_transactions']['Insert'];
export type TokenTransactionUpdate = Database['public']['Tables']['token_transactions']['Update'];

// ============================================================================
// JOINED/EXTENDED TYPES (for API responses)
// ============================================================================

export interface BusinessWithRelations extends BusinessProfile {
  owner?: Profile;
  articles?: ContentArticle[];
  posts?: SocialFeedPost[];
  reviews?: Review[];
}

export interface ClaimRequestWithRelations extends ClaimRequest {
  business?: BusinessProfile;
  claimant?: Profile;
  reviewer?: Profile;
}

export interface ArticleWithBusiness extends ContentArticle {
  business?: BusinessProfile;
}

export interface ReviewWithAuthor extends Review {
  author?: Profile;
  business?: BusinessProfile;
}

// ============================================================================
// HOURS TYPE HELPER
// ============================================================================

export interface BusinessHours {
  [day: string]: {
    open: string;
    close: string;
    closed?: boolean;
  };
}
