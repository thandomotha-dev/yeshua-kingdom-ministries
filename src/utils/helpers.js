/**
 * ============================================
 * UTILITY HELPERS
 * ============================================
 */

/**
 * Format a date string to a readable format
 * @param {string} dateStr - ISO date string (e.g., "2024-10-13")
 * @param {Object} options - Intl.DateTimeFormat options
 */
export function formatDate(dateStr, options = {}) {
  const defaults = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-ZA', { ...defaults, ...options });
}

/**
 * Format currency (South African Rand by default)
 */
export function formatPrice(amount, currency = 'ZAR') {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Create a slug from a string
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/**
 * Generate Google Calendar link
 */
export function generateCalendarLink(event) {
  const startDate = new Date(event.date + 'T' + convertTo24h(event.time));
  const endDate = event.endDate
    ? new Date(event.endDate + 'T' + convertTo24h(event.endTime || event.time))
    : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

  const formatGCalDate = (d) =>
    d.toISOString().replace(/[-:]/g, '').replace('.000', '');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`,
    details: event.description || '',
    location: event.location || '',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function convertTo24h(timeStr) {
  if (!timeStr) return '09:00';
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

/**
 * Truncate text to a max length
 */
export function truncate(text, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(dateStr) {
  return new Date(dateStr) >= new Date(new Date().toDateString());
}

/**
 * Scroll to element by ID
 */
export function scrollToElement(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
