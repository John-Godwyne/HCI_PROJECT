import { Link } from 'react-router-dom';
import { Calendar, Package, Leaf, ArrowRight } from 'lucide-react';
import { currentUser, resources } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Card, CardHeader } from '../components/ui/Card';
import { EventCard } from '../components/events/EventCard';
import { NotificationItem } from '../components/notifications/NotificationItem';
import { Modal } from '../components/ui/Modal';

export function Dashboard() {
  const { events, notifications, setModal, modal, registerEvent, markNotificationRead } = useApp();
  const upcoming = events.slice(0, 4);
  const recentNotifs = notifications.slice(0, 3);
  const featuredResource = resources[0];

  const handleRegister = (event) => {
    setModal({
      type: 'register',
      eventId: event.id,
      title: 'Confirm Registration',
      description: `Register for "${event.title}"? You will receive a reminder notification before the event.`,
    });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hello, {currentUser.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 mt-1">Discover activities and share resources with your community.</p>
        </div>
        <Card className="lg:min-w-[240px] !p-4 bg-gradient-to-br from-primary-50 to-white border-primary-100">
          <div className="flex items-center gap-2 text-primary-700 font-medium text-sm mb-3">
            <Leaf className="w-4 h-4" />
            Your Impact
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-2xl font-bold text-slate-900 tabular-nums">{currentUser.impact.eventsJoined}</p>
              <p className="text-xs text-slate-500">Events Joined</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tabular-nums">{currentUser.impact.resourcesShared}</p>
              <p className="text-xs text-slate-500">Resources Shared</p>
            </div>
          </div>
        </Card>
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming Events</h2>
          <Link to="/events" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 min-h-[44px] px-2">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
          {upcoming.map((e) => (
            <div key={e.id} className="snap-start">
              <EventCard event={e} onRegister={handleRegister} />
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding>
          <CardHeader
            title="Available Resources"
            action={<Link to="/resources" className="text-sm text-primary-600 font-medium min-h-[44px] flex items-center">Browse</Link>}
          />
          <Link to={`/resources/${featuredResource.id}`} className="flex gap-4 group">
            <img src={featuredResource.image} alt="" className="w-24 h-20 object-cover rounded-lg shrink-0" />
            <div>
              <h3 className="font-medium text-slate-900 group-hover:text-primary-600">{featuredResource.title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{featuredResource.condition}</p>
              <span className="inline-block mt-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Available</span>
            </div>
          </Link>
        </Card>

        <Card padding>
          <CardHeader
            title="Recent Notifications"
            action={<Link to="/notifications" className="text-sm text-primary-600 font-medium min-h-[44px] flex items-center">See all</Link>}
          />
          <div className="space-y-2">
            {recentNotifs.map((n) => (
              <NotificationItem key={n.id} notification={n} onRead={markNotificationRead} />
            ))}
          </div>
        </Card>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Registered Activities</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {events.filter((e) => e.registered).map((e) => (
            <Link key={e.id} to={`/events/${e.id}`} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200/80 hover:border-primary-200 transition-colors min-h-[72px]">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-slate-900 truncate">{e.title}</p>
                <p className="text-xs text-slate-500">{e.date}</p>
              </div>
            </Link>
          ))}
          {events.filter((e) => e.registered).length === 0 && (
            <p className="text-sm text-slate-500 col-span-2">No registered events yet. <Link to="/events" className="text-primary-600 font-medium">Browse events</Link></p>
          )}
        </div>
      </section>

      <Modal
        open={modal?.type === 'register'}
        onClose={() => setModal(null)}
        title={modal?.title}
        description={modal?.description}
        confirmLabel="Confirm Registration"
        onConfirm={() => registerEvent(modal.eventId)}
      />
    </>
  );
}
