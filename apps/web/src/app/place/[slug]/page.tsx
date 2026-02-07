import { Metadata } from 'next';
import { MapPin, Camera, Heart, Share2, Navigation, ChevronRight, Users, Star } from 'lucide-react';

interface PlacePageProps {
  params: { slug: string };
}

const getMockPlace = (slug: string) => ({
  id: '1',
  name: 'Nayong Pilipino Clark',
  slug,
  type: 'Park',
  description: 'A cultural theme park showcasing Filipino heritage, featuring replicas of famous landmarks and traditional villages from across the Philippines.',
  address: 'Clark Freeport Zone, Angeles City, Pampanga',
  photos: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
  ],
  rating: 4.5,
  reviewCount: 156,
  nearbyBusinesses: [
    { id: 1, name: 'Park Cafe', category: 'Cafe', distance: '50m' },
    { id: 2, name: 'Souvenir Shop', category: 'Shop', distance: '100m' },
  ],
  thingsToDo: [
    'Visit miniature replicas of Philippine landmarks',
    'Explore traditional Filipino village houses',
    'Take photos at the famous Banaue Rice Terraces replica',
    'Enjoy cultural performances on weekends',
  ],
  tips: [
    { user: 'Maria S.', text: 'Best visited in the morning before it gets too hot!' },
    { user: 'John D.', text: 'Bring water and wear comfortable shoes.' },
  ],
});

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const place = getMockPlace(params.slug);
  return {
    title: `${place.name} - ${place.type} | BE SEEN`,
    description: place.description,
  };
}

export default function PlacePage({ params }: PlacePageProps) {
  const place = getMockPlace(params.slug);

  return (
    <main className="min-h-screen bg-[#030712] text-white pb-24">
      {/* Hero */}
      <div className="relative h-72">
        <img src={place.photos[0]} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="max-w-4xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-2 inline-block">
              {place.type}
            </span>
            <h1 className="text-3xl font-bold mb-2">{place.name}</h1>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{place.address}</span>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Rating & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="font-bold">{place.rating}</span>
            </div>
            <span className="text-slate-500">({place.reviewCount} reviews)</span>
          </div>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-medium flex items-center gap-2">
            <Navigation className="w-4 h-4" /> Get Directions
          </button>
        </div>

        {/* Description */}
        <section>
          <h2 className="text-lg font-bold mb-3">About this place</h2>
          <p className="text-slate-300 leading-relaxed">{place.description}</p>
        </section>

        {/* Things to Do */}
        <section>
          <h2 className="text-lg font-bold mb-4">Things to Do Here</h2>
          <div className="space-y-3">
            {place.thingsToDo.map((thing, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-slate-300">{thing}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" /> Visitor Tips
          </h2>
          <div className="space-y-3">
            {place.tips.map((tip, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <p className="text-slate-300 mb-2">"{tip.text}"</p>
                <p className="text-slate-500 text-sm">— {tip.user}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nearby Businesses */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Nearby Businesses</h2>
            <button className="text-fuchsia-400 text-sm flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {place.nearbyBusinesses.map((biz) => (
              <div key={biz.id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <h3 className="font-bold">{biz.name}</h3>
                <p className="text-slate-500 text-sm">{biz.category} · {biz.distance}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Photo Gallery CTA */}
        <button className="w-full p-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold flex items-center justify-center gap-2">
          <Camera className="w-5 h-5" /> View All {place.photos.length} Photos
        </button>
      </div>
    </main>
  );
}
