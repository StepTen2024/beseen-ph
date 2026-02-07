import { NextRequest, NextResponse } from 'next/server';
import { runAutoPostingCron } from '@/lib/cron-jobs';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const result = await runAutoPostingCron();
  return NextResponse.json({
    success: true,
    message: 'Auto-posting completed (MOCK)',
    postsPublished: result.postsPublished,
    mock: true,
  });
}
