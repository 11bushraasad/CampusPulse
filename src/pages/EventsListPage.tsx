import { Calendar, Search, ArrowLeft } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Reveal } from '@/components/Reveal';
import { SectionWrapper } from '@/components/SectionHeader';
import { EventCard } from '@/components/EventCard';
import { LoadingState } from '@/components/States';
import { type EventStatus } from '@/data/content';
import { useFetch } from '@/hooks/useFetch';
import { fetchEventsByStatus } from '@/lib/queries';

interface EventsListPageProps {
  status: EventStatus;
  title: string;
  eyebrow: string;
  description: string;
}

export function EventsListPage({ status, title, eyebrow, description }: EventsListPageProps) {
  const [search, setSearch] = useState('');
  const [filterSociety, setFilterSociety] = useState('All');

  const { data: events, loading } = useFetch(() => fetchEventsByStatus(status), [status]);

  const societyNames = useMemo(() => {
    const names = new Set((events ?? []).map((e) => e.society));
    return ['All', ...Array.from(names).sort()];
  }, [events]);

  const filtered = useMemo(() => {
    return (events ?? []).filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        e.venue.toLowerCase().includes(search.toLowerCase());
      const matchesSociety = filterSociety === 'All' || e.society === filterSociety;
      return matchesSearch && matchesSociety;
    });
  }, [events, search, filterSociety]);

  return (
    <div>
      {/* Page header */}
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-12">
        <div className="absolute inset-0 animated-gradient bg-gradient-to-br from-ink-950 via-brand-950 to-ink-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">{eyebrow}</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-2 mb-3 tracking-tight">
              {title}
            </h1>
            <p className="text-white/60 max-w-2xl text-pretty">{description}</p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <SectionWrapper className="!py-6 bg-white border-b border-ink-100 sticky top-16 z-30">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              type="text"
              placeholder="Search events by title, description, or venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-ink-50 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Calendar className="w-4 h-4 text-ink-400 flex-shrink-0" />
            {societyNames.map((name) => (
              <button
                key={name}
                onClick={() => setFilterSociety(name)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200 ${
                  filterSociety === name
                    ? 'bg-brand-600 text-white shadow-soft'
                    : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Results */}
      <SectionWrapper className="!pt-8">
        {loading ? (
          <LoadingState />
        ) : (
          <>
            <div className="mb-6 text-sm text-ink-500">
              Showing <span className="font-bold text-ink-900">{filtered.length}</span> {filtered.length === 1 ? 'event' : 'events'}
            </div>

            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((event, i) => (
                  <Reveal key={event.id} delay={(i % 3) * 100}>
                    <EventCard event={event} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Calendar className="w-12 h-12 text-ink-200 mx-auto mb-4" />
                <p className="text-ink-400 text-lg">No events found matching your search.</p>
                <button
                  onClick={() => { setSearch(''); setFilterSociety('All'); }}
                  className="mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </SectionWrapper>
    </div>
  );
}
