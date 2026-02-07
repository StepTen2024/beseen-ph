import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Force all pages to be dynamic (no static prerendering)
export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BE SEEN Admin',
  description: 'Admin panel for BE SEEN.PH',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
