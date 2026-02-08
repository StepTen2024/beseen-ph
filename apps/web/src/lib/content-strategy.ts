/**
 * BE SEEN.PH - Content Strategy Engine
 * Generates topic queues and article templates for local SEO content
 */

import { ArticleCategory, PHILIPPINES_CITIES, DIRECTORY_CATEGORIES } from '@/types/content';

// ============================================================================
// TOPIC TEMPLATES
// ============================================================================

export type TopicType = 
  | 'best-in-city'      // "Best [category] in [city]"
  | 'top-10'            // "Top 10 [things] in [city]"
  | 'guide'             // "[City] Guide: [topic]"
  | 'things-to-do'      // "Things to Do in [city]"
  | 'comparison'        // "[A] vs [B] in [city]"
  | 'seasonal'          // "[Season/Event] in [city]"
  | 'neighborhood'      // "[Area/Neighborhood] Guide"
  | 'budget'            // "Budget [activity] in [city]"
  | 'hidden-gems'       // "Hidden Gems in [city]"
  | 'first-timer';      // "First Time in [city]? Here's What You Need to Know"

export interface TopicTemplate {
  type: TopicType;
  titleTemplate: string;
  category: ArticleCategory;
  tags: string[];
  priority: number; // 1-10, higher = more important
  estimatedSearchVolume: 'high' | 'medium' | 'low';
}

export interface GeneratedTopic {
  title: string;
  slug: string;
  category: ArticleCategory;
  city: string;
  province: string;
  tags: string[];
  priority: number;
  templateType: TopicType;
  metaDescription: string;
  keywords: string[];
}

// ============================================================================
// TOPIC TEMPLATES BY CATEGORY
// ============================================================================

const FOOD_TEMPLATES: TopicTemplate[] = [
  {
    type: 'best-in-city',
    titleTemplate: 'Best {subcategory} in {city} ({year})',
    category: 'food',
    tags: ['food', 'restaurants', 'dining'],
    priority: 9,
    estimatedSearchVolume: 'high',
  },
  {
    type: 'top-10',
    titleTemplate: 'Top 10 Restaurants in {city} You Must Try',
    category: 'food',
    tags: ['food', 'restaurants', 'top-10'],
    priority: 10,
    estimatedSearchVolume: 'high',
  },
  {
    type: 'budget',
    titleTemplate: 'Best Budget-Friendly Restaurants in {city}',
    category: 'food',
    tags: ['food', 'budget', 'affordable'],
    priority: 8,
    estimatedSearchVolume: 'medium',
  },
  {
    type: 'hidden-gems',
    titleTemplate: 'Hidden Gem Restaurants in {city} Locals Love',
    category: 'food',
    tags: ['food', 'hidden-gems', 'local-favorites'],
    priority: 7,
    estimatedSearchVolume: 'medium',
  },
  {
    type: 'guide',
    titleTemplate: '{city} Food Guide: What and Where to Eat',
    category: 'food',
    tags: ['food', 'guide', 'dining'],
    priority: 9,
    estimatedSearchVolume: 'high',
  },
];

const NIGHTLIFE_TEMPLATES: TopicTemplate[] = [
  {
    type: 'best-in-city',
    titleTemplate: 'Best Bars and Nightclubs in {city} ({year})',
    category: 'lifestyle',
    tags: ['nightlife', 'bars', 'clubs'],
    priority: 8,
    estimatedSearchVolume: 'high',
  },
  {
    type: 'guide',
    titleTemplate: '{city} Nightlife Guide: Where to Party',
    category: 'lifestyle',
    tags: ['nightlife', 'guide', 'entertainment'],
    priority: 9,
    estimatedSearchVolume: 'high',
  },
  {
    type: 'first-timer',
    titleTemplate: 'First Time in {city}? Nightlife Tips You Need to Know',
    category: 'lifestyle',
    tags: ['nightlife', 'tips', 'first-timer'],
    priority: 7,
    estimatedSearchVolume: 'medium',
  },
];

const TRAVEL_TEMPLATES: TopicTemplate[] = [
  {
    type: 'things-to-do',
    titleTemplate: 'Things to Do in {city}: Complete Guide ({year})',
    category: 'travel',
    tags: ['travel', 'activities', 'attractions'],
    priority: 10,
    estimatedSearchVolume: 'high',
  },
  {
    type: 'top-10',
    titleTemplate: 'Top 10 Tourist Spots in {city}',
    category: 'travel',
    tags: ['travel', 'tourist-spots', 'attractions'],
    priority: 9,
    estimatedSearchVolume: 'high',
  },
  {
    type: 'first-timer',
    titleTemplate: 'First Time in {city}? Essential Travel Tips',
    category: 'travel',
    tags: ['travel', 'tips', 'first-timer'],
    priority: 8,
    estimatedSearchVolume: 'high',
  },
  {
    type: 'budget',
    titleTemplate: 'Budget Travel Guide: {city} on a Shoestring',
    category: 'travel',
    tags: ['travel', 'budget', 'backpacker'],
    priority: 7,
    estimatedSearchVolume: 'medium',
  },
  {
    type: 'hidden-gems',
    titleTemplate: 'Off the Beaten Path: Hidden Gems in {city}',
    category: 'travel',
    tags: ['travel', 'hidden-gems', 'local-secrets'],
    priority: 6,
    estimatedSearchVolume: 'medium',
  },
  {
    type: 'guide',
    titleTemplate: 'Weekend Getaway: {city} in 48 Hours',
    category: 'travel',
    tags: ['travel', 'weekend', 'itinerary'],
    priority: 8,
    estimatedSearchVolume: 'medium',
  },
];

