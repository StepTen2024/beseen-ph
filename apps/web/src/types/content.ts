/**
 * BE SEEN.PH - Content Site Types
 * Phase 3: Content Site Engine
 * 
 * Types for articles, categories, and content management
 */

// ============================================================================
// ARTICLES TABLE
// ============================================================================

export interface Article {
  id: string;
  created_at: string;
  updated_at: string;

  // SEO Fields
  slug: string;
  title: string;
  meta_description: string;
  keywords: string[];

  // Content
  excerpt: string;
  content: string;
  featured_image?: string;

  // Categorization
  category: ArticleCategory;
  subcategory?: string;
  tags: string[];

  // Location (for local SEO)
  city?: string;
  province?: string;
  is_local_content: boolean;

  // AI Generation
  ai_generated: boolean;
  ai_model?: string;
  ai_prompt?: string;
  human_edited: boolean;

  // Publishing
  status: ArticleStatus;
  published_at?: string;
  author?: string;

  // Engagement
  view_count: number;
  share_count: number;

  // Monetization
  has_affiliate_links: boolean;
  affiliate_links?: AffiliateLink[];
}

export type ArticleCategory =
  | 'food'
  | 'travel'
  | 'lifestyle'
  | 'business'
  | 'ofw'
  | 'korean'
  | 'health'
  | 'tech'
  | 'news';

export type ArticleStatus = 'draft' | 'review' | 'published' | 'archived';

export interface AffiliateLink {
  text: string;
  url: string;
  type: 'lazada' | 'shopee' | 'amazon' | 'other';
}

// ============================================================================
// DIRECTORY LISTINGS TABLE
// ============================================================================

export interface DirectoryListing {
  id: string;
  created_at: string;
  updated_at: string;

  // Business Info
  name: string;
  slug: string;
  description: string;

  // Contact
  address: string;
  city: string;
  province: string;
  phone?: string;
  email?: string;
  website?: string;

  // Social
  facebook_url?: string;
  instagram_url?: string;

  // Category
  category: BusinessCategory;
  subcategories: string[];

  // Details
  hours?: OperatingHours;
  price_range?: 1 | 2 | 3 | 4; // $ to $$$$
  amenities: string[];
  services: string[];

  // Media
  photos: string[];
  logo?: string;

  // Location
  latitude?: number;
  longitude?: number;

  // Status
  is_claimed: boolean;
  claimed_by?: string; // client_id if claimed
  is_featured: boolean;
  is_verified: boolean;
  status: ListingStatus;

  // SEO
  meta_description?: string;
  keywords: string[];

  // Engagement
  view_count: number;
  click_to_call_count: number;
  click_to_map_count: number;

  // Reviews
  average_rating: number;
  review_count: number;

  // Plan
  listing_tier: 'free' | 'basic' | 'premium';
  listing_expires_at?: string;
}

export type BusinessCategory =
  | 'restaurant'
  | 'cafe'
  | 'salon'
  | 'spa'
  | 'clinic'
  | 'dental'
  | 'gym'
  | 'pet-store'
  | 'hotel'
  | 'resort'
  | 'school'
  | 'tutorial'
  | 'real-estate'
  | 'car-dealer'
  | 'hardware'
  | 'wedding'
  | 'events'
  | 'retail'
  | 'service'
  | 'place'
  | 'activity';

export type ListingStatus = 'active' | 'pending' | 'suspended' | 'expired';

export interface OperatingHours {
  monday?: { open: string; close: string; closed: boolean };
  tuesday?: { open: string; close: string; closed: boolean };
  wednesday?: { open: string; close: string; closed: boolean };
  thursday?: { open: string; close: string; closed: boolean };
  friday?: { open: string; close: string; closed: boolean };
  saturday?: { open: string; close: string; closed: boolean };
  sunday?: { open: string; close: string; closed: boolean };
}

// ============================================================================
// REVIEWS TABLE
// ============================================================================

export interface Review {
  id: string;
  created_at: string;

  listing_id: string;

  // Reviewer

  // Reviewer
  reviewer_name: string;
  reviewer_email?: string;
  is_verified: boolean;

  // Content
  rating: number;
  title?: string;
  content: string;
  photos?: string[];

  // Engagement
  helpful_count: number;

  // Response
  owner_response?: string;
  owner_responded_at?: string;

  // Status
  status: 'pending' | 'approved' | 'rejected';
}

// Alias for backward compatibility
export type DirectoryReview = Review;

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ArticleListResponse {
  articles: Article[];
  total: number;
  page: number;
  perPage: number;
}

