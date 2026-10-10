import { useState, useMemo } from 'react';
import { AlertCircle, Search, Calendar, Building2, Flag } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionWrapper } from '@/components/SectionHeader';
import { LoadingState } from '@/components/States';
import { formatDate, formatDateShort } from '@/data/content';
import { useFetch } from '@/hooks/useFetch';
import { fetchAnnouncements } from '@/lib/queries';

export function AnnouncementsPage() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);

  const { data: announcements, loading } = useFetch(fetchAnnouncements, []);

  const allAnnouncements = announcements ?? [];

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allAnnouncements.map((a) => a.category))).sort();
    return ['All', ...cats];
  }, [allAnnouncements]);

  const filtered = useMemo(() => {
    return allAnnouncements.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filterCategory === 'All' || a.category === filterCategory;
      const matchesUrgent = !showUrgentOnly || a.urgent;
      return matchesSearch && matchesCategory && matchesUrgent;
    });
  }, [allAnnouncements, search, filterCategory, showUrgentOnly]);

  const urgentCount = allAnnouncements.filter((a) => a.urgent).length;

  return (
    <div>
      {/* Page header */}
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-12">
        <div className="absolute inset-0 animated-gradient bg-gradient-to-br from-ink-950 via-brand-950 to-ink-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Stay Informed</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-2 mb-3 tracking-tight">
              Announcements
            </h1>
            <p className="text-white/60 max-w-2xl text-pretty">
              Important updates from the university and student societies. {urgentCount > 0 && (
                <span className="inline-flex items-center gap-1.5 text-accent-400 font-semibold">
                  <AlertCircle className="w-4 h-4" /> {urgentCount} urgent notice{urgentCount > 1 ? 's' : ''}
                </span>
              )}
            </p>
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
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-ink-50 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            />
          </div>

          <button
            onClick={() => setShowUrgentOnly(!showUrgentOnly)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
              showUrgentOnly
                ? 'bg-accent-500 text-ink-900 shadow-soft'
                : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            Urgent Only
          </button>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Flag className="w-4 h-4 text-ink-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200 ${
                  filterCategory === cat
                    ? 'bg-brand-600 text-white shadow-soft'
                    : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Announcements list */}
      <SectionWrapper className="!pt-8">
        {loading ? (
          <LoadingState />
        ) : (
          <>
            <div className="mb-6 text-sm text-ink-500">
              Showing <span className="font-bold text-ink-900">{filtered.length}</span> {filtered.length === 1 ? 'announcement' : 'announcements'}
            </div>

            {filtered.length > 0 ? (
              <div className="space-y-4">
                {filtered.map((ann, i) => (
                  <Reveal key={ann.id} delay={i * 60}>
                    <article
                      className={`rounded-2xl border p-6 transition-all duration-300 hover:shadow-card ${
                        ann.urgent
                          ? 'bg-gradient-to-r from-accent-50/80 to-white border-accent-200 hover:border-accent-300'
                          : 'bg-white border-ink-100 hover:border-brand-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Left: date block */}
                        <div className="flex-shrink-0 flex sm:flex-col items-center sm:justify-start gap-3 sm:gap-1">
                          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center ${
                            ann.urgent ? 'bg-accent-500' : 'bg-brand-600'
                          }`}>
                            <span className="text-xs font-bold text-white/80 leading-none">
                              {new Date(ann.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                            </span>
                            <span className="text-xl font-bold text-white leading-tight font-display">
                              {new Date(ann.date).getDate()}
                            </span>
                          </div>
                        </div>

                        {/* Right: content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className={`text-xs font-bold uppercase tracking-wide ${ann.urgent ? 'text-accent-700' : 'text-brand-600'}`}>
                              {ann.category}
                            </span>
                            {ann.urgent && (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-accent-700 bg-accent-100 px-2 py-0.5 rounded-full">
                                <AlertCircle className="w-3 h-3" /> Urgent
                              </span>
                            )}
                          </div>

                          <h3 className="font-display font-bold text-lg text-ink-900 mb-2 leading-snug">{ann.title}</h3>

                          <p className="text-sm text-ink-600 leading-relaxed mb-4">{ann.description}</p>

                          <div className="flex items-center gap-4 flex-wrap text-xs text-ink-400">
                            <span className="flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5" /> {ann.society}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" /> {formatDate(ann.date)}
                            </span>
                            {ann.deadline && (
                              <span className={`flex items-center gap-1.5 font-semibold ${ann.urgent ? 'text-accent-700' : 'text-brand-600'}`}>
                                <AlertCircle className="w-3.5 h-3.5" />
                                Deadline: {formatDateShort(ann.deadline)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <AlertCircle className="w-12 h-12 text-ink-200 mx-auto mb-4" />
                <p className="text-ink-400 text-lg">No announcements found.</p>
                <button
                  onClick={() => { setSearch(''); setFilterCategory('All'); setShowUrgentOnly(false); }}
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
