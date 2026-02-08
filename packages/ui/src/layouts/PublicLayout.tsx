'use client';

import { ReactNode } from 'react';
import { Header, HeaderProps, NavItem } from './Header';
import { Footer, FooterProps, FooterSection } from './Footer';
import { MobileNav, MobileNavItem } from './MobileNav';

export interface PublicLayoutProps {
  children: ReactNode;
  headerProps?: Omit<HeaderProps, 'children'>;
  footerProps?: Omit<FooterProps, 'children'>;
  mobileNavItems?: MobileNavItem[];
  showMobileNav?: boolean;
  className?: string;
}

export function PublicLayout({
  children,
  headerProps,
  footerProps,
  mobileNavItems,
  showMobileNav = true,
  className = '',
}: PublicLayoutProps) {
  return (
    <div className={`min-h-screen bg-[#030712] text-white flex flex-col ${className}`}>
      <Header {...headerProps} />
      
      <main className={`flex-1 pt-20 ${showMobileNav && mobileNavItems ? 'pb-24 md:pb-0' : ''}`}>
        {children}
      </main>
      
      <Footer {...footerProps} className="hidden md:block" />
      
      {showMobileNav && mobileNavItems && mobileNavItems.length > 0 && (
        <MobileNav items={mobileNavItems} />
      )}
    </div>
  );
}

export default PublicLayout;
