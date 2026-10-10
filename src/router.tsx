import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'societies' }
  | { name: 'society'; id: string }
  | { name: 'events-upcoming' }
  | { name: 'events-ongoing' }
  | { name: 'event'; id: string }
  | { name: 'announcements' }
  | { name: 'about' }
  | { name: 'contact' };

interface RouterContextValue {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) return { name: 'home' };
  if (parts[0] === 'societies') {
    if (parts[1]) return { name: 'society', id: parts[1] };
    return { name: 'societies' };
  }
  if (parts[0] === 'events') {
    if (parts[1] === 'upcoming') return { name: 'events-upcoming' };
    if (parts[1] === 'ongoing') return { name: 'events-ongoing' };
    if (parts[1]) return { name: 'event', id: parts[1] };
  }
  if (parts[0] === 'announcements') return { name: 'announcements' };
  if (parts[0] === 'about') return { name: 'about' };
  if (parts[0] === 'contact') return { name: 'contact' };
  return { name: 'home' };
}

function routeToHash(route: Route): string {
  switch (route.name) {
    case 'home': return '#/';
    case 'societies': return '#/societies';
    case 'society': return `#/societies/${route.id}`;
    case 'events-upcoming': return '#/events/upcoming';
    case 'events-ongoing': return '#/events/ongoing';
    case 'event': return `#/events/${route.id}`;
    case 'announcements': return '#/announcements';
    case 'about': return '#/about';
    case 'contact': return '#/contact';
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const handler = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (newRoute: Route) => {
    const hash = routeToHash(newRoute);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
