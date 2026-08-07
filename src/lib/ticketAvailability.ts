/**
 * Generates a consistent "random" number of available tickets (5-20) based on ticket ID and price.
 * More expensive tickets have less availability (e.g. 5-8 available for VIP/Club/High Price),
 * mid-tier tickets have 8-13 available, and standard tickets have 14-20 available.
 */
export function getAvailableTickets(ticketId: string, price?: number): number {
  // Calculate a 48-hour period value (milliseconds in 48 hours)
  const periodDuration = 1000 * 60 * 60 * 48;
  const currentPeriod = Math.floor(Date.now() / periodDuration);
  
  // Combine ticketId and current period string
  const seedString = `${ticketId}-${currentPeriod}`;

  // Simple hash function that generates a number from string
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    const char = seedString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  const rawHash = Math.abs(hash);

  // Check if ticket is high tier / high price
  const idLower = ticketId.toLowerCase();
  const isHighTier = (price && price >= 400) || idLower.includes('vip') || idLower.includes('club') || idLower.includes('hospitality') || idLower.includes('suite') || idLower.includes('cjyktet993djnilc') || idLower.includes('3day');
  const isMidTier = (price && price >= 200 && price < 400) || idLower.includes('ga+') || idLower.includes('comfort') || idLower.includes('gq27bicu44e3zdil');

  if (isHighTier) {
    // Range 5 - 8
    return (rawHash % 4) + 5;
  } else if (isMidTier) {
    // Range 9 - 13
    return (rawHash % 5) + 9;
  } else {
    // Range 14 - 20 (Standard GA)
    return (rawHash % 7) + 14;
  }
}

/**
 * Gets a formatted string for ticket availability (e.g., "5 available")
 */
export function getAvailabilityText(ticketId: string, price?: number): string {
  const count = getAvailableTickets(ticketId, price);
  return `${count} available`;
}

