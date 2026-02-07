/**
 * BE SEEN.PH - Mock Data for Development
 */

export interface MockBusiness {
  id: string;
  name: string;
  slug: string;
  category: string;
  city: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  hours: Record<string, { open: string; close: string }>;
  photos: string[];
  amenities: string[];
}

export interface MockArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  city: string;
  featuredImage: string;
  publishedAt: string;
  author: { name: string; avatar?: string };
}

export const MOCK_BUSINESSES: MockBusiness[] = [
  {
    id: '1',
    name: 'Wings & Things Angeles',
    slug: 'wings-things-angeles',
    category: 'restaurant',
    city: 'Angeles City',
    description: 'Best buffalo wings in Pampanga',
    address: '123 Fields Ave, Angeles City',
    latitude: 15.1425,
    longitude: 120.5887,
    rating: 4.7,
    reviewCount: 234,
    hours: {
      monday: { open: '11:00', close: '22:00' },
      tuesday: { open: '11:00', close: '22:00' },
    },
    photos: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445'],
    amenities: ['wifi', 'parking', 'outdoor-seating'],
  },
  {
    id: '2',
    name: 'Cafe Lupe Clark',
    slug: 'cafe-lupe-clark',
    category: 'cafe',
    city: 'Clark',
    description: 'Premium coffee and pastries',
    address: '456 CBD Clark, Pampanga',
    latitude: 15.1845,
    longitude: 120.5467,
    rating: 4.5,
    reviewCount: 156,
    hours: {
      monday: { open: '07:00', close: '21:00' },
    },
    photos: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'],
    amenities: ['wifi', 'aircon'],
  },
];

export const MOCK_ARTICLES: MockArticle[] = [
  {
    id: '1',
    slug: 'best-pizza-angeles',
    title: 'Best Pizza in Angeles City 2024',
    excerpt: 'We tried all the pizza joints so you don\'t have to...',
    content: 'Full article content here...',
    category: 'food',
    city: 'Angeles City',
    featuredImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    publishedAt: new Date().toISOString(),
    author: { name: 'BE SEEN Team' },
  },
  {
    id: '2',
    slug: 'nightlife-guide-clark',
    title: 'Ultimate Nightlife Guide: Clark',
    excerpt: 'Where to party in Clark Freeport Zone...',
    content: 'Full article content here...',
    category: 'nightlife',
    city: 'Clark',
    featuredImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    publishedAt: new Date().toISOString(),
    author: { name: 'BE SEEN Team' },
  },
];

export const MOCK_LISTINGS = MOCK_BUSINESSES;

export function getMockBusinesses(options?: { city?: string; category?: string }) {
  let result = [...MOCK_BUSINESSES];
  if (options?.city) {
    result = result.filter(b => b.city === options.city);
  }
  if (options?.category) {
    result = result.filter(b => b.category === options.category);
  }
  return result;
}

export function getMockListings() {
  return MOCK_LISTINGS;
}

export function getMockArticles(options?: { city?: string; category?: string }) {
  let result = [...MOCK_ARTICLES];
  if (options?.city) {
    result = result.filter(a => a.city === options.city);
  }
  if (options?.category) {
    result = result.filter(a => a.category === options.category);
  }
  return result;
}

export function getMockArticlesByCity(city: string) {
  return MOCK_ARTICLES.filter(a => a.city === city);
}

export function getMockBusinessBySlug(slug: string) {
  return MOCK_BUSINESSES.find(b => b.slug === slug) || null;
}
