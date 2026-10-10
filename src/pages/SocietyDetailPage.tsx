import { ArrowLeft, Mail, Instagram, Calendar, Clock, MapPin, Users, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { SectionWrapper } from '@/components/SectionHeader';
import { EventCard } from '@/components/EventCard';
import { CategoryBadge } from '@/components/Badge';
import { societies, events } from '@/data/content';
import { useRouter } from '@/router';

export function SocietyDetailPage({ id }: { id: string }) {
  const { navigate } = useRouter();
  const society = societies.find((s) => s.id === id);

  if (!society) {
    return (
      <SectionWrapper className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink-900 mb-3">Society Not Found</h1>
          <p className="text-ink-500 mb-6">The society you're looking for doesn't exist or may have been removed.</p>
          <Button to={{ name: 'societies' }} icon={<ArrowLeft className="w-4 h-4" />}>Back to Societies</Button>
        </div>
      </SectionWrapper>
    );
  }

  const societyEvents = events.filter((e) => e.societyId === society.id);

  return (
    <div>
      {/* Hero with cover */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img src={society.coverImage} alt={society.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/20" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <button
              onClick={() => navigate({ name: 'societies' })}
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Societies
            </button>
          </div>
        </div>
      </section>

      {/* Profile header */}
      <SectionWrapper className="!pt-0 -mt-12 relative">
        <Reveal>
          <div className="bg-white rounded-3xl shadow-lift border border-ink-100 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Logo */}
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden shadow-card flex-shrink-0 border-4 border-white -mt-16 lg:-mt-20">
                <img src={society.logo} alt={`${society.name} logo`} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-2">
                  <CategoryBadge category={society.category} />
                </div>
                <h1 className="font-display font-bold text-2xl lg:text-3xl text-ink-900 mb-1">{society.name}</h1>
                <p className="text-sm text-brand-600 font-medium italic mb-4">{society.tagline}</p>
                <p className="text-sm text-ink-600 leading-relaxed mb-5">{society.description}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-ink-500">
                    <Users className="w-4 h-4 text-ink-400" />
                    <span><span className="font-bold text-ink-900">{society.members}</span> members</span>
                  </div>
                  <div className="flex items-center gap-2 text-ink-500">
                    <Star className="w-4 h-4 text-ink-400" />
                    <span>Founded in <span className="font-bold text-ink-900">{society.founded}</span></span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="lg:w-64 flex-shrink-0 space-y-2">
                <a href={`mailto:${society.email}`} className="flex items-center gap-2 text-sm text-ink-600 hover:text-brand-600 transition-colors">
                  <Mail className="w-4 h-4 text-brand-500" /> {society.email}
                </a>
                <div className="flex items-center gap-2 text-sm text-ink-600">
                  <Instagram className="w-4 h-4 text-brand-500" /> {society.instagram}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionWrapper>

      {/* About + Meeting Info */}
      <SectionWrapper className="!pt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Long description */}
          <Reveal className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-ink-100 shadow-soft p-6 lg:p-8">
              <h2 className="font-display font-bold text-xl text-ink-900 mb-4">About the Society</h2>
              <p className="text-sm text-ink-600 leading-relaxed mb-6">{society.longDescription}</p>

              <h3 className="font-display font-semibold text-base text-ink-900 mb-3">Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {society.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2.5 text-sm text-ink-600">
                    <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Meeting info card */}
          <Reveal delay={100}>
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl shadow-lift p-6 text-white sticky top-24">
              <h3 className="font-display font-bold text-lg mb-1">Meeting Details</h3>
              <p className="text-sm text-white/70 mb-5">Regular gatherings, all welcome.</p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-brand-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white/60">Day</div>
                    <div className="text-sm font-semibold">{society.meetingDay}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white/60">Time</div>
                    <div className="text-sm font-semibold">{society.meetingTime}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white/60">Location</div>
                    <div className="text-sm font-semibold">{society.meetingLocation}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-brand-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-white/60">President</div>
                    <div className="text-sm font-semibold">{society.president}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/20">
                <Button variant="accent" size="sm" href={`mailto:${society.email}`} className="w-full">
                  Get in Touch
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* Events by this society */}
      {societyEvents.length > 0 && (
        <SectionWrapper className="bg-white border-t border-ink-100">
          <h2 className="font-display font-bold text-xl text-ink-900 mb-6">Events by {society.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {societyEvents.map((event, i) => (
              <Reveal key={event.id} delay={i * 100}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </SectionWrapper>
      )}
    </div>
  );
}
