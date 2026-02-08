'use client';

import Link from 'next/link';
import { Sparkles, MapPin } from 'lucide-react';
import { PublicLayout as BasePublicLayout } from '@beseen/ui';
import { navItems, footerSections, mobileNavItems, socials } from '@/config/navigation';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <BasePublicLayout
      headerProps={{
        logoText: 'Be Seen',
        navItems,
        rightContent: (
          <>
            <Link
              href="/add-place"
              className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              Add a Place
            </Link>
            <Link
              href="/start"
              className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-medium text-sm transition-all hover:shadow-[0_0_20px_-5px_rgba(217,70,239,0.5)] hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              Sign Up Free
            </Link>
          </>
        ),
        mobileMenuContent: (
          <>
            <Link
              href="/add-place"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
            >
              <MapPin className="w-4 h-4" />
              Add a Place
            </Link>
            <Link
              href="/start"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Get Started Free
            </Link>
          </>
        ),
      }}
      footerProps={{
        logoText: 'Be Seen',
        tagline: 'Discover the best places in the Philippines. Powered by AI.',
        sections: footerSections,
        socials,
      }}
      mobileNavItems={mobileNavItems}
    >
      {children}
    </BasePublicLayout>
  );
}

export default PublicLayout;
