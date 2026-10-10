import { supabase } from '@/lib/supabase';
import type { Society, CampusEvent, Announcement, EventStatus } from '@/data/content';

// ── DB row types (snake_case from Postgres) ──

interface SocietyRow {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  long_description: string;
  logo: string;
  cover_image: string;
  members: number;
  founded: string;
  email: string;
  instagram: string;
  meeting_day: string;
  meeting_time: string;
  meeting_location: string;
  president: string;
  highlights: string[];
}

interface EventRow {
  id: string;
  title: string;
  society_id: string;
  date: string;
  start_time: string;
  end_time: string;
  venue: string;
  short_description: string;
  full_description: string;
  cover_image: string;
  status: EventStatus;
  organizer: string;
  organizer_role: string;
  contact_email: string;
  contact_phone: string;
  schedule: { time: string; activity: string }[];
  tags: string[];
}

interface AnnouncementRow {
  id: string;
  title: string;
  date: string;
  society: string;
  description: string;
  deadline: string | null;
  urgent: boolean;
  category: string;
}

// ── Mappers ──

function mapSociety(row: SocietyRow, societyName?: string): Society {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    tagline: row.tagline,
    description: row.description,
    longDescription: row.long_description,
    logo: row.logo,
    coverImage: row.cover_image,
    members: row.members,
    founded: row.founded,
    email: row.email,
    instagram: row.instagram,
    meetingDay: row.meeting_day,
    meetingTime: row.meeting_time,
    meetingLocation: row.meeting_location,
    president: row.president,
    highlights: row.highlights ?? [],
  };
}

function mapEvent(row: EventRow, societyName?: string): CampusEvent {
  return {
    id: row.id,
    title: row.title,
    society: societyName ?? '',
    societyId: row.society_id,
    date: row.date,
    time: row.start_time,
    endTime: row.end_time,
    venue: row.venue,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    coverImage: row.cover_image,
    status: row.status,
    organizer: row.organizer,
    organizerRole: row.organizer_role,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone,
    schedule: row.schedule ?? [],
    tags: row.tags ?? [],
  };
}

function mapAnnouncement(row: AnnouncementRow): Announcement {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    society: row.society,
    description: row.description,
    deadline: row.deadline,
    urgent: row.urgent,
    category: row.category,
  };
}

// ── Fetch functions ──

export async function fetchSocieties(): Promise<Society[]> {
  const { data, error } = await supabase
    .from('societies')
    .select('*')
    .order('name');
  if (error) throw error;
  return (data as SocietyRow[]).map((r) => mapSociety(r));
}

export async function fetchSocietyById(id: string): Promise<Society | null> {
  const { data, error } = await supabase
    .from('societies')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return mapSociety(data as SocietyRow);
}

export async function fetchEvents(): Promise<CampusEvent[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*, societies!inner(name)')
    .order('date');
  if (error) throw error;
  return (data as (EventRow & { societies: { name: string } })[]).map((r) =>
    mapEvent(r, r.societies?.name),
  );
}

export async function fetchEventsByStatus(status: EventStatus): Promise<CampusEvent[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*, societies!inner(name)')
    .eq('status', status)
    .order('date');
  if (error) throw error;
  return (data as (EventRow & { societies: { name: string } })[]).map((r) =>
    mapEvent(r, r.societies?.name),
  );
}

export async function fetchEventById(id: string): Promise<CampusEvent | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*, societies!inner(name)')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const row = data as EventRow & { societies: { name: string } };
  return mapEvent(row, row.societies?.name);
}

export async function fetchEventsBySociety(societyId: string): Promise<CampusEvent[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*, societies!inner(name)')
    .eq('society_id', societyId)
    .order('date');
  if (error) throw error;
  return (data as (EventRow & { societies: { name: string } })[]).map((r) =>
    mapEvent(r, r.societies?.name),
  );
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data as AnnouncementRow[]).map((r) => mapAnnouncement(r));
}
