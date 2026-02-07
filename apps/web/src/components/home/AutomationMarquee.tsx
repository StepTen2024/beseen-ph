'use client';

import { motion } from 'framer-motion';

export default function AutomationMarquee() {
    const tools = [
        "🤖 AI Content Writer",
        "🚀 Auto-Facebook Ads",
        "📊 Google Ranking",
        "🎨 Brand Design",
        "📸 Image Enhancer",
        "🗣️ Voice-to-Post",
        "📍 Smart Map Pin",
        "📈 Real Analytics"
    ];

    return (
        <section className="py-12 bg-slate-950 border-y border-white/5 overflow-hidden">
            <div className="relative flex">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-16 px-8"
                >
                    {[...tools, ...tools].map((tool, i) => (
                        <span
                            key={i}
                            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-300 opacity-50 hover:opacity-100 transition-opacity"
                        >
                            {tool}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
