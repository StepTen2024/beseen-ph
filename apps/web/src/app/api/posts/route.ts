import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ posts: [], count: 0 });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ success: true, message: 'Post created (mock)' });
}
