import { RouterProvider, useRouter } from '@/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { SocietiesPage } from '@/pages/SocietiesPage';
import { SocietyDetailPage } from '@/pages/SocietyDetailPage';
import { EventsListPage } from '@/pages/EventsListPage';
import { EventDetailPage } from '@/pages/EventDetailPage';
import { AnnouncementsPage } from '@/pages/AnnouncementsPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';

function PageRouter() {
  const { route } = useRouter();

  switch (route.name) {
    case 'home':
      return <HomePage />;
    case 'societies':
      return <SocietiesPage />;
    case 'society':
      return <SocietyDetailPage id={route.id} />;
    case 'events-upcoming':
      return (
        <EventsListPage
          status="upcoming"
          eyebrow="What's Coming Up"
          title="Upcoming Events"
          description="Browse all upcoming campus events — hackathons, workshops, championships, and more. Don't miss out on what's happening next."
        />
      );
    case 'events-ongoing':
      return (
        <EventsListPage
          status="ongoing"
          eyebrow="Happening Now"
          title="Ongoing Events"
          description="Events currently underway on campus. Jump in while you still can — some are open all day."
        />
      );
    case 'event':
      return <EventDetailPage id={route.id} />;
    case 'announcements':
      return <AnnouncementsPage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    default:
      return <HomePage />;
  }
}

function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen bg-ink-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <PageRouter />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  );
}

export default App;
