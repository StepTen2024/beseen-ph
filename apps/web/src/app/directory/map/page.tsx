'use client';

import dynamic from 'next/dynamic';
import { getMockListings } from '@/lib/mock-data';
import { Map as MapIcon, List, Search } from 'lucide-react';
import Link from 'next/link';

// Dynamic import for Map
const DirectoryMap = dynamic(() => import('@/components/map/DirectoryMap'), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full bg-slate-900 animate-pulse rounded-xl" />
});

export default function DirectoryMapPage() {
    const listings = getMockListings();

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <div className="border-b border-white/5 bg-slate-900/50 backdrop-blur sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/directory" className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 transition-colors">
                            <List className="w-4 h-4" />
                            <span className="hidden sm:inline">List View</span>
                        </Link>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-fuchsia-600 text-white font-medium">
                            <MapIcon className="w-4 h-4" />
                            <span>Map View</span>
                        </div>
                    </div>
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search map..."
                            className="pl-10 pr-4 py-2 bg-slate-800 border-none rounded-full text-sm text-white focus:ring-2 focus:ring-fuchsia-500 w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="h-[calc(100vh-140px)] w-full relative">
                <DirectoryMap listings={listings} />

                {/* Floating Search for Mobile */}
                <div className="absolute top-4 left-4 right-4 sm:hidden z-[1000]">
                    <div className="relative shadow-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search places..."
                            className="w-full pl-12 pr-4 py-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-full text-white focus:ring-2 focus:ring-fuchsia-500 shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
