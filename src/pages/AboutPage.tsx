import { Activity, Target, Eye, Heart, Users, Calendar, Building2, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionWrapper, SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';
import { societies, events, announcements } from '@/data/content';

const aboutImage = 'https://images.pexels.com/photos/8199160/pexels-photo-8199160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const aboutImage2 = 'https://images.pexels.com/photos/8197508/pexels-photo-8197508.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const values = [
  { icon: Users, title: 'Community First', description: 'We believe campus life is about the people you meet and the communities you build together.' },
  { icon: Sparkles, title: 'Discovery Made Simple', description: 'Finding your tribe shouldn\'t be hard. We make societies, events, and updates easy to discover.' },
  { icon: TrendingUp, title: 'Student-Built', description: 'CampusPulse is designed and maintained by students, for students. We understand campus life because we live it.' },
  { icon: Heart, title: 'Inclusive & Accessible', description: 'Every student deserves to feel connected. Our platform is built to be welcoming and accessible to all.' },
];

const stats = [
  { icon: Building2, value: `${societies.length}`, label: 'Active Societies' },
  { icon: Calendar, value: `${events.length}+`, label: 'Campus Events' },
  { icon: Users, value: `${societies.reduce((a, s) => a + s.members, 0)}+`, label: 'Student Members' },
  { icon: TrendingUp, value: `${announcements.length}`, label: 'Announcements' },
];

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 pb-20 pt-12">
        <div className="absolute inset-0 animated-gradient bg-gradient-to-br from-ink-950 via-brand-950 to-ink-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-10 right-20 w-72 h-72 bg-brand-500/15 rounded-full blur-3xl animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">About Us</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-2 mb-4 tracking-tight text-balance">
                Connecting students to campus life
              </h1>
              <p className="text-white/70 leading-relaxed text-pretty mb-6">
                CampusPulse is a student-built platform that brings together societies, events, and university announcements into one simple, beautiful experience. We believe that campus life is richer when students can easily discover what's happening and get involved.
              </p>
              <div className="flex gap-3">
                <Button to={{ name: 'societies' }} variant="primary">Explore Societies</Button>
                <Button to={{ name: 'contact' }} variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/30">Get in Touch</Button>
              </div>
            </Reveal>

            <Reveal delay={150} className="hidden lg:block">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-lift border border-white/10">
                  <img src={aboutImage} alt="Students in a lecture hall" className="w-full h-[340px] object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 rounded-2xl overflow-hidden shadow-lift border-4 border-ink-900">
                  <img src={aboutImage2} alt="Students collaborating" className="w-full h-32 object-cover" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <SectionWrapper className="bg-white border-b border-ink-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div className="font-display font-bold text-3xl text-ink-900">{stat.value}</div>
                <div className="text-sm text-ink-500 mt-1">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="bg-white rounded-2xl border border-ink-100 shadow-soft p-8 h-full">
              <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-display font-bold text-xl text-ink-900 mb-3">Our Mission</h2>
              <p className="text-sm text-ink-600 leading-relaxed">
                To make campus life more connected, more discoverable, and more engaging for every student. We break down the information silos between societies, the university administration, and the student body — so no one misses out on an opportunity, a deadline, or a moment of campus life.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-white rounded-2xl border border-ink-100 shadow-soft p-8 h-full">
              <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center mb-4">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-display font-bold text-xl text-ink-900 mb-3">Our Vision</h2>
              <p className="text-sm text-ink-600 leading-relaxed">
                A campus where every student — whether a first-year finding their footing or a senior looking to leave a mark — can effortlessly discover communities that match their passions, events that spark their interest, and announcements that keep them informed and prepared.
              </p>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="bg-white border-y border-ink-100">
        <SectionHeader
          eyebrow="What We Stand For"
          title="Our Values"
          description="The principles that guide everything we build."
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 80}>
              <div className="bg-ink-50 rounded-2xl p-6 h-full hover:shadow-card hover:bg-white transition-all duration-300 border border-transparent hover:border-ink-100">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center mb-4 shadow-soft">
                  <value.icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-display font-bold text-base text-ink-900 mb-2">{value.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* What we offer */}
      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="rounded-3xl overflow-hidden shadow-card">
              <img src={aboutImage2} alt="Students studying together" className="w-full h-[360px] object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">What We Offer</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 mt-2 mb-6">
                Everything campus life, in one place
              </h2>
              <div className="space-y-4">
                {[
                  'A comprehensive directory of university societies across all categories',
                  'Upcoming and ongoing event listings with full details and schedules',
                  'Real-time announcements from the university and student organizations',
                  'Important dates and deadlines so you never miss what matters',
                  'Beautiful, intuitive design that works on any device',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-ink-600">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button to={{ name: 'home' }} icon={<Activity className="w-4 h-4" />}>Back to Home</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* Disclaimer */}
      <SectionWrapper className="!py-8 bg-ink-50 border-t border-ink-100">
        <div className="bg-white rounded-xl border border-ink-100 p-5 text-center">
          <p className="text-xs text-ink-400">
            CampusPulse is a student-designed platform created for demonstration purposes. All content shown — societies, events, and announcements — is sample data for design preview and does not represent verified university information.
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
}
