'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronLeft, Rocket } from 'lucide-react';

export interface SidebarItem {
  name: string;
  href: string;
  icon: ReactNode;
  badge?: string | number;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface DashboardSidebarProps {
  sections: SidebarSection[];
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  footer?: ReactNode;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function DashboardSidebar({
  sections,
  logo,
  logoText = 'Be Seen',
  logoHref = '/',
  footer,
  className = '',
  isOpen,
  onToggle,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          w-72 bg-slate-950 border-r border-white/5
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-auto
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <Link href={logoHref} className="flex items-center gap-2">
            {logo || (
              <div className="relative">
                <div className="absolute inset-0 bg-fuchsia-500 blur-lg opacity-50 rounded-full w-8 h-8" />
                <Rocket className="relative w-8 h-8 text-white" />
              </div>
            )}
            <span className="text-lg font-bold text-white">
              {logoText}<span className="text-fuchsia-500">.ph</span>
            </span>
          </Link>
          <button
            onClick={onToggle}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {sections.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => {
                          if (window.innerWidth < 768) onToggle();
                        }}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                          ${isActive
                            ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }
                        `}
                      >
                        {item.icon}
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span className={`
                            px-2 py-0.5 text-xs font-bold rounded-full
                            ${isActive ? 'bg-fuchsia-500/20 text-fuchsia-300' : 'bg-slate-800 text-slate-400'}
                          `}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-white/5">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
}

export default DashboardSidebar;
