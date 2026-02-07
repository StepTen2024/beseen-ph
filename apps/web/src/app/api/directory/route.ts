/**
 * BE SEEN.PH - Directory API
 * Phase 4: Directory Engine
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  getListings, 
  getListingBySlug, 
  createListing, 
  searchListings,
  getCitiesWithListings,
  getCategoriesByCity 
} from '@/lib/content-data';
import type { BusinessCategory } from '@/types/content';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const city = searchParams.get('city');
    const category = searchParams.get('category') as BusinessCategory | null;
    const subcategory = searchParams.get('subcategory');
    const search = searchParams.get('search');
    const getCities = searchParams.get('cities') === 'true';
    const getCategories = searchParams.get('categories') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Get cities with listings
    if (getCities) {
      const cities = await getCitiesWithListings();
      return NextResponse.json({ cities });
    }
    
    // Get categories by city
    if (getCategories && city) {
      const categories = await getCategoriesByCity(city);
      return NextResponse.json({ categories });
    }
    
    // Get single listing
    if (slug && city) {
      const listing = await getListingBySlug(city, slug);
      if (!listing) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
      }
      return NextResponse.json({ listing });
    }
    
    // Search listings
    if (search) {
      const listings = await searchListings(search, city || undefined, limit);
      return NextResponse.json({ listings, query: search });
    }
    
    // Get listings
    const { listings, total } = await getListings({
      city: city || undefined,
      category: category || undefined,
      subcategory: subcategory || undefined,
      page,
      limit,
    });
    
    return NextResponse.json({ listings, total, page, limit });
    
  } catch (error) {
    console.error('[API] Error fetching directory:', error);
    return NextResponse.json({ error: 'Failed to fetch directory' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'slug', 'address', 'city', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const listing = await createListing({
      ...body,
      status: body.status || 'pending',
    });
    
    if (!listing) {
      return NextResponse.json(
        { error: 'Failed to create listing' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { listing, message: 'Listing created successfully' },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('[API] Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}
