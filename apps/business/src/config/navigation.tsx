import { 
  LayoutDashboard, 
  Store, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Megaphone,
  Star,
  CreditCard,
  HelpCircle,
  Home,
  TrendingUp,
  Bell,
  User
} from 'lucide-react';
import type { SidebarSection, MobileNavItem } from '@beseen/ui';

// Sidebar navigation sections
export const sidebarSections: SidebarSection[] = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { name: 'Analytics', href: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    ],
  },
  {
    title: 'Business',
    items: [
      { name: 'Profile', href: '/profile', icon: <Store className="w-5 h-5" /> },
      { name: 'Reviews', href: '/reviews', icon: <Star className="w-5 h-5" />, badge: '3' },
      { name: 'Feed & Posts', href: '/feed', icon: <Megaphone className="w-5 h-5" /> },
      { name: 'Messages', href: '/messages', icon: <MessageSquare className="w-5 h-5" />, badge: '2' },
    ],
  },
  {
    title: 'Account',
    items: [
      { name: 'Subscription', href: '/subscription', icon: <CreditCard className="w-5 h-5" /> },
      { name: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
      { name: 'Help & Support', href: '/help', icon: <HelpCircle className="w-5 h-5" /> },
    ],
  },
];

// Mobile bottom navigation items
export const mobileNavItems: MobileNavItem[] = [
  { name: 'Home', icon: <Home className="w-6 h-6" />, href: '/dashboard' },
  { name: 'Analytics', icon: <TrendingUp className="w-6 h-6" />, href: '/analytics' },
  { name: 'Feed', icon: <Megaphone className="w-6 h-6" />, href: '/feed' },
  { name: 'Alerts', icon: <Bell className="w-6 h-6" />, href: '/notifications' },
  { name: 'Profile', icon: <User className="w-6 h-6" />, href: '/profile' },
];
