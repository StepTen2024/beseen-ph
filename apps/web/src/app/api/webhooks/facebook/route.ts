/**
 * BE SEEN.PH - Facebook Webhook Handler
 * Phase 2: The Delivery Engine ("Pinky")
 * 
 * Receives real-time updates from Facebook
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook, parseWebhookPayload } from '@/lib/facebook-api';

export const dynamic = 'force-dynamic';

const VERIFY_TOKEN = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN || 'beseen_webhook_2024';

/**
 * GET handler - Webhook verification
 * Facebook calls this to verify the webhook endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');
    
    if (!mode || !token) {
      return NextResponse.json(
        { error: 'Missing parameters' },
        { status: 400 }
      );
    }
    
    const response = verifyWebhook(mode, token, challenge || '', VERIFY_TOKEN);
    
    if (response) {
      console.log('[WEBHOOK] Facebook webhook verified');
      return new NextResponse(response);
    }
    
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 403 }
    );
    
  } catch (error) {
    console.error('[WEBHOOK] Error in webhook verification:', error);
    
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}

/**
 * POST handler - Receive webhook events
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('[WEBHOOK] Received Facebook webhook:', JSON.stringify(body, null, 2));
    
    const payload = parseWebhookPayload(body);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }
    
    // Process each entry
    for (const entry of payload.entries) {
      for (const change of entry.changes) {
        await processWebhookChange(entry.id, change);
      }
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('[WEBHOOK] Error processing webhook:', error);
    
    // Always return 200 to Facebook to prevent retries
    return NextResponse.json({ success: false });
  }
}

/**
 * Process individual webhook change
 */
async function processWebhookChange(
  pageId: string, 
  change: { field: string; value: any }
) {
  console.log(`[WEBHOOK] Processing change for page ${pageId}:`, change.field);
  
  switch (change.field) {
    case 'feed':
      // Post published, updated, or deleted
      await handleFeedChange(pageId, change.value);
      break;
      
    case 'mentions':
      // Page was mentioned
      console.log('[WEBHOOK] Page mention:', change.value);
      break;
      
    case 'ratings':
      // New rating/review
      console.log('[WEBHOOK] New rating:', change.value);
      break;
      
    case 'conversations':
      // New message
      console.log('[WEBHOOK] New conversation:', change.value);
      break;
      
    default:
      console.log(`[WEBHOOK] Unhandled field: ${change.field}`);
  }
}

/**
 * Handle feed changes (posts, comments)
 */
async function handleFeedChange(pageId: string, value: any) {
  try {
    const { item, verb, post_id, comment_id, from, message } = value;
    
    if (item === 'post' && verb === 'add') {
      console.log(`[WEBHOOK] New post on page ${pageId}:`, post_id);
      // Could update analytics or notify admin
    }
    
    if (item === 'comment' && verb === 'add') {
      console.log(`[WEBHOOK] New comment on page ${pageId}:`, comment_id);
      // Could notify client or trigger auto-response
    }
    
    if (item === 'reaction' && verb === 'add') {
      console.log(`[WEBHOOK] New reaction on page ${pageId}`);
      // Update engagement metrics
    }
    
  } catch (error) {
    console.error('[WEBHOOK] Error handling feed change:', error);
  }
}
