/**
 * BE SEEN.PH - Directory Hero Component
 * Phase 4: Directory Engine
 */

import { MapPin, Star, Building2 } from 'lucide-react';
import type { DirectoryCategoryConfig } from '@/types/content';

interface DirectoryHeroProps {
  city: string;
  province: string;
  category: DirectoryCategoryConfig;
  listingCount: number;
}

export default function DirectoryHero({ city, province, category, listingCount }: DirectoryHeroProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 via-slate-950 to-cyan-900/20" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <a href="/" className="hover:text-slate-300">Home</a>
          <span>/</span>
          <a href="/directory" className="hover:text-slate-300">Directory</a>
          <span>/</span>
          <a href={`/directory/${city.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-slate-300">
            {city}
          </a>
          <span>/</span>
          <span className="text-slate-300">{category.pluralName}</span>
        </nav>
        
        {/* Title */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl lg:text-5xl">
            Best {category.pluralName} in {city}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            {category.description}. Discover top-rated {category.pluralName.toLowerCase()} in {city}, {province} 
            with verified reviews, photos, and contact information.
          </p>
        </div>
        
        {/* Stats */}
        <div className="mt-8 flex flex-wrap gap-6">
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2">
            <Building2 className="h-4 w-4 text-fuchsia-400" />
            <span className="text-sm text-slate-300">{listingCount} listings</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-slate-300">{city}, {province}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2">
            <Star className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-slate-300">Verified reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
}
