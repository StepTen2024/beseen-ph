/**
 * BE SEEN.PH - Client List Component
 * Phase 2: The Delivery Engine ("Pinky")
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Facebook, 
  CheckCircle, 
  XCircle, 
  MoreHorizontal,
  ExternalLink,
  Edit,
  Trash2
} from 'lucide-react';
import type { Client } from '@/types/database';

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      setClients(data.clients || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.niche.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:border-fuchsia-500 focus:outline-none sm:w-64"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 focus:border-fuchsia-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Client Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-800/30">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                Business
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                Tier
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                Facebook
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredClients.map((client) => (
              <motion.tr
                key={client.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-slate-800/30"
              >
                <td className="px-4 py-4">
                  <div>
                    <p className="font-medium text-slate-200">{client.business_name}</p>
                    <p className="text-sm text-slate-500">{client.niche}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    client.subscription_tier === 'premium' 
                      ? 'bg-purple-500/20 text-purple-400'
                      : client.subscription_tier === 'growth'
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-slate-700 text-slate-300'
                  }`}>
                    {client.subscription_tier}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={client.status} />
                </td>
                <td className="px-4 py-4">
                  {client.facebook_connected ? (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Connected</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-500">
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm">Not connected</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      title="View Details"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredClients.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-500">No clients found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: 'bg-emerald-500/20 text-emerald-400',
    trial: 'bg-cyan-500/20 text-cyan-400',
    paused: 'bg-amber-500/20 text-amber-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-slate-700 text-slate-300'}`}>
      {status}
    </span>
  );
}
