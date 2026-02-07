'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

export default function Magnetic({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    // Physics settings - "Heavy" and "Sticky" feel
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Move the element towards the mouse (magnetic effect)
        // We divide by a factor to make it subtle
        x.set(distanceX * 0.35);
        y.set(distanceY * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}
