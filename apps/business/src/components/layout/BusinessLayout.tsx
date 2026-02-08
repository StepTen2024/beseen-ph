'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@beseen/ui';
import { sidebarSections, mobileNavItems } from '@/config/navigation';
import { LogOut, Coins } from 'lucide-react';

interface BusinessLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  businessName?: string;
  tokenBalance?: number;
}

export function BusinessLayout({ 
  children, 
  title,
  subtitle,
  businessName = 'My Business',
  tokenBalance = 0,
}: BusinessLayoutProps) {
  const pathname = usePathname();
  
  // Get page title from pathname if not provided
  const getPageTitle = () => {
    if (title) return title;
    const path = pathname?.split('/').filter(Boolean).pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <DashboardLayout
      sidebarSections={sidebarSections}
      mobileNavItems={mobileNavItems}
      logoText="Be Seen"
      logoHref="/dashboard"
      title={getPageTitle()}
      subtitle={subtitle}
      headerRightContent={
        <div className="flex items-center gap-3">
          {/* Token Balance */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-amber-400">{tokenBalance}</span>
          </div>
          
          {/* Business Avatar */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {businessName.charAt(0)}
          </div>
        </div>
      }
      sidebarFooter={
        <div className="space-y-3">
          {/* Business Info */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/50">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-600 to-purple-600 flex items-center justify-center text-white font-bold">
              {businessName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{businessName}</p>
              <p className="text-xs text-slate-500">Free Plan</p>
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

export default BusinessLayout;
