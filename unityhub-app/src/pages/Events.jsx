import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterChips } from '../components/ui/FilterChips';
import { SearchInput } from '../components/ui/SearchInput';
import { EventListItem } from '../components/events/EventCard';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'environment', label: 'Environment' },
  { value: 'education', label: 'Education' },
  { value: 'health', label: 'Health' },
  { value: 'community', label: 'Community' },
];

export function Events() {
  const { events, setModal, modal, registerEvent } = useApp();
  const [params] = useSearchParams();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState(params.get('q') ?? '');

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchCat = filter === 'all' || e.category === filter;
      const matchSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [events, filter, search]);

  const handleRegister = (event) => {
    setModal({
      type: 'register',
      eventId: event.id,
      title: 'Confirm Registration',
      description: `Register for "${event.title}"? A reminder will be sent before the event date.`,
    });
  };

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Events</h1>
        <p className="text-slate-500 mt-1">Discover and register for community activities and volunteer programs.</p>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <FilterChips options={filterOptions} value={filter} onChange={setFilter} />
        <Button variant="secondary" size="sm" className="shrink-0 self-start" onClick={() => {}}>
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </Button>
      </div>

      <SearchInput
        id="events-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search events by title or location..."
        className="max-w-md mb-6"
      />

      <div className="space-y-4" role="list">
        {filtered.length === 0 ? (
          <p className="text-slate-500 text-center py-12">No events match your search. Try different filters.</p>
        ) : (
          filtered.map((e) => <EventListItem key={e.id} event={e} onRegister={handleRegister} />)
        )}
      </div>

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
