import { Users, ArrowUpRight } from 'lucide-react';
import type { Society } from '@/data/content';
import { CategoryBadge } from '@/components/Badge';
import { useRouter } from '@/router';

interface SocietyCardProps {
  society: Society;
}

export function SocietyCard({ society }: SocietyCardProps) {
  const { navigate } = useRouter();

  return (
    <article
      onClick={() => navigate({ name: 'society', id: society.id })}
      className="group bg-white rounded-2xl overflow-hidden border border-ink-100 shadow-soft hover:shadow-lift transition-all duration-500 cursor-pointer hover:-translate-y-1"
    >
      {/* Cover */}
      <div className="relative h-28 overflow-hidden bg-ink-100">
        <img
          src={society.coverImage}
          alt={society.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent" />
      </div>

      {/* Logo */}
      <div className="px-5 -mt-10 relative">
        <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-card overflow-hidden">
          <img src={society.logo} alt={`${society.name} logo`} loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pt-3">
        <div className="mb-2">
          <CategoryBadge category={society.category} size="sm" />
        </div>
        <h3 className="font-display font-bold text-lg text-ink-900 mb-1 group-hover:text-brand-600 transition-colors">
          {society.name}
        </h3>
        <p className="text-xs text-brand-600 font-medium italic mb-3">{society.tagline}</p>
        <p className="text-sm text-ink-500 line-clamp-2 mb-4">{society.description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-ink-100">
          <span className="flex items-center gap-1.5 text-xs text-ink-400">
            <Users className="w-3.5 h-3.5" />
            {society.members} members
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:text-brand-700 transition-colors">
            Learn More
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
}
