/**
 * Utility functions for invoice generation and management
 */

/**
 * Generates a random, non-sequential invoice ID
 * Format: INV-YYYY-XXXX where XXXX is a random alphanumeric string
 */
export const generateInvoiceNumber = (): string => {
  const year = '2025'; // Fixed to 2025 as per requirements
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `INV-${year}-${randomPart}`;
};

/**
 * Returns the current date in ISO format (YYYY-MM-DD) with year set to 2025
 */
export const getCurrentDateFor2025 = (): string => {
  const today = new Date();
  // Set year to 2025
  today.setFullYear(2025);
  return today.toISOString().split('T')[0];
};

/**
 * Formats a date string for display (e.g., "Mar 15, 2025")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
