'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

interface HolographicCategoryCardProps {
    title: string;
    description: string;
    href: string;
    colorClass: string;
    className?: string; // Flexible sizing
}

export default function HolographicCategoryCard({
    title,
    description,
    href,
    colorClass,
    className = ""
}: HolographicCategoryCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
    }

    // Dynamic styles for the "Foil" effect
    // Focusing more on a "Crystal" feel for categories
    const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <Link href={href} className={`block h-full group ${className}`}>
            <div
                ref={ref}
                onMouseMove={onMouseMove}
                className="relative h-full w-full rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/20"
            >
                {/* 1. Dynamic Background Color - Subtle */}
                <div className={`absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-50 ${colorClass}`} />

                {/* 2. Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 z-10`} />

                {/* 3. HOLOGRAPHIC CRYSTAL LAYER */}
                <motion.div
                    style={style}
                    className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
                />

                {/* 4. Content */}
                <div className="relative z-30 p-6 flex flex-col justify-end h-full">
                    <h3 className="font-bold text-white mb-1 text-2xl group-hover:text-shadow-glow transition-all">
                        {title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2 group-hover:text-slate-200 transition-colors">
                        {description}
                    </p>
                </div>

                {/* 5. Border Glow */}
                <div
                    className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-500 opacity-0 group-hover:opacity-100 rounded-3xl border border-white/30"
                    style={{
                        background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.05), transparent 40%)`
                    }}
                />
            </div>
        </Link>
    );
}
