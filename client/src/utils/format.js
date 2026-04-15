/**
 * Format a date string into a readable locale date.
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });

/**
 * Format seconds into MM:SS or plain seconds string.
 * @param {number} seconds
 * @returns {string}
 */
export const formatTime = (seconds) =>
  seconds >= 60
    ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
    : String(seconds);

/**
 * Get user initials from full name (max 2 chars).
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) =>
  name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? '';
