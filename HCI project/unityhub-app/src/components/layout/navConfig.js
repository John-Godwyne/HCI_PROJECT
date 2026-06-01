import {
  LayoutDashboard,
  Calendar,
  Package,
  Users,
  Bell,
  User,
  Settings,
} from 'lucide-react';

export const mainNav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/resources', icon: Package, label: 'Resources' },
  { to: '/organizations/o1', icon: Users, label: 'Organizations' },
  { to: '/notifications', icon: Bell, label: 'Notifications', badge: true },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];
