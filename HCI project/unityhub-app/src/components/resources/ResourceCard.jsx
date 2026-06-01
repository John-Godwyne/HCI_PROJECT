import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { StatusBadge } from '../ui/Badge';
import { getOrgName } from '../../data/mockData';

export function ResourceCard({ resource, saved, onToggleSave }) {
  return (
    <article className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-0.5 group">
      <Link to={`/resources/${resource.id}`} className="block">
        <div className="relative h-40 overflow-hidden bg-slate-100">
          <img src={resource.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onToggleSave?.(resource.id); }}
            className={`absolute top-3 right-3 p-2 rounded-lg bg-white shadow-soft min-h-[40px] min-w-[40px] flex items-center justify-center ${
              saved ? 'text-primary-600' : 'text-slate-400 hover:text-primary-600'
            }`}
            aria-label={saved ? 'Remove from saved' : 'Save resource'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-slate-900">{resource.title}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{resource.condition}</p>
          <p className="text-xs text-slate-400 mt-2">From: {getOrgName(resource.organizationId)}</p>
          <div className="mt-3">
            <StatusBadge variant={resource.available ? 'success' : 'warning'}>
              {resource.available ? 'Available' : 'Unavailable'}
            </StatusBadge>
          </div>
        </div>
      </Link>
    </article>
  );
}
