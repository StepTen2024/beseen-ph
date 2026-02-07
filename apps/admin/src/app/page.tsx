'use client';

import AdminHero from "@/components/admin/dashboard/AdminHero";
import FeedStatus from "@/components/admin/dashboard/FeedStatus";
import AutomationQueue from "@/components/admin/dashboard/AutomationQueue";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 space-y-8">
      <AdminHero />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Main Feed / Analytics (Placeholder for Chart) */}
          <div className="h-[400px] p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm flex items-center justify-center text-slate-600">
            <span className="text-xl font-bold tracking-widest uppercase">Traffic & Revenue Analytics Module</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
              <h4 className="text-emerald-400 font-mono text-sm mb-2">SERVER LOAD</h4>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[34%]"></div>
              </div>
              <p className="text-right text-xs text-emerald-500 mt-1">34% OPTIMAL</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
              <h4 className="text-fuchsia-400 font-mono text-sm mb-2">AI TOKEN USAGE</h4>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-fuchsia-500 w-[67%]"></div>
              </div>
              <p className="text-right text-xs text-fuchsia-500 mt-1">67% HIGH VOLUME</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <AutomationQueue />
          <FeedStatus />
        </div>
      </div>
    </div>
  );
}
