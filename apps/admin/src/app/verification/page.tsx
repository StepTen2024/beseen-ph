'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, XCircle, MapPin, Building2, User, Clock, AlertCircle, Eye, FileText, ChevronRight } from 'lucide-react';

// Mock Data for Verification Requests
const MOCK_REQUESTS = [
    {
        id: 'req_001',
        businessName: "Mang Inasal Pampanga",
        applicantName: "Juan Dela Cruz",
        submittedAt: "10 mins ago",
        status: "pending", // pending, approved, rejected
        trustScore: 85, // Automated score based on geolocation match + data completeness
        locationMatch: true,
        idImage: "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=2670&auto=format&fit=crop", // Mock ID
        selfieImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop", // Mock Selfie
    },
    {
        id: 'req_002',
        businessName: "Aling Lucing's Sisig",
        applicantName: "Maria Santos",
        submittedAt: "2 hours ago",
        status: "pending",
        trustScore: 45,
        locationMatch: false, // Creating a suspicious case
        idImage: "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=2670&auto=format&fit=crop",
        selfieImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
    }
];

export default function VerificationQueuePage() {
    const [selectedRequest, setSelectedRequest] = useState<typeof MOCK_REQUESTS[0] | null>(null);
    const [requests, setRequests] = useState(MOCK_REQUESTS);

    const handleDecision = (id: string, decision: 'approve' | 'reject') => {
        setRequests(prev => prev.filter(req => req.id !== id));
        setSelectedRequest(null);
    };

    return (
        <div className="min-h-screen bg-[#030712] text-white p-4 md:p-8 pb-32"> {/* Added padding bottom for mobile nav */}
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-emerald-500" />
                            Verification Queue
                        </h1>
                        <p className="text-slate-400 mt-1 text-sm md:text-base">Review "Tycoon" verification requests from business owners.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-800 text-sm font-medium text-slate-300">
                            Pending: <span className="text-white font-bold">{requests.length}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* List Column - Full width on mobile when no selection? Or always full width and detail overlaps? */}
                    <div className={`space-y-4 ${selectedRequest ? 'hidden lg:block' : 'block'}`}>
                        {requests.length === 0 ? (
                            <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                                <CheckCircle2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-500">All caught up!</h3>
                                <p className="text-slate-600">No pending verification requests.</p>
                            </div>
                        ) : (
                            requests.map((req) => (
                                <motion.div
                                    key={req.id}
                                    layoutId={req.id}
                                    onClick={() => setSelectedRequest(req)}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedRequest?.id === req.id
                                        ? 'bg-slate-800 border-fuchsia-500/50 shadow-lg shadow-fuchsia-500/10 hidden lg:block' // Highlight on desktop
                                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white">{req.businessName}</h3>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${req.trustScore > 70 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                            }`}>
                                            {req.trustScore}% Match
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                                        <User className="w-4 h-4" /> {req.applicantName}
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.submittedAt}</span>
                                        <span className="flex items-center gap-1 text-fuchsia-400 font-bold group-hover:translate-x-1 transition-transform">
                                            Review <ChevronRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Detail View (Mobile Slide-over / Desktop Panel) */}
                    <div className={`lg:col-span-2 ${selectedRequest ? 'fixed inset-0 z-50 bg-[#030712] p-4 overflow-y-auto lg:static lg:p-0 lg:bg-transparent lg:overflow-visible' : 'hidden lg:block'}`}>

                        {/* Mobile Back Button */}
                        {selectedRequest && (
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="lg:hidden flex items-center gap-2 text-slate-400 mb-6 font-bold"
                            >
                                <ChevronRight className="w-5 h-5 rotate-180" /> Back to Queue
                            </button>
                        )}

                        <AnimatePresence mode="wait">
                            {selectedRequest ? (
                                <motion.div
                                    key="detail"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden pb-10 lg:pb-0"
                                >
                                    {/* Verification Header */}
                                    <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex flex-col md:flex-row justify-between items-start gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-1">{selectedRequest.businessName}</h2>
                                            <p className="text-slate-400 flex flex-wrap items-center gap-2 text-sm">
                                                ID: {selectedRequest.id} • Applicant: <span className="text-white font-medium">{selectedRequest.applicantName}</span>
                                            </p>
                                        </div>
                                        <div className="flex gap-3 w-full md:w-auto">
                                            <button
                                                onClick={() => handleDecision(selectedRequest.id, 'reject')}
                                                className="flex-1 md:flex-none justify-center px-4 py-3 md:py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 font-bold transition-colors flex items-center gap-2"
                                            >
                                                <XCircle className="w-4 h-4" /> Reject
                                            </button>
                                            <button
                                                onClick={() => handleDecision(selectedRequest.id, 'approve')}
                                                className="flex-1 md:flex-none justify-center px-6 py-3 md:py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                                            >
                                                <CheckCircle2 className="w-4 h-4" /> Approve
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                                        {/* Auto-Checks */}
                                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" /> Geolocation Signal Lock
                                                </h4>
                                                <div className="flex items-center gap-3">
                                                    {selectedRequest.locationMatch ? (
                                                        <>
                                                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-emerald-400">Match Confirmed</p>
                                                                <p className="text-xs text-slate-500">User was within 15m of coordinates</p>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-red-400">Signal Mismatch</p>
                                                                <p className="text-xs text-slate-500">User was &gt;500m away (Suspicious)</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <FileText className="w-4 h-4" /> Document Analysis (AI)
                                                </h4>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                        <Eye className="w-5 h-5 text-blue-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-blue-400">Passable ID Detected</p>
                                                        <p className="text-xs text-slate-500">Name on ID matches Applicant</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Images */}
                                        <div className="space-y-4">
                                            <h4 className="font-bold text-white flex items-center gap-2">
                                                Government ID <span className="text-xs font-normal text-slate-500">(Encrypted)</span>
                                            </h4>
                                            <div className="aspect-[3/2] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative group">
                                                <img src={selectedRequest.idImage} alt="ID" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                                    <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white text-sm font-bold">View Fullsize</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-bold text-white flex items-center gap-2">
                                                Live Selfie <span className="text-xs font-normal text-slate-500">(Face Check)</span>
                                            </h4>
                                            <div className="aspect-[3/2] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative group">
                                                <img src={selectedRequest.selfieImage} alt="Selfie" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                                    <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white text-sm font-bold">View Fullsize</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full min-h-[400px] flex items-center justify-center rounded-2xl border border-slate-800 border-dashed bg-slate-900/20 text-slate-500">
                                    <p>Select a request to view details</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
