'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, MapPin, Phone, Mail, Globe, Facebook, Instagram,
  Clock, Camera, Save, Palette, Mic, FileText, ChevronRight
} from 'lucide-react';

export default function BusinessProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Wings & Things',
    description: 'Best chicken wings in Angeles City. Serving crispy, juicy wings with our secret sauce since 2020.',
    category: 'Restaurant',
    address: '123 Main Street, Angeles City',
    phone: '+63 912 345 6789',
    email: 'hello@wingsandthings.ph',
    website: 'https://wingsandthings.ph',
    facebook: 'wingsandthingsph',
    instagram: '@wingsandthingsph',
    primaryColor: '#d946ef',
    secondaryColor: '#06b6d4',
    voicePersonality: 'friendly',
  });

  const [hours, setHours] = useState({
    monday: { open: '10:00', close: '22:00', closed: false },
    tuesday: { open: '10:00', close: '22:00', closed: false },
    wednesday: { open: '10:00', close: '22:00', closed: false },
    thursday: { open: '10:00', close: '22:00', closed: false },
    friday: { open: '10:00', close: '23:00', closed: false },
    saturday: { open: '10:00', close: '23:00', closed: false },
    sunday: { open: '12:00', close: '21:00', closed: false },
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24">
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Edit Profile</h1>
          <button className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 font-bold text-sm flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Cover & Logo */}
        <section className="relative">
          <div className="h-48 rounded-2xl bg-slate-800 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=1200" 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-black/50 backdrop-blur-sm text-sm font-medium flex items-center gap-2">
              <Camera className="w-4 h-4" /> Change Cover
            </button>
          </div>
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-2xl bg-slate-900 border-4 border-[#030712] overflow-hidden relative">
              <img src="https://via.placeholder.com/150" alt="Logo" className="w-full h-full object-cover" />
              <button className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        <div className="pt-8" />

        {/* Basic Info */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Store className="w-5 h-5 text-fuchsia-400" /> Basic Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Business Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Category</label>
              <select 
                value={profile.category}
                onChange={(e) => setProfile({...profile, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
              >
                <option>Restaurant</option>
                <option>Cafe</option>
                <option>Bar</option>
                <option>Salon</option>
                <option>Shop</option>
                <option>Service</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Description</label>
            <textarea
              value={profile.description}
              onChange={(e) => setProfile({...profile, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500 resize-none"
            />
          </div>
        </section>

        {/* Contact */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Phone className="w-5 h-5 text-emerald-400" /> Contact Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Address"
                value={profile.address}
                onChange={(e) => setProfile({...profile, address: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="tel"
                placeholder="Phone"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="Email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="url"
                placeholder="Website"
                value={profile.website}
                onChange={(e) => setProfile({...profile, website: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Facebook className="w-5 h-5 text-blue-400" /> Social Media
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Facebook page"
                value={profile.facebook}
                onChange={(e) => setProfile({...profile, facebook: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Instagram handle"
                value={profile.instagram}
                onChange={(e) => setProfile({...profile, instagram: e.target.value})}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>
          </div>
        </section>

        {/* Branding */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-400" /> Brand Colors
          </h2>
          
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Primary</label>
              <input
                type="color"
                value={profile.primaryColor}
                onChange={(e) => setProfile({...profile, primaryColor: e.target.value})}
                className="w-16 h-16 rounded-xl cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Secondary</label>
              <input
                type="color"
                value={profile.secondaryColor}
                onChange={(e) => setProfile({...profile, secondaryColor: e.target.value})}
                className="w-16 h-16 rounded-xl cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* AI Voice */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Mic className="w-5 h-5 text-cyan-400" /> AI Voice Personality
          </h2>
          <p className="text-slate-400 text-sm">How should AI write content for your business?</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['friendly', 'professional', 'witty', 'casual'].map((voice) => (
              <button
                key={voice}
                onClick={() => setProfile({...profile, voicePersonality: voice})}
                className={`p-4 rounded-xl border text-center transition-all ${
                  profile.voicePersonality === voice
                    ? 'bg-fuchsia-600 border-fuchsia-500'
                    : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                }`}
              >
                <span className="capitalize">{voice}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Hours */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" /> Business Hours
          </h2>
          
          <div className="space-y-2">
            {Object.entries(hours).map(([day, times]) => (
              <div key={day} className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/30">
                <span className="w-24 capitalize text-sm">{day}</span>
                <input
                  type="time"
                  value={times.open}
                  disabled={times.closed}
                  className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm disabled:opacity-50"
                />
                <span className="text-slate-500">to</span>
                <input
                  type="time"
                  value={times.close}
                  disabled={times.closed}
                  className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm disabled:opacity-50"
                />
                <label className="flex items-center gap-2 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    checked={times.closed}
                    onChange={(e) => setHours({...hours, [day]: {...times, closed: e.target.checked}})}
                    className="rounded"
                  />
                  Closed
                </label>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
