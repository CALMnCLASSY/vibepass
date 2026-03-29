-- Create a tickets table to store all generated tickets
CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY, -- Using the ticketId (e.g., VP-XXXXXX)
    event_id UUID REFERENCES events(id),
    event_name TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    quantity INTEGER DEFAULT 1,
    total_amount NUMERIC(10, 2),
    status TEXT DEFAULT 'success',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Optional, but good practice)
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Allow public insertion for the checkout flow (or restrict to service role if using backend)
CREATE POLICY "Allow public insert" ON tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated select" ON tickets FOR SELECT USING (auth.role() = 'authenticated');