export interface DirectoryListResponse {
  listings: DirectoryListing[];
  total: number;
  page: number;
  perPage: number;
  cities: string[];
  categories: string[];
}

export interface DirectoryFilterOptions {
  city?: string;
  category?: string;
  subcategory?: string;
  rating?: number;
  priceRange?: number;
  amenities?: string[];
  sortBy?: 'relevance' | 'rating' | 'newest' | 'popular';
}

// ============================================================================
// SEO META TYPES
// ============================================================================

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl: string;
  jsonLd?: Record<string, any>;
}

// ============================================================================
// CATEGORY CONFIGURATION
// ============================================================================

export interface CategoryConfig {
  slug: ArticleCategory;
  name: string;
  description: string;
  color: string;
  icon: string;
  subcategories: string[];
}

export const ARTICLE_CATEGORIES: CategoryConfig[] = [
  {
    slug: 'food',
    name: 'Food & Recipes',
    description: 'Filipino recipes, food reviews, and dining guides',
    color: 'from-orange-500 to-red-500',
    icon: 'utensils',
    subcategories: ['Recipes', 'Restaurant Reviews', 'Food Guides', 'Street Food', 'Desserts'],
  },
  {
    slug: 'travel',
    name: 'Travel & Places',
    description: 'Travel guides, destinations, and local attractions',
    color: 'from-cyan-500 to-blue-500',
    icon: 'map',
    subcategories: ['Destinations', 'Hotels', 'Itineraries', 'Budget Travel', 'Local Guides'],
  },
  {
    slug: 'lifestyle',
    name: 'Lifestyle',
    description: 'Tips, trends, and everyday life in the Philippines',
    color: 'from-fuchsia-500 to-purple-500',
    icon: 'heart',
    subcategories: ['Home', 'Fashion', 'Relationships', 'Hobbies', 'Events'],
  },
  {
    slug: 'business',
    name: 'Business',
    description: 'Small business tips, entrepreneurship, and marketing',
    color: 'from-emerald-500 to-teal-500',
    icon: 'briefcase',
    subcategories: ['Marketing', 'Finance', 'Startups', 'Tips', 'Success Stories'],
  },
  {
    slug: 'ofw',
    name: 'OFW Corner',
    description: 'Resources and tips for Overseas Filipino Workers',
    color: 'from-blue-500 to-indigo-500',
    icon: 'plane',
    subcategories: ['Remittance', 'Visa Guides', 'Jobs Abroad', 'Balikbayan', 'Tips'],
  },
  {
    slug: 'korean',
    name: 'K-Drama & K-Pop',
    description: 'Korean entertainment news, reviews, and updates',
    color: 'from-pink-500 to-rose-500',
    icon: 'tv',
    subcategories: ['K-Drama', 'K-Pop', 'K-Beauty', 'K-Food', 'Celebrity News'],
  },
];

// ============================================================================
// LOCATION DATA (Philippines)
// ============================================================================

export interface LocationData {
  city: string;
  province: string;
  region: string;
  population: number;
  description: string;
  keywords: string[];
}

