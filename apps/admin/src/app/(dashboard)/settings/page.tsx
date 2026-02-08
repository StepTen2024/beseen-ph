'use client';

import { 
  Settings, User, Bell, Shield, Database, Zap, 
  Globe, Palette, CreditCard, ChevronRight
} from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Settings className="w-5 h-5" /> Admin Settings
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Account */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 mb-3 px-2">ACCOUNT</h2>
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 divide-y divide-slate-800">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-fuchsia-400" />
                <span>Profile</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-amber-400" />
                <span>Notifications</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>Security</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </section>

        {/* Platform */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 mb-3 px-2">PLATFORM</h2>
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 divide-y divide-slate-800">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-cyan-400" />
                <span>Database</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-purple-400" />
                <span>AI Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>Domains</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-pink-400" />
                <span>Branding</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </section>

        {/* Billing */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 mb-3 px-2">BILLING</h2>
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 divide-y divide-slate-800">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-slate-400" />
                <span>Payment Methods</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
