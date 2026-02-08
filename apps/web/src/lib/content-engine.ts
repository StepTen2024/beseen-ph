/**
 * BE SEEN.PH - Content Engine
 * AI-powered article generation for local SEO content
 */

import { Article, ArticleCategory } from '@/types/content';
import { GeneratedTopic } from './content-strategy';

// ============================================================================
// TYPES
// ============================================================================

export interface GeneratedArticle {
  title: string;
  slug: string;
  meta_description: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  keywords: string[];
  city: string;
  province: string;
  is_local_content: boolean;
  ai_generated: boolean;
  ai_model: string;
  ai_prompt: string;
  status: 'draft' | 'review';
}

export interface GenerationResult {
  success: boolean;
  article?: GeneratedArticle;
  error?: string;
  tokensUsed?: number;
}

// ============================================================================
// AI CONTENT PROMPTS
// ============================================================================

function buildArticlePrompt(topic: GeneratedTopic): string {
  const basePrompt = `You are a skilled content writer for BE SEEN.PH, a local lifestyle and business directory focused on the Philippines. Write an engaging, SEO-optimized article about:

**Title:** ${topic.title}
**Location:** ${topic.city}, ${topic.province}
**Category:** ${topic.category}
**Target Keywords:** ${topic.keywords.join(', ')}

**Requirements:**
1. Write in a friendly, conversational tone that appeals to locals and tourists
2. Include specific, realistic details about ${topic.city}
3. Structure with clear H2 and H3 headings in markdown
4. Include practical information: addresses, price ranges, tips
5. Add a compelling introduction and conclusion
6. Naturally incorporate keywords without stuffing
7. Aim for 1500-2000 words
8. Include local context and cultural references where appropriate
9. Add a "Quick Tips" or "Pro Tips" section
10. End with a call-to-action encouraging readers to explore

**Format:**
- Use markdown formatting
- Use ## for main sections, ### for subsections
- Use bullet points for lists
- Bold important terms and names
- Include a TL;DR at the start

**Important:** Write as if you're a local who knows ${topic.city} well. Be specific with recommendations, even if fictional - make them sound real and helpful.`;

  return basePrompt;
}

function buildExcerptPrompt(content: string, title: string): string {
  return `Based on this article titled "${title}", write a compelling 2-3 sentence excerpt (max 160 characters) that would make someone want to click and read more. The excerpt should be SEO-friendly and include the location.

Article content (first 500 chars):
${content.substring(0, 500)}...

Write only the excerpt, nothing else.`;
}

// ============================================================================
// OPENAI INTEGRATION
// ============================================================================

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

async function getOpenAIKey(): Promise<string> {
  // First try environment variable
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY;
  }

  // Fallback: try to get from Supabase credentials
  // This would need the actual implementation based on your setup
  throw new Error('OPENAI_API_KEY not found in environment variables');
}

async function callOpenAI(
  messages: OpenAIMessage[],
  options: { maxTokens?: number; temperature?: number } = {}
): Promise<{ content: string; tokensUsed: number }> {
  const apiKey = await getOpenAIKey();
  const { maxTokens = 3000, temperature = 0.7 } = options;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data: OpenAIResponse = await response.json();
  
  return {
    content: data.choices[0]?.message?.content || '',
    tokensUsed: data.usage?.total_tokens || 0,
  };
}

// ============================================================================
// ARTICLE GENERATION
// ============================================================================

