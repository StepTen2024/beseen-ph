/**
 * BE SEEN.PH - Reviews Section
 * Customer reviews with ratings and responses
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  ChevronDown, 
  Camera,
  Flag,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import type { Review } from '@/lib/database.types';

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  isOwner?: boolean;
  onSubmitReview?: (review: { rating: number; title: string; content: string }) => Promise<void>;
  onRespond?: (reviewId: string, response: string) => Promise<void>;
  onHelpful?: (reviewId: string) => void;
}

export function ReviewsSection({
  reviews,
  averageRating,
  reviewCount,
  isOwner = false,
  onSubmitReview,
  onRespond,
  onHelpful
}: ReviewsSectionProps) {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  const handleSubmit = async () => {
    if (newRating === 0 || !reviewContent.trim()) return;
    
    await onSubmitReview?.({
      rating: newRating,
      title: reviewTitle,
      content: reviewContent
    });
    
    setShowWriteReview(false);
    setNewRating(0);
    setReviewTitle('');
    setReviewContent('');
  };

  const handleRespond = async (reviewId: string) => {
    if (!responseText.trim()) return;
    
    await onRespond?.(reviewId, responseText);
    setRespondingTo(null);
    setResponseText('');
  };

  const toggleExpand = (reviewId: string) => {
    setExpandedReviews(prev => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100 
      : 0
  }));

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <GlassCard className="p-6" intensity="medium">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold text-white">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center md:justify-start gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={star <= Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}
                />
              ))}
            </div>
            <p className="text-slate-400">{reviewCount} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {ratingCounts.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm text-slate-400 w-8">{stars}★</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.1 * (6 - stars) }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                  />
                </div>
                <span className="text-sm text-slate-500 w-10 text-right">{count}</span>
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          {!isOwner && !showWriteReview && (
            <div className="flex items-center">
              <Button
                onClick={() => setShowWriteReview(true)}
                className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400"
              >
                Write a Review
              </Button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Write Review Form */}
      <AnimatePresence>
        {showWriteReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <GlassCard className="p-6" intensity="high">
              <h3 className="text-lg font-semibold text-white mb-4">Write a Review</h3>
              
              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-slate-400 mr-2">Your Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      className={star <= (hoverRating || newRating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-slate-600'
                      }
                    />
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Review Title (optional)"
                className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-500/50"
              />

              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:border-fuchsia-500/50"
              />

              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                  <Camera size={20} />
                  <span className="text-sm">Add Photos</span>
                </button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowWriteReview(false)}
                    className="border-slate-700 text-slate-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={newRating === 0 || !reviewContent.trim()}
                    className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 disabled:opacity-50"
                  >
                    Post Review
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="p-5" intensity="low" hover>
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-semibold">
                    {review.author_id ? 'U' : 'G'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        {review.author_id ? 'Verified Customer' : 'Guest'}
                      </span>
                      {review.is_verified && (
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      )}
                    </div>
                    <p className="text-sm text-slate-400">
                      {new Date(review.created_at).toLocaleDateString('en-PH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= review.rating 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-slate-600'
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              {review.title && (
                <h4 className="font-semibold text-white mb-2">{review.title}</h4>
              )}
              
              <div className="relative">
                <p className={`text-slate-300 ${!expandedReviews.has(review.id) && review.content.length > 200 ? 'line-clamp-3' : ''}`}>
                  {review.content}
                </p>
                {review.content.length > 200 && (
                  <button
                    onClick={() => toggleExpand(review.id)}
                    className="text-fuchsia-400 hover:text-fuchsia-300 text-sm mt-1 flex items-center gap-1"
                  >
                    {expandedReviews.has(review.id) ? 'Show less' : 'Read more'}
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform ${expandedReviews.has(review.id) ? 'rotate-180' : ''}`} 
                    />
                  </button>
                )}
              </div>

              {/* Review Photos */}
              {review.photos && review.photos.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {review.photos.map((photo, i) => (
                    <div 
                      key={i}
                      className="w-20 h-20 rounded-lg overflow-hidden bg-slate-800 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <img src={photo} alt={`Review photo ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700/30">
                <button 
                  onClick={() => onHelpful?.(review.id)}
                  className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <ThumbsUp size={16} />
                  <span className="text-sm">Helpful ({review.helpful_count})</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                  <MessageSquare size={16} />
                  <span className="text-sm">Comment</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors ml-auto">
                  <Flag size={16} />
                </button>
              </div>

              {/* Business Response */}
              {review.response && (
                <div className="mt-4 pl-4 border-l-2 border-fuchsia-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                      B
                    </div>
                    <span className="text-sm font-medium text-white">Business Response</span>
                    <span className="text-xs text-slate-500">
                      {review.responded_at && new Date(review.responded_at).toLocaleDateString('en-PH')}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm">{review.response}</p>
                </div>
              )}

              {/* Respond Form (Owner Only) */}
              {isOwner && !review.response && respondingTo === review.id && (
                <div className="mt-4">
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Write a response..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:border-fuchsia-500/50"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setRespondingTo(null)}
                      className="border-slate-700 text-slate-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRespond(review.id)}
                      disabled={!responseText.trim()}
                      className="bg-gradient-to-r from-fuchsia-500 to-cyan-500"
                    >
                      Respond
                    </Button>
                  </div>
                </div>
              )}

              {/* Respond Button (Owner Only) */}
              {isOwner && !review.response && respondingTo !== review.id && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRespondingTo(review.id)}
                  className="mt-4 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <MessageSquare size={14} className="mr-2" />
                  Respond
                </Button>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
