/**
 * BE SEEN.PH - Cron Job Handlers
 * Content generation and auto-posting functionality
 */

import { createAdmin } from '@/lib/supabase/server';
import {
  generateArticleBatch,
  saveArticleBatch,
  getExistingSlugs,
  filterNewTopics,
  generateMockArticleBatch,
  GeneratedArticle,
} from './content-engine';
import {
  getAngelesInitialTopics,
  generateContentQueue,
  getNextTopics,
} from './content-strategy';

export interface CronResult {
  success: boolean;
  articlesGenerated?: number;
  postsGenerated?: number;
  postsPublished?: number;
  postsCreated?: number;
  errors: string[];
  articles?: Array<{ slug: string; title: string; category: string }>;
}

/**
 * Auto-posting content to social media
 */
export async function runAutoPost(): Promise<CronResult> {
  console.log('[CRON] Running auto-post job...');
  // TODO: Implement social media posting
  return { 
    success: true, 
    postsCreated: 0,
    errors: [] 
  };
}

/**
 * Generate content using AI
 */
export async function runGenerateContent(options: {
  useMock?: boolean;
  maxArticles?: number;
} = {}): Promise<CronResult> {
  const { useMock = false, maxArticles = 3 } = options;
  console.log(`[CRON] Running content generation - mock: ${useMock}, max: ${maxArticles}`);

  const errors: string[] = [];

  try {
    // Get topics to generate
    const priorityTopics = getAngelesInitialTopics();
    const queue = generateContentQueue();
    const allTopics = [...priorityTopics, ...getNextTopics(queue, 10)];

    // Check which articles already exist (only if not mock)
    let existingSlugs: string[] = [];
    let supabase: any = null;

    if (!useMock) {
      try {
        supabase = createAdmin();
        existingSlugs = await getExistingSlugs(supabase);
      } catch (dbError) {
        console.warn('[CRON] Database not available, using mock mode');
      }
    }

    // Filter to only new topics
    const newTopics = filterNewTopics(allTopics, existingSlugs);
    const topicsToProcess = newTopics.slice(0, maxArticles);

    if (topicsToProcess.length === 0) {
      return {
        success: true,
        articlesGenerated: 0,
        errors: [],
      };
    }

    // Generate articles
    let articles: GeneratedArticle[];

    if (useMock || !process.env.OPENAI_API_KEY) {
      articles = generateMockArticleBatch(topicsToProcess);
    } else {
      const result = await generateArticleBatch(topicsToProcess, {
        maxArticles,
        delayMs: 2000,
      });
      articles = result.articles;
      errors.push(...result.errors);
    }

    // Save to database if available
    if (supabase && articles.length > 0) {
      const saveResult = await saveArticleBatch(supabase, articles);
      errors.push(...saveResult.errors);
    }

    return {
      success: errors.length === 0,
      articlesGenerated: articles.length,
      articles: articles.map(a => ({
        slug: a.slug,
        title: a.title,
        category: a.category,
      })),
      errors,
    };

  } catch (error) {
    console.error('[CRON] Content generation error:', error);
    return {
      success: false,
      articlesGenerated: 0,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}

/**
 * Auto-posting cron job
 */
export async function runAutoPostingCron(): Promise<CronResult> {
  console.log('[CRON] Running auto-posting job...');
  // In production, this would:
  // 1. Get all scheduled posts for now
  // 2. Post them to Facebook
  // 3. Update status in database
  return {
    success: true,
    postsPublished: 0,
    errors: [],
  };
}

/**
 * Content generation cron job
 */
export async function runContentGenerationCron(): Promise<CronResult> {
  return runGenerateContent({
    useMock: !process.env.OPENAI_API_KEY,
    maxArticles: 2,
  });
}
