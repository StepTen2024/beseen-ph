import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight, Star, Heart, Zap, Globe } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-8 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />
            <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

                    {/* Brand Column (Span 4) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block text-2xl font-bold text-white group">
                            Be Seen<span className="text-fuchsia-500 group-hover:text-fuchsia-400 transition-colors">.ph</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            The #1 digital ecosystem for the Philippines. We help businesses be seen, loved, and booked through automated AI marketing.
                        </p>
                        <div className="flex gap-3 pt-2">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-fuchsia-500 hover:text-white hover:border-fuchsia-500 transition-all duration-300 hover:-translate-y-1">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1: Explore */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/directory" className="text-slate-400 hover:text-fuchsia-400 text-sm transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-fuchsia-500 transition-colors" /> Directory</Link></li>
                            <li><Link href="/directory/map" className="text-slate-400 hover:text-fuchsia-400 text-sm transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-fuchsia-500 transition-colors" /> Map View</Link></li>
                            <li><Link href="/directory/angeles-city/activity" className="text-slate-400 hover:text-fuchsia-400 text-sm transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-fuchsia-500 transition-colors" /> Activities</Link></li>
                            <li><Link href="/directory/angeles-city/place" className="text-slate-400 hover:text-fuchsia-400 text-sm transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-fuchsia-500 transition-colors" /> Places</Link></li>
                            <li><Link href="/articles" className="text-slate-400 hover:text-fuchsia-400 text-sm transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-fuchsia-500 transition-colors" /> The Journal</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2: For Business */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                            For Business
                        </h3>
                        <ul className="space-y-3">
                            <li><Link href="/add-place" className="text-slate-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2 group"><Star className="w-3 h-3 text-amber-500" /> Claim Your Business</Link></li>
                            <li><Link href="/pricing" className="text-slate-400 hover:text-fuchsia-400 text-sm transition-colors flex items-center gap-2 group"><Zap className="w-3 h-3 text-fuchsia-500" /> Pricing & Plans</Link></li>
                            <li><Link href="/auth" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">Business Login</Link></li>
                            <li><Link href="/dashboard/business" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">Business Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 3: Contact */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-400 text-sm group">
                                <div className="p-2 rounded-lg bg-slate-900 group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400 transition-colors mt-1">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                </div>
                                <span className="leading-relaxed">Unit 4, Angeles City Tech Hub,<br />Pampanga, Philippines</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 text-sm group">
                                <div className="p-2 rounded-lg bg-slate-900 group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400 transition-colors">
                                    <Mail className="w-4 h-4 shrink-0" />
                                </div>
                                <a href="mailto:hello@beseen.ph" className="hover:text-white transition-colors">hello@beseen.ph</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-xs text-center md:text-left flex items-center gap-2">
                        © {currentYear} Be Seen.ph <span className="w-1 h-1 rounded-full bg-slate-700"></span> All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Globe className="w-3 h-3" />
                            <span>Philippines (English)</span>
                        </div>
                        <Link href="/privacy" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-slate-400 hover:text-white text-xs transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
