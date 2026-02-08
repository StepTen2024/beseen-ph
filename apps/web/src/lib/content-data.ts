/**
 * BE SEEN.PH - Content Data Layer
 * Mock data for development, connects to Supabase in production
 */

import sampleArticlesData from '@/data/sample-articles.json';

// Article type for internal use
export interface ArticleData {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  keywords: string[];
  city: string;
  province: string;
  is_local_content: boolean;
  ai_generated: boolean;
  ai_model: string;
  status: string;
  featured_image: string | null;
  author: { name: string };
  view_count: number;
  share_count: number;
  created_at: string;
  updated_at: string;
  published_at: string;
}

// Transform sample articles to match expected format
export const ARTICLES: ArticleData[] = sampleArticlesData.map(article => ({
  ...article,
  author: { name: article.author }
}));

export const CATEGORIES = ['food', 'nightlife', 'travel', 'lifestyle'];
export const CITIES = ['Angeles City', 'Clark', 'Pampanga', 'Manila'];

interface GetArticlesOptions {
  category?: string;
  city?: string;
  page?: number;
  limit?: number;
}

export async function getArticles(options: GetArticlesOptions = {}) {
  const { category, city, page = 1, limit = 20 } = options;
  let filtered = [...ARTICLES];
  
  if (category) {
    filtered = filtered.filter(a => a.category === category);
  }
  if (city) {
    filtered = filtered.filter(a => a.city === city);
  }
  
  const start = (page - 1) * limit;
  const articles = filtered.slice(start, start + limit);
  
  return { articles, total: filtered.length };
}

export async function getArticleBySlug(slug: string) {
  return ARTICLES.find(a => a.slug === slug) || null;
}

export async function searchArticles(query: string, limit = 20) {
  const q = query.toLowerCase();
  return ARTICLES.filter(a => 
    a.title.toLowerCase().includes(q) || 
    a.excerpt.toLowerCase().includes(q)
  ).slice(0, limit);
}

export async function createArticle(data: Partial<ArticleData>): Promise<ArticleData> {
  const now = new Date().toISOString();
  const article: ArticleData = {
    id: String(Date.now()),
    slug: data.slug || '',
    title: data.title || '',
    meta_description: data.meta_description || '',
    excerpt: data.excerpt || '',
    content: data.content || '',
    category: data.category || 'food',
    tags: data.tags || [],
    keywords: data.keywords || [],
    city: data.city || 'Angeles City',
    province: data.province || 'Pampanga',
    is_local_content: data.is_local_content ?? true,
    ai_generated: data.ai_generated ?? false,
    ai_model: data.ai_model || '',
    status: data.status || 'draft',
    featured_image: data.featured_image || null,
    author: data.author || { name: 'BE SEEN Team' },
    view_count: data.view_count || 0,
    share_count: data.share_count || 0,
    created_at: data.created_at || now,
    updated_at: data.updated_at || now,
    published_at: data.published_at || now,
  };
  ARTICLES.push(article);
  return article;
}

export async function getBusinesses(options: { city?: string; category?: string } = {}) {
  // Mock businesses data
  return {
    businesses: [],
    total: 0
  };
}

// Directory/Listing functions
export const LISTINGS = [
  {
    id: '1',
    slug: 'wings-things-angeles',
    name: 'Wings & Things',
    category: 'restaurant',
    city: 'Angeles City',
    description: 'Best wings in town',
    address: '123 Fields Ave',
    rating: 4.5,
    reviewCount: 100,
  },
];

export async function getListings(options: { city?: string; category?: string; page?: number; limit?: number } = {}) {
  const { city, category, page = 1, limit = 20 } = options;
  let filtered = [...LISTINGS];
  
  if (city) filtered = filtered.filter(l => l.city === city);
  if (category) filtered = filtered.filter(l => l.category === category);
  
  const start = (page - 1) * limit;
  return { listings: filtered.slice(start, start + limit), total: filtered.length };
}

export async function getListingBySlug(slug: string) {
  return LISTINGS.find(l => l.slug === slug) || null;
}

export async function searchListings(query: string, limit = 20) {
  const q = query.toLowerCase();
  return LISTINGS.filter(l => 
    l.name.toLowerCase().includes(q) || 
    l.description.toLowerCase().includes(q)
  ).slice(0, limit);
}

export async function createListing(data: Partial<typeof LISTINGS[0]>) {
  const listing = {
    id: String(Date.now()),
    slug: data.slug || '',
    name: data.name || '',
    category: data.category || 'restaurant',
    city: data.city || 'Angeles City',
    description: data.description || '',
    address: data.address || '',
    rating: 0,
    reviewCount: 0,
  };
  LISTINGS.push(listing);
  return listing;
}

export async function getCitiesWithListings() {
  const cities = [...new Set(LISTINGS.map(l => l.city))];
  return cities.map(city => ({
    name: city,
    slug: city.toLowerCase().replace(/\s+/g, '-'),
    count: LISTINGS.filter(l => l.city === city).length,
  }));
}

export async function getCategoriesByCity(city: string) {
  const cityListings = LISTINGS.filter(l => l.city === city);
  const categories = [...new Set(cityListings.map(l => l.category))];
  return categories.map(cat => ({
    name: cat,
    slug: cat.toLowerCase(),
    count: cityListings.filter(l => l.category === cat).length,
  }));
}

export async function getRelatedArticles(articleId: string, limit = 4) {
  // Return articles related to the current one
  return ARTICLES.filter(a => a.id !== articleId).slice(0, limit);
}
