/**
 * BE SEEN.PH - Business Detail Page
 * Connected to Supabase for live data
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { 
  MapPin, Phone, Globe, Clock, Star, Heart, Share2, 
  Navigation, MessageCircle, Facebook, Instagram, 
  CheckCircle, Camera, ChevronRight, AlertCircle
} from 'lucide-react';
import { createClient, createAdmin } from '@/lib/supabase/server';
import { getBusinessWithRelations, trackEvent } from '@beseen/database';
import type { BusinessHours } from '@beseen/database';

interface BusinessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: business } = await getBusinessWithRelations(supabase, slug);
  
  if (!business) {
    return { title: 'Business Not Found | BE SEEN' };
  }

  return {
    title: `${business.name} - ${business.category} in ${business.city} | BE SEEN`,
    description: business.description || business.meta_description || `Discover ${business.name} in ${business.city}`,
    openGraph: {
      title: business.name,
      description: business.description || '',
      images: business.photos?.[0] ? [business.photos[0]] : [],
    },
  };
}

// Track page view
async function trackPageView(businessId: string) {
  const admin = createAdmin();
  await trackEvent(admin, {
    business_id: businessId,
    event_type: 'page_view',
  });
  
  // Increment view count - skip for now, will add RPC later
  // View counting handled via analytics_events table
}

function isOpenNow(hours: BusinessHours | null): boolean {
  if (!hours) return false;
  
  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[now.getDay()];
  const todayHours = hours[today];
  
  if (!todayHours || todayHours.closed) return false;
  
  const currentTime = now.getHours() * 100 + now.getMinutes();
  const openTime = parseInt(todayHours.open.replace(':', ''));
  const closeTime = parseInt(todayHours.close.replace(':', ''));
  
  return currentTime >= openTime && currentTime <= closeTime;
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24 animate-pulse">
      <div className="h-64 md:h-80 bg-slate-800" />
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="h-8 bg-slate-700 rounded w-1/2 mb-4" />
        <div className="h-4 bg-slate-700 rounded w-1/3 mb-8" />
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="h-20 bg-slate-700 rounded-2xl" />
          <div className="h-20 bg-slate-700 rounded-2xl" />
          <div className="h-20 bg-slate-700 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: business, error } = await getBusinessWithRelations(supabase, slug);

  if (error || !business) {
    notFound();
  }

  // Track view (fire and forget)
  trackPageView(business.id);

  const hours = business.hours as BusinessHours | null;
  const isOpen = isOpenNow(hours);
  const posts = business.posts || [];
  const reviews = business.reviews || [];

  return (
    <main className="min-h-screen bg-[#030712] text-white pb-24">
      {/* Photo Gallery */}
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0 grid grid-cols-3 gap-1">
          {business.photos?.length ? (
            business.photos.slice(0, 3).map((photo: string, i: number) => (
              <div key={i} className={`relative ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </div>
            ))
          ) : (
            <div className="col-span-3 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <Camera className="w-12 h-12 text-slate-600" />
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
        
        {business.photos?.length > 0 && (
          <button className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-sm flex items-center gap-2">
            <Camera className="w-4 h-4" /> {business.photos.length} photos
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{business.name}</h1>
              {business.verification_status === 'verified' && (
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span>{business.category}</span>
              <span>·</span>
              <span className={isOpen ? 'text-emerald-400' : 'text-red-400'}>
                {isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Rating */}
        {business.review_count > 0 && (
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className={`w-5 h-5 ${i <= Math.floor(business.average_rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
              ))}
            </div>
            <span className="font-bold">{business.average_rating.toFixed(1)}</span>
            <span className="text-slate-500">({business.review_count} reviews)</span>
          </div>
        )}

        {/* Unclaimed Notice */}
        {business.verification_status === 'unclaimed' && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-amber-200">Is this your business?</p>
              <p className="text-xs text-slate-400">Claim it to manage your listing and respond to reviews.</p>
            </div>
            <Link 
              href={`/claim?business=${business.slug}`}
              className="px-4 py-2 bg-amber-500 text-black rounded-lg text-sm font-bold hover:bg-amber-400 transition-colors"
            >
              Claim
            </Link>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {business.phone && (
            <a href={`tel:${business.phone}`} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition-colors">
              <Phone className="w-6 h-6" />
              <span className="text-sm font-medium">Call</span>
            </a>
          )}
          {business.latitude && business.longitude && (
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              <Navigation className="w-6 h-6" />
              <span className="text-sm font-medium">Directions</span>
            </a>
          )}
          <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors">
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-medium">Message</span>
          </button>
        </div>

        {/* Description */}
        {business.description && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-3">About</h2>
            <p className="text-slate-300 leading-relaxed">{business.description}</p>
            {business.subcategories?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {business.subcategories.map((cat: string) => (
                  <span key={cat} className="px-3 py-1 rounded-full bg-slate-800 text-sm">{cat}</span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Contact & Hours */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Contact */}
          <section className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-lg font-bold mb-4">Contact</h2>
            <div className="space-y-3">
              {business.phone && (
                <a href={`tel:${business.phone}`} className="flex items-center gap-3 text-slate-300 hover:text-white">
                  <Phone className="w-5 h-5 text-slate-500" />
                  {business.phone}
                </a>
              )}
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-slate-500" />
                {business.address}, {business.city}
              </div>
              {business.website && (
                <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-fuchsia-400 hover:text-fuchsia-300">
                  <Globe className="w-5 h-5" />
                  Visit Website
                </a>
              )}
              <div className="flex gap-3 pt-2">
                {business.facebook_url && (
                  <a href={business.facebook_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {business.instagram_url && (
                  <a href={business.instagram_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Hours */}
          {hours && (
            <section className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-500" /> Hours
              </h2>
              <div className="space-y-2 text-sm">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                  const dayHours = hours[day];
                  return (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize text-slate-400">{day}</span>
                      <span>
                        {dayHours?.closed ? 'Closed' : dayHours ? `${dayHours.open} - ${dayHours.close}` : 'Not set'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Amenities */}
        {business.amenities?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {business.amenities.map((amenity: string) => (
                <span key={amenity} className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Recent Posts */}
        {posts.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent Updates</h2>
            </div>
            <div className="space-y-3">
              {posts.map((post: any) => (
                <div key={post.id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <p className="mb-2">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" /> {post.likes_count}
                    </span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Reviews</h2>
            {business.review_count > 0 && (
              <Link href="#" className="text-fuchsia-400 text-sm flex items-center gap-1">
                See all {business.review_count} reviews <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
          
          {reviews.length > 0 ? (
            <div className="space-y-4 mb-4">
              {reviews.slice(0, 3).map((review: any) => (
                <div key={review.id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className={`w-4 h-4 ${i <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm">{review.content}</p>
                  <p className="text-slate-500 text-xs mt-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm mb-4">No reviews yet. Be the first!</p>
          )}
          
          <button className="w-full p-4 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 font-bold transition-colors">
            Write a Review
          </button>
        </section>
      </div>
    </main>
  );
}
