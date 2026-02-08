'use client';

import { useState, ReactNode } from 'react';
import { DashboardSidebar, SidebarSection } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { MobileNav, MobileNavItem } from './MobileNav';

export interface DashboardLayoutProps {
  children: ReactNode;
  sidebarSections: SidebarSection[];
  mobileNavItems?: MobileNavItem[];
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  title?: string;
  subtitle?: string;
  headerRightContent?: ReactNode;
  sidebarFooter?: ReactNode;
  showMobileBottomNav?: boolean;
  className?: string;
}

export function DashboardLayout({
  children,
  sidebarSections,
  mobileNavItems,
  logo,
  logoText = 'Be Seen',
  logoHref = '/',
  title,
  subtitle,
  headerRightContent,
  sidebarFooter,
  showMobileBottomNav = true,
  className = '',
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-[#030712] text-white ${className}`}>
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar
          sections={sidebarSections}
          logo={logo}
          logoText={logoText}
          logoHref={logoHref}
          footer={sidebarFooter}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-0">
          <DashboardHeader
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setSidebarOpen(true)}
            rightContent={headerRightContent}
          />
          
          <main className={`flex-1 ${showMobileBottomNav && mobileNavItems ? 'pb-24 md:pb-0' : ''}`}>
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      {showMobileBottomNav && mobileNavItems && mobileNavItems.length > 0 && (
        <MobileNav items={mobileNavItems} />
      )}
    </div>
  );
}

export default DashboardLayout;