const LIFESTYLE_TEMPLATES: TopicTemplate[] = [
  {
    type: 'best-in-city',
    titleTemplate: 'Best Cafes in {city} for Work and Study',
    category: 'lifestyle',
    tags: ['cafes', 'work', 'study'],
    priority: 8,
    estimatedSearchVolume: 'high',
  },
  {
    type: 'best-in-city',
    titleTemplate: 'Best Spas and Wellness Centers in {city}',
    category: 'lifestyle',
    tags: ['spa', 'wellness', 'relaxation'],
    priority: 7,
    estimatedSearchVolume: 'medium',
  },
  {
    type: 'guide',
    titleTemplate: 'Living in {city}: A Complete Lifestyle Guide',
    category: 'lifestyle',
    tags: ['lifestyle', 'living', 'expat'],
    priority: 6,
    estimatedSearchVolume: 'medium',
  },
];

// Food subcategories for specific "Best X" articles
const FOOD_SUBCATEGORIES = [
  'Pizza',
  'Sisig',
  'Korean BBQ',
  'Japanese Food',
  'Chinese Restaurants',
  'Buffets',
  'Coffee Shops',
  'Steak Houses',
  'Seafood Restaurants',
  'Italian Restaurants',
  'Thai Food',
  'Fast Food',
  'Breakfast Spots',
  'Brunch Places',
  'Late Night Food',
  'Street Food',
  'Kapampangan Food',
  'Lechon',
];

