import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { getEvent, getOrganization } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { CategoryBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export function EventDetail({ mobile }) {
  const { id } = useParams();
  const { events, setModal, modal, registerEvent, cancelRegistration } = useApp();
  const event = events.find((e) => e.id === id) ?? getEvent(id);
  const org = event ? getOrganization(event.organizerId) : null;

  if (!event) {
    return <p className="text-slate-500">Event not found.</p>;
  }

  const backTo = mobile ? '/m' : '/events';

  const openRegisterModal = () => {
    setModal({
      type: event.registered ? 'cancel' : 'register',
      eventId: event.id,
      title: event.registered ? 'Cancel Registration' : 'Confirm Registration',
      description: event.registered
        ? 'Cancel your registration? You can register again later if spots are available.'
        : `Register for "${event.title}"? You will receive a reminder before the event.`,
      variant: event.registered ? 'danger' : 'primary',
    });
  };

  return (
    <div className={mobile ? 'pb-24' : ''}>
      {!mobile && (
        <Link to={backTo} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 mb-6 min-h-[44px]">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
      )}

      <div className={`overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-soft ${mobile ? '-mx-4 -mt-6 rounded-none border-x-0' : ''}`}>
        <div className={`overflow-hidden ${mobile ? 'h-52' : 'aspect-[21/9] max-h-80'}`}>
          <img src={event.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-5 lg:p-8">
          <CategoryBadge category={event.category} />
          <h1 className="text-2xl font-bold text-slate-900 mt-3">{event.title}</h1>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" />{event.date} · {event.time}</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" />{event.location}</p>
            <p className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" />{event.going}+ participants</p>
          </div>

          {org && (
            <Link to={`/organizations/${org.id}`} className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary-200 transition-colors">
              <img src={org.logo} alt="" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-xs text-slate-500">Organized by</p>
                <p className="font-medium text-slate-900">{org.name}</p>
                <p className="text-xs text-slate-500">{org.tagline}</p>
              </div>
            </Link>
          )}

          <section className="mt-8">
            <h2 className="font-semibold text-slate-900">About this event</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{event.description}</p>
          </section>

          <section className="mt-6">
            <h2 className="font-semibold text-slate-900">What to bring</h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc pl-5">
              {event.bring.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="font-semibold text-slate-900">Requirements</h2>
            <p className="text-sm text-slate-600 mt-2">{event.requirements}</p>
          </section>

          {!mobile && (
            <div className="mt-8 flex gap-3">
              {event.registered ? (
                <>
                  <Button disabled className="opacity-80">Registered ✓</Button>
                  <Button variant="secondary" onClick={openRegisterModal}>Cancel Registration</Button>
                </>
              ) : (
                <Button onClick={openRegisterModal}>Register Now</Button>
              )}
            </div>
          )}
        </div>
      </div>

      {mobile && (
        <div className="fixed bottom-16 inset-x-0 p-4 bg-white border-t border-slate-200 z-30">
          {event.registered ? (
            <div className="flex gap-2 max-w-lg mx-auto">
              <Button className="flex-1" disabled>Registered ✓</Button>
              <Button variant="secondary" className="flex-1" onClick={openRegisterModal}>Cancel</Button>
            </div>
          ) : (
            <Button className="w-full max-w-lg mx-auto" size="lg" onClick={openRegisterModal}>Register Now</Button>
          )}
        </div>
      )}

      <Modal
        open={modal?.type === 'register' || modal?.type === 'cancel'}
        onClose={() => setModal(null)}
        title={modal?.title}
        description={modal?.description}
        confirmLabel={modal?.type === 'cancel' ? 'Cancel Registration' : 'Confirm'}
        variant={modal?.variant}
        onConfirm={() => {
          if (modal?.type === 'cancel') cancelRegistration(modal.eventId);
          else registerEvent(modal.eventId);
        }}
      />
    </div>
  );
}
