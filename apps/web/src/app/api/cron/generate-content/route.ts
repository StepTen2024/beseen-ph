import { NextRequest, NextResponse } from 'next/server';
import { runContentGenerationCron } from '@/lib/cron-jobs';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const result = await runContentGenerationCron();
  return NextResponse.json({
    success: true,
    message: 'Content generation completed (MOCK)',
    postsGenerated: result.postsGenerated,
    articlesGenerated: result.articlesGenerated,
    mock: true,
  });
}
