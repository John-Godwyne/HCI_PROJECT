import { Link } from 'react-router-dom';
import { Calendar, Package, Users, MessageSquare, Bell, ChevronRight } from 'lucide-react';
import { currentUser } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { NotificationItem } from '../components/notifications/NotificationItem';
import { Logo } from '../components/layout/Logo';
import { MobileNav } from '../components/layout/MobileNav';
import { ToastContainer } from '../components/ui/Toast';

const quickAccess = [
  { to: '/events', icon: Calendar, label: 'Events', color: 'bg-primary-50 text-primary-600' },
  { to: '/resources', icon: Package, label: 'Resources', color: 'bg-emerald-50 text-emerald-600' },
  { to: '/organizations/o1', icon: Users, label: 'Organizations', color: 'bg-violet-50 text-violet-600' },
  { to: '/notifications', icon: Bell, label: 'Notifications', color: 'bg-amber-50 text-amber-600' },
];

export function MobileDashboard() {
  const { events, notifications, markNotificationRead, unreadCount } = useApp();
  const nextEvent = events.find((e) => e.registered) ?? events[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200/80 px-4 py-4 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <Logo compact />
          <Link to="/notifications" className="relative p-2.5 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Notifications">
            <Bell className="w-5 h-5 text-slate-600" />
            {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full" />}
          </Link>
        </div>
      </header>

      <main className="px-4 py-5 max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-slate-900">Hello, {currentUser.name.split(' ')[0]} 👋</h1>
        <p className="text-sm text-slate-500 mt-0.5">Your community hub on the go.</p>

        <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-soft flex justify-between">
          <div>
            <p className="text-xs text-slate-500">Your Impact</p>
            <p className="text-lg font-bold text-slate-900">{currentUser.impact.eventsJoined} events · {currentUser.impact.resourcesShared} shared</p>
          </div>
          <Link to="/profile" className="text-primary-600 text-sm font-medium flex items-center self-center min-h-[44px]">
            Profile <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-900">Upcoming Event</h2>
            <Link to="/events" className="text-sm text-primary-600 font-medium min-h-[44px] flex items-center">See all</Link>
          </div>
          <Link to={`/m/events/${nextEvent.id}`}>
            <EventCard event={nextEvent} compact />
          </Link>
        </section>

        <section className="mt-6">
          <h2 className="font-semibold text-slate-900 mb-3">Quick Access</h2>
          <div className="grid grid-cols-4 gap-2">
            {quickAccess.map(({ to, icon: Icon, label, color }) => (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-slate-200/80 shadow-soft min-h-[80px] justify-center"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium text-slate-600 text-center leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="font-semibold text-slate-900 mb-3">Notifications</h2>
          <div className="space-y-2">
            {notifications.slice(0, 4).map((n) => (
              <NotificationItem key={n.id} notification={n} onRead={markNotificationRead} />
            ))}
          </div>
        </section>

        <Link to="/dashboard" className="block mt-6 text-center text-sm text-slate-500 hover:text-primary-600 min-h-[44px] flex items-center justify-center">
          View desktop dashboard →
        </Link>
      </main>
      <MobileNav />
      <ToastContainer />
    </div>
  );
}
