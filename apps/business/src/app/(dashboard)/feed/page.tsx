'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Image, Mic, Send, Sparkles, Heart, MessageCircle, 
  Share2, MoreHorizontal, Megaphone, Tag, Clock
} from 'lucide-react';

const POSTS = [
  {
    id: 1,
    content: "🔥 NEW: Our spicy buffalo wings are BACK! Limited time only. Tag someone who needs to try these! 🍗",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800",
    likes: 47,
    comments: 12,
    shares: 5,
    time: '2 hours ago',
    type: 'promo'
  },
  {
    id: 2,
    content: "Thank you to everyone who visited us this weekend! 🙏 We're overwhelmed by the love. See you again soon!",
    likes: 89,
    comments: 23,
    shares: 8,
    time: '1 day ago',
    type: 'update'
  },
];

export default function BusinessFeedPage() {
  const [newPost, setNewPost] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Your Feed</h1>
          <p className="text-slate-400 text-sm">Post updates for your customers</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Compose Box */}
        <motion.div 
          className="p-4 rounded-2xl bg-slate-900/50 border border-slate-700"
          animate={{ height: isComposing ? 'auto' : 'auto' }}
        >
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 flex items-center justify-center font-bold">
              W
            </div>
            <div className="flex-1">
              <textarea
                placeholder="What's happening at your business?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onFocus={() => setIsComposing(true)}
                rows={isComposing ? 4 : 2}
                className="w-full bg-transparent text-white placeholder:text-slate-500 resize-none focus:outline-none"
              />
              
              {isComposing && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between pt-4 border-t border-slate-800 mt-4"
                >
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                      <Image className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                      <Mic className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                      <Tag className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                      <Clock className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-medium flex items-center gap-2 hover:bg-slate-700">
                      <Sparkles className="w-4 h-4" /> AI Write
                    </button>
                    <button 
                      disabled={!newPost.trim()}
                      className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" /> Post
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { icon: Megaphone, label: 'Promotion', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
            { icon: Tag, label: 'New Product', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
            { icon: Sparkles, label: 'AI Post', color: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20' },
          ].map((action) => (
            <button 
              key={action.label}
              className={`flex-shrink-0 px-4 py-2 rounded-xl border flex items-center gap-2 ${action.color}`}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {POSTS.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 flex items-center justify-center font-bold">
                    W
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Wings & Things</h3>
                    <p className="text-slate-500 text-xs">{post.time}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-slate-800">
                  <MoreHorizontal className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <p className="text-slate-200 mb-4">{post.content}</p>

              {post.image && (
                <div className="rounded-xl overflow-hidden mb-4">
                  <img src={post.image} alt="" className="w-full h-48 object-cover" />
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <button className="flex items-center gap-2 text-slate-400 hover:text-fuchsia-400 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
