'use client';

import { useState } from 'react';
import { 
  User, MapPin, Bell, Shield, LogOut, ChevronRight,
  Moon, Globe, Trash2
} from 'lucide-react';

export default function SettingsPage() {
  const [location, setLocation] = useState('Angeles City');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 mb-3 px-2">ACCOUNT</h2>
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 divide-y divide-slate-800">
            <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-800/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold">Juan Dela Cruz</p>
                <p className="text-slate-500 text-sm">juan@email.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 mb-3 px-2">PREFERENCES</h2>
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 divide-y divide-slate-800">
            {/* Location */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="font-medium">Default Location</p>
                  <p className="text-slate-500 text-sm">{location}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-slate-500 text-sm">Push & email alerts</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-7 rounded-full transition-colors ${
                  notifications ? 'bg-fuchsia-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-slate-500 text-sm">English</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-slate-500 text-sm">Always on</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-7 rounded-full transition-colors ${
                  darkMode ? 'bg-fuchsia-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 mb-3 px-2">PRIVACY & SECURITY</h2>
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 divide-y divide-slate-800">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-400" />
                <p className="font-medium">Privacy Settings</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-sm font-medium text-slate-500 mb-3 px-2">DANGER ZONE</h2>
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 divide-y divide-slate-800">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors text-red-400">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                <p className="font-medium">Sign Out</p>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors text-red-400">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5" />
                <p className="font-medium">Delete Account</p>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
