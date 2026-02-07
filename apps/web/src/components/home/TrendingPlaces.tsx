'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import HolographicCard from '@/components/ui/HolographicCard';

const places = [
    { title: "El Union Coffee", location: "La Union", category: "Cafe", image: "https://images.unsplash.com/photo-1559305616-3a9522834b6f?auto=format&fit=crop&q=80&w=800", rating: "4.8", isVerified: true, badges: ["Community Choice", "Top Rated"] },
    { title: "Bad Bird", location: "Megamall", category: "Food", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800", rating: "4.5", isVerified: false, badges: ["Good Value"] }, // GHOST MODE (Unverified)
    { title: "The Curator", location: "Makati", category: "Nightlife", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=800", rating: "4.9", isVerified: true, badges: ["Best Cocktails", "Date Night"] },
    { title: "BenCab Museum", location: "Baguio", category: "Culture", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=800", rating: "4.7", isVerified: true, badges: ["Must Visit"] },
    { title: "Flotsam & Jetsam", location: "La Union", category: "Hotel", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800", rating: "4.8", isVerified: true, badges: ["Party"] },
    { title: "Toyo Eatery", location: "Makati", category: "Dining", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800", rating: "4.9", isVerified: true, badges: ["Michelin"] },
    { title: "Siargao Secret", location: "Siargao", category: "Adventure", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800", rating: "4.6", isVerified: false, badges: ["Local Gem"] }, // GHOST MODE
];

export default function TrendingPlaces() {
    const [width, setWidth] = useState(0);
    const carousel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (carousel.current) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        }
    }, [carousel]);

    return (
        <section className="py-24 bg-slate-950 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="p-1 rounded bg-orange-500/10 border border-orange-500/20">
                                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                            </span>
                            <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">Hot Right Now</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white">Trending Places</h2>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <div className="text-right">
                            <p className="text-slate-400 text-sm font-medium">Drag to explore</p>
                            <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-orange-500 w-1/3"
                                    animate={{ x: [0, 50, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Draggable Carousel */}
                <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing overflow-visible">
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        whileTap={{ cursor: "grabbing" }}
                        className="flex gap-6 pl-4 md:pl-0"
                    >
                        {places.map((place, i) => (
                            <motion.div key={i} className="shrink-0 h-[450px]">
                                <HolographicCard
                                    title={place.title}
                                    subtitle={place.location}
                                    image={place.image}
                                    rating={place.rating}
                                    isVerified={place.isVerified}
                                    href={`/place/${place.title.toLowerCase().replace(/\s/g, '-')}`}
                                    badges={place.badges}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
