'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2,
  Store, MapPin, Phone, Mail, CheckCircle, Clock, XCircle,
  TrendingUp, Users, DollarSign, Calendar
} from 'lucide-react';

const CLIENTS = [
  { id: 1, name: "Wings & Things", category: "Restaurant", city: "Angeles City", status: "active", tier: "seryoso", revenue: 499, joined: "2024-01-15", posts: 28, views: 1250 },
  { id: 2, name: "Cafe Lupe", category: "Cafe", city: "Angeles City", status: "active", tier: "tingiy", revenue: 0, joined: "2024-02-01", posts: 4, views: 340 },
  { id: 3, name: "The Local Bar", category: "Bar", city: "Clark", status: "pending", tier: "none", revenue: 0, joined: "2024-02-05", posts: 0, views: 89 },
  { id: 4, name: "Mang Inasal", category: "Restaurant", city: "Angeles City", status: "active", tier: "malakas", revenue: 1000, joined: "2024-01-10", posts: 45, views: 3200 },
  { id: 5, name: "Jollibee Clark", category: "Fast Food", city: "Clark", status: "active", tier: "boss", revenue: 5000, joined: "2024-01-05", posts: 60, views: 8900 },
];

const STATS = [
  { label: 'Total Clients', value: '47', icon: Store, color: 'text-fuchsia-400', change: '+12%' },
  { label: 'Active Subscribers', value: '23', icon: Users, color: 'text-emerald-400', change: '+8%' },
  { label: 'Monthly Revenue', value: '₱34,500', icon: DollarSign, color: 'text-amber-400', change: '+15%' },
  { label: 'Pending Claims', value: '5', icon: Clock, color: 'text-cyan-400', change: '-2' },
];

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredClients = CLIENTS.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || client.status === filter || client.tier === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Clients</h1>
            <p className="text-slate-400 text-sm">Manage all businesses</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 font-bold text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'pending', 'seryoso', 'malakas', 'boss'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-fuchsia-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Clients Table */}
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Business</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Tier</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Revenue</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Posts</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Views</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 flex items-center justify-center font-bold">
                        {client.name[0]}
                      </div>
                      <div>
                        <p className="font-bold">{client.name}</p>
                        <p className="text-slate-500 text-sm">{client.category} · {client.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      client.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                      client.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {client.status === 'active' ? <CheckCircle className="w-3 h-3" /> :
                       client.status === 'pending' ? <Clock className="w-3 h-3" /> :
                       <XCircle className="w-3 h-3" />}
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      client.tier === 'boss' ? 'bg-amber-500/10 text-amber-400' :
                      client.tier === 'malakas' ? 'bg-cyan-500/10 text-cyan-400' :
                      client.tier === 'seryoso' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {client.tier || 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {client.revenue > 0 ? `₱${client.revenue.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{client.posts}</td>
                  <td className="px-6 py-4 text-slate-400">{client.views.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
