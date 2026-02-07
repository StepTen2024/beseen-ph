import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BE SEEN - Discover Local Businesses in the Philippines',
  description: 'Find the best restaurants, cafes, bars, and things to do in the Philippines. Powered by AI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030712] text-white`}>
        <Navbar />
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}
