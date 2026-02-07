/**
 * BE SEEN.PH - Directory Filters Component
 * Phase 4: Directory Engine
 */

'use client';

import { useState } from 'react';
import { Filter, ChevronDown, Star, DollarSign } from 'lucide-react';
import type { DirectoryCategoryConfig } from '@/types/content';

interface DirectoryFiltersProps {
  category: DirectoryCategoryConfig;
  city: string;
}

export default function DirectoryFilters({ category, city }: DirectoryFiltersProps) {
  const [expanded, setExpanded] = useState<string[]>(['rating', 'amenities']);

  const toggleSection = (section: string) => {
    setExpanded(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="sticky top-6 space-y-4">
      <div className="flex items-center gap-2 text-slate-200">
        <Filter className="h-4 w-4" />
        <h3 className="font-medium">Filters</h3>
      </div>

      {/* Rating Filter */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50">
        <button
          onClick={() => toggleSection('rating')}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <span className="font-medium text-slate-200">Rating</span>
          <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${expanded.includes('rating') ? 'rotate-180' : ''}`} />
        </button>
        {expanded.includes('rating') && (
          <div className="border-t border-slate-800 px-4 pb-4">
            <div className="mt-3 space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" className="rounded border-slate-700 bg-slate-800 text-fuchsia-500" />
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-slate-300">{rating}+ Stars</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50">
        <button
          onClick={() => toggleSection('price')}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <span className="font-medium text-slate-200">Price Range</span>
          <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${expanded.includes('price') ? 'rotate-180' : ''}`} />
        </button>
        {expanded.includes('price') && (
          <div className="border-t border-slate-800 px-4 pb-4">
            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4].map((price) => (
                <label key={price} className="cursor-pointer">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-400 peer-checked:border-fuchsia-500 peer-checked:bg-fuchsia-500/10 peer-checked:text-fuchsia-400">
                    <DollarSign className="h-4 w-4" />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Amenities */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50">
        <button
          onClick={() => toggleSection('amenities')}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <span className="font-medium text-slate-200">Amenities</span>
          <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${expanded.includes('amenities') ? 'rotate-180' : ''}`} />
        </button>
        {expanded.includes('amenities') && (
          <div className="border-t border-slate-800 px-4 pb-4">
            <div className="mt-3 max-h-48 space-y-2 overflow-y-auto">
              {category.amenities.map((amenity) => (
                <label key={amenity} className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" className="rounded border-slate-700 bg-slate-800 text-fuchsia-500" />
                  <span className="text-sm text-slate-300">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Services */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50">
        <button
          onClick={() => toggleSection('services')}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <span className="font-medium text-slate-200">Services</span>
          <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${expanded.includes('services') ? 'rotate-180' : ''}`} />
        </button>
        {expanded.includes('services') && (
          <div className="border-t border-slate-800 px-4 pb-4">
            <div className="mt-3 max-h-48 space-y-2 overflow-y-auto">
              {category.services.map((service) => (
                <label key={service} className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" className="rounded border-slate-700 bg-slate-800 text-fuchsia-500" />
                  <span className="text-sm text-slate-300">{service}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Apply Button */}
      <button className="w-full rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 py-2.5 text-sm font-medium text-white transition-all hover:from-fuchsia-500 hover:to-purple-500">
        Apply Filters
      </button>
    </div>
  );
}