export const PHILIPPINES_CITIES: LocationData[] = [
  {
    city: 'Angeles City',
    province: 'Pampanga',
    region: 'Central Luzon',
    population: 462000,
    description: 'A vibrant city in Pampanga known for its nightlife, restaurants, and proximity to Clark Freeport Zone.',
    keywords: ['angeles city pampanga', 'clark pampanga', 'angeles city restaurants', 'angeles city nightlife'],
  },
  {
    city: 'San Fernando',
    province: 'Pampanga',
    region: 'Central Luzon',
    population: 354000,
    description: 'The capital of Pampanga, famous for its Giant Lantern Festival and culinary heritage.',
    keywords: ['san fernando pampanga', 'giant lantern festival', 'pampanga capital'],
  },
  {
    city: 'Clark',
    province: 'Pampanga',
    region: 'Central Luzon',
    population: 120000,
    description: 'A growing economic zone with international airport, resorts, and business centers.',
    keywords: ['clark freeport', 'clark airport', 'clark pampanga hotels', 'clark zone'],
  },
  {
    city: 'Mabalacat',
    province: 'Pampanga',
    region: 'Central Luzon',
    population: 293000,
    description: 'A fast-growing city near Clark with residential areas and commercial developments.',
    keywords: ['mabalacat pampanga', 'near clark', 'mabalacat city'],
  },
  {
    city: 'Manila',
    province: 'Metro Manila',
    region: 'NCR',
    population: 1840000,
    description: 'The capital of the Philippines, a bustling metropolis with historic sites and modern attractions.',
    keywords: ['manila philippines', 'metro manila', 'manila tourist spots'],
  },
  {
    city: 'Makati',
    province: 'Metro Manila',
    region: 'NCR',
    population: 629000,
    description: 'The Philippines\' financial hub, known for skyscrapers, shopping, and nightlife.',
    keywords: ['makati city', 'makati cbd', 'bgc', 'makati restaurants'],
  },
  {
    city: 'Quezon City',
    province: 'Metro Manila',
    region: 'NCR',
    population: 2960000,
    description: 'The largest city in Metro Manila, home to government offices, universities, and entertainment.',
    keywords: ['quezon city', 'qc', 'quezon city restaurants', 'cubao'],
  },
  {
    city: 'Cebu City',
    province: 'Cebu',
    region: 'Central Visayas',
    population: 964000,
    description: 'The Queen City of the South, a major economic and tourism hub in the Visayas.',
    keywords: ['cebu city', 'cebu philippines', 'cebu tourist spots', 'cebu restaurants'],
  },
  {
    city: 'Davao City',
    province: 'Davao del Sur',
    region: 'Davao Region',
    population: 1776000,
    description: 'The largest city in Mindanao, known for durian, Mt. Apo, and being one of the safest cities.',
    keywords: ['davao city', 'davao philippines', 'durian capital', 'mt apo'],
  },
  {
    city: 'Baguio',
    province: 'Benguet',
    region: 'CAR',
    population: 366000,
    description: 'The Summer Capital of the Philippines, famous for its cool climate and strawberries.',
    keywords: ['baguio city', 'baguio philippines', 'baguio tourist spots', 'strawberry farm'],
  },
];

// ============================================================================
// DIRECTORY CATEGORY CONFIG
// ============================================================================

export interface DirectoryCategoryConfig {
  slug: BusinessCategory;
  name: string;
  pluralName: string;
  description: string;
  icon: string;
  searchKeywords: string[];
  amenities: string[];
  services: string[];
}

