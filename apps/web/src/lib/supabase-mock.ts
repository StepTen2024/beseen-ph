/**
 * BE SEEN.PH - Supabase Mock Layer
 * Mock data for development
 */

import type { Client, SubscriptionTier } from '@/types/database';

export const mockClients: Client[] = [
  { 
    id: '1', 
    business_name: 'Wings & Things', 
    niche: 'restaurant',
    status: 'active', 
    subscription_tier: 'seryoso' as SubscriptionTier,
    monthly_fee: 5000,
    preferred_language: 'taglish',
    posting_timezone: 'Asia/Manila',
    facebook_connected: true,
    onboarding_completed: true,
    password_hash: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  { 
    id: '2', 
    business_name: 'Cafe Lupe', 
    niche: 'cafe',
    status: 'trial', 
    subscription_tier: 'tingin' as SubscriptionTier,
    monthly_fee: 2000,
    preferred_language: 'taglish',
    posting_timezone: 'Asia/Manila',
    facebook_connected: false,
    onboarding_completed: false,
    password_hash: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getClients() {
  return mockClients;
}

export async function getActiveClients() {
  return mockClients.filter(c => c.status === 'active');
}

export async function getClientById(id: string) {
  return mockClients.find(c => c.id === id) || null;
}

export async function createClientRecord(data: Partial<Client>): Promise<Client | null> {
  const client: Client = {
    id: String(Date.now()),
    business_name: data.business_name || '',
    niche: data.niche || 'general',
    status: data.status || 'trial',
    subscription_tier: data.subscription_tier || ('starter' as SubscriptionTier),
    monthly_fee: data.monthly_fee || 2000,
    preferred_language: data.preferred_language || 'taglish',
    posting_timezone: data.posting_timezone || 'Asia/Manila',
    facebook_connected: data.facebook_connected || false,
    onboarding_completed: data.onboarding_completed || false,
    password_hash: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockClients.push(client);
  return client;
}

export async function updateClient(id: string, updates: Partial<Client>): Promise<Client | null> {
  const index = mockClients.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  mockClients[index] = {
    ...mockClients[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return mockClients[index];
}

// Post-related functions
import type { Post, PostStatus, PostType } from '@/types/database';

export const mockPosts: Post[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    client_id: '1',
    content: 'Check out our new wings flavor! 🔥',
    type: 'product' as PostType,
    status: 'published' as PostStatus,
    scheduled_date: new Date().toISOString().split('T')[0],
    requires_revision: false,
    retry_count: 0,
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    client_id: '1',
    content: 'What\'s your favorite dipping sauce?',
    type: 'engagement' as PostType,
    status: 'pending_approval' as PostStatus,
    scheduled_date: new Date().toISOString().split('T')[0],
    requires_revision: false,
    retry_count: 0,
  },
];

export async function getPostById(id: string): Promise<Post | null> {
  return mockPosts.find(p => p.id === id) || null;
}

export async function getPostsByClient(clientId: string): Promise<Post[]> {
  return mockPosts.filter(p => p.client_id === clientId);
}

export async function getPostsPendingApproval(): Promise<Post[]> {
  return mockPosts.filter(p => p.status === 'pending_approval');
}

export async function createPost(data: Partial<Post>): Promise<Post | null> {
  const post: Post = {
    id: String(Date.now()),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    client_id: data.client_id || '',
    content: data.content || '',
    type: data.type || ('engagement' as PostType),
    status: data.status || ('draft' as PostStatus),
    scheduled_date: data.scheduled_date || new Date().toISOString().split('T')[0],
    requires_revision: false,
    retry_count: 0,
  };
  mockPosts.push(post);
  return post;
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post | null> {
  const index = mockPosts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  mockPosts[index] = {
    ...mockPosts[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return mockPosts[index];
}
