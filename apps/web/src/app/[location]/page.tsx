import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Newspaper, Store, Calendar, ChevronRight } from 'lucide-react';

interface LocationPageProps {
  params: { location: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = params.location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${location} - Discover Places, Food & Things to Do | BE SEEN`,
    description: `Explore the best restaurants, cafes, bars, and things to do in ${location}. Find hidden gems and trending spots near you.`,
  };
}

// Mock data - will come from Supabase
const getMockData = (location: string) => ({
  businesses: [
    { id: 1, name: "Wings & Things", category: "Restaurant", rating: 4.8, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400" },
    { id: 2, name: "Cafe Lupe", category: "Cafe", rating: 4.6, image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400" },
    { id: 3, name: "The Local Bar", category: "Bar", rating: 4.5, image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400" },
  ],
  places: [
    { id: 1, name: "Nayong Pilipino", type: "Park", distance: "2.1km" },
    { id: 2, name: "SM Clark", type: "Mall", distance: "3.5km" },
  ],
  articles: [
    { id: 1, title: `Best Pizza in ${location}`, excerpt: "We tried every pizza joint so you don't have to..." },
    { id: 2, title: `Nightlife Guide: ${location}`, excerpt: "Where to party this weekend..." },
    { id: 3, title: `Hidden Cafes in ${location}`, excerpt: "Instagram-worthy spots you've never heard of..." },
  ],
  events: [
    { id: 1, name: "Food Festival", date: "Feb 15", venue: "SM Clark" },
    { id: 2, name: "Live Music Night", date: "Feb 18", venue: "The Local Bar" },
  ],
});

export default function LocationPage({ params }: LocationPageProps) {
  const locationSlug = params.location;
  const locationName = locationSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const data = getMockData(locationName);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518558997970-4ddc236affcd?w=1600')] bg-cover bg-center opacity-40" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 pb-8 w-full">
          <div className="flex items-center gap-2 text-fuchsia-400 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>Philippines</span>
            <ChevronRight className="w-4 h-4" />
            <span>{locationName}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black">{locationName}</h1>
          <p className="text-slate-400 mt-2">Discover everything happening in {locationName}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Trending Businesses */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-fuchsia-400" />
              Trending in {locationName}
            </h2>
            <Link href={`/directory/${locationSlug}`} className="text-fuchsia-400 text-sm flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.businesses.map((biz) => (
              <Link 
                key={biz.id} 
                href={`/business/${biz.id}`}
                className="group rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden hover:border-fuchsia-500/50 transition-all"
              >
                <div className="h-40 relative">
                  <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{biz.name}</h3>
                  <p className="text-slate-500 text-sm">{biz.category} · ⭐ {biz.rating}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Places */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-400" />
              Places in {locationName}
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {data.places.map((place) => (
              <div key={place.id} className="flex-shrink-0 px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                <h3 className="font-bold">{place.name}</h3>
                <p className="text-slate-500 text-sm">{place.type} · {place.distance}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Articles */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-cyan-400" />
              Articles about {locationName}
            </h2>
            <Link href={`/articles?location=${locationSlug}`} className="text-fuchsia-400 text-sm flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {data.articles.map((article) => (
              <Link 
                key={article.id}
                href={`/articles/${article.id}`}
                className="block p-4 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-cyan-500/30 transition-all"
              >
                <h3 className="font-bold text-lg">{article.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Events */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6 text-amber-400" />
              Upcoming Events
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {data.events.map((event) => (
              <div key={event.id} className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/50 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold">{event.name}</h3>
                  <p className="text-slate-500 text-sm">{event.date} · {event.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business CTA */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-fuchsia-900/20 to-cyan-900/20 border border-fuchsia-500/20 text-center">
          <Store className="w-12 h-12 text-fuchsia-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Own a business in {locationName}?</h3>
          <p className="text-slate-400 mb-6">Get discovered by thousands of customers. Claim your listing today.</p>
          <Link 
            href="/business"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 font-bold transition-colors"
          >
            Claim Your Business <ChevronRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </main>
  );
}
