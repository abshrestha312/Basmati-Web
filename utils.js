// Utility functions for the Basmati Web application

/**
 * Creates a page URL for routing
 * @param {string} pageName - The name of the page
 * @returns {string} - The formatted URL path
 */
export function createPageUrl(pageName) {
  if (pageName === "Home") {
    return "/";
  }
  return `/${pageName.toLowerCase()}`;
}

/**
 * Utility function to combine class names
 * @param {...string} classes - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

/**
 * Format date
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}