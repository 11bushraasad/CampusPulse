/*
# Create societies, events, and announcements tables

## Summary
This migration creates the three core data tables for the CampusPulse
informational website: societies, events, and announcements. The site has
no authentication — it is a public, read-only informational portal — so all
tables use `TO anon, authenticated` policies that allow public read access
and authenticated write access (for future admin tooling).

## New Tables

### 1. `societies`
Stores university society profiles.
- `id` (text, primary key) — human-readable slug (e.g. 'tech-council')
- `name` (text, not null) — display name
- `category` (text, not null) — e.g. Technology, Robotics, Photography
- `tagline` (text) — short one-line motto
- `description` (text) — short description for cards
- `long_description` (text) — full description for detail page
- `logo` (text) — logo image URL
- `cover_image` (text) — cover banner image URL
- `members` (int, default 0) — member count
- `founded` (text) — founding year as string
- `email` (text) — contact email
- `instagram` (text) — Instagram handle
- `meeting_day` (text) — day of the week for meetings
- `meeting_time` (text) — meeting time string
- `meeting_location` (text) — where meetings are held
- `president` (text) — president's name
- `highlights` (text[]) — array of highlight strings
- `created_at` (timestamptz) — record creation time

### 2. `events`
Stores campus events, each linked to a society.
- `id` (text, primary key) — human-readable slug
- `title` (text, not null)
- `society_id` (text, FK to societies.id, ON DELETE CASCADE)
- `date` (date, not null) — event date
- `start_time` (text) — display string for start time
- `end_time` (text) — display string for end time
- `venue` (text)
- `short_description` (text)
- `full_description` (text)
- `cover_image` (text) — cover image URL
- `status` (text, not null, default 'upcoming') — 'upcoming' | 'ongoing' | 'completed'
- `organizer` (text)
- `organizer_role` (text)
- `contact_email` (text)
- `contact_phone` (text)
- `schedule` (jsonb) — array of {time, activity} objects
- `tags` (text[]) — array of tag strings
- `created_at` (timestamptz)

### 3. `announcements`
Stores university and society announcements.
- `id` (text, primary key) — human-readable slug
- `title` (text, not null)
- `date` (date, not null) — publish date
- `society` (text) — publishing society or office name
- `description` (text)
- `deadline` (date, nullable) — optional deadline date
- `urgent` (boolean, default false) — whether the notice is urgent
- `category` (text) — e.g. Academic, Health, Society
- `created_at` (timestamptz)

## Security
- RLS enabled on all three tables.
- SELECT: public (anon + authenticated) — this is a public informational site.
- INSERT/UPDATE/DELETE: authenticated only — reserved for future admin tooling.
- No `user_id` columns or auth.uid() checks — single-tenant, no sign-in.

## Important Notes
1. All tables use text PKs (slugs) for human-readable, stable IDs that match
   the existing frontend route structure.
2. The `events.society_id` FK references `societies(id)` with ON DELETE CASCADE,
   so deleting a society removes its events.
3. `schedule` is stored as jsonb to preserve the ordered {time, activity} array
   structure without needing a separate table.
4. `highlights` and `tags` are native text arrays for simple filtering.
*/

-- ── societies ──
CREATE TABLE IF NOT EXISTS societies (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  tagline text DEFAULT '',
  description text DEFAULT '',
  long_description text DEFAULT '',
  logo text DEFAULT '',
  cover_image text DEFAULT '',
  members integer NOT NULL DEFAULT 0,
  founded text DEFAULT '',
  email text DEFAULT '',
  instagram text DEFAULT '',
  meeting_day text DEFAULT '',
  meeting_time text DEFAULT '',
  meeting_location text DEFAULT '',
  president text DEFAULT '',
  highlights text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE societies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_societies" ON societies;
CREATE POLICY "public_select_societies"
  ON societies FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_societies" ON societies;
CREATE POLICY "auth_insert_societies"
  ON societies FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_societies" ON societies;
CREATE POLICY "auth_update_societies"
  ON societies FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_societies" ON societies;
CREATE POLICY "auth_delete_societies"
  ON societies FOR DELETE
  TO authenticated USING (true);

-- ── events ──
CREATE TABLE IF NOT EXISTS events (
  id text PRIMARY KEY,
  title text NOT NULL,
  society_id text NOT NULL REFERENCES societies(id) ON DELETE CASCADE,
  date date NOT NULL,
  start_time text DEFAULT '',
  end_time text DEFAULT '',
  venue text DEFAULT '',
  short_description text DEFAULT '',
  full_description text DEFAULT '',
  cover_image text DEFAULT '',
  status text NOT NULL DEFAULT 'upcoming',
  organizer text DEFAULT '',
  organizer_role text DEFAULT '',
  contact_email text DEFAULT '',
  contact_phone text DEFAULT '',
  schedule jsonb NOT NULL DEFAULT '[]',
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_events" ON events;
CREATE POLICY "public_select_events"
  ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_events" ON events;
CREATE POLICY "auth_insert_events"
  ON events FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_events" ON events;
CREATE POLICY "auth_update_events"
  ON events FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_events" ON events;
CREATE POLICY "auth_delete_events"
  ON events FOR DELETE
  TO authenticated USING (true);

-- ── announcements ──
CREATE TABLE IF NOT EXISTS announcements (
  id text PRIMARY KEY,
  title text NOT NULL,
  date date NOT NULL,
  society text DEFAULT '',
  description text DEFAULT '',
  deadline date,
  urgent boolean NOT NULL DEFAULT false,
  category text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_announcements" ON announcements;
CREATE POLICY "public_select_announcements"
  ON announcements FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_announcements" ON announcements;
CREATE POLICY "auth_insert_announcements"
  ON announcements FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_announcements" ON announcements;
CREATE POLICY "auth_update_announcements"
  ON announcements FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_announcements" ON announcements;
CREATE POLICY "auth_delete_announcements"
  ON announcements FOR DELETE
  TO authenticated USING (true);

-- ── indexes for common query patterns ──
CREATE INDEX IF NOT EXISTS idx_events_society_id ON events(society_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_societies_category ON societies(category);
CREATE INDEX IF NOT EXISTS idx_announcements_urgent ON announcements(urgent);
CREATE INDEX IF NOT EXISTS idx_announcements_date ON announcements(date);
