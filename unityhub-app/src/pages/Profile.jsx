import { Link } from 'react-router-dom';
import { Mail, Building2, Calendar, Package, Clock } from 'lucide-react';
import { currentUser, resourceRequests } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/Badge';

export function Profile() {
  const { events } = useApp();
  const registered = events.filter((e) => e.registered);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <img src={currentUser.avatar} alt="" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-soft" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{currentUser.name}</h1>
          <p className="text-slate-500">{currentUser.role}</p>
          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" />{currentUser.email}</p>
            <p className="flex items-center gap-2"><Building2 className="w-4 h-4 text-slate-400" />{currentUser.organization}</p>
            <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" />Joined {currentUser.joinedDate}</p>
          </div>
          <Link to="/settings" className="inline-block mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 min-h-[44px] flex items-center">
            Edit profile in Settings →
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Events Joined" value={currentUser.impact.eventsJoined} icon={Calendar} accent="primary" />
        <StatCard label="Resources Shared" value={currentUser.impact.resourcesShared} icon={Package} accent="secondary" />
        <StatCard label="Volunteer Hours" value={currentUser.impact.hoursVolunteered} icon={Clock} accent="slate" />
      </div>

      <Card className="mb-6">
        <h2 className="font-semibold text-slate-900 mb-4">Registered Activities</h2>
        <ul className="space-y-3">
          {registered.map((e) => (
            <li key={e.id}>
              <Link to={`/events/${e.id}`} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 min-h-[56px]">
                <div>
                  <p className="font-medium text-slate-900">{e.title}</p>
                  <p className="text-xs text-slate-500">{e.date}</p>
                </div>
                <StatusBadge variant="primary">Registered</StatusBadge>
              </Link>
            </li>
          ))}
          {registered.length === 0 && <p className="text-sm text-slate-500">No registered events.</p>}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold text-slate-900 mb-4">Resource Requests</h2>
        <ul className="space-y-3">
          {resourceRequests.map((rq) => (
            <li key={rq.id} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 min-h-[56px]">
              <div>
                <p className="font-medium text-slate-900">{rq.resource}</p>
                <p className="text-xs text-slate-500">{rq.org} · {rq.date}</p>
              </div>
              <StatusBadge variant={rq.status === 'approved' ? 'success' : 'warning'}>
                {rq.status === 'approved' ? 'Approved' : 'Pending'}
              </StatusBadge>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
