import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionWrapper } from '@/components/SectionHeader';
import { SocietyCard } from '@/components/SocietyCard';
import { societies, categoryColors } from '@/data/content';

const categories = ['All', ...Object.keys(categoryColors)];

export function SocietiesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return societies.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.tagline.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div>
      {/* Page header */}
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-12">
        <div className="absolute inset-0 animated-gradient bg-gradient-to-br from-ink-950 via-brand-950 to-ink-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Get Involved</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-2 mb-3 tracking-tight">
              Explore Societies
            </h1>
            <p className="text-white/60 max-w-2xl text-pretty">
              {societies.length} societies across {Object.keys(categoryColors).length} categories. Find your passion, meet like-minded students, and make campus life unforgettable.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Search + Filter */}
      <SectionWrapper className="!py-8 bg-white border-b border-ink-100 sticky top-16 z-30">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              type="text"
              placeholder="Search societies by name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-ink-50 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="w-4 h-4 text-ink-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
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

      {/* Results */}
      <SectionWrapper className="!pt-8">
        <div className="mb-6 text-sm text-ink-500">
          Showing <span className="font-bold text-ink-900">{filtered.length}</span> {filtered.length === 1 ? 'society' : 'societies'}
          {activeCategory !== 'All' && <> in <span className="font-semibold text-brand-600">{activeCategory}</span></>}
        </div>

        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((society, i) => (
              <Reveal key={society.id} delay={(i % 4) * 80}>
                <SocietyCard society={society} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-ink-400 text-lg">No societies found matching your search.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
              className="mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
}
