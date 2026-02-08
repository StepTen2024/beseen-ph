/**
 * BE SEEN.PH - Content Data Layer
 * Real article data with full metadata
 * TODO: Add markdown parsing for dynamic content loading
 */

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  city: string;
  tags: string[];
  status: 'draft' | 'published';
  published_at: string;
  view_count: number;
  author: { name: string };
  featured_image?: string;
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'best-pizza-angeles-city',
    title: 'Best Pizza in Angeles City - Where to Get Your Fix',
    excerpt: 'We ate way too much pizza so you don\'t have to guess. Here\'s where to find the best slices in Angeles City, from authentic Italian to late-night delivery.',
    content: '', // Full content in markdown file
    category: 'food',
    city: 'Angeles City',
    tags: ['pizza', 'italian', 'restaurants', 'food guide'],
    status: 'published',
    published_at: '2025-01-15T10:00:00Z',
    view_count: 0,
    author: { name: 'BE SEEN Team' },
    featured_image: '/images/articles/pizza-angeles.jpg'
  },
  {
    id: '2',
    slug: 'nightlife-guide-walking-street',
    title: 'Nightlife Guide: Walking Street, Angeles City - The Complete Breakdown',
    excerpt: 'Everything you need to know about Angeles City\'s famous (or infamous) Walking Street. Bars, clubs, what to expect, and how to navigate it all.',
    content: '',
    category: 'nightlife',
    city: 'Angeles City',
    tags: ['nightlife', 'bars', 'walking street', 'entertainment', 'fields avenue'],
    status: 'published',
    published_at: '2025-01-15T12:00:00Z',
    view_count: 0,
    author: { name: 'BE SEEN Team' },
    featured_image: '/images/articles/walking-street.jpg'
  },
  {
    id: '3',
    slug: 'top-korean-restaurants-clark',
    title: 'Top 10 Korean Restaurants in Clark for Authentic K-Food',
    excerpt: 'Clark has a massive Korean community, which means legit Korean food. Here are the best Korean BBQ joints, fried chicken spots, and casual Korean eateries.',
    content: '',
    category: 'food',
    city: 'Clark',
    tags: ['korean food', 'korean bbq', 'restaurants', 'clark freeport'],
    status: 'published',
    published_at: '2025-01-16T10:00:00Z',
    view_count: 0,
    author: { name: 'BE SEEN Team' },
    featured_image: '/images/articles/korean-bbq-clark.jpg'
  },
  {
    id: '4',
    slug: 'hidden-gems-malabanias',
    title: 'Hidden Gems in Malabanias - Local\'s Guide to the Neighborhood',
    excerpt: 'Malabanias is more than just a street. Here are the restaurants, bars, and spots that locals love but tourists miss.',
    content: '',
    category: 'hidden-gems',
    city: 'Angeles City',
    tags: ['malabanias', 'hidden gems', 'local tips', 'restaurants', 'bars'],
    status: 'published',
    published_at: '2025-01-17T10:00:00Z',
    view_count: 0,
    author: { name: 'BE SEEN Team' },
    featured_image: '/images/articles/malabanias-street.jpg'
  },
  {
    id: '5',
    slug: 'family-activities-angeles-city',
    title: 'Family Activities in Angeles City & Clark - Things to Do with Kids',
    excerpt: 'Planning a family day out? Here are the best kid-friendly activities, attractions, and places in Angeles City and Clark Freeport Zone.',
    content: '',
    category: 'things-to-do',
    city: 'Angeles City',
    tags: ['family', 'kids', 'activities', 'clark', 'attractions'],
    status: 'published',
    published_at: '2025-01-18T10:00:00Z',
    view_count: 0,
    author: { name: 'BE SEEN Team' },
    featured_image: '/images/articles/family-clark.jpg'
  },
  {
    id: '6',
    slug: 'coffee-shops-angeles-city',
    title: 'Coffee Shops in Angeles City with Great WiFi for Remote Work',
    excerpt: 'Working remotely in Angeles? Here are the best cafes with reliable WiFi, good coffee, and laptop-friendly vibes.',
    content: '',
    category: 'lifestyle',
    city: 'Angeles City',
    tags: ['coffee', 'wifi', 'remote work', 'digital nomad', 'cafes'],
    status: 'published',
    published_at: '2025-01-19T10:00:00Z',
    view_count: 0,
    author: { name: 'BE SEEN Team' },
    featured_image: '/images/articles/coffee-angeles.jpg'
  },
  {
    id: '7',
    slug: 'late-night-eats-angeles-city',
    title: 'Late Night Eats in Angeles City - Where to Eat After Midnight',
    excerpt: 'Hungry at 2 AM? Here\'s where to find food when most places are closed. From 24-hour spots to after-hours kitchens.',
    content: '',
    category: 'food',
    city: 'Angeles City',
    tags: ['late night', 'food', '24 hours', 'restaurants', 'after midnight'],
    status: 'published',
    published_at: '2025-01-20T10:00:00Z',
    view_count: 0,
    author: { name: 'BE SEEN Team' },
    featured_image: '/images/articles/late-night-food.jpg'
  },
  {
    id: '8',
    slug: 'best-breakfast-spots-angeles-city',
    title: 'Best Breakfast Spots in Angeles City - Morning Fuel Guide',
    excerpt: 'Whether you want a full English, Filipino silog, or just good coffee, here\'s where to start your day in Angeles City.',
    content: '',
    category: 'food',
    city: 'Angeles City',
    tags: ['breakfast', 'brunch', 'restaurants', 'morning', 'food guide'],
    status: 'published',
    published_at: '2025-01-21T10:00:00Z',
    view_count: 0,
    author: { name: 'BE SEEN Team' },
    featured_image: '/images/articles/breakfast-angeles.jpg'
  },
  {
    id: '9',
    slug: 'mt-pinatubo-trek-guide',
    title: 'Day Trip: Mt. Pinatubo Trek from Angeles City - Complete Guide',
    excerpt: 'Everything you need to know about hiking Mt. Pinatubo from Angeles City. How to book, what to bring, what to expect, and whether it\'s worth it.',
    content: '',
    category: 'travel',
    city: 'Angeles City',
    tags: ['mt pinatubo', 'hiking', 'day trip', 'volcano', 'adventure', 'nature'],
    status: 'published',
    published_at: '2025-01-22T10:00:00Z',
    view_count: 0,
    author: { name: 'BE SEEN Team' },
    featured_image: '/images/articles/pinatubo-crater.jpg'
  },
  {
    id: '10',
    slug: 'cost-of-living-angeles-city',
    title: 'Cost of Living in Angeles City - Expat\'s Budget Breakdown',
    excerpt: 'What does it actually cost to live in Angeles City? Real numbers for rent, food, transportation, and lifestyle expenses from people who live here.',
    content: '',
    category: 'lifestyle',
    city: 'Angeles City',
    tags: ['cost of living', 'expat life', 'budget', 'living abroad', 'practical guide'],
    status: 'published',
    published_at: '2025-01-23T10:00:00Z',
    view_count: 0,
    author: { name: 'BE SEEN Team' },
    featured_image: '/images/articles/cost-living-angeles.jpg'
  }
];

