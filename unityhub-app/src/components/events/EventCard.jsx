import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { CategoryBadge, StatusBadge } from '../ui/Badge';
import { AvatarGroup } from '../ui/AvatarGroup';
import { Button } from '../ui/Button';

export function EventCard({ event, onRegister, compact }) {
  if (compact) {
    return (
      <Link to={`/events/${event.id}`} className="block bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow">
        <div className="aspect-[16/9] overflow-hidden">
          <img src={event.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <CategoryBadge category={event.category} />
          <h3 className="font-semibold text-slate-900 mt-2">{event.title}</h3>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</p>
        </div>
      </Link>
    );
  }

  return (
    <article className="flex-shrink-0 w-[280px] bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-0.5">
      <Link to={`/events/${event.id}`}>
        <div className="relative h-36 overflow-hidden">
          <img src={event.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3"><CategoryBadge category={event.category} /></div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-slate-900">{event.title}</h3>
          <div className="mt-2 space-y-1 text-xs text-slate-500">
            <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{event.date} · {event.time}</p>
            <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{event.location}</p>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4 flex items-center justify-between">
        {event.registered ? (
          <StatusBadge variant="primary">Registered</StatusBadge>
        ) : (
          <Button size="sm" onClick={(e) => { e.preventDefault(); onRegister?.(event); }}>Register</Button>
        )}
        <AvatarGroup going={event.going} />
      </div>
    </article>
  );
}

export function EventListItem({ event, onRegister }) {
  return (
    <article className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-shadow">
      <Link to={`/events/${event.id}`} className="shrink-0">
        <img src={event.image} alt="" className="w-full sm:w-32 h-28 sm:h-24 object-cover rounded-lg" />
      </Link>
      <div className="flex-1 min-w-0">
        <CategoryBadge category={event.category} />
        <Link to={`/events/${event.id}`}><h3 className="font-semibold text-slate-900 mt-1 hover:text-primary-600">{event.title}</h3></Link>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{event.date} · {event.time}</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{event.location}</span>
        </div>
      </div>
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
        {event.registered ? (
          <StatusBadge variant="primary">Registered</StatusBadge>
        ) : (
          <Button size="sm" onClick={() => onRegister?.(event)}>Register</Button>
        )}
        <span className="text-xs text-slate-500">+{event.going} going</span>
      </div>
    </article>
  );
}
