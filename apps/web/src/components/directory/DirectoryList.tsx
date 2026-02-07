/**
 * BE SEEN.PH - Directory List Component
 * Phase 4: Directory Engine
 */

import Link from 'next/link';
import { Star, MapPin, Phone, ExternalLink } from 'lucide-react';
import type { DirectoryListing, DirectoryCategoryConfig } from '@/types/content';

interface DirectoryListProps {
  listings: DirectoryListing[];
  total: number;
  city: string;
  category: DirectoryCategoryConfig;
}

export default function DirectoryList({ listings, total, city, category }: DirectoryListProps) {
  if (listings.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 py-16 text-center">
        <p className="text-slate-500">No {category.pluralName.toLowerCase()} found in {city}</p>
        <p className="mt-2 text-sm text-slate-600">
          Be the first to list your business!
        </p>
        <a
          href="/list-business"
          className="mt-4 inline-block rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-500"
        >
          List Your Business
        </a>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing {listings.length} of {total} {category.pluralName.toLowerCase()}
        </p>
        <select className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-300">
          <option>Sort by: Rating</option>
          <option>Sort by: Newest</option>
          <option>Sort by: Popular</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {listings.map((listing) => (
          <ListingCard 
            key={listing.id} 
            listing={listing} 
            city={city}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}

function ListingCard({ 
  listing, 
  city,
  category 
}: { 
  listing: DirectoryListing; 
  city: string;
  category: DirectoryCategoryConfig;
}) {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="group rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-fuchsia-500/30">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Image */}
        <div className="shrink-0">
          {listing.photos && listing.photos.length > 0 ? (
            <div className="h-32 w-full overflow-hidden rounded-lg sm:h-24 sm:w-24">
              <img
                src={listing.photos[0]}
                alt={listing.name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-32 w-full items-center justify-center rounded-lg bg-slate-800 sm:h-24 sm:w-24">
              <span className="text-2xl text-slate-600">{listing.name.charAt(0)}</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link
                  href={`/directory/${citySlug}/${category.slug}/${listing.slug}`}
                  className="text-lg font-semibold text-slate-200 hover:text-fuchsia-400"
                >
                  {listing.name}
                </Link>
                {listing.is_featured && (
                  <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-xs text-amber-400">
                    Featured
                  </span>
                )}
                {listing.is_verified && (
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-400">
                    Verified
                  </span>
                )}
              </div>
              
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                {listing.description}
              </p>
              
              {/* Rating */}
              {listing.average_rating > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-slate-200">{listing.average_rating}</span>
                  </div>
                  <span className="text-slate-500">({listing.review_count} reviews)</span>
                </div>
              )}
              
              {/* Address & Contact */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {listing.address}
                </span>
                {listing.phone && (
                  <a 
                    href={`tel:${listing.phone}`}
                    className="flex items-center gap-1 hover:text-fuchsia-400"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {listing.phone}
                  </a>
                )}
              </div>
              
              {/* Amenities */}
              {listing.amenities && listing.amenities.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {listing.amenities.slice(0, 4).map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400"
                    >
                      {amenity}
                    </span>
                  ))}
                  {listing.amenities.length > 4 && (
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                      +{listing.amenities.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Link
                href={`/directory/${citySlug}/${category.slug}/${listing.slug}`}
                className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
              >
                View
                <ExternalLink className="h-3 w-3" />
              </Link>
              {listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="rounded-lg bg-fuchsia-600 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-fuchsia-500"
                >
                  Call
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
