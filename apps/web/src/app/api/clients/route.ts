import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MOCK_CLIENTS = [
  { id: '1', name: 'Wings & Things', status: 'active', tier: 'seryoso' },
  { id: '2', name: 'Cafe Lupe', status: 'pending', tier: 'tingin' },
];

export async function GET(request: NextRequest) {
  return NextResponse.json({ clients: MOCK_CLIENTS });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ success: true, message: 'Client created (mock)' });
}
