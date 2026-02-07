/**
 * BE SEEN.PH - Database Types for Admin
 * Local types without re-exporting from problematic package
 */

export type UserRole = 'public' | 'business' | 'admin';
export type BusinessStatus = 'pending' | 'active' | 'inactive' | 'suspended';
export type VerificationStatus = 'unclaimed' | 'pending' | 'verified' | 'rejected';
export type Tier = 'free' | 'basic' | 'premium';

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

export type ClaimStatus = 'pending' | 'approved' | 'rejected';

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

export interface BusinessProfile {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  city: string;
  status: BusinessStatus;
  verification_status: VerificationStatus;
  tier: Tier;
  total_views: number;
  average_rating: number;
  review_count: number;
}
