/**
 * BE SEEN.PH - Reusable Database Queries
 * Simplified for build compatibility
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  BusinessProfile,
  BusinessProfileInsert,
  BusinessProfileUpdate,
  ClaimRequest,
  ClaimRequestInsert,
  ContentArticle,
  ContentArticleInsert,
  SocialFeedPost,
  SocialFeedPostInsert,
  Review,
  AnalyticsEventInsert,
  BusinessStatus,
  ClaimStatus,
  ArticleStatus,
} from './types';

// ============================================================================
// BUSINESS QUERIES
// ============================================================================

export async function getBusinesses(
  supabase: any,
  options?: {
    city?: string;
    category?: string;
    status?: BusinessStatus;
    limit?: number;
    offset?: number;
    search?: string;
  }
) {
  let query = supabase
    .from('business_profiles')
    .select('*')
    .eq('status', options?.status || 'active');

  if (options?.city) {
    query = query.ilike('city', options.city);
  }

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.search) {
    query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  return query.order('total_views', { ascending: false });
}

export async function getBusinessBySlug(supabase: any, slug: string) {
  return supabase
    .from('business_profiles')
    .select('*')
    .eq('slug', slug)
    .single();
}

export async function getBusinessById(supabase: any, id: string) {
  return supabase
    .from('business_profiles')
    .select('*')
    .eq('id', id)
    .single();
}

export async function getBusinessWithRelations(supabase: any, slug: string) {
  const { data: business, error: bizError } = await supabase
    .from('business_profiles')
    .select('*')
    .eq('slug', slug)
    .single();
    
  if (bizError || !business) return { data: null, error: bizError };

  const [postsResult, reviewsResult] = await Promise.all([
    supabase
      .from('social_feed')
      .select('*')
      .eq('business_id', (business as any).id)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('reviews')
      .select('*')
      .eq('business_id', (business as any).id)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  return {
    data: {
      ...business,
      posts: postsResult.data || [],
      reviews: reviewsResult.data || [],
    },
    error: null,
  };
}

export async function getFeaturedBusinesses(supabase: any, limit = 6) {
  return supabase
    .from('business_profiles')
    .select('*')
    .eq('status', 'active')
    .gte('tier', 'basic')
    .order('total_views', { ascending: false })
    .limit(limit);
}

export async function searchBusinesses(supabase: any, query: string, limit = 20) {
  return supabase
    .from('business_profiles')
    .select('*')
    .eq('status', 'active')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
    .order('total_views', { ascending: false })
    .limit(limit);
}

export async function updateBusiness(
  supabase: any,
  id: string,
  updates: Partial<BusinessProfile>
) {
  return supabase
    .from('business_profiles')
    .update(updates as any)
    .eq('id', id)
    .select()
    .single();
}

export async function createBusiness(
  supabase: any,
  business: Partial<BusinessProfile>
) {
  return supabase
    .from('business_profiles')
    .insert(business as any)
    .select()
    .single();
}

// ============================================================================
// CLAIM QUERIES
// ============================================================================

export async function getClaims(
  supabase: any,
  options?: { status?: ClaimStatus; limit?: number }
) {
  let query = supabase
    .from('claim_requests')
    .select('*, business:business_profiles(name, city)');

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  return query.order('created_at', { ascending: false });
}

export async function createClaim(supabase: any, claim: Partial<ClaimRequest>) {
  return supabase
    .from('claim_requests')
    .insert(claim as any)
    .select()
    .single();
}

export async function updateClaim(
  supabase: any,
  id: string,
  updates: Partial<ClaimRequest>
) {
  return supabase
    .from('claim_requests')
    .update(updates as any)
    .eq('id', id)
    .select()
    .single();
}

// ============================================================================
// CONTENT QUERIES
// ============================================================================

export async function getArticles(
  supabase: any,
  options?: {
    businessId?: string;
    status?: ArticleStatus;
    limit?: number;
  }
) {
  let query = supabase.from('content_articles').select('*');

  if (options?.businessId) {
    query = query.eq('business_id', options.businessId);
  }

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  return query.order('created_at', { ascending: false });
}

export async function getArticleBySlug(supabase: any, slug: string) {
  return supabase
    .from('content_articles')
    .select('*, business:business_profiles(name, slug, logo_url)')
    .eq('slug', slug)
    .single();
}

export async function createArticle(supabase: any, article: Partial<ContentArticle>) {
  return supabase
    .from('content_articles')
    .insert(article as any)
    .select()
    .single();
}

// ============================================================================
// SOCIAL FEED QUERIES
// ============================================================================

export async function getFeedPosts(
  supabase: any,
  options?: { businessId?: string; limit?: number; featured?: boolean }
) {
  let query = supabase
    .from('social_feed')
    .select('*, business:business_profiles(name, slug, logo_url)');

  if (options?.businessId) {
    query = query.eq('business_id', options.businessId);
  }

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  return query.order('created_at', { ascending: false });
}

export async function createPost(supabase: any, post: Partial<SocialFeedPost>) {
  return supabase
    .from('social_feed')
    .insert(post as any)
    .select()
    .single();
}

// ============================================================================
// REVIEW QUERIES
// ============================================================================

export async function getReviews(
  supabase: any,
  businessId: string,
  options?: { status?: string; limit?: number }
) {
  let query = supabase
    .from('reviews')
    .select('*')
    .eq('business_id', businessId);

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  return query.order('created_at', { ascending: false });
}

export async function createReview(supabase: any, review: Partial<Review>) {
  return supabase
    .from('reviews')
    .insert(review as any)
    .select()
    .single();
}

// ============================================================================
// ANALYTICS QUERIES
// ============================================================================

export async function trackEvent(supabase: any, event: Partial<AnalyticsEventInsert>) {
  return supabase.from('analytics_events').insert(event as any);
}

export async function getBusinessAnalytics(
  supabase: any,
  businessId: string,
  days = 30
) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return supabase
    .from('analytics_events')
    .select('event_type, created_at')
    .eq('business_id', businessId)
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false });
}
