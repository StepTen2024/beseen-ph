/**
 * BE SEEN.PH - Admin Claims Page
 * Review and approve business claims
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Building2, 
  Mail,
  Phone,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { ProtectedRoute } from '@/components/auth';
import type { ClaimRequest } from '@/lib/database.types';

// Mock data - replace with API call
type ClaimWithBusiness = ClaimRequest & { businessName?: string; businessCity?: string };

const MOCK_CLAIMS: ClaimWithBusiness[] = [
  {
    id: 'claim-001',
    business_id: 'biz-001',
    claimed_by: 'user-001',
    verification_email: 'owner@casacasanova.ph',
    verification_phone: '+63 912 345 6789',
    business_registration_doc: null,
    status: 'pending',
    reviewed_by: null,
    reviewed_at: null,
    rejection_reason: null,
    tokens_awarded: false,
    tokens_awarded_at: null,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    businessName: 'Casa Casanova',
    businessCity: 'Angeles City',
  },
  {
    id: 'claim-002',
    business_id: 'biz-002',
    claimed_by: 'user-002',
    verification_email: 'manager@bayanihan.com',
    verification_phone: null,
    business_registration_doc: null,
    status: 'pending',
    reviewed_by: null,
    reviewed_at: null,
    rejection_reason: null,
    tokens_awarded: false,
    tokens_awarded_at: null,
    created_at: '2024-01-14T14:20:00Z',
    updated_at: '2024-01-14T14:20:00Z',
    businessName: 'Bayanihan Digital',
    businessCity: 'Angeles City',
  },
  {
    id: 'claim-003',
    business_id: 'biz-003',
    claimed_by: 'user-003',
    verification_email: 'admin@cebudive.ph',
    verification_phone: '+63 923 456 7890',
    business_registration_doc: null,
    status: 'approved',
    reviewed_by: 'admin-001',
    reviewed_at: '2024-01-10T09:00:00Z',
    rejection_reason: null,
    tokens_awarded: true,
    tokens_awarded_at: '2024-01-10T09:00:00Z',
    created_at: '2024-01-08T16:45:00Z',
    updated_at: '2024-01-10T09:00:00Z',
    businessName: 'Cebu Dive Center',
    businessCity: 'Cebu City',
  },
];

export default function AdminClaimsPage() {
  const [claims, setClaims] = useState(MOCK_CLAIMS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null);

  const filteredClaims = claims.filter(claim => {
    if (filter !== 'all' && claim.status !== filter) return false;
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      return (
        claim.businessName?.toLowerCase().includes(search) ||
        claim.verification_email?.toLowerCase().includes(search) ||
        claim.businessCity?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const handleApprove = async (claimId: string) => {
    setProcessing(claimId);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setClaims(prev => prev.map(claim => 
      claim.id === claimId 
        ? { 
            ...claim, 
            status: 'approved',
            reviewed_at: new Date().toISOString(),
            tokens_awarded: true,
            tokens_awarded_at: new Date().toISOString(),
          }
        : claim
    ));
    setProcessing(null);
  };

  const handleReject = async (claimId: string) => {
    setProcessing(claimId);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setClaims(prev => prev.map(claim => 
      claim.id === claimId 
        ? { 
            ...claim, 
            status: 'rejected',
            reviewed_at: new Date().toISOString(),
            rejection_reason: rejectReason,
          }
        : claim
    ));
    setProcessing(null);
    setShowRejectModal(null);
    setRejectReason('');
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    
    const icons = {
      pending: Clock,
      approved: CheckCircle2,
      rejected: XCircle,
    };

    const Icon = icons[status as keyof typeof icons] || Clock;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border ${styles[status as keyof typeof styles]}`}>
        <Icon size={14} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-slate-950 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Claim Requests</h1>
            <p className="text-slate-400">Review and manage business ownership claims</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total', value: claims.length, color: 'from-slate-600 to-slate-500' },
              { label: 'Pending', value: claims.filter(c => c.status === 'pending').length, color: 'from-amber-500 to-amber-400' },
              { label: 'Approved', value: claims.filter(c => c.status === 'approved').length, color: 'from-emerald-500 to-emerald-400' },
              { label: 'Rejected', value: claims.filter(c => c.status === 'rejected').length, color: 'from-red-500 to-red-400' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-4 text-center" intensity="medium">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex gap-2">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === f
                      ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white'
                      : 'bg-slate-900/50 text-slate-400 hover:text-white border border-slate-700/50'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by business name, email, or city..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500/50"
              />
            </div>
          </div>

          {/* Claims List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredClaims.map((claim) => (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <GlassCard className="p-6" intensity="medium">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Business Info */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 flex items-center justify-center">
                          <Building2 className="text-fuchsia-400" size={28} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{claim.businessName}</h3>
                          <p className="text-slate-400 text-sm">{claim.businessCity}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1.5 text-slate-400">
                              <Mail size={14} />
                              {claim.verification_email}
                            </span>
                            {claim.verification_phone && (
                              <span className="flex items-center gap-1.5 text-slate-400">
                                <Phone size={14} />
                                {claim.verification_phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center gap-4">
                        {getStatusBadge(claim.status)}
                        
                        {claim.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApprove(claim.id)}
                              disabled={processing === claim.id}
                              className="bg-emerald-500 hover:bg-emerald-400"
                            >
                              {processing === claim.id ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                />
                              ) : (
                                <>
                                  <CheckCircle2 size={16} className="mr-1" />
                                  Approve
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowRejectModal(claim.id)}
                              disabled={processing === claim.id}
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            >
                              <XCircle size={16} className="mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}

                        <button className="text-slate-400 hover:text-white transition-colors">
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="mt-4 pt-4 border-t border-slate-700/30 flex items-center gap-6 text-sm text-slate-500">
                      <span>Submitted: {new Date(claim.created_at).toLocaleDateString('en-PH')}</span>
                      {claim.reviewed_at && (
                        <span>
                          Reviewed: {new Date(claim.reviewed_at).toLocaleDateString('en-PH')}
                          {claim.tokens_awarded && (
                            <span className="ml-2 text-amber-400">• 3 Gold Tokens Awarded</span>
                          )}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredClaims.length === 0 && (
              <GlassCard className="p-12 text-center" intensity="medium">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                  <Filter className="text-slate-500" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No claims found</h3>
                <p className="text-slate-400">Try adjusting your filters or search query</p>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Reject Modal */}
        <AnimatePresence>
          {showRejectModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
              >
                <GlassCard className="p-6 w-full max-w-md" intensity="high">
                  <h3 className="text-lg font-semibold text-white mb-4">Reject Claim</h3>
                  <p className="text-slate-400 mb-4">Please provide a reason for rejection:</p>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter rejection reason..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:border-red-500/50"
                  />
                  <div className="flex gap-3 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowRejectModal(null);
                        setRejectReason('');
                      }}
                      className="flex-1 border-slate-700 text-slate-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleReject(showRejectModal)}
                      disabled={!rejectReason.trim()}
                      className="flex-1 bg-red-500 hover:bg-red-400"
                    >
                      Reject Claim
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}
