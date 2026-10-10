import { ArrowLeft, Calendar, Clock, MapPin, Users, Mail, Phone, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { SectionWrapper } from '@/components/SectionHeader';
import { EventCard } from '@/components/EventCard';
import { StatusBadge, TagBadge, CategoryBadge } from '@/components/Badge';
import { events, societies, formatDate } from '@/data/content';
import { useRouter } from '@/router';

export function EventDetailPage({ id }: { id: string }) {
  const { navigate } = useRouter();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <SectionWrapper className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink-900 mb-3">Event Not Found</h1>
          <p className="text-ink-500 mb-6">This event may have been removed or doesn't exist.</p>
          <Button to={{ name: 'events-upcoming' }} icon={<ArrowLeft className="w-4 h-4" />}>Browse Events</Button>
        </div>
      </SectionWrapper>
    );
  }

  const society = societies.find((s) => s.id === event.societyId);
  const relatedEvents = events
    .filter((e) => e.societyId === event.societyId && e.id !== event.id)
    .slice(0, 3);

  return (
    <div>
      {/* Cover image */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </button>
            <div className="flex items-center gap-3 mb-3">
              <StatusBadge status={event.status} />
              {society && (
                <button
                  onClick={() => navigate({ name: 'society', id: society.id })}
                  className="text-xs font-semibold text-brand-300 hover:text-brand-200 transition-colors"
                >
                  {event.society}
                </button>
              )}
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper className="!pt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick info grid */}
            <Reveal>
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoCard icon={Calendar} label="Date" value={formatDate(event.date)} />
                <InfoCard icon={Clock} label="Time" value={`${event.time} — ${event.endTime}`} />
                <InfoCard icon={MapPin} label="Venue" value={event.venue} />
                <InfoCard icon={Users} label="Organizer" value={event.organizer} />
              </div>
            </Reveal>

            {/* Description */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl border border-ink-100 shadow-soft p-6 lg:p-8">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-4">About This Event</h2>
                <p className="text-sm text-ink-600 leading-relaxed">{event.fullDescription}</p>

                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-ink-100">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-400 mr-1">
                    <Tag className="w-3.5 h-3.5" /> Tags
                  </span>
                  {event.tags.map((tag) => (
                    <TagBadge key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Schedule */}
            <Reveal delay={150}>
              <div className="bg-white rounded-2xl border border-ink-100 shadow-soft p-6 lg:p-8">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-5">Event Schedule</h2>
                <div className="relative">
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-ink-200" />
                  <div className="space-y-5">
                    {event.schedule.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 relative">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 border-2 border-brand-300 z-10 mt-0.5 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-brand-500" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-bold text-brand-600">{item.time}</span>
                          <p className="text-sm text-ink-700 font-medium">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Organizer card */}
            <Reveal>
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl shadow-lift p-6 text-white sticky top-24">
                <h3 className="font-display font-bold text-lg mb-4">Organizer</h3>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{event.organizer}</p>
                    <p className="text-xs text-white/70">{event.organizerRole}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-5 border-t border-white/20">
                  <a href={`mailto:${event.contactEmail}`} className="flex items-center gap-2.5 text-sm text-white/90 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-brand-200" /> {event.contactEmail}
                  </a>
                  <a href={`tel:${event.contactPhone}`} className="flex items-center gap-2.5 text-sm text-white/90 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-brand-200" /> {event.contactPhone}
                  </a>
                </div>

                <Button
                  variant="accent"
                  size="sm"
                  href={`mailto:${event.contactEmail}`}
                  className="w-full mt-5"
                >
                  Contact Organizer
                </Button>
              </div>
            </Reveal>

            {/* Society link */}
            {society && (
              <Reveal delay={100}>
                <button
                  onClick={() => navigate({ name: 'society', id: society.id })}
                  className="w-full bg-white rounded-2xl border border-ink-100 shadow-soft hover:shadow-card p-5 transition-all duration-300 group text-left"
                >
                  <p className="text-xs text-ink-400 mb-3">Hosted by</p>
                  <div className="flex items-center gap-3">
                    <img src={society.logo} alt={society.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-sm text-ink-900 truncate">{society.name}</h4>
                      <div className="mt-1">
                        <CategoryBadge category={society.category} size="sm" />
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              </Reveal>
            )}
          </div>
        </div>
      </SectionWrapper>

      {/* Related events */}
      {relatedEvents.length > 0 && (
        <SectionWrapper className="bg-white border-t border-ink-100">
          <h2 className="font-display font-bold text-xl text-ink-900 mb-6">More from {event.society}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedEvents.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 100}>
                <EventCard event={ev} />
              </Reveal>
            ))}
          </div>
        </SectionWrapper>
      )}
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-ink-100 p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-brand-600" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-ink-400 font-medium mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-ink-900">{value}</p>
      </div>
    </div>
  );
}
