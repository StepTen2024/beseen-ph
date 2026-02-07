"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, MessageCircle, Share2, ThumbsUp, CheckCircle } from "lucide-react";

interface Post {
  id: number;
  type: "viral" | "product" | "trust";
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
}

interface SamplePostsProps {
  businessName: string;
  posts: Post[];
  onGetStarted: () => void;
}

const postTypeLabels = {
  viral: { label: "Viral Engagement", color: "from-pink-500 to-rose-500", icon: "🔥" },
  product: { label: "Product Showcase", color: "from-cyan-500 to-blue-500", icon: "✨" },
  trust: { label: "Social Proof", color: "from-emerald-500 to-teal-500", icon: "💎" },
};

export default function SamplePosts({ businessName, posts, onGetStarted }: SamplePostsProps) {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/30 mb-6">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-300 text-sm font-medium">Content Generated Successfully</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          <span className="gradient-text">Your 3 Sample Posts</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Here&apos;s what <span className="text-white font-semibold">{businessName}</span> could look like 
          with professional social media management
        </p>
      </motion.div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {posts.map((post, index) => {
          const typeInfo = postTypeLabels[post.type];
          const isLiked = likedPosts.has(post.id);
          
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Post Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${typeInfo.color} flex items-center justify-center text-lg`}>
                    {typeInfo.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{businessName}</p>
                    <p className="text-xs text-slate-400">Just now · <span className="text-slate-500">⚡ Powered by BeSeen.ph</span></p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <div className={`inline-block px-2 py-1 rounded-md bg-gradient-to-r ${typeInfo.color} bg-opacity-20 text-xs font-medium text-white mb-3`}>
                  {typeInfo.label}
                </div>
                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Post Image Placeholder */}
              <div className="px-4 pb-4">
                <div className={`h-32 rounded-lg bg-gradient-to-br ${typeInfo.color} opacity-20 flex items-center justify-center`}>
                  <span className="text-white/60 text-xs">AI-Generated Image</span>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="px-4 py-3 border-t border-white/10">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-pink-400' : 'hover:text-pink-400'}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Want us to post this for you every day?
        </h3>
        <p className="text-slate-400 mb-6 max-w-xl mx-auto">
          Join 50+ Filipino businesses already using BeSeen.ph. Get fresh, AI-generated content 
          delivered to your social media automatically.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white font-semibold text-lg hover:from-fuchsia-400 hover:to-fuchsia-500 transition-all glow-orchid overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started — ₱2,000/mo
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Cancel anytime
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            GCash accepted
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            7-day guarantee
          </span>
        </div>
      </motion.div>
    </div>
  );
}
