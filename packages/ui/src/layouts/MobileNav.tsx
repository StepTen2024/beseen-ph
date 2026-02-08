'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface MobileNavItem {
  name: string;
  icon: ReactNode;
  href: string;
  isFab?: boolean;
  fabIcon?: ReactNode;
}

export interface MobileNavProps {
  items: MobileNavItem[];
  className?: string;
  accentColor?: string;
}

export function MobileNav({
  items,
  className = '',
  accentColor = 'fuchsia',
}: MobileNavProps) {
  const pathname = usePathname();

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pointer-events-none ${className}`}>
      <nav className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center justify-around px-2 py-3 pointer-events-auto">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

          if (item.isFab) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative -top-6 transform transition-transform active:scale-95"
              >
                <div className="p-1 rounded-full bg-slate-950 border-4 border-slate-950 shadow-lg">
                  <div className={`bg-${accentColor}-500 rounded-full p-3 text-slate-950`}>
                    {item.fabIcon || item.icon}
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 min-w-[60px] transition-colors ${
                isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="relative">
                {item.icon}
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-${accentColor}-500 rounded-full shadow-[0_0_8px_2px_rgba(217,70,239,0.5)]`}
                  />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default MobileNav;
