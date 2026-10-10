import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle2, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionWrapper } from '@/components/SectionHeader';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

const contactCards = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['Student Affairs Office', 'Ground Floor, Main Building', 'Campus University'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['campuspulse@campus.edu', 'Replies within 24 hours'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+1 (555) 010-2000', 'Mon–Fri, 9 AM – 5 PM'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Mon–Fri: 9:00 – 17:00', 'Saturday: 10:00 – 14:00', 'Sunday: Closed'],
  },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div>
      {/* Page header */}
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-12">
        <div className="absolute inset-0 animated-gradient bg-gradient-to-br from-ink-950 via-brand-950 to-ink-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">We're Here to Help</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-2 mb-3 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-white/60 max-w-2xl text-pretty">
              Have a question, suggestion, or want to list your society on CampusPulse? We'd love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact cards */}
      <SectionWrapper className="!pt-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div className="bg-white rounded-2xl border border-ink-100 shadow-soft p-6 h-full hover:shadow-card transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-display font-bold text-sm text-ink-900 mb-2">{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line} className="text-xs text-ink-500 leading-relaxed">{line}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Form + Map */}
      <SectionWrapper className="!pt-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Reveal>
            <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-brand-600" />
                <h2 className="font-display font-bold text-xl text-ink-900">Send a Message</h2>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center mb-4 animate-scale-in">
                    <CheckCircle2 className="w-8 h-8 text-success-500" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink-900 mb-1">Message Sent!</h3>
                  <p className="text-sm text-ink-500">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-ink-50 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-ink-50 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
                        placeholder="jane@campus.edu"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-ink-50 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-ink-50 border border-ink-200 rounded-xl text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl px-6 py-3 text-sm shadow-soft hover:shadow-lift transition-all duration-300 active:scale-[0.98]"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Side: social + info */}
          <Reveal delay={100}>
            <div className="space-y-5">
              {/* Connect with us */}
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl shadow-lift p-6 lg:p-8 text-white">
                <h3 className="font-display font-bold text-lg mb-2">Connect With Us</h3>
                <p className="text-sm text-white/70 mb-5">Follow CampusPulse on social media for daily campus life updates.</p>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-all duration-300 group"
                    >
                      <social.icon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick FAQ */}
              <div className="bg-white rounded-2xl border border-ink-100 shadow-soft p-6 lg:p-8">
                <h3 className="font-display font-bold text-lg text-ink-900 mb-4">Quick Answers</h3>
                <div className="space-y-4">
                  <FAQItem
                    question="How do I list my society on CampusPulse?"
                    answer="Send us an email at campuspulse@campus.edu with your society details and we'll get you set up within 48 hours."
                  />
                  <FAQItem
                    question="Can I post an event for my society?"
                    answer="Yes! Contact us with your event details and we'll add it to the events listing for all students to discover."
                  />
                  <FAQItem
                    question="Is CampusPulse an official university platform?"
                    answer="CampusPulse is a student-built platform. Content shown is for demonstration and may not reflect official university information."
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink-100 last:border-0 pb-4 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-semibold text-ink-900">{question}</span>
        <span className={`text-ink-400 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-32 mt-2' : 'max-h-0'}`}>
        <p className="text-sm text-ink-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
