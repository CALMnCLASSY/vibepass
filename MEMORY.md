# Project Overview & Core Vision

VibePass is a modern event ticketing and hospitality marketplace built to mirror major live-event experiences with high-fidelity pages for flagship events like FIFA World Cup 2026™, Afro Nation, and Tomorrowland. The ultimate goal is to create a professional, content-rich ticket and hospitality storefront where users can buy and sell verified tickets, access premium event packages, and browse high-value sports and festival experiences through a polished and consistent UI.

This project is not a generic ticket site: it is a conversion-focused, fan-first marketplace where each event is presented with a branded landing experience, event-specific checkout flows, and a unified marketplace layer for both buying and selling.

## Tech Stack & Architecture

- Framework: Next.js 16 (App Router) with server and client components
- Language: TypeScript with React 19
- Styling: Tailwind CSS v4
- UI/Icons: lucide-react, clsx, tailwind-merge
- Data: Supabase for event storage and checkout persistence
- Payments: Browser-based checkout flows with fallback server-side persistence via `/api/checkout`
- Hosting / Deployment: Designed for Vercel or another static/edge-capable Next.js platform
- App structure:
  - `src/app/` for route pages and layout definitions
  - `src/components/` for reusable modals, checkout UI, grids, nav, footer
  - `src/data/` for hardcoded event definitions, World Cup fixtures, hospitality packages, venue metadata
  - `src/lib/` for Supabase client and utility functions
- Special event routing:
  - `world-cup` is hardcoded via `src/data/events.ts` and routed through `src/app/world-cup/*`
  - `afronation` and `tomorrowland` have dedicated branded pages and checkout modals
  - generic events are fetched from Supabase and rendered via `src/components/EventsGrid`

## Strict Operational Rules

1. Always preserve the existing event brand experience and page structure when editing.
2. Keep UI consistent using Tailwind utility classes and current component patterns.
3. Do not change event IDs for World Cup, Afro Nation, or Tomorrowland and any existing unless absolutely needed.
4. When adding new events, follow the same route and data patterns used for the hardcoded flagship events.
5. Maintain client/server separation: event data lives in `src/data/`, API persistence lives in `src/api/checkout/route.ts`, and visual flows stay in `src/components/`.
6. Keep page copy clear, premium, and focused on conversion: ticket access, hospitality, match or festival experience, and trust signals.
7. Always use the existing `EventsGrid`, `ActionModal`, and checkout modal components rather than duplicating new page patterns unless the event requires a dedicated brand page.
8. Preserve responsive design and dark/light contrast patterns already present in event pages.
9. Avoid hardcoding external URLs in components unless they are part of the event experience; prefer data-driven content.
10. When editing or adding pages, keep the same navigation and route conventions: `/events`, `/world-cup`, `/sell/[id]`, `/afronation`, `/tomorrowland`.

## Current Active Milestones

1. World Cup ticketing replication:
   - Build exact replica pages for FIFA World Cup 2026™ based on the official ticketing and hospitality experience.
   - Use `src/app/world-cup/page.tsx`, `src/data/worldcup.ts`, and associated `matches`, `venues`, and `hospitalityPackages` data.
   - Ensure users can click a World Cup event card and land on fully branded match and hospitality detail pages.
2. Event expansion workflow:
   - Add new events by extending `src/data/events.ts` and/or the Supabase `events` table.
   - For new event pages, decide if the event needs a dedicated route or can use generic event detail flow under `/events/[id]`.
3. Improve payment and checkout consistency:
   - Verify all checkout flows (`CheckoutSidebar`, `MatchCheckout`, `HospitalityCheckoutModal`, `AfroNationCheckoutModal`, `TomorrowlandCheckoutModal`) match the same success/error messaging and Discord notification structure.
4. Maintain page consistency across event landing pages and checkout journeys.

### How to add events

