'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@beseen/ui';
import { sidebarSections, mobileNavItems } from '@/config/navigation';
import { LogOut, Activity, Shield } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  adminName?: string;
}

export function AdminLayout({ 
  children, 
  title,
  subtitle,
  adminName = 'Admin',
}: AdminLayoutProps) {
  const pathname = usePathname();
  
  // Get page title from pathname if not provided
  const getPageTitle = () => {
    if (title) return title;
    if (pathname === '/') return 'Dashboard';
    const path = pathname?.split('/').filter(Boolean).pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <DashboardLayout
      sidebarSections={sidebarSections}
      mobileNavItems={mobileNavItems}
      logoText="Be Seen"
      logoHref="/"
      title={getPageTitle()}
      subtitle={subtitle || 'Admin Panel'}
      headerRightContent={
        <div className="flex items-center gap-3">
          {/* System Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">System Online</span>
          </div>
          
          {/* Admin Avatar */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {adminName.charAt(0)}
          </div>
        </div>
      }
      sidebarFooter={
        <div className="space-y-3">
          {/* Admin Info */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/50">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{adminName}</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
          </div>
          
          {/* Logout */}
          <Link
            href="/auth"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      }
    >
      {children}
    </DashboardLayout>
  );
}

export default AdminLayout;
