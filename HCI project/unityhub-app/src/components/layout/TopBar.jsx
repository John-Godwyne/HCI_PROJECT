import { Link } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { SearchInput } from '../ui/SearchInput';

export function TopBar({ onMenuClick, search, onSearchChange, searchPlaceholder }) {
  const { unreadCount } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2.5 rounded-lg text-slate-600 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {onSearchChange ? (
          <div className="flex-1 max-w-xl">
            <SearchInput
              id="global-search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder ?? 'Search events, resources, organizations...'}
            />
          </div>
        ) : (
          <div className="flex-1 hidden sm:block max-w-xl">
            <label htmlFor="global-search" className="sr-only">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="global-search"
                type="search"
                placeholder="Search events, resources, organizations..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg min-h-[44px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') window.location.href = `/events?q=${encodeURIComponent(e.target.value)}`;
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <Link
            to="/notifications"
            className="relative p-2.5 rounded-lg text-slate-600 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-white" />
            )}
          </Link>
          <Link to="/profile" className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-50 min-h-[44px]">
            <img src={currentUser.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-slate-900 leading-tight">{currentUser.name}</p>
              <p className="text-xs text-slate-500">{currentUser.role}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
