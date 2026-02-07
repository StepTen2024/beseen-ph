import ConsumerHero from "@/components/home/ConsumerHero";
import LiveFeed from "@/components/home/LiveFeed";
import TrendingPlaces from "@/components/home/TrendingPlaces";
import JournalPreview from "@/components/home/JournalPreview";
import ActivityGrid from "@/components/home/ActivityGrid";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <ConsumerHero />
      <LiveFeed />
      <TrendingPlaces />
      <JournalPreview />
      <ActivityGrid />

      {/* Business Banner (Footer Area) */}
      <section className="py-12 bg-slate-900/50 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-slate-800 border border-slate-700">
              <Briefcase className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Own a Business?</h3>
              <p className="text-slate-400 text-sm">Turn this traffic into customers with our marketing powerhouse.</p>
            </div>
          </div>
          <Link href="/business" className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700 flex items-center gap-2 group">
            Create Business Page <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
