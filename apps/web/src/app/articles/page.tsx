/**
 * BE SEEN.PH - Articles Index Page
 * Phase 3: Content Site Engine
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, ArrowRight, TrendingUp, Sparkles, Clock, Calendar } from 'lucide-react';
import { MOCK_ARTICLES } from '@/lib/mock-data';
import { ARTICLE_CATEGORIES } from '@/types/content';

export const metadata: Metadata = {
    title: 'The Journal | Be Seen.ph',
    description: 'Stories from the underground. Local guides, food reviews, and business insights from Pampanga.',
};

export default function ArticlesPage() {
    const featuredArticle = MOCK_ARTICLES[0];
    const recentArticles = MOCK_ARTICLES.slice(1);

    return (
        <div className="min-h-screen bg-[#030712] text-white">
            {/* Cinematic Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center animate-subtle-zoom opacity-50" />

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 backdrop-blur-md mb-6 hover:bg-fuchsia-500/20 transition-colors cursor-pointer">
                        <Newspaper className="w-4 h-4 text-fuchsia-400" />
                        <span className="text-sm font-bold text-fuchsia-200 tracking-wide uppercase">The Journal</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-none">
                        Stories from <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400">The Underground.</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        No fluff. Just real guides, honest reviews, and the pulse of the city.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-30 -mt-20">

                {/* Categories Scroll */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {ARTICLE_CATEGORIES.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/articles/category/${cat.slug}`}
                            className="px-6 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10 transition-all text-sm font-bold uppercase tracking-wider shadow-lg"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>

                {/* Featured Content (Grid Layout) */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                    {/* Main Feature */}
                    <Link href={`/articles/${featuredArticle.slug}`} className="group relative h-[500px] lg:h-auto rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40 hover:border-fuchsia-500/30 transition-all">
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                            <img
                                src={featuredArticle.featured_image}
                                alt={featuredArticle.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded bg-fuchsia-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                    Feature Story
                                </span>
                                <span className="text-slate-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> 5 min read
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-fuchsia-200 transition-colors">
                                {featuredArticle.title}
                            </h2>
                            <p className="text-lg text-slate-300 line-clamp-2 max-w-xl">
                                {featuredArticle.excerpt}
                            </p>
                        </div>
                    </Link>

                    {/* Secondary Features (Vertical Stack) */}
                    <div className="flex flex-col gap-8">
                        {recentArticles.slice(0, 2).map((article) => (
                            <Link
                                key={article.slug}
                                href={`/articles/${article.slug}`}
                                className="group relative flex-1 min-h-[240px] rounded-3xl overflow-hidden border border-white/5 bg-slate-900/40 hover:border-fuchsia-500/30 transition-all flex"
                            >
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={article.featured_image}
                                        alt={article.title}
                                        className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-slate-950/70 group-hover:bg-slate-950/60 transition-colors" />
                                </div>

                                <div className="relative z-10 p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-wider">
                                            {article.category}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-fuchsia-200 transition-colors leading-tight">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                        Read Story <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* All Stories Grid */}
                <section>
                    <div className="flex items-end justify-between mb-8 border-b border-white/5 pb-4">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                            <TrendingUp className="h-6 w-6 text-emerald-500" /> Recent Uploads
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentArticles.slice(2).map((article) => (
                            <Link
                                key={article.slug}
                                href={`/articles/${article.slug}`}
                                className="group flex flex-col bg-slate-900/30 rounded-3xl border border-white/5 overflow-hidden hover:border-fuchsia-500/30 hover:bg-slate-900/50 transition-all h-full"
                            >
                                <div className="aspect-[4/3] w-full overflow-hidden relative">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur border border-white/10 text-white text-xs font-bold uppercase tracking-wider">
                                            {article.category}
                                        </span>
                                    </div>
                                    <img
                                        src={article.featured_image}
                                        alt={article.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(article.created_at || new Date()).toLocaleDateString()}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-fuchsia-400 transition-colors leading-snug">
                                        {article.title}
                                    </h3>
                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-slate-400 text-sm">{article.author}</span>
                                        <span className="flex items-center gap-1 text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                                            Read <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
