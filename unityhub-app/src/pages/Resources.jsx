import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { resources as allResources } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { SearchInput } from '../components/ui/SearchInput';
import { ResourceCard } from '../components/resources/ResourceCard';
import { Button } from '../components/ui/Button';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'supplies', label: 'Supplies' },
];

export function Resources() {
  const { savedResources, toggleSaveResource, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    return allResources.filter((r) => {
      const matchCat = category === 'all' || r.category === category;
      const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Resources</h1>
          <p className="text-slate-500 mt-1">Borrow equipment and materials from campus organizations.</p>
        </header>
        <Button onClick={() => addToast('Post a Resource — available in full version')}>
          <Plus className="w-4 h-4" /> Post a Resource
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchInput
          id="resource-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources..."
          className="flex-1 max-w-md"
        />
        <label htmlFor="resource-category" className="sr-only">Category</label>
        <select
          id="resource-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white min-h-[44px] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((r) => (
          <ResourceCard
            key={r.id}
            resource={r}
            saved={savedResources.includes(r.id)}
            onToggleSave={toggleSaveResource}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-12">No resources found. Adjust your filters.</p>
      )}
    </>
  );
}
