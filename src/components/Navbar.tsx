import { useEffect, useState } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import { useRouter, type Route } from '@/router';

const navLinks: { label: string; route: Route }[] = [
  { label: 'Home', route: { name: 'home' } },
  { label: 'Societies', route: { name: 'societies' } },
  { label: 'Upcoming Events', route: { name: 'events-upcoming' } },
  { label: 'Ongoing Events', route: { name: 'events-ongoing' } },
  { label: 'Announcements', route: { name: 'announcements' } },
  { label: 'About', route: { name: 'about' } },
  { label: 'Contact', route: { name: 'contact' } },
];

export function Navbar() {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  const isActive = (linkRoute: Route): boolean => {
    if (linkRoute.name === 'home' && route.name === 'home') return true;
    if (linkRoute.name === 'societies' && (route.name === 'societies' || route.name === 'society')) return true;
    if (linkRoute.name === 'events-upcoming' && (route.name === 'events-upcoming' || route.name === 'event')) return true;
    if (linkRoute.name === 'events-ongoing' && route.name === 'events-ongoing') return true;
    if (linkRoute.name === route.name) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-soft border-b border-ink-200/60' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate({ name: 'home' })}
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300">
                  <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent-400 rounded-full border-2 border-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg text-ink-900 tracking-tight">
                  Campus<span className="text-brand-600">Pulse</span>
                </span>
                <span className="text-[10px] text-ink-400 font-medium tracking-wide hidden sm:block">Your Campus. Your Community.</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.route)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive(link.route)
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-ink-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5 text-ink-700" /> : <Menu className="w-5 h-5 text-ink-700" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-[500px] glass border-b border-ink-200/60' : 'max-h-0'
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.route)}
                className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isActive(link.route)
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-ink-700 hover:bg-ink-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="h-16" />
    </>
  );
}
