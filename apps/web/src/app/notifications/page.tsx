'use client';

import { Bell, Heart, Star, MessageCircle, Store, Settings, Check } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, type: 'like', title: 'Wings & Things liked your review', time: '2 hours ago', read: false },
  { id: 2, type: 'reply', title: 'Someone replied to your review', time: '5 hours ago', read: false },
  { id: 3, type: 'promo', title: 'New deal at Cafe Lupe: 20% off!', time: '1 day ago', read: true },
  { id: 4, type: 'update', title: 'The Curator updated their menu', time: '2 days ago', read: true },
  { id: 5, type: 'review', title: 'Your review was featured!', time: '3 days ago', read: true },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'like': return Heart;
    case 'reply': return MessageCircle;
    case 'promo': return Store;
    case 'review': return Star;
    default: return Bell;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case 'like': return 'text-fuchsia-400 bg-fuchsia-500/10';
    case 'reply': return 'text-cyan-400 bg-cyan-500/10';
    case 'promo': return 'text-emerald-400 bg-emerald-500/10';
    case 'review': return 'text-amber-400 bg-amber-500/10';
    default: return 'text-slate-400 bg-slate-500/10';
  }
};

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Notifications</h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
              <Check className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="space-y-2">
          {NOTIFICATIONS.map((notif) => {
            const Icon = getIcon(notif.type);
            const colorClass = getColor(notif.type);
            
            return (
              <div 
                key={notif.id}
                className={`flex items-start gap-4 p-4 rounded-xl transition-colors cursor-pointer ${
                  notif.read ? 'bg-slate-900/30' : 'bg-slate-900/50 border border-slate-800'
                }`}
              >
                <div className={`p-2 rounded-xl ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className={notif.read ? 'text-slate-400' : 'text-white'}>{notif.title}</p>
                  <p className="text-slate-600 text-sm">{notif.time}</p>
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-fuchsia-500 mt-2" />
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
