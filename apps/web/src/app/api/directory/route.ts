import { NextRequest, NextResponse } from 'next/server';
import { getListings, getListingBySlug } from '@/lib/content-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  // Get single listing
  if (slug) {
    const listing = await getListingBySlug(slug);
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }
    return NextResponse.json(listing);
  }

  // Get listings list
  const listings = await getListings({ city: city || undefined, category: category || undefined });
  return NextResponse.json(listings);
}
