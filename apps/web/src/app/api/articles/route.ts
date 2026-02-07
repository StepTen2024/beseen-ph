/**
 * BE SEEN.PH - Articles API
 * Phase 3: Content Site Engine
 */

import { NextRequest, NextResponse } from 'next/server';
import { getArticles, getArticleBySlug, createArticle, searchArticles } from '@/lib/content-data';
import type { ArticleCategory } from '@/types/content';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const category = searchParams.get('category') as ArticleCategory | null;
    const city = searchParams.get('city');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Get single article by slug
    if (slug) {
      const article = await getArticleBySlug(slug);
      if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json({ article });
    }
    
    // Search articles
    if (search) {
      const articles = await searchArticles(search, limit);
      return NextResponse.json({ articles, query: search });
    }
    
    // Get articles list
    const { articles, total } = await getArticles({
      category: category || undefined,
      city: city || undefined,
      page,
      limit,
    });
    
    return NextResponse.json({ articles, total, page, limit });
    
  } catch (error) {
    console.error('[API] Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['slug', 'title', 'content', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const article = await createArticle({
      ...body,
      status: body.status || 'draft',
    });
    
    if (!article) {
      return NextResponse.json(
        { error: 'Failed to create article' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { article, message: 'Article created successfully' },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('[API] Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
