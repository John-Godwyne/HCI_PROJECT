import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { getOrganization, resources } from '../data/mockData';
import { CategoryBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ResourceCard } from '../components/resources/ResourceCard';
import { useApp } from '../context/AppContext';

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resources', label: 'Resources' },
  { id: 'members', label: 'Members' },
];

export function OrganizationProfile() {
  const { id } = useParams();
  const org = getOrganization(id);
  const [activeTab, setActiveTab] = useState('about');
  const { savedResources, toggleSaveResource, addToast } = useApp();

  if (!org) return <p className="text-slate-500">Organization not found.</p>;

  const orgResources = resources.filter((r) => r.organizationId === org.id);

  return (
    <>
      <div className="rounded-xl overflow-hidden border border-slate-200/80 bg-white shadow-soft">
        <div className="h-48 sm:h-56 bg-cover bg-center" style={{ backgroundImage: `url(${org.cover})` }} role="img" aria-label={`${org.name} cover`} />
        <div className="px-5 pb-6 -mt-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <img src={org.logo} alt="" className="w-24 h-24 rounded-full border-4 border-white shadow-soft object-cover" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{org.name}</h1>
              <p className="text-slate-500 text-sm mt-0.5">{org.location}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {org.tags.map((t) => (
                  <CategoryBadge key={t} category={t} />
                ))}
              </div>
            </div>
            <Button variant="secondary" onClick={() => addToast('Messaging — contact via organization email in full version')}>
              <MessageCircle className="w-4 h-4" /> Message
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-slate-200 mt-8 overflow-x-auto" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors min-h-[44px] ${
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6" role="tabpanel">
        {activeTab === 'about' && (
          <>
            <p className="text-slate-600 leading-relaxed max-w-3xl">{org.about}</p>
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <Card className="text-center !p-6">
                <p className="text-3xl font-bold text-primary-600 tabular-nums">{org.stats.projects}</p>
                <p className="text-sm text-slate-500 mt-1">Active Projects</p>
              </Card>
              <Card className="text-center !p-6">
                <p className="text-3xl font-bold text-primary-600 tabular-nums">{org.stats.volunteers}+</p>
                <p className="text-sm text-slate-500 mt-1">Volunteers</p>
              </Card>
              <Card className="text-center !p-6">
                <p className="text-3xl font-bold text-primary-600 tabular-nums">{org.stats.resources}</p>
                <p className="text-sm text-slate-500 mt-1">Resources Shared</p>
              </Card>
            </div>
          </>
        )}

        {activeTab === 'projects' && (
          <ul className="space-y-3">
            {org.projects.map((p) => (
              <li key={p.name} className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-soft">
                <p className="font-medium text-slate-900">{p.name}</p>
                <p className="text-sm text-slate-500 mt-1">{p.status} · {p.location}</p>
              </li>
            ))}
            {org.projects.length === 0 && <p className="text-slate-500">No active projects listed.</p>}
          </ul>
        )}

        {activeTab === 'resources' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {orgResources.length ? (
              orgResources.map((r) => (
                <ResourceCard
                  key={r.id}
                  resource={r}
                  saved={savedResources.includes(r.id)}
                  onToggleSave={toggleSaveResource}
                />
              ))
            ) : (
              <p className="text-slate-500 col-span-full">No shared resources yet.</p>
            )}
          </div>
        )}

        {activeTab === 'members' && (
          <div>
            <p className="text-slate-600 mb-4">{org.stats.volunteers}+ active volunteers including student leaders, NSTP participants, and barangay youth partners.</p>
            <div className="flex flex-wrap gap-2">
              {[10, 11, 12, 13, 14, 15].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/64?img=${i}`} alt="" className="w-12 h-12 rounded-full ring-2 ring-white" />
              ))}
              <span className="flex items-center text-sm text-slate-500 px-2">+{org.stats.volunteers - 6} more</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
