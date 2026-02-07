'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, Zap, TrendingUp, MapPin } from 'lucide-react';

interface SearchResult {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  glow: 'cyan' | 'fuchsia' | 'amber';
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    name: 'Wings & Things',
    category: 'Restaurant',
    rating: 4.8,
    reviews: 234,
    distance: '0.3 km',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400',
    glow: 'cyan',
  },
  {
    id: '2',
    name: 'Buffalo Wild Wings',
    category: 'Sports Bar',
    rating: 4.5,
    reviews: 189,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
    glow: 'fuchsia',
  },
  {
    id: '3',
    name: 'Wingstop Angeles',
    category: 'Fast Food',
    rating: 4.6,
    reviews: 312,
    distance: '2.1 km',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400',
    glow: 'amber',
  },
];

const BIO_GLOW = {
  cyan: 'shadow-[0_0_40px_-10px_rgba(6,182,212,0.6)] border-cyan-400/50',
  fuchsia: 'shadow-[0_0_40px_-10px_rgba(217,70,239,0.6)] border-fuchsia-400/50',
  amber: 'shadow-[0_0_40px_-10px_rgba(245,158,11,0.6)] border-amber-400/50',
};

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.toLowerCase().includes('wings')) {
        setIsSearching(true);
        setTimeout(() => {
          setResults(MOCK_RESULTS);
          setShowResults(true);
          setIsSearching(false);
        }, 800);
      } else if (query.length > 0) {
        setShowResults(false);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
          />

          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            />
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="relative w-full max-w-3xl mx-4"
          >
            {/* Search Input - Biological Command Center */}
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(217,70,239,0.3)',
                    '0 0 40px rgba(217,70,239,0.5)',
                    '0 0 20px rgba(217,70,239,0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 blur-xl"
              />
              
              <div className="relative flex items-center gap-4 p-2 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20">
                  <Sparkles className="w-5 h-5 text-fuchsia-400" />
                </div>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search anything... Try 'wings'"
                  className="flex-1 bg-transparent text-xl text-slate-100 placeholder-slate-500 outline-none"
                />
                
                {query && (
                  <button
                    onClick={() => { setQuery(''); setShowResults(false); }}
                    className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                )}
                
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 text-sm text-slate-400">
                  <span className="hidden sm:inline">CMD</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-700 text-xs">K</span>
                </div>
              </div>
            </div>

            {/* AI Processing Indicator */}
            <AnimatePresence>
              {isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 flex items-center justify-center gap-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-fuchsia-500 border-t-transparent rounded-full"
                  />
                  <span className="text-fuchsia-400 font-medium">
                    AI is searching across 12,847 businesses...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Grid */}
            <AnimatePresence>
              {showResults && results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  <div className="flex items-center gap-2 px-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-slate-400">
                      Found {results.length} results in 0.23 seconds
                    </span>
                  </div>

                  <div className="grid gap-4">
                    {results.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`group relative p-4 rounded-xl bg-slate-900/60 backdrop-blur-sm border cursor-pointer transition-all duration-300 ${BIO_GLOW[result.glow]}`}
                      >
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                            <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-semibold text-slate-100 group-hover:text-fuchsia-400 transition-colors">
                                  {result.name}
                                </h3>
                                <p className="text-sm text-slate-400">{result.category}</p>
                              </div>
                              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20">
                                <span className="text-amber-400">★</span>
                                <span className="text-sm font-medium text-amber-400">{result.rating}</span>
                              </div>
                            </div>

                            <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" />
                                {result.reviews} reviews
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {result.distance}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-sm"
          >
            Press ESC to close
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
