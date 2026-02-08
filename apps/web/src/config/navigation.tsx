import { MapPin, Newspaper, Store, Sparkles, User, Ticket, Home, Map, PlusCircle, Search } from 'lucide-react';
import type { NavItem, FooterSection, MobileNavItem } from '@beseen/ui';

// Header navigation items
export const navItems: NavItem[] = [
  {
    name: 'Explore',
    icon: <MapPin className="w-4 h-4" />,
    type: 'dropdown',
    items: [
      {
        title: 'Places of Interest',
        description: 'Parks, Landmarks & Views',
        href: '/directory/angeles-city/place',
        icon: <MapPin className="w-5 h-5 text-emerald-400" />,
      },
      {
        title: 'Things to Do',
        description: 'Activities & Experiences',
        href: '/directory/angeles-city/activity',
        icon: <Ticket className="w-5 h-5 text-amber-400" />,
      },
      {
        title: 'Directory',
        description: 'Browse all Businesses',
        href: '/directory',
        icon: <Store className="w-5 h-5 text-fuchsia-400" />,
      },
    ],
  },
  {
    name: 'Journal',
    href: '/articles',
    icon: <Newspaper className="w-4 h-4" />,
  },
  {
    name: 'For Business',
    icon: <Store className="w-4 h-4" />,
    type: 'dropdown',
    items: [
      {
        title: 'Claim Your Business',
        description: 'Get verified and unlock tools',
        href: '/add-place',
        icon: <Store className="w-5 h-5 text-fuchsia-500" />,
      },
      {
        title: 'Pricing Plans',
        description: 'Start for free, grow for less',
        href: '/pricing',
        icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      },
      {
        title: 'Business Login',
        description: 'Manage your page',
        href: '/auth',
        icon: <User className="w-5 h-5 text-slate-400" />,
      },
    ],
  },
];

// Footer sections
export const footerSections: FooterSection[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Directory', href: '/directory' },
      { label: 'Places', href: '/directory/angeles-city/place' },
      { label: 'Activities', href: '/directory/angeles-city/activity' },
      { label: 'Journal', href: '/articles' },
    ],
  },
  {
    title: 'Business',
    links: [
      { label: 'Claim Your Business', href: '/add-place' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Business Login', href: '/auth' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
];

// Mobile bottom navigation items
export const mobileNavItems: MobileNavItem[] = [
  { name: 'Home', icon: <Home className="w-6 h-6" />, href: '/' },
  { name: 'Explore', icon: <Map className="w-6 h-6" />, href: '/directory' },
  { 
    name: 'Add', 
    icon: <PlusCircle className="w-6 h-6" />, 
    href: '/add-place', 
    isFab: true,
    fabIcon: <PlusCircle className="w-8 h-8" />,
  },
  { name: 'Journal', icon: <Search className="w-6 h-6" />, href: '/articles' },
  { name: 'Profile', icon: <User className="w-6 h-6" />, href: '/dashboard/user' },
];

// Social links
export const socials = {
  facebook: 'https://facebook.com/beseenph',
  instagram: 'https://instagram.com/beseenph',
  twitter: 'https://twitter.com/beseenph',
};
