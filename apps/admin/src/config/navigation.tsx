import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckCircle, 
  Settings, 
  BarChart3,
  Newspaper,
  Shield,
  Database,
  Bell,
  Home,
  ClipboardCheck,
  Sparkles,
  UserCog
} from 'lucide-react';
import type { SidebarSection, MobileNavItem } from '@beseen/ui';

// Sidebar navigation sections
export const sidebarSections: SidebarSection[] = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    ],
  },
  {
    title: 'Management',
    items: [
      { name: 'Clients', href: '/clients', icon: <Users className="w-5 h-5" /> },
      { name: 'Claims', href: '/claims', icon: <CheckCircle className="w-5 h-5" />, badge: '3' },
      { name: 'Verification', href: '/verification', icon: <Shield className="w-5 h-5" />, badge: '5' },
    ],
  },
  {
    title: 'Content',
    items: [
      { name: 'Articles', href: '/content', icon: <Newspaper className="w-5 h-5" /> },
      { name: 'AI Generation', href: '/content/generate', icon: <Sparkles className="w-5 h-5" /> },
      { name: 'Feeds', href: '/feeds', icon: <FileText className="w-5 h-5" /> },
    ],
  },
  {
    title: 'System',
    items: [
      { name: 'Analytics', href: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
      { name: 'Database', href: '/database', icon: <Database className="w-5 h-5" /> },
      { name: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
    ],
  },
];

// Mobile bottom navigation items
export const mobileNavItems: MobileNavItem[] = [
  { name: 'Home', icon: <Home className="w-6 h-6" />, href: '/' },
  { name: 'Claims', icon: <ClipboardCheck className="w-6 h-6" />, href: '/claims' },
  { name: 'Content', icon: <Newspaper className="w-6 h-6" />, href: '/content' },
  { name: 'Clients', icon: <Users className="w-6 h-6" />, href: '/clients' },
  { name: 'Settings', icon: <Settings className="w-6 h-6" />, href: '/settings' },
];