- For standard events:
  1. Add the event to Supabase `events` and/or `src/data/events.ts` if you need a default seed.
  2. Ensure the event object includes: `id`, `name`, `date`, `location`, `image_url`, `price`, `organizer`, `description`, `long_description`, `is_active`, `created_at`.
  3. If the event is a major flagship event and needs a dedicated page, create a new route under `src/app/` and a brand-specific layout if necessary.
  4. Ensure `EventsGrid` and `ActionModal` render the event card consistently and route correctly with `router.push`.
  5. **Always import and add the `AvailabilityBadge` component** to any new event pages or ticket cards:
     - Import: `import { AvailabilityBadge } from "@/components/AvailabilityBadge";`
     - Usage: `<AvailabilityBadge ticketId={ticketOrEventId} className="top-4 right-4" />` for overlays on images or cards
     - Utility: `getAvailabilityText()` from `@/lib/ticketAvailability.ts` returns "X available" text (10-60 range)
     - The badge ensures new events show realistic ticket availability numbers, making the site look active and trustworthy
  6. Add any event-specific checkout component only when the event has unique payment or bundle behavior.

- For World Cup matches and hospitality:
  1. Add match objects into `src/data/worldcup.ts` and ensure each match has a unique `id`, `home_team`, `away_team`, `date`, `time`, `venue_id`, `stage`, `price`, and ticket category data.
  2. Add venue metadata in `src/data/worldcup.ts` and use it across `/world-cup/venues` and match detail pages.
  3. Add hospitality packages to `src/data/worldcup.ts` with `id`, `name`, `price_display`, `description`, and `features`.
  4. Keep the World Cup landing page, matches page, venue pages, and hospitality page visually aligned with the existing `world-cup` style.

## Payment Methods and Page Consistency and Replication Method

- Payment method flow:
  - All checkout components use a browser-based form + `fetch('/api/checkout')` to persist ticket purchase events.
  - Success flows include sending structured notifications to Discord and showing the user a confirmation block with email and ticket ID.
  - Error handling must remain strong: display a message on failure and do not let the checkout UI appear broken.
- Consistency:
  - Use the same modal, card, and typography style across event pages.
  - Keep calls-to-action as buttons with the same utility styling, hover states, and spacing.
  - Use `Link` components from Next.js for internal routes and avoid raw `<a>` tags unless linking external resources.
- Replication method:
  1. Identify the target event page or brand route.
  2. Copy the structural layout from existing flagship pages (`src/app/world-cup/page.tsx`, `src/app/afronation/page.tsx`, `src/app/tomorrowland/page.tsx`).
  3. Replace copy, images, pricing, and match/package data with the new event-specific values.
  4. Verify the new page appears in navigation and the event card route resolves correctly.
  5. Confirm the checkout flow still sends the same JSON shape to `/api/checkout` and displays confirmation text consistently.

## Appendices & Change Logs

- `2026-05-21`: Created long-term project memory file describing VibePass architecture, event flow, rules, and active World Cup milestone.
- `2026-05-29`: Implemented ticket availability banner system across all event pages:
  - Created `src/lib/ticketAvailability.ts` with hash-based randomization (10-60 tickets per ID)
  - Created reusable `src/components/AvailabilityBadge.tsx` component with overlay and badge variants
  - Integrated badges into 6+ event pages: World Cup matches, Afronation, Tomorrowland, Monaco, EventsGrid, World Cup Hospitality
  - Feature uses deterministic hashing so same ticket always shows same availability (prevents confusion on page refresh)
  - Future events must include this banner for consistent "live marketplace" appearance
- Future sessions should append bullet entries here with date, changes made, and notes for next-agent actions.

### Session log template for future agents

- `YYYY-MM-DD`: Summary of edits and reasoning.
- `Added/Updated`: files and features changed.
- `Notes`: any follow-up tasks, design decisions, or architecture adjustments.
- `Next`: next milestone or bug to fix.
