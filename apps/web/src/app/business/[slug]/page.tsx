import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Phone, Globe, Clock, Star, Heart, Share2, 
  Navigation, MessageCircle, Facebook, Instagram, 
  CheckCircle, Camera, ChevronRight
} from 'lucide-react';

interface BusinessPageProps {
  params: { slug: string };
}

// Mock data - will come from Supabase
const getMockBusiness = (slug: string) => ({
  id: '1',
  name: 'Wings & Things',
  slug,
  description: 'Best chicken wings in Angeles City. Serving crispy, juicy wings with our secret sauce since 2020. Family-owned and operated with love.',
  category: 'Restaurant',
  subcategories: ['Wings', 'American', 'Bar Food'],
  address: '123 Main Street, Angeles City, Pampanga',
  phone: '+63 912 345 6789',
  website: 'https://wingsandthings.ph',
  facebook: 'wingsandthingsph',
  instagram: '@wingsandthingsph',
  rating: 4.8,
  reviewCount: 234,
  priceRange: '₱₱',
  isVerified: true,
  isClaimed: true,
  photos: [
    'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800',
    'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800',
    'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=800',
  ],
  hours: {
    monday: { open: '10:00', close: '22:00' },
    tuesday: { open: '10:00', close: '22:00' },
    wednesday: { open: '10:00', close: '22:00' },
    thursday: { open: '10:00', close: '22:00' },
    friday: { open: '10:00', close: '23:00' },
    saturday: { open: '10:00', close: '23:00' },
    sunday: { open: '12:00', close: '21:00' },
  },
  amenities: ['WiFi', 'Parking', 'Outdoor Seating', 'Takeout', 'Delivery'],
  posts: [
    { id: 1, content: '🔥 NEW: Spicy buffalo wings are BACK!', likes: 47, time: '2 hours ago' },
    { id: 2, content: 'Thank you for 1000 followers!', likes: 89, time: '1 day ago' },
  ],
});

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const biz = getMockBusiness(params.slug);
  return {
    title: `${biz.name} - ${biz.category} in Angeles City | BE SEEN`,
    description: biz.description,
  };
}

export default function BusinessPage({ params }: BusinessPageProps) {
  const biz = getMockBusiness(params.slug);
  const isOpen = true; // Calculate based on hours

  return (
    <main className="min-h-screen bg-[#030712] text-white pb-24">
      {/* Photo Gallery */}
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0 grid grid-cols-3 gap-1">
          {biz.photos.map((photo, i) => (
            <div key={i} className={`relative ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
        
        {/* Photo count */}
        <button className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-sm flex items-center gap-2">
          <Camera className="w-4 h-4" /> {biz.photos.length} photos
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{biz.name}</h1>
              {biz.isVerified && (
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <span>{biz.category}</span>
              <span>·</span>
              <span>{biz.priceRange}</span>
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
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className={`w-5 h-5 ${i <= Math.floor(biz.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
            ))}
          </div>
          <span className="font-bold">{biz.rating}</span>
          <span className="text-slate-500">({biz.reviewCount} reviews)</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <a href={`tel:${biz.phone}`} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition-colors">
            <Phone className="w-6 h-6" />
            <span className="text-sm font-medium">Call</span>
          </a>
          <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-colors">
            <Navigation className="w-6 h-6" />
            <span className="text-sm font-medium">Directions</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors">
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-medium">Message</span>
          </button>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3">About</h2>
          <p className="text-slate-300 leading-relaxed">{biz.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {biz.subcategories.map((cat) => (
              <span key={cat} className="px-3 py-1 rounded-full bg-slate-800 text-sm">{cat}</span>
            ))}
          </div>
        </section>

        {/* Contact & Hours */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Contact */}
          <section className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-lg font-bold mb-4">Contact</h2>
            <div className="space-y-3">
              <a href={`tel:${biz.phone}`} className="flex items-center gap-3 text-slate-300 hover:text-white">
                <Phone className="w-5 h-5 text-slate-500" />
                {biz.phone}
              </a>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-slate-500" />
                {biz.address}
              </div>
              {biz.website && (
                <a href={biz.website} target="_blank" className="flex items-center gap-3 text-fuchsia-400 hover:text-fuchsia-300">
                  <Globe className="w-5 h-5" />
                  Visit Website
                </a>
              )}
              <div className="flex gap-3 pt-2">
                {biz.facebook && (
                  <a href={`https://facebook.com/${biz.facebook}`} target="_blank" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {biz.instagram && (
                  <a href={`https://instagram.com/${biz.instagram.replace('@', '')}`} target="_blank" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Hours */}
          <section className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" /> Hours
            </h2>
            <div className="space-y-2 text-sm">
              {Object.entries(biz.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize text-slate-400">{day}</span>
                  <span>{hours.open} - {hours.close}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Amenities */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {biz.amenities.map((amenity) => (
              <span key={amenity} className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm">
                {amenity}
              </span>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Updates</h2>
            <Link href="#" className="text-fuchsia-400 text-sm flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {biz.posts.map((post) => (
              <div key={post.id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <p className="mb-2">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </span>
                  <span>{post.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Reviews</h2>
            <Link href="#" className="text-fuchsia-400 text-sm flex items-center gap-1">
              See all {biz.reviewCount} reviews <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <button className="w-full p-4 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 font-bold transition-colors">
            Write a Review
          </button>
        </section>
      </div>
    </main>
  );
}
