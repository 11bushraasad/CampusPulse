import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import type { CampusEvent } from '@/data/content';
import { StatusBadge, TagBadge } from '@/components/Badge';
import { getDayMonth, formatDate } from '@/data/content';
import { useRouter } from '@/router';

interface EventCardProps {
  event: CampusEvent;
  featured?: boolean;
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const { navigate } = useRouter();
  const { day, month } = getDayMonth(event.date);

  return (
    <article
      onClick={() => navigate({ name: 'event', id: event.id })}
      className={`group bg-white rounded-2xl overflow-hidden border border-ink-100 shadow-soft hover:shadow-lift transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
        featured ? 'lg:flex lg:flex-row' : ''
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-ink-100 ${featured ? 'lg:w-2/5' : ''}`}>
        <div className={`relative ${featured ? 'aspect-[16/10] lg:aspect-auto lg:h-full' : 'aspect-[16/10]'}`}>
          <img
            src={event.coverImage}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />

          {/* Date badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-soft text-center">
            <div className="text-xs font-bold text-accent-600 leading-none">{month}</div>
            <div className="text-2xl font-bold text-ink-900 leading-tight font-display">{day}</div>
          </div>

          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <StatusBadge status={event.status} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-5 ${featured ? 'lg:flex-1 lg:p-7' : ''}`}>
        <p className="text-xs font-semibold text-brand-600 mb-2 uppercase tracking-wide">{event.society}</p>
        <h3 className={`font-display font-bold text-ink-900 leading-snug mb-2 group-hover:text-brand-600 transition-colors ${featured ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
          {event.title}
        </h3>
        <p className="text-sm text-ink-500 line-clamp-2 mb-4">{event.shortDescription}</p>

        <div className="grid grid-cols-1 gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <Calendar className="w-3.5 h-3.5 text-ink-400" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <Clock className="w-3.5 h-3.5 text-ink-400" />
            <span>{event.time} — {event.endTime}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <MapPin className="w-3.5 h-3.5 text-ink-400" />
            <span>{event.venue}</span>
          </div>
        </div>

        {featured && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.slice(0, 4).map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-ink-100">
          <span className="flex items-center gap-1.5 text-xs text-ink-400">
            <Users className="w-3.5 h-3.5" />
            {event.organizer}
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
            View Details
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
