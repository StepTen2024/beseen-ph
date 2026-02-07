/**
 * BE SEEN.PH - Database Types for Business App
 * Local types without re-exporting from problematic package
 */

export type UserRole = 'public' | 'business' | 'admin';
export type BusinessStatus = 'pending' | 'active' | 'inactive' | 'suspended';
export type VerificationStatus = 'unclaimed' | 'pending' | 'verified' | 'rejected';
export type Tier = 'free' | 'basic' | 'premium';
export type PostType = 'update' | 'promo' | 'event' | 'milestone';

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
  status: 'pending' | 'approved' | 'rejected';
  is_verified: boolean;
}
