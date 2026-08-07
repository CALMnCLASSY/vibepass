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

1. **Maintenance Mode & Event Expansion:**
   - The initial replica pages and standard event features (World Cup, Afro Nation, Tomorrowland, Monaco) are completed.
   - The platform is now in maintenance mode. 
   - New events will be added occasionally.
   - Ensure the Past Events logic automatically archives events after their date has passed.
2. **Checkout Consistency:**
   - Continue ensuring all checkout modals provide the exact same success/error responses and Discord notification payload structures.
3. **Availability Badges:**
   - Ensure dynamic ticket availability badges remain visible across all event grid cards and individual ticket category cards.

### How to add events

- For flagship & custom event pages:
  1. **Reference Parsing**: Extract ticket names, pass tiers (GA, GA+, VIP, Comfort, Club), dates, prices, and venue info from reference HTML files or official tickets page.
  2. **Asset Migration**: Copy event graphics and ticket artwork into `public/<event-slug>/`.
  3. **Event Dataset (`src/data/events.ts`)**:
     - Create `get<EventName>Event()` function.
     - Include event in `getEvents()`, `getTopEvents()`, and `getEventById('<event-slug>')`.
     - **Price Rounding Rule**: Round all ticket prices to clean whole dollar amounts (no decimals for USD prices).
  4. **Dedicated Event Page (`src/app/<event-slug>/page.tsx`)**:
     - Create branded festival/sports hub page with hero section, pass filter bar, and pass cards.
     - **MANDATORY Availability Badge**: Import `AvailabilityBadge` from `@/components/AvailabilityBadge` and render `<AvailabilityBadge ticketId={ticket.id} price={ticket.price} className="..." />` on every ticket pass card.
  5. **Dedicated Checkout Modal (`src/components/<EventName>CheckoutModal.tsx`)**:
     - Handle quantity adjustments, email input, Flutterwave payment gateway, Discord notifications (`/api/notifications/discord`), backend database insertion (`/api/checkout`), and confirmation state.
  6. **Routing Integration**:
     - Update `src/app/events/[id]/page.tsx` to redirect `<event-slug>` to `/<event-slug>`.
     - Update `src/components/ActionModal.tsx` to route `handleBuy` to `/<event-slug>`.
  7. **Marketplace Seller Integration**:
     - Add event to `FEATURED_SELL_EVENTS` in `src/app/sell/page.tsx`.
     - Add ticket categories for event in `src/app/sell/[id]/page.tsx`.

- Past Events vs. Upcoming Events Rule:
  1. Events with `date >= now` automatically render in the "Trending Now" / Upcoming section.
  2. Events with `date < now` automatically move to the "Past Events" section on the homepage and show an "Event Has Ended" / read-only badge.

- Ticket Availability System (5–20 Range & Price Scaling):
  1. Availability count is strictly between **5 and 20** remaining tickets.
  2. **Price-tiered scaling**:
     - High-Tier / VIP / Club / Hospitality Passes (≥ $400): **5 to 8** tickets available.
     - Mid-Tier / GA+ / Comfort Passes ($200–$399): **9 to 13** tickets available.
     - Standard GA Passes (< $200): **14 to 20** tickets available.
  3. Deterministic hashing ensures consistency across page reloads.

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
  2. Copy the structural layout from existing flagship pages (`src/app/edc-orlando/page.tsx`, `src/app/corona-capital/page.tsx`, `src/app/afronation/page.tsx`).
  3. Replace copy, images, pricing, and match/package data with the new event-specific values.
  4. Verify the new page appears in navigation and the event card route resolves correctly.
  5. Confirm the checkout flow still sends the same JSON shape to `/api/checkout` and displays confirmation text consistently.

## Appendices & Change Logs

- `2026-05-21`: Created long-term project memory file describing VibePass architecture, event flow, rules, and active World Cup milestone.
- `2026-05-29`: Implemented ticket availability banner system across all event pages.
- `2026-06-21`: Converted payment integration from Paystack to Flutterwave checkout.
- `2026-08-07`: Added EDC Orlando 2026 & Corona Capital CDMX 2026 events + fixed `/sell` route:
  - Created `/edc-orlando` with 12 admission ticket passes (3-Day & Single Day GA, GA+, VIP) and rounded prices ($147, $158, $213, $245, $334, $403, $700).
  - Created `/corona-capital` with 10 admission ticket passes (3-Day Abono, Comfort, VIP, Club & Single Day) in USD & MXN.
  - Created `/sell` marketplace hub page resolving 404 error on homepage hero button.
  - Updated `ticketAvailability.ts` to 5–20 range with price-tiered scaling (VIP = 5–8, Mid = 9–13, GA = 14–20).
  - Integrated `AvailabilityBadge` on all ticket passes for new events.