export async function generateArticle(topic: GeneratedTopic): Promise<GenerationResult> {
  try {
    console.log(`[Content Engine] Generating article: ${topic.title}`);

    // Generate main content
    const prompt = buildArticlePrompt(topic);
    const { content: articleContent, tokensUsed } = await callOpenAI([
      {
        role: 'system',
        content: 'You are an expert content writer specializing in local SEO content for the Philippines. Write engaging, informative articles that help readers discover the best of each location.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ], {
      maxTokens: 3000,
      temperature: 0.7,
    });

    // Generate excerpt
    const { content: excerpt } = await callOpenAI([
      {
        role: 'user',
        content: buildExcerptPrompt(articleContent, topic.title),
      },
    ], {
      maxTokens: 100,
      temperature: 0.5,
    });

    const article: GeneratedArticle = {
      title: topic.title,
      slug: topic.slug,
      meta_description: topic.metaDescription,
      excerpt: excerpt.trim(),
      content: articleContent.trim(),
      category: topic.category,
      tags: topic.tags,
      keywords: topic.keywords,
      city: topic.city,
      province: topic.province,
      is_local_content: true,
      ai_generated: true,
      ai_model: 'gpt-4o',
      ai_prompt: prompt,
      status: 'review', // AI content goes to review first
    };

    console.log(`[Content Engine] Successfully generated: ${topic.slug}`);

    return {
      success: true,
      article,
      tokensUsed,
    };
  } catch (error) {
    console.error(`[Content Engine] Error generating article:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// BATCH GENERATION
// ============================================================================

export interface BatchGenerationResult {
  success: boolean;
  articlesGenerated: number;
  articles: GeneratedArticle[];
  errors: string[];
  totalTokensUsed: number;
}

export async function generateArticleBatch(
  topics: GeneratedTopic[],
  options: { maxArticles?: number; delayMs?: number } = {}
): Promise<BatchGenerationResult> {
  const { maxArticles = 3, delayMs = 1000 } = options;
  const articles: GeneratedArticle[] = [];
  const errors: string[] = [];
  let totalTokensUsed = 0;

  const topicsToProcess = topics.slice(0, maxArticles);

  for (let i = 0; i < topicsToProcess.length; i++) {
    const topic = topicsToProcess[i];
    console.log(`[Content Engine] Processing ${i + 1}/${topicsToProcess.length}: ${topic.title}`);

    const result = await generateArticle(topic);

    if (result.success && result.article) {
      articles.push(result.article);
      totalTokensUsed += result.tokensUsed || 0;
    } else {
      errors.push(`${topic.slug}: ${result.error}`);
    }

    // Delay between requests to avoid rate limits
    if (i < topicsToProcess.length - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return {
    success: errors.length === 0,
    articlesGenerated: articles.length,
    articles,
    errors,
    totalTokensUsed,
  };
}

// ============================================================================
// DATABASE OPERATIONS
// ============================================================================

export async function saveArticle(
  supabase: any,
  article: GeneratedArticle
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert({
        slug: article.slug,
        title: article.title,
        meta_description: article.meta_description,
        keywords: article.keywords,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        tags: article.tags,
        city: article.city,
        province: article.province,
        is_local_content: article.is_local_content,
        ai_generated: article.ai_generated,
        ai_model: article.ai_model,
        ai_prompt: article.ai_prompt,
        status: article.status,
        author: 'BE SEEN Content Engine',
      })
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    return { success: true, id: data.id };
  } catch (error) {
    console.error('[Content Engine] Error saving article:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Database error',
    };
  }
}

export async function saveArticleBatch(
  supabase: any,
  articles: GeneratedArticle[]
): Promise<{ success: boolean; savedCount: number; errors: string[] }> {
  const errors: string[] = [];
  let savedCount = 0;

  for (const article of articles) {
    const result = await saveArticle(supabase, article);
    if (result.success) {
      savedCount++;
    } else {
      errors.push(`${article.slug}: ${result.error}`);
    }
  }

  return {
    success: errors.length === 0,
    savedCount,
    errors,
  };
}

// ============================================================================
// CHECK FOR EXISTING CONTENT
// ============================================================================

export async function getExistingSlugs(supabase: any): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('slug');

    if (error) throw error;
    return (data || []).map((a: { slug: string }) => a.slug);
  } catch (error) {
    console.error('[Content Engine] Error fetching existing slugs:', error);
    return [];
  }
}

export function filterNewTopics(
  topics: GeneratedTopic[],
  existingSlugs: string[]
): GeneratedTopic[] {
  return topics.filter(t => !existingSlugs.includes(t.slug));
}

// ============================================================================
// MOCK MODE (for development without API key)
// ============================================================================

export function generateMockArticle(topic: GeneratedTopic): GeneratedArticle {
  const mockContent = `# ${topic.title}

**TL;DR:** Discover the best of ${topic.city} with our curated guide. Whether you're a local or visiting, these recommendations will help you experience the city like never before.

## Introduction

${topic.city} is one of the most vibrant cities in ${topic.province}, offering a unique blend of culture, cuisine, and entertainment. In this guide, we'll explore the best that this amazing city has to offer.

## Top Recommendations

### 1. Must-Visit Spot
Located in the heart of ${topic.city}, this is where locals and tourists alike gather to experience authentic ${topic.province} culture.

**Address:** Sample Address, ${topic.city}
**Price Range:** ₱₱-₱₱₱
**Best Time to Visit:** Late afternoon to evening

### 2. Hidden Gem
A local favorite that hasn't been discovered by the crowds yet. The perfect place for those who want an authentic experience.

### 3. Popular Choice
This well-known establishment has been serving the community for years and consistently delivers quality.

## Pro Tips

- **Best Time to Visit:** Weekdays are less crowded
- **Budget Tip:** Look for lunch specials and combo deals
- **Local Insight:** Ask for the "secret menu" - regulars know about it

## Getting There

${topic.city} is easily accessible from Manila via NLEX. The drive takes approximately 1.5-2 hours depending on traffic.

## Conclusion

${topic.city} has so much to offer, and this guide barely scratches the surface. We encourage you to explore, discover your own favorites, and share your experiences with the BE SEEN community.

---

*Have you visited any of these places? Let us know your favorites in the comments below!*
`;

  return {
    title: topic.title,
    slug: topic.slug,
    meta_description: topic.metaDescription,
    excerpt: `Discover ${topic.title.toLowerCase()}. Our complete guide with reviews, tips, and insider recommendations.`,
    content: mockContent,
    category: topic.category,
    tags: topic.tags,
    keywords: topic.keywords,
    city: topic.city,
    province: topic.province,
    is_local_content: true,
    ai_generated: true,
    ai_model: 'mock',
    ai_prompt: 'Mock generation',
    status: 'review',
  };
}

export function generateMockArticleBatch(topics: GeneratedTopic[]): GeneratedArticle[] {
  return topics.map(topic => generateMockArticle(topic));
}
