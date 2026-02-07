'use client';

import { motion } from 'framer-motion';
import { Activity, MapPin, Shield, Clock } from 'lucide-react';

export default function HeartbeatSection() {
    return (
        <section className="relative py-32 bg-slate-950 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-900/10 rounded-full blur-[120px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Visual Side */}
                    <div className="relative">
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Map Base */}
                            <div className="absolute inset-0 bg-slate-900/50 rounded-3xl border border-slate-800 backdrop-blur-xl overflow-hidden shadow-2xl">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                                {/* Center "Heartbeat" Pin */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                        className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl"
                                    />
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 border-4 border-slate-900"
                                    >
                                        <Activity className="w-8 h-8 text-slate-900" />
                                    </motion.div>
                                </div>

                                {/* Satellite "Dead" Pins */}
                                {[
                                    { x: '20%', y: '30%' },
                                    { x: '80%', y: '20%' },
                                    { x: '70%', y: '70%' },
                                    { x: '30%', y: '80%' },
                                ].map((pos, i) => (
                                    <div key={i} className="absolute w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center opacity-50" style={{ top: pos.y, left: pos.x }}>
                                        <MapPin className="w-4 h-4 text-slate-600" />
                                    </div>
                                ))}

                                {/* Status Card */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute bottom-8 left-8 right-8 p-4 bg-slate-900/90 backdrop-blur-md rounded-xl border border-emerald-500/30 flex items-center gap-4"
                                >
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                    <div>
                                        <h4 className="text-emerald-400 font-medium text-sm">Status: ALIVE</h4>
                                        <p className="text-xs text-slate-400">Last update: 2 hours ago</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            The <span className="text-fuchsia-500">30-Day</span> <br />
                            Heartbeat Rule.
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            We did something Google was too scared to do. We built a map that cleans itself.
                        </p>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: Clock,
                                    title: "Use It or Lose It",
                                    desc: "Businesses must 'pulse' (log in or post) once every 30 days."
                                },
                                {
                                    icon: Shield,
                                    title: "No Ghost Town",
                                    desc: "If they go silent, their pin vanishes. You never drive to a closed shop again."
                                },
                                {
                                    icon: Activity,
                                    title: "Verified Fresh",
                                    desc: "Every pin you see has been active in the last month. Guaranteed."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-fuchsia-500">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                                        <p className="text-slate-400">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