// ============================================================================
// TOPIC QUEUE GENERATOR
// ============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateMetaDescription(title: string, city: string, category: string): string {
  const templates = [
    `Discover the ${title.toLowerCase()}. Updated guide with reviews, addresses, and insider tips.`,
    `Looking for ${title.toLowerCase()}? Our curated list features the top-rated spots in ${city}.`,
    `Complete guide to ${title.toLowerCase()}. Find addresses, hours, and what to order.`,
    `Your ultimate guide to ${title.toLowerCase()}. Local favorites and hidden gems included.`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateKeywords(title: string, city: string, category: string, tags: string[]): string[] {
  const citySlug = city.toLowerCase().replace(/\s+/g, ' ');
  const keywords = [
    citySlug,
    `${category} ${citySlug}`,
    `best ${category} ${citySlug}`,
    ...tags.map(t => `${t} ${citySlug}`),
    `${citySlug} guide`,
  ];
  return [...new Set(keywords)];
}

export function generateTopicsForCity(cityData: typeof PHILIPPINES_CITIES[0]): GeneratedTopic[] {
  const { city, province } = cityData;
  const year = new Date().getFullYear();
  const topics: GeneratedTopic[] = [];

  const allTemplates = [
    ...FOOD_TEMPLATES,
    ...NIGHTLIFE_TEMPLATES,
    ...TRAVEL_TEMPLATES,
    ...LIFESTYLE_TEMPLATES,
  ];

  // Generate from base templates
  for (const template of allTemplates) {
    const title = template.titleTemplate
      .replace('{city}', city)
      .replace('{year}', String(year));

    topics.push({
      title,
      slug: slugify(title),
      category: template.category,
      city,
      province,
      tags: [...template.tags, city.toLowerCase().replace(/\s+/g, '-')],
      priority: template.priority,
      templateType: template.type,
      metaDescription: generateMetaDescription(title, city, template.category),
      keywords: generateKeywords(title, city, template.category, template.tags),
    });
  }

  // Generate food subcategory articles
  for (const subcategory of FOOD_SUBCATEGORIES.slice(0, 5)) { // Limit for initial batch
    const title = `Best ${subcategory} in ${city} (${year})`;
    topics.push({
      title,
      slug: slugify(title),
      category: 'food',
      city,
      province,
      tags: ['food', subcategory.toLowerCase().replace(/\s+/g, '-'), city.toLowerCase().replace(/\s+/g, '-')],
      priority: 8,
      templateType: 'best-in-city',
      metaDescription: generateMetaDescription(title, city, 'food'),
      keywords: generateKeywords(title, city, 'food', [subcategory.toLowerCase()]),
    });
  }

  return topics;
}

// ============================================================================
// CONTENT QUEUE
// ============================================================================

export interface ContentQueue {
  pending: GeneratedTopic[];
  generated: string[]; // slugs of already generated articles
  lastUpdated: string;
}

// Get priority cities for content generation
export function getPriorityCities(): typeof PHILIPPINES_CITIES {
  // Start with Angeles City and surrounding areas
  const priorityCities = ['Angeles City', 'Clark', 'San Fernando', 'Mabalacat'];
  return PHILIPPINES_CITIES.filter(c => priorityCities.includes(c.city));
}

// Generate full topic queue for priority cities
export function generateContentQueue(): ContentQueue {
  const priorityCities = getPriorityCities();
  const allTopics: GeneratedTopic[] = [];

  for (const cityData of priorityCities) {
    const cityTopics = generateTopicsForCity(cityData);
    allTopics.push(...cityTopics);
  }

  // Sort by priority (descending)
  allTopics.sort((a, b) => b.priority - a.priority);

  return {
    pending: allTopics,
    generated: [],
    lastUpdated: new Date().toISOString(),
  };
}

// Get next topics to generate
export function getNextTopics(queue: ContentQueue, count: number = 3): GeneratedTopic[] {
  return queue.pending
    .filter(topic => !queue.generated.includes(topic.slug))
    .slice(0, count);
}

// ============================================================================
// ANGELES CITY SPECIFIC TOPICS (Initial Seed)
// ============================================================================

export const ANGELES_CITY_PRIORITY_TOPICS: GeneratedTopic[] = [
  {
    title: 'Top 10 Restaurants in Angeles City You Must Try (2025)',
    slug: 'top-10-restaurants-angeles-city-2025',
    category: 'food',
    city: 'Angeles City',
    province: 'Pampanga',
    tags: ['food', 'restaurants', 'angeles-city', 'top-10', 'pampanga'],
    priority: 10,
    templateType: 'top-10',
    metaDescription: 'Discover the best restaurants in Angeles City for 2025. From authentic Kapampangan cuisine to international favorites, find your next dining destination.',
    keywords: ['restaurants angeles city', 'best restaurants angeles city', 'where to eat angeles city', 'angeles city food'],
  },
  {
    title: 'Things to Do in Angeles City: Complete Guide (2025)',
    slug: 'things-to-do-angeles-city-2025',
    category: 'travel',
    city: 'Angeles City',
    province: 'Pampanga',
    tags: ['travel', 'activities', 'angeles-city', 'attractions', 'pampanga'],
    priority: 10,
    templateType: 'things-to-do',
    metaDescription: 'Your complete guide to things to do in Angeles City. Explore attractions, activities, and hidden gems in this vibrant Pampanga city.',
    keywords: ['things to do angeles city', 'angeles city attractions', 'angeles city activities', 'what to do in angeles city'],
  },
  {
    title: 'Best Nightlife in Angeles City: Bars, Clubs & Entertainment',
    slug: 'best-nightlife-angeles-city',
    category: 'lifestyle',
    city: 'Angeles City',
    province: 'Pampanga',
    tags: ['nightlife', 'bars', 'clubs', 'angeles-city', 'entertainment'],
    priority: 9,
    templateType: 'guide',
    metaDescription: 'Explore the best nightlife spots in Angeles City. From chill bars to lively clubs, find the perfect spot for your night out.',
    keywords: ['nightlife angeles city', 'bars angeles city', 'clubs angeles city', 'angeles city entertainment'],
  },
  {
    title: 'Best Sisig in Angeles City: Where to Find the Real Deal',
    slug: 'best-sisig-angeles-city',
    category: 'food',
    city: 'Angeles City',
    province: 'Pampanga',
    tags: ['food', 'sisig', 'kapampangan', 'angeles-city', 'local-food'],
    priority: 9,
    templateType: 'best-in-city',
    metaDescription: 'Find the best sisig in Angeles City, the birthplace of this iconic Filipino dish. Our guide to the most authentic sisig spots.',
    keywords: ['best sisig angeles city', 'sisig pampanga', 'kapampangan food', 'where to eat sisig'],
  },
  {
    title: 'Best Coffee Shops in Angeles City for Work & Study',
    slug: 'best-coffee-shops-angeles-city',
    category: 'lifestyle',
    city: 'Angeles City',
    province: 'Pampanga',
    tags: ['cafes', 'coffee', 'work', 'study', 'angeles-city'],
    priority: 8,
    templateType: 'best-in-city',
    metaDescription: 'Looking for the best coffee shops in Angeles City? Find WiFi-friendly cafes perfect for work, study, or catching up with friends.',
    keywords: ['coffee shops angeles city', 'cafes angeles city', 'work cafe angeles city', 'study spots angeles city'],
  },
];

export function getAngelesInitialTopics(): GeneratedTopic[] {
  return ANGELES_CITY_PRIORITY_TOPICS;
}
