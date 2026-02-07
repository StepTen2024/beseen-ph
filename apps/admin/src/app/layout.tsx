import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "Be Seen.ph - AI-Powered Marketing for Filipino Businesses",
  description: "Transform your business with AI-generated social media content. Get 30 days of professional Facebook posts in seconds.",
  keywords: ["social media marketing", "Philippines", "AI content", "Facebook posts", "small business"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen overflow-x-hidden selection:bg-emerald-500/30 touch-manipulation">
        <AuthProvider>
          <SmoothScroll>
            {children}
            <MobileBottomNav />
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
