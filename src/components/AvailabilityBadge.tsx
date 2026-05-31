'use client';

import { getAvailabilityText } from '@/lib/ticketAvailability';

interface AvailabilityBadgeProps {
  ticketId: string;
  className?: string;
  variant?: 'overlay' | 'badge';
}

/**
 * AvailabilityBadge Component
 * Displays ticket availability as an overlay or badge
 * 
 * @param ticketId - The ticket ID used to generate consistent availability number
 * @param className - Additional CSS classes
 * @param variant - 'overlay' for absolute positioned overlay, 'badge' for standalone badge
 */
export function AvailabilityBadge({ 
  ticketId, 
  className = '', 
  variant = 'overlay' 
}: AvailabilityBadgeProps) {
  const availabilityText = getAvailabilityText(ticketId);

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center px-3 py-1 rounded-lg bg-emerald-500 text-white text-xs font-bold ${className}`}>
        ✓ {availabilityText}
      </div>
    );
  }

  // Overlay variant (default)
  return (
    <div className={`absolute top-3 right-3 z-20 inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold shadow-lg ${className}`}>
      ✓ {availabilityText}
    </div>
  );
}
