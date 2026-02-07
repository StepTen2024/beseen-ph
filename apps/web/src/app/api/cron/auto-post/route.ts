/**
 * BE SEEN.PH - Cron API Route: Auto-Posting (MOCK)
 */

import { NextRequest, NextResponse } from 'next/server';
import { runAutoPostingCron } from '@/lib/cron-jobs';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('[API MOCK] Cron job triggered: Auto-Posting');
    
    const result = await runAutoPostingCron();
    
    return NextResponse.json({
      success: true,
      message: 'Auto-posting completed (MOCK)',
      totalPublished: result.totalPublished,
      mock: true,
    });
    
  } catch (error) {
    console.error('[API] Error in auto-posting cron:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
