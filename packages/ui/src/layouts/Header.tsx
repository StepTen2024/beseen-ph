'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Rocket } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface NavItem {
  name: string;
  href?: string;
  icon?: ReactNode;
  type?: 'link' | 'dropdown';
  items?: {
    title: string;
    description?: string;
    href: string;
    icon?: ReactNode;
  }[];
}

export interface HeaderProps {
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navItems?: NavItem[];
  rightContent?: ReactNode;
  mobileMenuContent?: ReactNode;
  className?: string;
  variant?: 'transparent' | 'solid';
}

export function Header({
  logo,
  logoText = 'Be Seen',
  logoHref = '/',
  navItems = [],
  rightContent,
  mobileMenuContent,
  className = '',
  variant = 'transparent',
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const baseClasses = variant === 'solid' 
    ? 'bg-slate-950/95 backdrop-blur-md border-b border-white/5'
    : isScrolled 
      ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-fuchsia-900/5'
      : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${baseClasses} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={logoHref} className="flex items-center gap-2 group z-50 relative">
            {logo || (
              <div className="relative">
                <div className="absolute inset-0 bg-fuchsia-500 blur-lg opacity-50 group-hover:opacity-100 transition-opacity rounded-full w-8 h-8" />
                <Rocket className="relative w-8 h-8 text-white transform group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            )}
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {logoText}<span className="text-fuchsia-500">.ph</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.type === 'dropdown' ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      openDropdown === item.name
                        ? 'text-white bg-white/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                    <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {openDropdown === item.name && item.type === 'dropdown' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-fuchsia-900/20 overflow-hidden"
                    >
                      <div className="p-2">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                          >
                            {subItem.icon && (
                              <div className="p-2 bg-white/5 rounded-lg group-hover/item:bg-white/10 transition-colors">
                                {subItem.icon}
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-white text-sm">{subItem.title}</div>
                              {subItem.description && (
                                <div className="text-xs text-slate-400">{subItem.description}</div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {rightContent}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-white/5 overflow-hidden"
          >
            <div className="p-4 space-y-6">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-4">
                    {item.name}
                  </div>
                  {item.type === 'dropdown' ? (
                    <div className="grid grid-cols-1 gap-1">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                        >
                          {subItem.icon}
                          <span className="font-medium">{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
              {mobileMenuContent && (
                <div className="pt-4 border-t border-white/5 px-4 space-y-3">
                  {mobileMenuContent}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Header;
