/**
 * BE SEEN.PH - Cron API Route: Content Generation (MOCK)
 */

import { NextRequest, NextResponse } from 'next/server';
import { runContentGenerationCron } from '@/lib/cron-jobs';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('[API MOCK] Cron job triggered: Content Generation');
    
    const result = await runContentGenerationCron();
    
    return NextResponse.json({
      success: true,
      message: 'Content generation completed (MOCK)',
      totalPostsGenerated: result.totalPostsGenerated,
      mock: true,
    });
    
  } catch (error) {
    console.error('[API] Error in content generation cron:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { clientId, days = 3 } = body;
    
    console.log('[API MOCK] Manual content generation for client:', clientId);
    
    return NextResponse.json({
      success: true,
      mock: true,
      clientId,
      postsCreated: days * 2,
      message: 'Content generated successfully (MOCK)',
    });
    
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}
