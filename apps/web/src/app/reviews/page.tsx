'use client';

import { Star, ThumbsUp, MessageCircle, MoreHorizontal } from 'lucide-react';

const MY_REVIEWS = [
  {
    id: 1,
    business: "Wings & Things",
    businessImage: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400",
    rating: 5,
    content: "Best wings in Angeles City! The buffalo sauce is perfectly spicy and the meat is always juicy. Staff is super friendly too.",
    date: "Feb 5, 2026",
    likes: 12,
    replies: 3,
  },
  {
    id: 2,
    business: "Cafe Lupe",
    businessImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
    rating: 4,
    content: "Great coffee and cozy atmosphere. Perfect for working. WiFi is fast. Only minus is the limited parking.",
    date: "Jan 28, 2026",
    likes: 8,
    replies: 1,
  },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">My Reviews</h1>
          <p className="text-slate-400 text-sm">{MY_REVIEWS.length} reviews written</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {MY_REVIEWS.map((review) => (
          <div key={review.id} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            {/* Business Info */}
            <div className="flex items-center gap-3 mb-4">
              <img src={review.businessImage} alt={review.business} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold">{review.business}</h3>
                <p className="text-slate-500 text-sm">{review.date}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-800">
                <MoreHorizontal className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[1,2,3,4,5].map((i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} 
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-slate-300 mb-4">{review.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-800">
              <button className="flex items-center gap-2 text-slate-400 hover:text-fuchsia-400">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{review.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-400">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{review.replies} replies</span>
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
