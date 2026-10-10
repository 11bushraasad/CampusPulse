import { ArrowRight, Sparkles, Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { SectionHeader, SectionWrapper } from '@/components/SectionHeader';
import { EventCard } from '@/components/EventCard';
import { SocietyCard } from '@/components/SocietyCard';
import { LoadingState } from '@/components/States';
import {
  formatDate,
  formatDateShort,
  getDayMonth,
  importantDates,
} from '@/data/content';
import { useRouter } from '@/router';
import { useFetch } from '@/hooks/useFetch';
import { fetchSocieties, fetchEvents, fetchAnnouncements } from '@/lib/queries';

const heroImage = 'https://images.pexels.com/photos/30052431/pexels-photo-30052431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export function HomePage() {
  const { navigate } = useRouter();

  const { data: societies, loading: loadingSocieties } = useFetch(fetchSocieties, []);
  const { data: events, loading: loadingEvents } = useFetch(fetchEvents, []);
  const { data: announcements, loading: loadingAnnouncements } = useFetch(fetchAnnouncements, []);

  if (loadingSocieties || loadingEvents || loadingAnnouncements) {
    return <LoadingState />;
  }

  const allSocieties = societies ?? [];
  const allEvents = events ?? [];
  const allAnnouncements = announcements ?? [];

  const upcomingEvents = allEvents.filter((e) => e.status === 'upcoming').slice(0, 6);
  const ongoingEvents = allEvents.filter((e) => e.status === 'ongoing');
  const featuredSocieties = allSocieties.slice(0, 4);
  const urgentAnnouncements = allAnnouncements.filter((a) => a.urgent).slice(0, 2);
  const recentAnnouncements = allAnnouncements.slice(0, 3);
  const urgentCount = allAnnouncements.filter((a) => a.urgent).length;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-ink-900">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient bg-gradient-to-br from-ink-950 via-brand-950 to-ink-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        {/* Floating orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                  <Sparkles className="w-4 h-4 text-accent-400" />
                  <span className="text-sm font-medium text-white/90">Your campus, all in one place</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight text-balance mb-6">
                  Your Campus.<br />
                  <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-brand-300 bg-clip-text text-transparent">
                    Your Community.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 text-pretty">
                  Discover societies, explore upcoming and ongoing campus events, and stay informed with important university announcements — all in one beautifully simple platform.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button
                    variant="primary"
                    size="lg"
                    to={{ name: 'events-upcoming' }}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Explore Events
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    to={{ name: 'societies' }}
                    className="border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                  >
                    Discover Societies
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
                  <div className="text-center lg:text-left">
                    <div className="font-display font-bold text-2xl text-white">{allSocieties.length}</div>
                    <div className="text-xs text-white/50">Societies</div>
                  </div>
                  <div className="w-px h-10 bg-white/15" />
                  <div className="text-center lg:text-left">
                    <div className="font-display font-bold text-2xl text-white">{allEvents.length}+</div>
                    <div className="text-xs text-white/50">Events</div>
                  </div>
                  <div className="w-px h-10 bg-white/15" />
                  <div className="text-center lg:text-left">
                    <div className="font-display font-bold text-2xl text-white">{allSocieties.reduce((a, s) => a + s.members, 0)}+</div>
                    <div className="text-xs text-white/50">Members</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Hero image with floating cards */}
            <Reveal delay={200} className="relative hidden lg:block">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-lift border border-white/10">
                  <img
                    src={heroImage}
                    alt="Students walking on campus"
                    className="w-full h-[420px] object-cover"
                  />
                </div>

                {/* Floating event card */}
                <div className="absolute -bottom-6 -left-6 w-64 bg-white rounded-2xl shadow-lift p-4 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-brand-600">OCT</span>
                      <span className="text-lg font-bold text-ink-900 leading-none font-display">24</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-brand-600 font-semibold">Tech Council</p>
                      <p className="text-sm font-bold text-ink-900 truncate">Spring Hackathon</p>
                    </div>
                  </div>
                </div>

                {/* Floating announcement badge */}
                <div className="absolute -top-4 -right-4 bg-accent-500 text-ink-900 rounded-2xl shadow-lift px-4 py-3 animate-float" style={{ animationDelay: '3s' }}>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-bold">{urgentCount} Urgent Update{urgentCount !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative">
          <svg className="w-full h-12 fill-ink-50" viewBox="0 0 1440 48" preserveAspectRatio="none">
            <path d="M0,48 L0,24 Q360,0 720,24 T1440,24 L1440,48 Z" />
          </svg>
        </div>
      </section>

      {/* Urgent Announcements Banner */}
      {urgentAnnouncements.length > 0 && (
        <SectionWrapper className="!pt-4 !pb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {urgentAnnouncements.map((ann, i) => (
              <Reveal key={ann.id} delay={i * 100}>
                <button
                  onClick={() => navigate({ name: 'announcements' })}
                  className="group w-full text-left bg-gradient-to-r from-accent-50 to-white border border-accent-200 rounded-2xl p-5 hover:shadow-card transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-accent-700 uppercase tracking-wide">Urgent</span>
                        <span className="text-xs text-ink-400">{formatDateShort(ann.date)}</span>
                      </div>
                      <h3 className="font-display font-bold text-sm text-ink-900 group-hover:text-accent-700 transition-colors mb-1">
                        {ann.title}
                      </h3>
                      <p className="text-xs text-ink-500 line-clamp-2">{ann.description}</p>
                      {ann.deadline && (
                        <p className="text-xs text-accent-700 font-semibold mt-2">
                          Deadline: {formatDateShort(ann.deadline)}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Upcoming Events */}
      <SectionWrapper className="bg-white border-y border-ink-100">
        <SectionHeader
          eyebrow="What's Coming Up"
          title="Upcoming Events"
          description="Don't miss out on what's happening on campus next."
          linkLabel="View All Events"
          linkTo={{ name: 'events-upcoming' }}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {upcomingEvents.map((event, i) => (
            <Reveal key={event.id} delay={(i % 3) * 100}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Ongoing Events */}
      <SectionWrapper>
        <SectionHeader
          eyebrow="Happening Now"
          title="Ongoing Campus Activities"
          description="Events that are currently underway — jump in while you still can."
          linkLabel="View All Ongoing"
          linkTo={{ name: 'events-ongoing' }}
        />
        <div className="space-y-5">
          {ongoingEvents.map((event, i) => (
            <Reveal key={event.id} delay={i * 100}>
              <EventCard event={event} featured />
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Societies */}
      <SectionWrapper className="bg-white border-y border-ink-100">
        <SectionHeader
          eyebrow="Get Involved"
          title="Featured Societies"
          description="Find your tribe. From robotics to photography, there's something for everyone."
          linkLabel="Explore All Societies"
          linkTo={{ name: 'societies' }}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredSocieties.map((society, i) => (
            <Reveal key={society.id} delay={(i % 4) * 80}>
              <SocietyCard society={society} />
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Recent Announcements */}
      <SectionWrapper>
        <SectionHeader
          eyebrow="Stay Informed"
          title="Latest Announcements"
          description="Important updates from the university and student societies."
          linkLabel="All Announcements"
          linkTo={{ name: 'announcements' }}
        />
        <div className="grid md:grid-cols-3 gap-5">
          {recentAnnouncements.map((ann, i) => (
            <Reveal key={ann.id} delay={i * 100}>
              <button
                onClick={() => navigate({ name: 'announcements' })}
                className="group w-full text-left bg-white rounded-2xl border border-ink-100 shadow-soft hover:shadow-card transition-all duration-300 p-5 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wide ${ann.urgent ? 'text-accent-600' : 'text-brand-600'}`}>
                    {ann.category}
                  </span>
                  {ann.urgent && (
                    <span className="flex items-center gap-1 text-xs text-accent-600 font-semibold">
                      <AlertCircle className="w-3 h-3" /> Urgent
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-base text-ink-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug">
                  {ann.title}
                </h3>
                <p className="text-sm text-ink-500 line-clamp-3 mb-4 flex-1">{ann.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-ink-100">
                  <span className="text-xs text-ink-400">{ann.society}</span>
                  <span className="text-xs text-ink-400">{formatDateShort(ann.date)}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Important Dates */}
      <SectionWrapper className="bg-white border-t border-ink-100">
        <SectionHeader
          eyebrow="Mark Your Calendar"
          title="Important Dates & Deadlines"
          description="Key dates you shouldn't miss this semester."
        />
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-ink-200 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-4">
            {importantDates.map((item, i) => {
              const { day, month } = getDayMonth(item.date);
              const isDeadline = item.type === 'Deadline';
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className={`flex items-center gap-4 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    {/* Date badge */}
                    <div className="flex-shrink-0 w-16 sm:w-20">
                      <div className={`rounded-2xl px-3 py-2 text-center shadow-soft ${isDeadline ? 'bg-accent-500' : 'bg-brand-600'}`}>
                        <div className="text-xs font-bold text-white/80 leading-none">{month}</div>
                        <div className="text-xl font-bold text-white leading-tight font-display">{day}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-ink-50 rounded-xl px-5 py-3 border border-ink-100">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-sm text-ink-900">{item.title}</h4>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isDeadline ? 'bg-accent-100 text-accent-700' : 'bg-brand-50 text-brand-700'}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-ink-400 mt-0.5">{formatDate(item.date)}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
