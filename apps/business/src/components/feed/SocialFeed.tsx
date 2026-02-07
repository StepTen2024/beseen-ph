/**
 * BE SEEN.PH - Social Feed Component
 * Business social media feed with voice-to-text
 */

'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Mic, 
  Image as ImageIcon, 
  X,
  Send,
  Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import type { SocialFeedPost } from '@/lib/database.types';

interface SocialFeedProps {
  posts: SocialFeedPost[];
  businessName: string;
  businessColors?: {
    primary: string;
    secondary: string;
  };
  isOwner?: boolean;
  onCreatePost?: (content: string, voiceUrl?: string) => Promise<void>;
  onLike?: (postId: string) => void;
}

export function SocialFeed({ 
  posts, 
  businessName, 
  businessColors = { primary: '#d946ef', secondary: '#06b6d4' },
  isOwner = false,
  onCreatePost,
  onLike 
}: SocialFeedProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    recordingTimer.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
    }
    // In production, this would process the audio
    setNewPostContent(prev => prev + " 🎤 [Voice note attached]");
  };

  const handleSubmit = async () => {
    if (!newPostContent.trim()) return;
    
    await onCreatePost?.(newPostContent);
    setNewPostContent('');
    setShowCreateModal(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Create Post Button (Owner Only) */}
      {isOwner && (
        <GlassCard className="p-4" intensity="medium">
          <div 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ background: `linear-gradient(135deg, ${businessColors.primary}, ${businessColors.secondary})` }}
            >
              {businessName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="px-4 py-2.5 rounded-full bg-slate-900/50 border border-slate-700/50 text-slate-400 group-hover:border-slate-600 transition-colors">
                Share an update with your customers...
              </div>
            </div>
            <Button 
              size="sm" 
              className="rounded-full"
              style={{ background: businessColors.primary }}
            >
              <Send size={16} />
            </Button>
          </div>
        </GlassCard>
      )}

      {/* Posts */}
      <AnimatePresence mode="popLayout">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-5" intensity="medium" hover>
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: `linear-gradient(135deg, ${businessColors.primary}, ${businessColors.secondary})` }}
                  >
                    {businessName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{businessName}</h4>
                    <p className="text-sm text-slate-400">
                      {new Date(post.created_at).toLocaleDateString('en-PH', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-white transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-slate-200 whitespace-pre-wrap">{post.content}</p>
                
                {/* Voice Note */}
                {post.voice_url && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsPlaying(isPlaying === post.id ? null : post.id)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                        style={{ background: businessColors.primary }}
                      >
                        {isPlaying === post.id ? (
                          <div className="flex gap-0.5">
                            <span className="w-0.5 h-3 bg-white animate-pulse" />
                            <span className="w-0.5 h-3 bg-white animate-pulse delay-75" />
                            <span className="w-0.5 h-3 bg-white animate-pulse delay-150" />
                          </div>
                        ) : (
                          <Volume2 size={18} />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="h-8 flex items-center gap-1">
                          {[...Array(20)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 rounded-full"
                              style={{ background: businessColors.secondary }}
                              animate={{ 
                                height: isPlaying === post.id ? [8, 24, 8] : 8,
                                opacity: isPlaying === post.id ? 1 : 0.5
                              }}
                              transition={{ 
                                duration: 0.5, 
                                repeat: Infinity, 
                                delay: i * 0.05 
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-slate-400">
                        {post.voice_duration ? `${post.voice_duration}s` : '0:15'}
                      </span>
                    </div>
                    {post.voice_transcript && (
                      <p className="mt-2 text-sm text-slate-500 italic">
                        &ldquo;{post.voice_transcript}&rdquo;
                      </p>
                    )}
                  </div>
                )}

                {/* Post Images */}
                {post.images && post.images.length > 0 && (
                  <div className={`mt-4 grid gap-2 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {post.images.map((img, i) => (
                      <div 
                        key={i} 
                        className="relative aspect-video rounded-xl overflow-hidden bg-slate-800"
                      >
                        <img 
                          src={img} 
                          alt={`Post image ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-700/30">
                <button 
                  onClick={() => onLike?.(post.id)}
                  className="flex items-center gap-2 text-slate-400 hover:text-fuchsia-400 transition-colors group"
                >
                  <Heart 
                    size={20} 
                    className="group-hover:fill-fuchsia-400 transition-all group-hover:scale-110" 
                  />
                  <span className="text-sm">{post.likes_count || 0}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                  <MessageCircle size={20} />
                  <span className="text-sm">{post.comments_count || 0}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors ml-auto">
                  <Share2 size={20} />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setShowCreateModal(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-lg"
            >
              <GlassCard className="p-6" intensity="high">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Create Post</h3>
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="What's happening?"
                  className="w-full h-32 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:border-fuchsia-500/50 focus:ring-2 focus:ring-fuchsia-500/20"
                />

                {/* Recording Indicator */}
                {isRecording && (
                  <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-400 text-sm">Recording... {formatTime(recordingDuration)}</span>
                    <button 
                      onClick={handleStopRecording}
                      className="ml-auto px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30"
                    >
                      Stop
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={isRecording ? handleStopRecording : handleStartRecording}
                      className={`p-2 rounded-full transition-colors ${
                        isRecording 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'text-slate-400 hover:text-fuchsia-400 hover:bg-fuchsia-500/10'
                      }`}
                    >
                      <Mic size={20} />
                    </button>
                    <button className="p-2 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                      <ImageIcon size={20} />
                    </button>
                  </div>
                  <Button
                    onClick={handleSubmit}
                    disabled={!newPostContent.trim()}
                    className="px-6"
                    style={{ 
                      background: newPostContent.trim() 
                        ? `linear-gradient(135deg, ${businessColors.primary}, ${businessColors.secondary})`
                        : undefined
                    }}
                  >
                    Post
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
