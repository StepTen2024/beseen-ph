import DualFunnel from "@/components/home/DualFunnel";
import Link from "next/link";
import { Store, Zap, BarChart2, FileText, ArrowRight } from "lucide-react";

export default function BusinessHome() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/20 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Grow Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">Business</span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Get discovered by thousands of local customers. AI-powered marketing that works while you sleep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/claim"
              className="px-8 py-4 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 font-bold text-lg flex items-center justify-center gap-2"
            >
              Claim Your Business <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "AI Content", desc: "Daily posts written by AI, tailored to your brand" },
            { icon: BarChart2, title: "Real Analytics", desc: "See who's viewing your business and calling you" },
            { icon: FileText, title: "SEO Articles", desc: "Get featured in local guides and rankings" },
          ].map((feature) => (
            <div key={feature.title} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <feature.icon className="w-10 h-10 text-fuchsia-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <DualFunnel />
    </main>
  );
}
