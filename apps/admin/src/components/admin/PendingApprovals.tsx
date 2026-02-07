/**
 * BE SEEN.PH - Pending Approvals Component
 * Phase 2: The Delivery Engine ("Pinky")
 * 
 * Displays posts awaiting client approval
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  MessageSquare,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';
import type { Post, Client } from '@/types/database';

interface PostWithClient extends Post {
  clients?: Client;
}

export default function PendingApprovals() {
  const [posts, setPosts] = useState<PostWithClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<PostWithClient | null>(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const fetchPendingPosts = async () => {
    try {
      const res = await fetch('/api/posts?pending=true');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching pending posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (postId: string) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: postId, action: 'approve' }),
      });

      if (res.ok) {
        setPosts(posts.filter(p => p.id !== postId));
        setSelectedPost(null);
      }
    } catch (error) {
      console.error('Error approving post:', error);
    }
  };

  const handleReject = async (postId: string) => {
    if (!feedback.trim()) {
      alert('Please provide feedback for rejection');
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: postId, 
          action: 'reject',
          feedback 
        }),
      });

      if (res.ok) {
        setPosts(posts.filter(p => p.id !== postId));
        setSelectedPost(null);
        setFeedback('');
      }
    } catch (error) {
      console.error('Error rejecting post:', error);
    }
  };

  const handleRequestRevision = async (postId: string) => {
    if (!feedback.trim()) {
      alert('Please provide revision notes');
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: postId, 
          action: 'request_revision',
          feedback 
        }),
      });

      if (res.ok) {
        setPosts(posts.filter(p => p.id !== postId));
        setSelectedPost(null);
        setFeedback('');
      }
    } catch (error) {
      console.error('Error requesting revision:', error);
    }
  };

  const getPostTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      engagement: 'bg-pink-500/20 text-pink-400',
      product: 'bg-cyan-500/20 text-cyan-400',
      social_proof: 'bg-emerald-500/20 text-emerald-400',
      educational: 'bg-amber-500/20 text-amber-400',
      promotional: 'bg-purple-500/20 text-purple-400',
      behind_scenes: 'bg-slate-500/20 text-slate-400',
      holiday: 'bg-red-500/20 text-red-400',
      viral: 'bg-fuchsia-500/20 text-fuchsia-400',
    };
    return colors[type] || 'bg-slate-700 text-slate-300';
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-200">
          Pending Approvals ({posts.length})
        </h2>
        <button
          onClick={fetchPendingPosts}
          className="rounded-lg border border-slate-700 bg-slate-800/50 p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Post List */}
        <div className="space-y-3">
          {posts.map((post) => (
            <motion.button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-full rounded-xl border p-4 text-left transition-all ${
                selectedPost?.id === post.id
                  ? 'border-fuchsia-500 bg-fuchsia-500/10'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPostTypeColor(post.type)}`}>
                      {post.type}
                    </span>
                    <span className="text-xs text-slate-500">
                      {post.clients?.business_name}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                    {post.content}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.scheduled_date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.scheduled_time}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}

          {posts.length === 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 py-12 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-emerald-500/50" />
              <p className="mt-4 text-slate-400">All caught up!</p>
              <p className="text-sm text-slate-500">No posts pending approval</p>
            </div>
          )}
        </div>

        {/* Post Detail */}
        <div className="lg:sticky lg:top-6">
          <AnimatePresence mode="wait">
            {selectedPost ? (
              <motion.div
                key={selectedPost.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getPostTypeColor(selectedPost.type)}`}>
                      {selectedPost.type}
                    </span>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedPost.clients?.business_name}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <p>Scheduled for</p>
                    <p className="font-medium text-slate-300">
                      {selectedPost.scheduled_date} at {selectedPost.scheduled_time}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
                  <p className="whitespace-pre-wrap text-sm text-slate-200">
                    {selectedPost.content}
                  </p>
                </div>

                {/* Image Preview */}
                {selectedPost.image_url && (
                  <div className="mt-4">
                    <img
                      src={selectedPost.image_url}
                      alt="Post image"
                      className="rounded-lg border border-slate-800"
                    />
                  </div>
                )}

                {/* Image Prompt */}
                {selectedPost.image_prompt && (
                  <div className="mt-4 rounded-lg border border-slate-800 bg-slate-800/30 p-3">
                    <p className="text-xs font-medium text-slate-400">Image Prompt:</p>
                    <p className="mt-1 text-xs text-slate-500">{selectedPost.image_prompt}</p>
                  </div>
                )}

                {/* Feedback Input */}
                <div className="mt-4">
                  <label className="text-sm font-medium text-slate-400">
                    Feedback / Revision Notes (optional for approve)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter feedback for client..."
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-sm text-slate-200 placeholder-slate-500 focus:border-fuchsia-500 focus:outline-none"
                    rows={3}
                  />
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-2">
                  <button
                    onClick={() => handleApprove(selectedPost.id)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-500"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve & Schedule
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequestRevision(selectedPost.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 py-2.5 text-sm font-medium text-amber-400 transition-all hover:bg-amber-500/20"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Request Revision
                    </button>
                    <button
                      onClick={() => handleReject(selectedPost.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50">
                <p className="text-slate-500">Select a post to review</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
