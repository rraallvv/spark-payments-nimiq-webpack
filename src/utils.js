/**
 * Slugify text for URL
 * @param {string} text source text
 * @return {string}
 */
export function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Format date, Month Day, Year
 * @param {Date} date
 * @return {string}
 */
export function formatDateLong (date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// check if settings are stored
export function isStored () {
  return localStorage.getItem('account') && localStorage.getItem('password')
}

export const ENTER = 13
export const SPACE = 32
export const BACKSPACE = 8
export const ESC = 27