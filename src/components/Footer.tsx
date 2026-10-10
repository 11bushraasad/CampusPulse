import { Activity, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube, Facebook } from 'lucide-react';
import { useRouter, type Route } from '@/router';

const footerLinks: { label: string; route: Route }[] = [
  { label: 'Home', route: { name: 'home' } },
  { label: 'Explore Societies', route: { name: 'societies' } },
  { label: 'Upcoming Events', route: { name: 'events-upcoming' } },
  { label: 'Ongoing Events', route: { name: 'events-ongoing' } },
  { label: 'Announcements', route: { name: 'announcements' } },
  { label: 'About Us', route: { name: 'about' } },
  { label: 'Contact', route: { name: 'contact' } },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
];

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Campus<span className="text-brand-400">Pulse</span>
              </span>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed mb-6 max-w-xs">
              Your one-stop platform for discovering university societies, campus events, and important announcements.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-ink-800 hover:bg-brand-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow"
                >
                  <social.icon className="w-4 h-4 text-ink-300 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Explore</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.route)}
                    className="text-sm text-ink-400 hover:text-brand-400 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-ink-400">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <span>Student Affairs Office, Ground Floor, Main Building, Campus University</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-ink-400">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href="mailto:campuspulse@campus.edu" className="hover:text-brand-400 transition-colors">campuspulse@campus.edu</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-ink-400">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href="tel:+15550102000" className="hover:text-brand-400 transition-colors">+1 (555) 010-2000</a>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Office Hours</h4>
            <ul className="space-y-2 text-sm text-ink-400">
              <li className="flex justify-between"><span>Mon – Fri</span><span className="text-ink-300">9:00 – 17:00</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="text-ink-300">10:00 – 14:00</span></li>
              <li className="flex justify-between"><span>Sunday</span><span className="text-ink-300">Closed</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500">
            © 2026 CampusPulse. A student-built platform for the campus community.
          </p>
          <p className="text-xs text-ink-500">
            Sample content for design preview. Not official university information.
          </p>
        </div>
      </div>
    </footer>
  );
}
