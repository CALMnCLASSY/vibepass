/**
 * Generates a consistent "random" number of available tickets (10-60) based on ticket ID.
 * Uses a simple hash function to ensure the same ticket ID always returns the same availability number.
 * This ensures consistent display across page reloads and different sessions.
 */
export function getAvailableTickets(ticketId: string): number {
  // Simple hash function that generates a number from string
  let hash = 0;
  for (let i = 0; i < ticketId.length; i++) {
    const char = ticketId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convert hash to range 10-60
  const normalized = Math.abs(hash) % 51; // 0-50
  return normalized + 10; // 10-60
}

/**
 * Gets a formatted string for ticket availability (e.g., "31 available")
 */
export function getAvailabilityText(ticketId: string): string {
  const count = getAvailableTickets(ticketId);
  return `${count} available`;
}
