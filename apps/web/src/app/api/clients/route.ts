/**
 * BE SEEN.PH - Clients API (MOCK)
 * Phase 2: The Delivery Engine ("Pinky")
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getActiveClients,
  createClientRecord,
  updateClient,
  getClientById,
} from '@/lib/supabase-mock';
import type { Client, SubscriptionTier } from '@/types/database';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    
    if (id) {
      const client = await getClientById(id);
      if (!client) {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 });
      }
      const { password_hash, ...safeClient } = client;
      return NextResponse.json({ client: safeClient });
    }
    
    let clients: Client[] = [];
    
    if (status === 'active') {
      clients = await getActiveClients();
    } else {
      clients = await getActiveClients();
    }
    
    const safeClients = clients.map(({ password_hash, ...safe }) => safe);
    
    return NextResponse.json({ clients: safeClients, count: safeClients.length });
    
  } catch (error) {
    console.error('[API] Error fetching clients:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const requiredFields = ['business_name', 'niche'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    
    const clientData: Partial<Client> = {
      ...body,
      status: body.status || 'trial',
      subscription_tier: (body.subscription_tier || 'starter') as SubscriptionTier,
      monthly_fee: body.monthly_fee || 2000,
      preferred_language: body.preferred_language || 'taglish',
      posting_timezone: body.posting_timezone || 'Asia/Manila',
      facebook_connected: false,
      onboarding_completed: false,
    };
    
    const client = await createClientRecord(clientData);
    
    if (!client) {
      return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
    
    const { password_hash, ...safeClient } = client;
    
    return NextResponse.json({ client: safeClient, message: 'Client created successfully' }, { status: 201 });
    
  } catch (error) {
    console.error('[API] Error creating client:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
    }
    
    const client = await updateClient(id, updates);
    
    if (!client) {
      return NextResponse.json({ error: 'Client not found or update failed' }, { status: 404 });
    }
    
    const { password_hash, ...safeClient } = client;
    
    return NextResponse.json({ client: safeClient, message: 'Client updated successfully' });
    
  } catch (error) {
    console.error('[API] Error updating client:', error);
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}
