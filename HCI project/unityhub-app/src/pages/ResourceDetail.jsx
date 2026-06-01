import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { getResource, getOrganization } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export function ResourceDetail() {
  const { id } = useParams();
  const { setModal, modal, requestBorrow } = useApp();
  const resource = getResource(id);
  const org = resource ? getOrganization(resource.organizationId) : null;

  if (!resource) return <p className="text-slate-500">Resource not found.</p>;

  const openBorrowModal = () => {
    if (!resource.available) return;
    setModal({
      type: 'borrow',
      title: 'Request to Borrow',
      description: `Submit a borrow request for "${resource.title}"? ${org?.name ?? 'The organization'} will respond within 48 hours.`,
      resourceTitle: resource.title,
    });
  };

  return (
    <>
      <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 mb-6 min-h-[44px]">
        <ArrowLeft className="w-4 h-4" /> Back to Resources
      </Link>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden border border-slate-200/80 bg-white shadow-soft aspect-[4/3] lg:aspect-auto lg:min-h-[360px]">
          <img src={resource.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <StatusBadge variant={resource.available ? 'success' : 'warning'}>
            {resource.available ? 'Available' : 'Unavailable'}
          </StatusBadge>
          <h1 className="text-2xl font-bold text-slate-900 mt-3">{resource.title}</h1>
          <p className="text-slate-600 mt-1">{resource.condition}</p>

          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" />{resource.availableFrom} – {resource.availableTo}</p>
            <p className="flex items-center gap-2"><Tag className="w-4 h-4 text-slate-400" />{resource.category}</p>
          </div>

          {org && (
            <Link to={`/organizations/${org.id}`} className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 inline-flex">
              <img src={org.logo} alt="" className="w-12 h-12 rounded-full" />
              <div>
                <p className="text-xs text-slate-500">Provided by</p>
                <p className="font-medium text-slate-900">{org.name}</p>
              </div>
            </Link>
          )}

          <section className="mt-8">
            <h2 className="font-semibold text-slate-900">Description</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{resource.description}</p>
          </section>

          <section className="mt-6">
            <h2 className="font-semibold text-slate-900">Borrowing guidelines</h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc pl-5">
              {resource.guidelines.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>

          <Button className="mt-8" size="lg" disabled={!resource.available} onClick={openBorrowModal}>
            Request to Borrow
          </Button>
        </div>
      </div>

      <Modal
        open={modal?.type === 'borrow'}
        onClose={() => setModal(null)}
        title={modal?.title}
        description={modal?.description}
        confirmLabel="Submit Request"
        onConfirm={() => requestBorrow(modal.resourceTitle)}
      />
    </>
  );
}
