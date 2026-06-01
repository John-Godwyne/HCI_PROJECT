import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { mainNav } from './navConfig';
import { useApp } from '../../context/AppContext';

export function Sidebar({ onNavigate, inline }) {
  const { unreadCount, addToast } = useApp();

  const navContent = (
    <>
      <nav className={`flex-1 space-y-0.5 overflow-y-auto ${inline ? 'p-0' : 'p-3'}`} aria-label="Main navigation">
        {mainNav.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" aria-hidden />
            <span className="flex-1">{label}</span>
            {badge && unreadCount > 0 && (
              <span className="bg-primary-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className={`border-t border-slate-100 ${inline ? 'pt-3 mt-3' : 'p-3'}`}>
        <button
          type="button"
          onClick={() => addToast('Signed out successfully')}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-700 min-h-[44px] transition-colors"
        >
          <LogOut className="w-5 h-5" aria-hidden />
          Logout
        </button>
      </div>
    </>
  );

  if (inline) return <div className="flex flex-col h-full">{navContent}</div>;

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:fixed lg:inset-y-0 bg-white border-r border-slate-200/80 z-40">
      <div className="p-5 border-b border-slate-100">
        <Logo />
      </div>
      {navContent}
    </aside>
  );
}