export const CATEGORIES = [
  { slug: 'food', name: 'Food & Dining', icon: '🍽️' },
  { slug: 'nightlife', name: 'Nightlife & Entertainment', icon: '🌙' },
  { slug: 'travel', name: 'Travel & Day Trips', icon: '✈️' },
  { slug: 'lifestyle', name: 'Lifestyle & Living', icon: '🏠' },
  { slug: 'things-to-do', name: 'Things to Do', icon: '🎉' },
  { slug: 'hidden-gems', name: 'Hidden Gems', icon: '💎' }
];

export const CITIES = [
  { slug: 'angeles-city', name: 'Angeles City' },
  { slug: 'clark', name: 'Clark' },
  { slug: 'pampanga', name: 'Pampanga' },
  { slug: 'manila', name: 'Manila' }
];

interface GetArticlesOptions {
  category?: string;
  city?: string;
  page?: number;
  limit?: number;
  tag?: string;
}

export async function getArticles(options: GetArticlesOptions = {}) {
  const { category, city, page = 1, limit = 20, tag } = options;
  let filtered = ARTICLES.filter(a => a.status === 'published');

  if (category) {
    filtered = filtered.filter(a => a.category === category);
  }
  if (city) {
    filtered = filtered.filter(a => a.city.toLowerCase().includes(city.toLowerCase()));
  }
  if (tag) {
    filtered = filtered.filter(a => a.tags.includes(tag.toLowerCase()));
  }

  // Sort by published date (newest first)
  filtered.sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const start = (page - 1) * limit;
  const articles = filtered.slice(start, start + limit);

  return { 
    articles, 
    total: filtered.length,
    pages: Math.ceil(filtered.length / limit),
    currentPage: page
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) return null;
  
  // TODO: Load full markdown content from file
  // For now, return the article with placeholder content
  return {
    ...article,
    content: `Full article content available at: /content/articles/${slug}.md`
  };
}

