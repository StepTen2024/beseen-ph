'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Store, Type, Image as ImageIcon, CheckCircle2, ChevronRight, Loader2, Sparkles, Trophy, Sword, ShieldCheck, BadgeCheck, AlertCircle, Scan, Fingerprint } from 'lucide-react';

// Dynamic import for Map to avoid SSR issues
const PinDropMap = dynamic(() => import('@/components/map/PinDropMap'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-slate-900 animate-pulse rounded-xl" />
});

type Step = 'category' | 'details' | 'location' | 'signal' | 'verification' | 'success';

export default function AddPlacePage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<Step>('category');
    const [isLoading, setIsLoading] = useState(false);
    const [xp, setXp] = useState(0);
    const [scanProgress, setScanProgress] = useState(0);
    const [signalLocked, setSignalLocked] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        description: '',
        lat: 0,
        lng: 0,
        ownerVerified: false,
        idImage: null as File | null,
    });

    const handleCategorySelect = (cat: string) => {
        setFormData(prev => ({ ...prev, category: cat }));
        setXp(20);
        setCurrentStep('details');
    };

    const handleDetailsSubmit = () => {
        setXp(40);
        setCurrentStep('location');
    };

    const handleLocationSelect = (lat: number, lng: number) => {
        setFormData(prev => ({ ...prev, lat, lng }));
    };

    const handleConfirmLocation = () => {
        setXp(60);
        // If business, go to signal lock. If place, skip to success (unclaimed). 
        if (formData.category === 'business') {
            setCurrentStep('signal');
        } else {
            handleSubmit(false);
        }
    }

    const startSignalLock = () => {
        setIsLoading(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setScanProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setSignalLocked(true);
                setIsLoading(false);
                setXp(80);
            }
        }, 100);
        // In real app: navigator.geolocation.getCurrentPosition() check here
    };

    const handleSubmit = async (verified: boolean) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setXp(100);
        setIsLoading(false);
        setCurrentStep('success');
    };

    return (
        <div className="min-h-screen bg-[#030712] px-4 py-20 sm:px-6 lg:px-8 overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[100px] rounded-full" />
            </div>

            <div className="mx-auto max-w-2xl relative z-10">

                {/* Gamified Header */}
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 mb-6"
                    >
                        <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            <Trophy className="w-3 h-3" />
                            Quest: Map The World
                        </span>
                    </motion.div>

                    {/* XP Bar */}
                    <div className="w-full max-w-sm mx-auto h-2 bg-slate-900 rounded-full mb-8 overflow-hidden border border-slate-800">
                        <motion.div
                            className="h-full bg-gradient-to-r from-fuchsia-500 to-emerald-400"
                            initial={{ width: "0%" }}
                            animate={{ width: `${xp}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        {currentStep === 'category' && "Choose Your Path"}
                        {currentStep === 'details' && "Identify the Target"}
                        {currentStep === 'location' && "Drop the Pin"}
                        {currentStep === 'signal' && "Synchronize Position"}
                        {currentStep === 'verification' && "Proof of Dominion"}
                        {currentStep === 'success' && "Mission Complete!"}
                    </h1>
                </div>

                <AnimatePresence mode="wait">
                    {/* STEP 1: CATEGORY */}
                    {currentStep === 'category' && (
                        <motion.div
                            key="category"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {[
                                { id: 'business', label: 'Tycoon', icon: Store, desc: 'Shop, Restaurant, Hotel' },
                                { id: 'place', label: 'Scout Point', icon: MapPin, desc: 'Park, Landmark, View' },
                                { id: 'activity', label: 'Adventure', icon: Sword, desc: 'Tour, Event, Experience' },
                                { id: 'other', label: 'Mystery', icon: Sparkles, desc: 'Something unique...' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleCategorySelect(item.id)}
                                    className="relative overflow-hidden flex flex-col items-center p-8 bg-slate-900/40 border border-slate-800 rounded-3xl hover:bg-slate-800 hover:border-fuchsia-500/50 transition-all group text-center hover:scale-105 duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative z-10 p-4 rounded-2xl bg-slate-800/80 group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400 mb-6 transition-colors shadow-xl">
                                        <item.icon className="w-8 h-8 text-slate-400 group-hover:text-fuchsia-400" />
                                    </div>
                                    <h3 className="relative z-10 text-xl text-white font-bold mb-2">{item.label}</h3>
                                    <p className="relative z-10 text-slate-500 text-sm group-hover:text-slate-400">{item.desc}</p>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* STEP 2: DETAILS */}
                    {currentStep === 'details' && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 bg-slate-900/40 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-fuchsia-300 uppercase tracking-wider">Name of Place</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-fuchsia-300 uppercase tracking-wider">The Legend (Description)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    rows={4}
                                    className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all resize-none text-lg"
                                />
                            </div>
                            <button
                                disabled={!formData.name}
                                onClick={handleDetailsSubmit}
                                className="w-full py-5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-fuchsia-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                Continue Quest <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 3: LOCATION */}
                    {currentStep === 'location' && (
                        <motion.div
                            key="location"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                                <PinDropMap onLocationSelect={handleLocationSelect} />
                            </div>
                            <button
                                disabled={!formData.lat}
                                onClick={handleConfirmLocation}
                                className="w-full py-4 bg-white text-slate-950 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm Coordinates
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 4: SIGNAL LOCK (Geolocation) */}
                    {currentStep === 'signal' && (
                        <motion.div
                            key="signal"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="text-center py-10"
                        >
                            <div className="relative mx-auto w-40 h-40 flex items-center justify-center mb-8">
                                {/* Radar Rings */}
                                {!signalLocked && (
                                    <>
                                        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping-slow" />
                                        <div className="absolute inset-4 rounded-full border-2 border-emerald-500/50 animate-ping-slower" />
                                    </>
                                )}
                                <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${signalLocked ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-slate-800 border-2 border-slate-700'}`}>
                                    {signalLocked ? <CheckCircle2 className="w-12 h-12 text-white" /> : <Scan className="w-12 h-12 text-emerald-500 animate-pulse" />}
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-4">
                                {signalLocked ? "Signal Locked: 100%" : "Triangulating Position..."}
                            </h2>
                            <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                                {signalLocked ? "Coordinates verified. You are physically at this location." : "We need to verify you are currently at the business location."}
                            </p>

                            {!signalLocked && !isLoading && (
                                <button
                                    onClick={startSignalLock}
                                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
                                >
                                    Scan For Signal
                                </button>
                            )}

                            {isLoading && (
                                <div className="w-64 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden">
                                    <div className="h-full bg-emerald-500 transition-all duration-100" style={{ width: `${scanProgress}%` }} />
                                </div>
                            )}

                            {signalLocked && (
                                <div className="flex flex-col gap-4 max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <button
                                        onClick={() => setCurrentStep('verification')}
                                        className="w-full py-4 bg-emerald-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <ShieldCheck className="w-5 h-5" /> Proceed to Verification
                                    </button>
                                    <button
                                        onClick={() => handleSubmit(false)}
                                        className="w-full py-3 bg-transparent text-slate-500 hover:text-white text-sm font-bold transition-colors"
                                    >
                                        Skip Verification (Squatter Mode)
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* STEP 5: VERIFICATION (ID Upload) */}
                    {currentStep === 'verification' && (
                        <motion.div
                            key="verification"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm"
                        >
                            <div className="mb-8 text-center">
                                <BadgeCheck className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2">Keys to the Castle</h3>
                                <p className="text-slate-400 text-sm">Upload a Government ID to prove you control this territory.</p>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="border-2 border-dashed border-slate-700 bg-slate-900/50 rounded-2xl p-8 text-center hover:border-fuchsia-500/50 hover:bg-slate-900 transition-all cursor-pointer group">
                                    <ImageIcon className="w-10 h-10 text-slate-500 mx-auto mb-4 group-hover:text-fuchsia-400 transition-colors" />
                                    <p className="text-slate-300 font-bold mb-1">Drag & Drop ID Here</p>
                                    <p className="text-xs text-slate-600">or click to browse files</p>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-200/80">
                                        Your ID is encrypted and only used once for verification. It will never be shown publicly.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleSubmit(true)}
                                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                <Fingerprint className="w-5 h-5" /> Submit & Claim Throne
                            </button>
                            <button
                                onClick={() => handleSubmit(false)}
                                className="w-full mt-4 py-2 text-slate-500 text-sm hover:text-white transition-colors"
                            >
                                Verify Later
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 6: SUCCESS */}
                    {currentStep === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-orange-500/30 animate-pulse">
                                <Trophy className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-6">Discovery Logged!</h2>
                            <p className="text-slate-400 mb-10 max-w-md mx-auto text-lg">
                                You have successfully claimed <strong>{formData.name}</strong>.
                                {signalLocked ? " Verification is pending review." : " Get verified soon to unlock full analytics."}
                            </p>
                            <div className="space-y-4 max-w-sm mx-auto">
                                <button
                                    onClick={() => router.push('/dashboard/business')}
                                    className="w-full py-4 bg-white/10 border border-white/20 rounded-xl text-white font-bold hover:bg-white/20 transition-all backdrop-blur-sm"
                                >
                                    Enter Tycoon Dashboard
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
