/**
 * BE SEEN.PH - Content Calendar Component
 * Phase 2: The Delivery Engine ("Pinky")
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import type { Post } from '@/types/database';

interface CalendarPost extends Post {
  clients?: { business_name: string };
}

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [posts, setPosts] = useState<CalendarPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [currentDate]);

  const fetchPosts = async () => {
    try {
      // Get posts for the current month
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
      const endDate = `${year}-${month.toString().padStart(2, '0')}-31`;

      // This would need a date range API - simplified for now
      const res = await fetch('/api/posts?limit=100');
      const data = await res.json();
      
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getPostsForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    return posts.filter(post => post.scheduled_date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent" />
      </div>
    );
  }

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-200">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="rounded-lg border border-slate-700 bg-slate-800/50 p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            Today
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="rounded-lg border border-slate-700 bg-slate-800/50 p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-slate-800">
          {dayNames.map(day => (
            <div key={day} className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {/* Empty cells for days before the first of the month */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px] border-b border-r border-slate-800/50 bg-slate-900/30" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = i + 1;
            const datePosts = getPostsForDate(date);
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), date).toDateString();
            const isSelected = selectedDate === `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`)}
                className={`min-h-[100px] border-b border-r border-slate-800/50 p-2 text-left transition-all hover:bg-slate-800/30 ${
                  isSelected ? 'bg-fuchsia-500/10' : ''
                } ${isToday ? 'bg-slate-800/50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${isToday ? 'text-fuchsia-400' : 'text-slate-400'}`}>
                    {date}
                  </span>
                  {datePosts.length > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-500/20 text-xs font-medium text-fuchsia-400">
                      {datePosts.length}
                    </span>
                  )}
                </div>

                {/* Post indicators */}
                <div className="mt-1 space-y-1">
                  {datePosts.slice(0, 3).map((post, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full ${
                        post.status === 'published' ? 'bg-emerald-500' :
                        post.status === 'scheduled' ? 'bg-fuchsia-500' :
                        post.status === 'pending_approval' ? 'bg-amber-500' :
                        'bg-slate-600'
                      }`}
                      title={post.clients?.business_name}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Published</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-fuchsia-500" />
          <span>Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-amber-500" />
          <span>Pending Approval</span>
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-4"
        >
          <h3 className="mb-3 text-sm font-medium text-slate-200">
            Posts for {selectedDate}
          </h3>
          <div className="space-y-2">
            {getPostsForDate(parseInt(selectedDate.split('-')[2])).map(post => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/30 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    {post.clients?.business_name}
                  </p>
                  <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                    {post.content}
                  </p>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  post.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' :
                  post.status === 'scheduled' ? 'bg-fuchsia-500/20 text-fuchsia-400' :
                  post.status === 'pending_approval' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-slate-700 text-slate-300'
                }`}>
                  {post.status}
                </span>
              </div>
            ))}
            {getPostsForDate(parseInt(selectedDate.split('-')[2])).length === 0 && (
              <p className="text-sm text-slate-500">No posts scheduled for this date</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