export async function searchArticles(query: string, limit = 20) {
  const q = query.toLowerCase();
  return ARTICLES.filter(a =>
    a.status === 'published' && (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some(tag => tag.toLowerCase().includes(q))
    )
  ).slice(0, limit);
}

export async function getArticlesByCategory(category: string, limit = 10) {
  return ARTICLES.filter(a => 
    a.status === 'published' && a.category === category
  ).slice(0, limit);
}

export async function getArticlesByCity(city: string, limit = 10) {
  return ARTICLES.filter(a => 
    a.status === 'published' && 
    a.city.toLowerCase() === city.toLowerCase()
  ).slice(0, limit);
}

export async function getFeaturedArticles(limit = 6) {
  // Return most recent published articles
  return ARTICLES
    .filter(a => a.status === 'published')
    .sort((a, b) => 
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    .slice(0, limit);
}

export async function getRelatedArticles(articleId: string, limit = 4) {
  const article = ARTICLES.find(a => a.id === articleId);
  if (!article) return [];

  // Find articles in same category or with overlapping tags
  return ARTICLES
    .filter(a => 
      a.id !== articleId && 
      a.status === 'published' &&
      (a.category === article.category || 
       a.tags.some(tag => article.tags.includes(tag)))
    )
    .slice(0, limit);
}

export async function createArticle(data: Partial<Article>): Promise<Article> {
  const article: Article = {
    id: String(Date.now()),
    slug: data.slug || '',
    title: data.title || '',
    excerpt: data.excerpt || '',
    content: data.content || '',
    category: data.category || 'food',
    city: data.city || 'Angeles City',
    tags: data.tags || [],
    status: (data.status as 'draft' | 'published') || 'draft',
    published_at: new Date().toISOString(),
    view_count: 0,
    author: data.author || { name: 'BE SEEN Team' },
    featured_image: data.featured_image
  };
  ARTICLES.push(article);
  return article;
}

// ============================================
// Directory/Listing functions
// ============================================

export interface Listing {
  id: string;
  slug: string;
  name: string;
  category: string;
  city: string;
  description: string;
  address: string;
  rating: number;
  reviewCount: number;
  priceRange?: string;
  tags?: string[];
}

export const LISTINGS: Listing[] = [
  {
    id: '1',
    slug: 'pieros-italian-restaurant',
    name: "Piero's Italian Restaurant",
    category: 'restaurant',
    city: 'Angeles City',
    description: 'Authentic Italian pizza and pasta in Malabanias. Run by an Italian chef.',
    address: 'Malabanias Road, Angeles City',
    rating: 4.7,
    reviewCount: 156,
    priceRange: '₱₱',
    tags: ['italian', 'pizza', 'pasta']
  },
  {
    id: '2',
    slug: 'grumpy-joes-bar',
    name: "Grumpy Joe's",
    category: 'bar',
    city: 'Angeles City',
    description: 'Classic expat bar with live music and great atmosphere in Malabanias.',
    address: 'Malabanias, Angeles City',
    rating: 4.5,
    reviewCount: 203,
    priceRange: '₱₱',
    tags: ['bar', 'live music', 'expat']
  },
  {
    id: '3',
    slug: 'sowon-korean-restaurant',
    name: 'Sowon Korean Restaurant',
    category: 'restaurant',
    city: 'Clark',
    description: 'Authentic Korean BBQ and traditional Korean dishes in Clark Freeport Zone.',
    address: 'Clark Freeport Zone',
    rating: 4.6,
    reviewCount: 178,
    priceRange: '₱₱',
    tags: ['korean', 'bbq', 'samgyeopsal']
  },
  {
    id: '4',
    slug: 'geckos-kitchen',
    name: "Gecko's Kitchen",
    category: 'restaurant',
    city: 'Angeles City',
    description: 'Western comfort food and full English breakfast in Malabanias.',
    address: 'Malabanias Road, Angeles City',
    rating: 4.4,
    reviewCount: 134,
    priceRange: '₱₱',
    tags: ['western', 'breakfast', 'british']
  },
  {
    id: '5',
    slug: 'dinosaurs-island-clark',
    name: 'Dinosaurs Island',
    category: 'attraction',
    city: 'Clark',
    description: 'Family-friendly dinosaur theme park with life-sized animatronic dinosaurs.',
    address: 'Clark Freeport Zone',
    rating: 4.2,
    reviewCount: 456,
    priceRange: '₱₱',
    tags: ['family', 'kids', 'attraction', 'dinosaurs']
  }
];

export async function getListings(options: { 
  city?: string; 
  category?: string; 
  page?: number; 
  limit?: number;
  tag?: string;
} = {}) {
  const { city, category, page = 1, limit = 20, tag } = options;
  let filtered = [...LISTINGS];

  if (city) filtered = filtered.filter(l => 
    l.city.toLowerCase().includes(city.toLowerCase())
  );
  if (category) filtered = filtered.filter(l => l.category === category);
  if (tag) filtered = filtered.filter(l => l.tags?.includes(tag));

  const start = (page - 1) * limit;
  return { 
    listings: filtered.slice(start, start + limit), 
    total: filtered.length,
    pages: Math.ceil(filtered.length / limit)
  };
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  return LISTINGS.find(l => l.slug === slug) || null;
}

export async function searchListings(query: string, limit = 20) {
  const q = query.toLowerCase();
  return LISTINGS.filter(l =>
    l.name.toLowerCase().includes(q) ||
    l.description.toLowerCase().includes(q) ||
    l.tags?.some(tag => tag.includes(q))
  ).slice(0, limit);
}

export async function createListing(data: Partial<Listing>): Promise<Listing> {
  const listing: Listing = {
    id: String(Date.now()),
    slug: data.slug || '',
    name: data.name || '',
    category: data.category || 'restaurant',
    city: data.city || 'Angeles City',
    description: data.description || '',
    address: data.address || '',
    rating: 0,
    reviewCount: 0,
    priceRange: data.priceRange,
    tags: data.tags
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
  const cityListings = LISTINGS.filter(l => 
    l.city.toLowerCase() === city.toLowerCase()
  );
  const categories = [...new Set(cityListings.map(l => l.category))];
  return categories.map(cat => ({
    name: cat,
    slug: cat.toLowerCase(),
    count: cityListings.filter(l => l.category === cat).length,
  }));
}

export async function getBusinesses(options: { city?: string; category?: string } = {}) {
  return getListings(options);
}
