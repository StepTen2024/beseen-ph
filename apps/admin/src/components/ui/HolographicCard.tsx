'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { BadgeCheck, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

interface HolographicCardProps {
    title: string;
    subtitle: string;
    rating?: string;
    image: string;
    isVerified?: boolean;
    href: string;
    badges?: string[];
    className?: string;
}

export default function HolographicCard({
    title,
    subtitle,
    rating,
    image,
    isVerified = false,
    href,
    badges = [],
    className = "w-[280px] md:w-[320px]"
}: HolographicCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for tilt
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const [isHovered, setIsHovered] = useState(false);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
    }

    // Dynamic styles for the "Foil" effect
    const maskImage = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <Link href={href} className={`block h-full ${className}`}>
            <div
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`group relative h-full w-full rounded-3xl overflow-hidden transition-all duration-300 ${
                    // Unverified "Ghost" Mode vs Verified "Holo" Mode
                    isVerified
                        ? 'hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(217,70,239,0.3)] border border-white/10'
                        : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100 border border-slate-800'
                    }`}
            >
                {/* 1. Background Layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image})` }}
                />

                {/* 2. Gradient Overlay (Darkness) */}
                <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${isVerified ? 'from-slate-950/90' : 'from-slate-950/95'
                    }`} />

                {/* 3. HOLOGRAPHIC FOIL LAYER (Only for Verified) */}
                {isVerified && (
                    <motion.div
                        style={style}
                        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-fuchsia-500/30 via-cyan-500/30 to-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
                    />
                )}

                {/* 4. Border Glow (Only for Verified) */}
                {isVerified && (
                    <div
                        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        style={{
                            background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 40%)`
                        }}
                    />
                )}

                {/* 5. Content Layer */}
                <div className="absolute inset-0 z-40 p-6 flex flex-col justify-between">
                    {/* Top Badges */}
                    <div className="flex justify-between items-start">
                        {isVerified ? (
                            <div className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wide">Official</span>
                            </div>
                        ) : (
                            <div className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 flex items-center gap-1.5">
                                <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Unofficial</span>
                            </div>
                        )}

                        {/* Rating Bubble - Optional now */}
                        {rating && (
                            <div className="w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-colors">
                                <span className="text-xs font-bold text-white group-hover:text-amber-400">{rating}</span>
                            </div>
                        )}
                    </div>

                    {/* Bottom Info */}
                    <div className={`transform transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-2'}`}>
                        <h3 className={`text-xl font-bold mb-1 leading-tight ${isVerified ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'
                            }`}>
                            {title}
                        </h3>
                        <p className="text-sm text-slate-400 mb-3">{subtitle}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {badges.map((badge, i) => (
                                <span key={i} className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 6. Scanlines (Retro-Future Touch) */}
                <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />

            </div>
        </Link>
    );
}
