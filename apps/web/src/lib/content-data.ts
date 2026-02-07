/**
 * BE SEEN.PH - Content Data Layer
 * Mock data for development, connects to Supabase in production
 */

export const ARTICLES = [
  { 
    id: '1', 
    slug: 'best-pizza-angeles', 
    title: 'Best Pizza in Angeles City', 
    excerpt: 'We tried them all...', 
    content: 'Full article content here...',
    category: 'food',
    city: 'Angeles City',
    status: 'published',
    published_at: new Date().toISOString(),
    view_count: 0,
    author: { name: 'BE SEEN Team' }
  },
  { 
    id: '2', 
    slug: 'nightlife-clark', 
    title: 'Nightlife Guide: Clark', 
    excerpt: 'Where to party...', 
    content: 'Full article content here...',
    category: 'nightlife',
    city: 'Clark',
    status: 'published',
    published_at: new Date().toISOString(),
    view_count: 0,
    author: { name: 'BE SEEN Team' }
  },
];

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

export async function createArticle(data: Partial<typeof ARTICLES[0]>) {
  const article = {
    id: String(Date.now()),
    slug: data.slug || '',
    title: data.title || '',
    excerpt: data.excerpt || '',
    content: data.content || '',
    category: data.category || 'food',
    city: data.city || 'Angeles City',
    status: data.status || 'draft',
    published_at: new Date().toISOString(),
    view_count: 0,
    author: { name: 'BE SEEN Team' }
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
