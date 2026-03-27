-- SQL to add Old School Bongo 6.0 ticket tiers to Supabase
-- Run this in your Supabase SQL Editor

INSERT INTO events (name, date, location, image_url, price, organizer, description, long_description, is_active)
VALUES 
('BONGO - DIEHARD', '2026-04-05', 'Cavalli At The Manor', '/images/events/bongo.png', 1000, 'MADFUN', 'Old School Bongo 6.0 with a touch of Kenyan flavor.', 'Featuring Mejja, Harmonize, and Nameless. Date: 5th April 2026. Time: Starting from 2:00 PM. Location: CAVALLI @ THE MANOR. NO GATE TICKETS.', TRUE),
('BONGO - EARLY BIRD', '2026-04-05', 'Cavalli At The Manor', '/images/events/bongo.png', 1500, 'MADFUN', 'Old School Bongo 6.0 with a touch of Kenyan flavor.', 'Featuring Mejja, Harmonize, and Nameless. Date: 5th April 2026. Time: Starting from 2:00 PM. Location: CAVALLI @ THE MANOR. NO GATE TICKETS.', TRUE),
('BONGO - WAVE 1', '2026-04-05', 'Cavalli At The Manor', '/images/events/bongo.png', 2000, 'MADFUN', 'Old School Bongo 6.0 with a touch of Kenyan flavor.', 'Featuring Mejja, Harmonize, and Nameless. Date: 5th April 2026. Time: Starting from 2:00 PM. Location: CAVALLI @ THE MANOR. NO GATE TICKETS.', TRUE);