export const DIRECTORY_CATEGORIES: DirectoryCategoryConfig[] = [
  {
    slug: 'restaurant',
    name: 'Restaurant',
    pluralName: 'Restaurants',
    description: 'Find the best restaurants serving Filipino and international cuisine',
    icon: 'utensils',
    searchKeywords: ['restaurant', 'food', 'dining', 'eat', 'lunch', 'dinner', 'breakfast'],
    amenities: ['Air Conditioning', 'WiFi', 'Parking', 'Outdoor Seating', 'Private Rooms', 'Live Music', 'Buffet', 'Delivery'],
    services: ['Dine-in', 'Takeout', 'Delivery', 'Catering', 'Reservations', 'Buffet'],
  },
  {
    slug: 'cafe',
    name: 'Cafe',
    pluralName: 'Cafes',
    description: 'Cozy cafes for coffee, study, and casual meetings',
    icon: 'coffee',
    searchKeywords: ['cafe', 'coffee shop', 'coffee', 'study', 'wifi', 'pastries'],
    amenities: ['WiFi', 'Air Conditioning', 'Power Outlets', 'Outdoor Seating', 'Parking', 'Study Area'],
    services: ['Dine-in', 'Takeout', 'Delivery', 'Pastries', 'Coffee Beans'],
  },
  {
    slug: 'salon',
    name: 'Salon',
    pluralName: 'Salons',
    description: 'Hair salons, barber shops, and beauty parlors',
    icon: 'scissors',
    searchKeywords: ['salon', 'haircut', 'hair salon', 'barber', 'beauty parlor', 'hair color'],
    amenities: ['Air Conditioning', 'WiFi', 'Parking', 'TV', 'Refreshments'],
    services: ['Haircut', 'Hair Color', 'Rebond', 'Perm', 'Treatment', 'Manicure', 'Pedicure', 'Makeup'],
  },
  {
    slug: 'spa',
    name: 'Spa',
    pluralName: 'Spas',
    description: 'Relaxation and wellness centers',
    icon: 'sparkles',
    searchKeywords: ['spa', 'massage', 'relaxation', 'wellness', 'facial', 'body scrub'],
    amenities: ['Air Conditioning', 'Private Rooms', 'Shower', 'Sauna', 'Jacuzzi', 'Parking'],
    services: ['Full Body Massage', 'Foot Massage', 'Facial', 'Body Scrub', 'Manicure', 'Pedicure', 'Waxing'],
  },
  {
    slug: 'clinic',
    name: 'Clinic',
    pluralName: 'Clinics',
    description: 'Medical clinics and healthcare centers',
    icon: 'stethoscope',
    searchKeywords: ['clinic', 'doctor', 'medical', 'health', 'checkup', 'consultation'],
    amenities: ['Air Conditioning', 'Parking', 'Wheelchair Accessible', 'Laboratory', 'Pharmacy'],
    services: ['General Consultation', 'Laboratory Tests', 'Vaccination', 'Physical Exam', 'Specialist Consultation'],
  },
  {
    slug: 'dental',
    name: 'Dental Clinic',
    pluralName: 'Dental Clinics',
    description: 'Dental clinics and orthodontists',
    icon: 'smile',
    searchKeywords: ['dentist', 'dental', 'teeth', 'braces', 'tooth extraction', 'dental cleaning'],
    amenities: ['Air Conditioning', 'Parking', 'TV', 'Modern Equipment'],
    services: ['Dental Cleaning', 'Tooth Extraction', 'Fillings', 'Braces', 'Root Canal', 'Teeth Whitening', 'Dentures'],
  },
  {
    slug: 'gym',
    name: 'Gym',
    pluralName: 'Gyms',
    description: 'Fitness centers and gyms',
    icon: 'dumbbell',
    searchKeywords: ['gym', 'fitness', 'workout', 'exercise', 'training', 'weights'],
    amenities: ['Air Conditioning', 'Showers', 'Lockers', 'Parking', 'WiFi', 'Drinking Station'],
    services: ['Personal Training', 'Group Classes', 'Weight Training', 'Cardio', 'Yoga', 'Zumba', 'CrossFit'],
  },
  {
    slug: 'pet-store',
    name: 'Pet Store',
    pluralName: 'Pet Stores',
    description: 'Pet shops, supplies, and grooming services',
    icon: 'paw',
    searchKeywords: ['pet store', 'pet shop', 'pet supplies', 'dog food', 'cat food', 'pet grooming'],
    amenities: ['Air Conditioning', 'Parking', 'Grooming Area'],
    services: ['Pet Food', 'Pet Supplies', 'Grooming', 'Pet Boarding', 'Veterinary Services', 'Pet Accessories'],
  },
  {
    slug: 'hotel',
    name: 'Hotel',
    pluralName: 'Hotels',
    description: 'Hotels, inns, and accommodations',
    icon: 'bed',
    searchKeywords: ['hotel', 'inn', 'lodging', 'accommodation', 'staycation', 'room'],
    amenities: ['Air Conditioning', 'WiFi', 'Pool', 'Restaurant', 'Parking', 'Gym', 'Spa', 'Room Service'],
    services: ['Room Accommodation', 'Conference Rooms', 'Events', 'Restaurant', 'Laundry', 'Airport Transfer'],
  },
  {
    slug: 'school',
    name: 'School',
    pluralName: 'Schools',
    description: 'Schools, colleges, and educational institutions',
    icon: 'graduation-cap',
    searchKeywords: ['school', 'college', 'education', 'learning', 'tutorial', 'review center'],
    amenities: ['Air Conditioning', 'Library', 'Computer Lab', 'Cafeteria', 'Parking', 'Sports Facilities'],
    services: ['K-12 Education', 'College Programs', 'Review Classes', 'Tutorial Services', 'Online Classes'],
  },
  {
    slug: 'place',
    name: 'Place (Point of Interest)',
    pluralName: 'Places',
    description: 'Parks, landmarks, and public interest locations',
    icon: 'map-pin',
    searchKeywords: ['park', 'landmark', 'sightseeing', 'tourist spot', 'attraction', 'nature'],
    amenities: ['Parking', 'Restrooms', 'Picnic Area', 'Pet Friendly', 'Wheelchair Accessible'],
    services: ['Sightseeing', 'Photography', 'Walking Tours', 'Relaxation'],
  },
  {
    slug: 'activity',
    name: 'Activity',
    pluralName: 'Things to Do',
    description: 'Fun activities, tours, and experiences',
    icon: 'ticket',
    searchKeywords: ['activity', 'thing to do', 'fun', 'tour', 'experience', 'adventure'],
    amenities: ['Equipment Rental', 'Guide', 'Transport', 'Safety Gear', 'Food & Drinks'],
    services: ['Guided Tours', 'Lessons', 'Rentals', 'Day Pass', 'Group Packages'],
  },
];
