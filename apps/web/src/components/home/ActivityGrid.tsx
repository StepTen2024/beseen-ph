'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Hand } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import HolographicCard from '@/components/ui/HolographicCard';

export default function ActivityGrid() {
    const activities = [
        { title: "Bambike Tour", location: "Intramuros", price: "₱600", image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=800", isVerified: true, badges: ["₱600", "Culture"] },
        { title: "Pottery Workshop", location: "Quezon City", price: "₱1,200", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800", isVerified: true, badges: ["₱1,200", "Craft"] },
        { title: "Food Crawl", location: "Binondo", price: "₱800", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800", isVerified: true, badges: ["₱800", "Foodie"] },
        { title: "Sunset Cruise", location: "Manila Bay", price: "₱450", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800", isVerified: false, badges: ["₱450", "View"] }, // Unverified to show contrast
    ];

    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, [carouselRef]);

    return (
        <section className="py-20 bg-slate-950 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-4xl font-bold text-white">Experience It</h2>
                        <div className="md:hidden flex items-center gap-2 mt-2 text-slate-500 text-xs">
                            <Hand className="w-3 h-3 animate-pulse" /> Swipe to explore
                        </div>
                    </div>
                    <Link href="/activities" className="text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-2">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Mobile: Draggable Carousel / Desktop: Grid */}
                <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing md:cursor-default overflow-visible">
                    <motion.div
                        className="flex md:grid md:grid-cols-4 gap-6"
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        dragElastic={0.2}
                        style={{ display: "flex", gap: "1.5rem" }}
                    >
                        {activities.map((activity, i) => (
                            <motion.div
                                key={i}
                                className="min-w-[280px] md:min-w-0 md:w-full h-[400px]"
                                whileTap={{ scale: 0.95 }}
                            >
                                <HolographicCard
                                    title={activity.title}
                                    subtitle={activity.location}
                                    image={activity.image}
                                    isVerified={activity.isVerified}
                                    badges={activity.badges}
                                    href="/activities/demo"
                                    className="w-full"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
