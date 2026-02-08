'use client';

import Link from 'next/link';
import { Rocket, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { ReactNode } from 'react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: ReactNode;
  logoText?: string;
  tagline?: string;
  sections?: FooterSection[];
  socials?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  copyright?: string;
  className?: string;
}

export function Footer({
  logo,
  logoText = 'Be Seen',
  tagline = 'Discover the best places in the Philippines',
  sections = [],
  socials = {},
  copyright = `© ${new Date().getFullYear()} Be Seen PH. All rights reserved.`,
  className = '',
}: FooterProps) {
  return (
    <footer className={`bg-slate-950 border-t border-white/5 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              {logo || (
                <div className="relative">
                  <div className="absolute inset-0 bg-fuchsia-500 blur-lg opacity-30 rounded-full w-8 h-8" />
                  <Rocket className="relative w-8 h-8 text-fuchsia-400" />
                </div>
              )}
              <span className="text-xl font-bold text-white">
                {logoText}<span className="text-fuchsia-500">.ph</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs mb-6">
              {tagline}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socials.twitter && (
                <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socials.youtube && (
                <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            {copyright}
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
