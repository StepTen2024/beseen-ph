'use client';

import { ReactNode } from 'react';
import { Menu, Bell, Search } from 'lucide-react';

export interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
  rightContent?: ReactNode;
  showSearch?: boolean;
  className?: string;
}

export function DashboardHeader({
  title,
  subtitle,
  onMenuClick,
  rightContent,
  showSearch = false,
  className = '',
}: DashboardHeaderProps) {
  return (
    <header className={`sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 ${className}`}>
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Menu button + Title */}
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {(title || subtitle) && (
              <div className="min-w-0">
                {title && (
                  <h1 className="text-lg md:text-xl font-bold text-white truncate">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-sm text-slate-400 truncate">{subtitle}</p>
                )}
              </div>
            )}
          </div>

          {/* Center - Search (optional) */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50"
                />
              </div>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {rightContent || (
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-fuchsia-500 rounded-full" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
