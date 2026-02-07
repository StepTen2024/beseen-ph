/**
 * BE SEEN.PH - Facebook API Integration
 * Stubs for webhook handling
 */

export function verifyWebhook(params: {
  mode: string | null;
  token: string | null;
  challenge: string | null;
}): { valid: boolean; challenge?: string } {
  const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN || 'beseen_webhook_verify';
  
  if (params.mode === 'subscribe' && params.token === VERIFY_TOKEN) {
    return { valid: true, challenge: params.challenge || '' };
  }
  return { valid: false };
}

export interface WebhookPayload {
  object: string;
  entry: Array<{
    id: string;
    time: number;
    changes?: Array<{
      field: string;
      value: unknown;
    }>;
    messaging?: Array<{
      sender: { id: string };
      recipient: { id: string };
      timestamp: number;
      message?: {
        mid: string;
        text: string;
      };
    }>;
  }>;
}

export function parseWebhookPayload(body: unknown): WebhookPayload | null {
  try {
    const payload = body as WebhookPayload;
    if (payload && payload.object && payload.entry) {
      return payload;
    }
    return null;
  } catch {
    return null;
  }
}

export async function processWebhookEvent(payload: WebhookPayload) {
  console.log('[FB Webhook] Processing event:', payload.object);
  
  for (const entry of payload.entry) {
    // Handle page changes (comments, reactions, etc.)
    if (entry.changes) {
      for (const change of entry.changes) {
        console.log(`[FB Webhook] Change on field: ${change.field}`);
        // Process the change
      }
    }
    
    // Handle messages
    if (entry.messaging) {
      for (const msg of entry.messaging) {
        console.log(`[FB Webhook] Message from: ${msg.sender.id}`);
        // Process the message
      }
    }
  }
  
  return { processed: true };
}
