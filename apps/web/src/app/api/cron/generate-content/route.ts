/**
 * BE SEEN.PH - Content Generation Cron Job
 * Generates AI-powered articles for local SEO
 * 
 * Schedule: Daily at 2 AM PHT (or via Vercel Cron)
 * Rate: 1-3 articles per run
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdmin } from '@/lib/supabase/server';
import {
  generateArticleBatch,
  saveArticleBatch,
  getExistingSlugs,
  filterNewTopics,
  generateMockArticleBatch,
  GeneratedArticle,
} from '@/lib/content-engine';
import {
  getAngelesInitialTopics,
  generateContentQueue,
  getNextTopics,
} from '@/lib/content-strategy';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 second timeout for article generation

// Verify cron secret (for Vercel Cron)
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return true; // Allow in dev without auth
  
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // No secret configured, allow
  
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request: NextRequest) {
  // Verify authorization
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const useMock = request.nextUrl.searchParams.get('mock') === 'true';
  const articlesToGenerate = parseInt(request.nextUrl.searchParams.get('count') || '2', 10);
  
  console.log(`[Cron] Starting content generation - mock: ${useMock}, count: ${articlesToGenerate}`);

  try {
    // Get topics to generate
    const priorityTopics = getAngelesInitialTopics();
    const queue = generateContentQueue();
    const allTopics = [...priorityTopics, ...getNextTopics(queue, 10)];

    // Check which articles already exist
    let existingSlugs: string[] = [];
    let supabase: any = null;

    if (!useMock) {
      try {
        supabase = createAdmin();
        existingSlugs = await getExistingSlugs(supabase);
      } catch (dbError) {
        console.warn('[Cron] Database not available, using mock mode');
      }
    }

    // Filter to only new topics
    const newTopics = filterNewTopics(allTopics, existingSlugs);
    const topicsToProcess = newTopics.slice(0, articlesToGenerate);

    if (topicsToProcess.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No new content to generate',
        articlesGenerated: 0,
        existingArticles: existingSlugs.length,
      });
    }

    console.log(`[Cron] Found ${newTopics.length} new topics, processing ${topicsToProcess.length}`);

    // Generate articles
    let articles: GeneratedArticle[] = [];
    let tokensUsed = 0;
    const errors: string[] = [];

    if (useMock || !process.env.OPENAI_API_KEY) {
      // Mock generation
      articles = generateMockArticleBatch(topicsToProcess);
      console.log(`[Cron] Generated ${articles.length} mock articles`);
    } else {
      // AI generation
      const result = await generateArticleBatch(topicsToProcess, {
        maxArticles: articlesToGenerate,
        delayMs: 2000, // 2 second delay between API calls
      });
      articles = result.articles;
      tokensUsed = result.totalTokensUsed;
      errors.push(...result.errors);
      console.log(`[Cron] Generated ${articles.length} AI articles, tokens used: ${tokensUsed}`);
    }

    // Save to database if available
    let savedCount = 0;
    if (supabase && articles.length > 0) {
      const saveResult = await saveArticleBatch(supabase, articles);
      savedCount = saveResult.savedCount;
      errors.push(...saveResult.errors);
      console.log(`[Cron] Saved ${savedCount} articles to database`);
    }

    return NextResponse.json({
      success: errors.length === 0,
      message: `Generated ${articles.length} articles, saved ${savedCount}`,
      articlesGenerated: articles.length,
      articlesSaved: savedCount,
      tokensUsed,
      articles: articles.map(a => ({
        slug: a.slug,
        title: a.title,
        category: a.category,
        city: a.city,
      })),
      errors: errors.length > 0 ? errors : undefined,
      mock: useMock || !process.env.OPENAI_API_KEY,
    });

  } catch (error) {
    console.error('[Cron] Content generation error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// POST endpoint for manual trigger with specific topics
export async function POST(request: NextRequest) {
  // Verify authorization
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { topics, mock = false } = body;

    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return NextResponse.json({
        error: 'Topics array required',
      }, { status: 400 });
    }

    // Generate articles for specific topics
    let articles: GeneratedArticle[];
    
    if (mock || !process.env.OPENAI_API_KEY) {
      articles = generateMockArticleBatch(topics);
    } else {
      const result = await generateArticleBatch(topics, { maxArticles: topics.length });
      articles = result.articles;
    }

    return NextResponse.json({
      success: true,
      articlesGenerated: articles.length,
      articles: articles.map(a => ({
        slug: a.slug,
        title: a.title,
        category: a.category,
      })),
    });

  } catch (error) {
    console.error('[Cron] POST error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
