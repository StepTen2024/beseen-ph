'use client';

import { BusinessLayout } from '@/components/layout/BusinessLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BusinessLayout businessName="Mang Inasal" tokenBalance={3}>
      {children}
    </BusinessLayout>
  );
}
