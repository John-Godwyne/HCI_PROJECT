import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Package, Bell, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const items = [
  { to: '/m', icon: LayoutDashboard, label: 'Home' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/resources', icon: Package, label: 'Resources' },
  { to: '/notifications', icon: Bell, label: 'Alerts' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export function MobileNav() {
  const { unreadCount } = useApp();

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 safe-area-pb"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-around items-stretch h-16 max-w-lg mx-auto">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 gap-0.5 text-[10px] font-medium min-h-[48px] min-w-[48px] ${
                isActive ? 'text-primary-600' : 'text-slate-500'
              }`
            }
          >
            <span className="relative">
              <Icon className="w-5 h-5" strokeWidth={2} />
              {to === '/notifications' && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full" />
              )}
            </span>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
